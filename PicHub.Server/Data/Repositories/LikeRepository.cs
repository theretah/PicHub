using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class LikeRepository : Repository<Like>, ILikeRepository
    {
        private readonly PicHubContext context;

        public LikeRepository(PicHubContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Like>> GetLikesByUserId(string userId)
        {
            return await context.Likes.Where(l => l.UserId == userId).ToListAsync(); ;
        }

        public void Update(Like like)
        {
            context.Likes.Update(like);
        }
    }
}
