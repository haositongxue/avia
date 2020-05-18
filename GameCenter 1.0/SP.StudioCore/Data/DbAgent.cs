﻿using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SP.StudioCore.API;
using SP.StudioCore.API.Translates;
using SP.StudioCore.Data.Repository;
using SP.StudioCore.Data.Schema;
using SP.StudioCore.Enums;
using SP.StudioCore.Ioc;
using SP.StudioCore.Model;
using SP.StudioCore.Utils;
using SP.StudioCore.Web;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq.Expressions;
using System.Text;

namespace SP.StudioCore.Data
{
    /// <summary>
    /// 逻辑类/数据库连接基类
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class DbAgent<T> : IDisposable where T : class, new()
    {
        private readonly string ConnectionString;

        /// <summary>
        /// 只读操作对象
        /// </summary>
        protected virtual IReadRepository ReadDB => IocCollection.GetService<IReadRepository>();

        /// <summary>
        /// 可写可读操作对象
        /// </summary>
        protected virtual IWriteRepository WriteDB => IocCollection.GetService<IWriteRepository>();

        /// <summary>
        /// 数据库类型
        /// </summary>
        private readonly DatabaseType DBType;

        protected DbAgent(string dbConnection, DatabaseType dbType = DatabaseType.SqlServer)
        {
            this.ConnectionString = dbConnection;
            this.DBType = dbType;
        }

        protected DbExecutor NewExecutor(IsolationLevel tranLevel = IsolationLevel.Unspecified)
        {
            return this.NewExecutor(this.ConnectionString, tranLevel);
        }

        protected DbExecutor NewExecutor(string connectionString, IsolationLevel tranLevel = IsolationLevel.Unspecified)
        {
            return DbFactory.CreateExecutor(connectionString, this.DBType, tranLevel);
        }

        /// <summary>
        /// 当前的httpContext对象（如果非web程序则为null）
        /// </summary>
        protected virtual HttpContext context
        {
            get
            {
                return Context.Current;
            }
        }

        #region ========== Message的传递处理 ===========

        /// <summary>
        /// 消息体（不支持非Web环境)
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
        public virtual MessageResult Message(string msg = null)
        {
            if (this.context == null) return default;
            MessageResult result = this.context.RequestServices.GetService<MessageResult>();
            if (!string.IsNullOrEmpty(msg)) result.Add(msg);
            return result;
        }

        /// <summary>
        /// 返回错误信息
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
        protected virtual bool FaildMessage(string msg)
        {
            return this.FaildMessage(msg, false);
        }

        /// <summary>
        /// 错误信息（多语种，msg一定要使用format格式）
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
        protected virtual bool FaildMessage(string msg, Language language, params object[] args)
        {
            return this.FaildMessage(msg.Get(language), false);
        }

        protected virtual TFaild FaildMessage<TFaild>(string msg)
        {
            return this.FaildMessage<TFaild>(msg, default);
        }

        protected virtual TFaild FaildMessage<TFaild>(string msg, TFaild faildValue, params object[] args)
        {
            return this.FaildMessage(msg, Language.CHN, faildValue, args);
        }

        protected virtual TFaild FaildMessage<TFaild>(string msg, Language language, TFaild faildValue, params object[] args)
        {
            this.Message(string.Format(msg.Get(language), args));
            return faildValue;
        }

        /// <summary>
        /// 使用枚举作为错误信息传递对象
        /// </summary>
        /// <typeparam name="TEnum"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        protected virtual bool FaildMessage<TEnum>(TEnum value) where TEnum : IComparable, IFormattable, IConvertible
        {
            this.Message(value.ToString());
            return false;
        }

        #endregion

        #region ======= 单例模式 =========

        private static T _instance;
        public static T Instance()
        {
            if (_instance == null)
            {
                _instance = new T();
            }

            return _instance;
        }

        #endregion

        #region ========  公共的通用方法（工具）  ========

        /// <summary>
        /// 公共保存数据库排序的方法（从大到小）
        /// </summary>
        /// <typeparam name="TModel">实体类</typeparam>
        /// <typeparam name="TValue">主键</typeparam>
        /// <param name="index">主键</param>
        /// <param name="sort">排序字段</param>
        /// <param name="indexList">主键列表</param>
        protected virtual void SaveSort<TModel, TValue>(Expression<Func<TModel, TValue>> indexField, Expression<Func<TModel, short>> sortField, params TValue[] indexList) where TModel : class, new()
        {
            short sort = (short)indexList.Length;
            if (sort == 0) return;
            string indexName = null;
            if (indexField == null)
            {
                ColumnProperty[] columns = typeof(TModel).GetKey();
                if (columns.Length != 1) throw new Exception("Primary key error");
                indexName = columns[0].Name;
            }
            else
            {
                indexName = SchemaCache.GetColumnProperty(indexField).Name;
            }
            string sortName = sortField == null ? "Sort" : SchemaCache.GetColumnProperty(sortField).Name;
            using (DbExecutor db = NewExecutor(IsolationLevel.ReadUncommitted))
            {
                foreach (TValue value in indexList)
                {
                    db.ExecuteNonQuery(CommandType.Text, $"UPDATE [{typeof(TModel).GetTableName()}] SET [{sortName}] = @Sort WHERE [{indexName}] = @Value", new
                    {
                        Sort = sort,
                        Value = value
                    });
                    sort--;
                }
                db.Commit();
            }
        }


        #endregion

        protected DbParameter NewParam(string parameterName, object value)
        {
            return this.DBType.NewParam(parameterName, value);
        }

        public void Dispose()
        {

        }
    }
}
