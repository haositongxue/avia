﻿using SP.StudioCore.Data.Provider;
using SP.StudioCore.Data.Repository;
using SP.StudioCore.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq.Expressions;
using System.Text;

namespace SP.StudioCore.Data
{
    /// <summary>
    /// 数据库写/读操作
    /// </summary>
    partial class DbExecutor : IWriteRepository
    {
        private IWriteRepository provider => this.GetWriteRepository();

        public int Delete<T>(Expression<Func<T, bool>> condition) where T : class, new() =>
            provider.Delete(condition);

        public int ExecuteNonQuery<T>(T obj) where T : IProcedureModel =>
            provider.ExecuteNonQuery(obj);


        public TValue ExecuteScalar<T, TValue>(T obj) where T : IProcedureModel =>
            provider.ExecuteScalar<T, TValue>(obj);


        public bool Exists<T>(Expression<Func<T, bool>> condition) where T : class, new() =>
            provider.Exists(condition);


        public bool Exists<T>() where T : class, new() =>
            provider.Exists<T>();


        public DataSet GetDataSet<T>(Expression<Func<T, bool>> condition, params Expression<Func<T, object>>[] fields) where T : class, new() =>
            provider.GetDataSet(condition, fields);


        public DataSet GetDataSet<T>(T obj) where T : IProcedureModel =>
            provider.GetDataSet(obj);

        public bool Insert<T>(T entity) where T : class, new() =>
            provider.Insert(entity);

        public bool InsertIdentity<T>(T entity) where T : class, new() =>
            provider.InsertIdentity(entity);

        public bool InsertNoIdentity<T>(T entity) where T : class, new() =>
            provider.InsertNoIdentity(entity);

        public IDataReader ReadData<T>(Expression<Func<T, bool>> condition, params Expression<Func<T, object>>[] fields) where T : class, new() =>
            provider.ReadData(condition, fields);


        public IDataReader ReadData<T>(params Expression<Func<T, object>>[] fields) where T : class, new() =>
            provider.ReadData(fields);


        public IEnumerable<TValue> ReadList<T, TValue>(Expression<Func<T, TValue>> field, Expression<Func<T, bool>> condition) where T : class, new() =>
            provider.ReadList(field, condition);


        public IDataReader ReadData<T>(T obj) where T : IProcedureModel =>
            provider.ReadData(obj);

        public TValue ReadInfo<T, TValue>(Expression<Func<T, TValue>> field, Expression<Func<T, bool>> condition) where T : class, new() =>
            provider.ReadInfo(field, condition);

        public T ReadInfo<T>(Expression<Func<T, bool>> condition, params Expression<Func<T, object>>[] fields) where T : class, new() =>
            provider.ReadInfo(condition, fields);

        public IEnumerable<T> ReadList<T>(string condition, object parameters = null) where T : class, new() =>
            provider.ReadList<T>(condition, parameters);

        public IEnumerable<T> ReadList<T>(Expression<Func<T, bool>> condition, params Expression<Func<T, object>>[] fields) where T : class, new() =>
            provider.ReadList(condition, fields);

        public IEnumerable<T> ReadList<T>(params Expression<Func<T, object>>[] fields) where T : class, new() =>
            provider.ReadList(fields);

        public IEnumerable<TResult> ReadList<TResult, T>(T obj)
            where TResult : class, new()
            where T : IProcedureModel =>
            provider.ReadList<TResult, T>(obj);

        public IEnumerable<TResult> ReadScalar<TResult, T>(T obj) where T : IProcedureModel =>
            provider.ReadScalar<TResult, T>(obj);

        public int Update<T, TValue>(Expression<Func<T, TValue>> field, TValue value, Expression<Func<T, bool>> condition) where T : class, new() =>
            provider.Update(field, value, condition);

        public int Update<T>(T entity, Expression<Func<T, bool>> condition, params Expression<Func<T, object>>[] fields) where T : class, new() =>
            provider.Update(entity, condition, fields);

        public int UpdatePlus<T>(T entity, Expression<Func<T, bool>> condition, params Expression<Func<T, object>>[] fields) where T : class, new() =>
            provider.UpdatePlus(entity, condition, fields);

        public int Update<T>(T entity, params Expression<Func<T, object>>[] fields) where T : class, new() =>
            provider.Update(entity, fields);

        public bool Delete<T>(T entity) where T : class, new() =>
            provider.Delete(entity);

        public int UpdatePlus<T, TValue>(Expression<Func<T, TValue>> field, TValue value, Expression<Func<T, bool>> condition) where T : class, new() where TValue : struct =>
            provider.UpdatePlus(field, value, condition);

        public bool Exists<T>(T entity) where T : class, new() =>
            provider.Exists(entity);
        
    }
}
