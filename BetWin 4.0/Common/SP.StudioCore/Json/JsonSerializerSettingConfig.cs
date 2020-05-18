﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using SP.StudioCore.Model;
using SP.StudioCore.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.StudioCore.Json
{
    public static class JsonSerializerSettingConfig
    {
        private static JsonSerializerSettings setting;

        /// <summary>
        /// 获取全局的默认序列化格式配置
        /// </summary>
        /// <returns></returns>
        public static JsonSerializerSettings Setting
        {
            get
            {
                if (setting != null) return setting;
                setting = new JsonSerializerSettings
                {
                    //setting.DateFormatHandling = DateFormatHandling.MicrosoftDateFormat;
                    //setting.DateFormatString = "yyyy-MM-dd HH:mm:ss";
                    //setting.DateParseHandling = DateParseHandling.DateTime;

                    Converters = new JsonConverter[] {
                        new EnumConverter(),
                        new DateFormatConvert(),
                        new BoolConvert(),
                        new GuidConvert(),
                        new StringConvert(),
                        new JsonStringConvert()
                    },
                    NullValueHandling = NullValueHandling.Ignore
                };
                return setting;
            }
        }

    }

    /// <summary>
    /// 自定义的枚举输出（支持位枚举）
    /// </summary>
    public class EnumConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType.IsEnum;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            bool isFlags = value.GetType().HasAttribute<FlagsAttribute>();
            if (!isFlags)
            {
                writer.WriteValue(value.ToString());
            }
            else
            {
                Enum @enum = (Enum)value;
                List<string> list = new List<string>();
                foreach (Enum v in Enum.GetValues(value.GetType()))
                {
                    if (@enum.HasFlag(v)) list.Add(v.ToString());
                }
                writer.WriteRawValue($"[{ string.Join(",", list.Select(t => $"\"{t}\"")) }]");
            }
        }

        public override bool CanRead => false;
    }

    public class DateFormatConvert : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return typeof(DateTime).IsAssignableFrom(objectType);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            DateTime date = (DateTime)value;
            if (date.Year <= 1900)
            {
                writer.WriteNull();
            }
            else
            {
                writer.WriteValue(date.ToString("yyyy-MM-dd HH:mm:ss"));
            }
        }
        public override bool CanRead => false;
    }

    public class BoolConvert : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return typeof(bool).IsAssignableFrom(objectType);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if ((bool)value)
            {
                writer.WriteValue(1);
            }
            else
            {
                writer.WriteValue(0);
            }
        }

        public override bool CanRead => false;
    }

    public class GuidConvert : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return typeof(Guid).IsAssignableFrom(objectType);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            Guid obj = (Guid)value;
            if (obj == Guid.Empty)
            {
                writer.WriteValue(string.Empty);
            }
            else
            {
                writer.WriteValue(obj.ToString("N"));
            }
        }

        public override bool CanRead => false;
    }

    public class StringConvert : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(String);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            string obj = (string)value;
            if (obj == null)
            {
                writer.WriteValue(string.Empty);
            }
            else
            {
                writer.WriteValue(obj);
            }
        }

        public override bool CanRead => false;
    }

    /// <summary>
    /// JSON字符串原样输出
    /// </summary>
    public class JsonStringConvert : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(JsonString);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            JsonString obj = (JsonString)value;
            writer.WriteRawValue(obj.ToString());
        }

        public override bool CanRead => false;
    }
}
