﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Drawing;
using System.Drawing.Imaging;
using System.Web;
using Gma.QrCodeNet.Encoding;
using Gma.QrCodeNet.Encoding.Windows.Render;

namespace SP.StudioCore.Draw
{
    /// <summary>
    /// 二维码的处理
    /// </summary>
    public static class QRAgent
    {
        /// <summary>
        /// 创建一个二维码的图片流对象
        /// </summary>
        /// <param name="content"></param>
        /// <param name="pixel">二维码的像素</param>
        /// <returns></returns>
        public static byte[] Build(string content)
        {
            content = HttpUtility.UrlDecode(content);
            QrEncoder qrEncoder = new QrEncoder(ErrorCorrectionLevel.H);
            QrCode qrCode;
            qrEncoder.TryEncode(content, out qrCode);

            int moduleSize = 9;
            GraphicsRenderer renderer = new GraphicsRenderer(new FixedModuleSize(moduleSize, QuietZoneModules.Two), Brushes.Black, Brushes.White);
            MemoryStream ms = new MemoryStream();
            renderer.WriteToStream(qrCode.Matrix, ImageFormat.Png, ms);
            return ms.ToArray();
        }
    }
}

