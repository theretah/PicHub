using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.Configuration.Annotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Data;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoryController : ControllerBase
    {
        private readonly PicHubContext context;

        public CategoryController(PicHubContext context)
        {
            this.context = context;
        }

        [HttpGet("account")]
        public async Task<IActionResult> GetAccountCategories()
        {
            var accountCategories = await context.AccountCategories.ToListAsync();
            if (accountCategories.Any())
                return Ok(accountCategories);
            return NotFound();
        }

        [HttpGet("professional")]
        public async Task<IActionResult> GetProfessionalCategories()
        {
            var professionalCategories = await context.ProfessionalCategories.ToListAsync();
            if (professionalCategories.Any())
                return Ok(professionalCategories);
            return NotFound();
        }
    }
}
