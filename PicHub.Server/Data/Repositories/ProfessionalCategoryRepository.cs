using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class ProfessionalCategoryRepository
        : Repository<ProfessionalCategory>,
            IProfessionalCategoryRepository
    {
        private readonly PicHubContext context;

        public ProfessionalCategoryRepository(PicHubContext context)
            : base(context)
        {
            this.context = context;
        }

        public void Update(ProfessionalCategory accountCategory)
        {
            context.ProfessionalCategories.Update(accountCategory);
        }
    }
}
