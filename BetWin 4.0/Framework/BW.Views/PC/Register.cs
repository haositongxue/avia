﻿using BW.Views.IViews;
using System;
using System.Collections.Generic;
using System.Text;

namespace BW.Views.PC
{
    public sealed class Register : IRegister
    {
        public Register()
        {
        }

        public Register(string jsonString) : base(jsonString)
        {
        }
    }
}
