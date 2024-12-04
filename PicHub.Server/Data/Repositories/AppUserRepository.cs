using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class AppUserRepository : Repository<AppUser>, IAppUserRepository
    {
        private readonly PicHubContext context;

        public AppUserRepository(PicHubContext context)
            : base(context)
        {
            this.context = context;
        }

        public void Update(AppUser appUser)
        {
            context.AppUsers.Update(appUser);
        }
    }
}
