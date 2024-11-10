using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IAccountCategoryRepository : IRepository<AccountCategory>
    {
        void Update(AccountCategory accountCategory);
    }
}
