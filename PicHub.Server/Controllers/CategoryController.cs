using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Mvc;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork unit;

        public CategoryController(IUnitOfWork unit)
        {
            this.unit = unit;
        }

        [HttpGet("account-categories")]
        public async Task<IActionResult> GetAccountCategories()
        {
            var accountCategories = await unit.AccountCategoryRepository.GetAllAsync();
            return accountCategories.Any() ? Ok(accountCategories) : NotFound();
        }

        [HttpGet("professional-categories")]
        public async Task<IActionResult> GetProfessionalCategories()
        {
            var professionalCategories = await unit.ProfessionalCategoryRepository.GetAllAsync();
            return professionalCategories.Any() ? Ok(professionalCategories) : NotFound();
        }
    }
}
