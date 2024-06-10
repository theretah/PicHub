using CMSReactDotNet.Server.Data.IRepositories;
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

        public void Update(Like like)
        {
            context.Likes.Update(like);
        }
    }
}
