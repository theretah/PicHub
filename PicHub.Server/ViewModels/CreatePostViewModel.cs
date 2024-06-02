using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PicHub.Server.ViewModels
{
    public class CreatePostViewModel
    {
        public string Caption { get; set; }
        public IFormFile ImageFile { get; set; }
        public bool TurnOffComments { get; set; }
    }
}