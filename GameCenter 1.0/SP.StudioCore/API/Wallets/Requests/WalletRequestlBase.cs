﻿using SP.StudioCore.Array;
using SP.StudioCore.Enums;
using SP.StudioCore.Json;
using SP.StudioCore.Model;
using SP.StudioCore.Security;
using SP.StudioCore.Types;
using SP.StudioCore.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace SP.StudioCore.API.Wallets.Requests
{
    /// <summary>
    /// 收到查询请求的实现类
    /// </summary>
    public abstract class WalletRequestlBase
    {
        /// <summary>
        /// 密钥
        /// </summary>
        private readonly string SecretKey;

        public WalletRequestlBase(string secretKey)
        {
            this.SecretKey = secretKey;
        }


        /// <summary>
        /// 动作名称
        /// </summary>
        public abstract string Action { get; }

        /// <summary>
        /// 时间戳
        /// </summary>
        public virtual long Timestamp => WebAgent.GetTimestamps();

        /// <summary>
        /// 当前通信所使用的语种
        /// </summary>
        [Ignore]
        public Language Language { get; set; }

        /// <summary>
        /// 查询提交的JSON内容
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            SortedDictionary<string, string> dic = new SortedDictionary<string, string>
            {
                { "Action", this.Action },
                { "Timestamp", this.Timestamp.ToString() }
            };
            foreach (PropertyInfo property in this.GetType().GetProperties().Where(t => !t.HasAttribute<IgnoreAttribute>()))
            {
                if (!dic.ContainsKey(property.Name))
                {
                    dic.Add(property.Name, property.GetValue(this).ToString());
                }
            }
            string signStr = dic.ToQueryString() + this.SecretKey;
            dic.Add("Sign", Encryption.toMD5(signStr));
            return dic.ToJson();
        }
    }
}
