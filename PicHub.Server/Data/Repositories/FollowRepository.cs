using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class FollowRepository : Repository<Follow>, IFollowRepository
    {
        private readonly PicHubContext context;

        public FollowRepository(PicHubContext context) : base(context)
        {
            this.context = context;
        }

        public void Update(Follow follow)
        {
            context.Follows.Update(follow);
        }
    }
}
