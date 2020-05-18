﻿using SP.StudioCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.StudioCore.Utils
{
    /// <summary>
    /// 币种的汇率转换（汇率值需从外部传入）
    /// </summary>
    public static class CurrencyHelper
    {
        /// <summary>
        /// 汇率（以人民币为锚）
        /// </summary>
        private static Dictionary<Currency, decimal> Rate;

        /// <summary>
        /// 初始化汇率包
        /// </summary>
        /// <param name="rate"></param>
        public static void Init(Dictionary<Currency, decimal> rate)
        {
            Rate = rate;
        }

        /// <summary>
        /// 转换汇率
        /// </summary>
        /// <param name="value">金额</param>
        /// <param name="source">来源币种</param>
        /// <param name="target">转化币种</param>
        /// <param name="decimals">要保留的小数点</param>
        /// <returns></returns>
        public static decimal Exchange(this decimal value, Currency source, Currency target, int decimals = 2)
        {
            return Exchange(value, Rate, source, target, decimals);
        }

        /// <summary>
        /// 转换汇率（传入的汇率参数包）
        /// </summary>
        /// <param name="value"></param>
        /// <param name="rate"></param>
        /// <param name="source"></param>
        /// <param name="target"></param>
        /// <param name="decimals"></param>
        /// <returns></returns>
        public static decimal Exchange(this decimal value, Dictionary<Currency, decimal> rate, Currency source, Currency target, int decimals = 2)
        {
            if (value == 0M || source == target) return value;
            if (rate == null) throw new Exception("未设定汇率");
            if (!rate.ContainsKey(source)) throw new Exception($"不支持{source}");
            if (!rate.ContainsKey(target)) throw new Exception($"不支持{target}");

            value *= rate[source];
            value /= rate[target];
            if (decimals == 0) return value;
            return Math.Round(value, decimals);
        }
    }
}
