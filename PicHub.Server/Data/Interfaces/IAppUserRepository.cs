using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IAppUserRepository : IRepository<AppUser>
    {
        void Update(AppUser appUser);
    }
}
