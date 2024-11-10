using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class AccountCategoryRepository : Repository<AccountCategory>, IAccountCategoryRepository
    {
        private readonly PicHubContext context;

        public AccountCategoryRepository(PicHubContext context)
            : base(context)
        {
            this.context = context;
        }

        public void Update(AccountCategory accountCategory)
        {
            context.AccountCategories.Update(accountCategory);
        }
    }
}
