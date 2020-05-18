﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace SP.StudioCore.Gateway.Push
{
    public enum PushType : byte
    {
        [Description("未选择")]
        None,
        /// <summary>
        /// Pusher.com 推送接口
        /// </summary>
        [Description("Pusher")]
        PushMan,
        /// <summary>
        /// goeasy.io 推送接口
        /// </summary>
        [Description("GoEasy")]
        GoEasy
    }
}
