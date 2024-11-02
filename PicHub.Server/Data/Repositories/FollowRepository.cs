using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class FollowRepository : Repository<Follow>, IFollowRepository
    {
        private readonly PicHubContext context;

        public FollowRepository(PicHubContext context)
            : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Follow>> GetFollowersAsync(string userId)
        {
            return await context.Follows.Where(f => f.FollowingId == userId).ToListAsync();
        }

        public async Task<IEnumerable<Follow>> GetFollowingsAsync(string userId)
        {
            return await context.Follows.Where(f => f.FollowerId == userId).ToListAsync();
        }

        public void Update(Follow follow)
        {
            context.Follows.Update(follow);
        }
    }
}
