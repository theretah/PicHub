using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.EntityFrameworkCore;
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

        public IAsyncEnumerable<Post> GetAllByAuthorIdAsync(string authorId)
        {
            return context.Posts.Where(p => p.AuthorId == authorId).OrderByDescending(p => p.CreateDate).AsAsyncEnumerable();
        }



        public IAsyncEnumerable<Post> GetAllPostsDescendigAsync()
        {
            return context.Posts.OrderByDescending(p => p.CreateDate).AsAsyncEnumerable();
        }

        public void Update(Post post)
        {
            context.Posts.Update(post);
        }
    }
}
