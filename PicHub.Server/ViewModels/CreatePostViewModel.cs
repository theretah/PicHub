using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PicHub.Server.ViewModels
{
    public class CreatePostViewModel
    {
        [MaxLength(250, ErrorMessage = "Caption must be 250 characters maximum.")]
        public string? Caption { get; set; }

        public IFormFile ImageFile { get; set; }

        public bool TurnOffComments { get; set; }
    }
}