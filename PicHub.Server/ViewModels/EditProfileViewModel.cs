using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PicHub.Server.ViewModels
{
    public class EditProfileViewModel
    {
        public IFormFile ProfileImageFile { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Bio { get; set; }
        public int Gender { get; set; }
    }
}