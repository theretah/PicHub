using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class PostRepository : Repository<Post>, IPostRepository
    {
        private readonly PicHubContext context;

        public PostRepository(PicHubContext context) : base(context)
        {
            this.context = context;
        }

        public void Update(Post post)
        {
            context.Posts.Update(post);
        }
    }
}
