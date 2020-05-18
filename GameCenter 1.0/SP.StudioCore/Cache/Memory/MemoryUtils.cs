﻿using Microsoft.Extensions.Caching.Memory;
using SP.StudioCore.Utils;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SP.StudioCore.Cache.Memory
{
    /// <summary>
    /// 本机缓存的扩展方法
    /// </summary>
    public static class MemoryUtils
    {
        private static MemoryCache _cache = new MemoryCache(new MemoryCacheOptions());

        /// <summary>
        /// 获取缓存值（如果不存在则创建）
        /// </summary>
        /// <typeparam name="TValue"></typeparam>
        /// <param name="key"></param>
        /// <param name="timeSpan">过期时间</param>
        /// <param name="createValue">返回为null的话，不创建缓存</param>
        /// <returns></returns>
        public static TValue Get<TValue>(string key, TimeSpan timeSpan, Func<TValue> createValue)
        {
            return Get(key, timeSpan, createValue, t => false);
        }

        /// <summary>
        /// 获取缓存值（如果不存在则创建）
        /// </summary>
        /// <typeparam name="TValue"></typeparam>
        /// <param name="key"></param>
        /// <param name="timeSpan"></param>
        /// <param name="createValue"></param>
        /// <param name="noCreate">不创建的条件</param>
        /// <returns></returns>
        public static TValue Get<TValue>(string key, TimeSpan timeSpan, Func<TValue> createValue, Func<TValue, bool> noCreate)
        {
            if (_cache.TryGetValue(key, out TValue result))
            {
                return result;
            }
            lock (LockHelper.GetLoker(key))
            {
                if (_cache.TryGetValue(key, out result)) return result;
                result = createValue();
                if (noCreate(result)) _cache.Set(key, result, timeSpan);
                return result;
            }
        }

        /// <summary>
        /// 设定缓存
        /// </summary>
        /// <typeparam name="TValue"></typeparam>
        /// <param name="key"></param>
        /// <param name="timeSpan"></param>
        /// <param name="value"></param>
        public static void Set<TValue>(string key, TValue value, TimeSpan timeSpan)
        {
            _cache.Set(key, value, timeSpan);
        }

        /// <summary>
        /// 获取缓存（如果存在则返回null）
        /// </summary>
        /// <typeparam name="TValue"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public static TValue Get<TValue>(string key)
        {
            if (!_cache.TryGetValue(key, out TValue value)) return default;
            return value;
        }

        /// <summary>
        /// 删除缓存Key
        /// </summary>
        /// <param name="key"></param>
        public static void Remove(string key)
        {
            _cache.Remove(key);
        }
    }
}
