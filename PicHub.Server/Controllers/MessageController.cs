using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Mvc;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IUnitOfWork unit;

        public MessageController(IUnitOfWork unit)
        {
            this.unit = unit;
        }
    }
}