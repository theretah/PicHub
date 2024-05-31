using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PicHub.Server.ViewModels
{
    public class CreatePostViewModel
    {
        public byte[] ImageData { get; set; }
        public string Caption { get; set; }
        public bool CommentsAllowed { get; set; }
    }
}