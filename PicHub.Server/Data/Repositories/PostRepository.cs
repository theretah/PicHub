using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class PostRepository : Repository<Post>, IPostRepository
    {
        private readonly PicHubContext context;

        public PostRepository(PicHubContext context)
            : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Post>> GetAllByAuthorIdAsync(string authorId)
        {
            return await context
                .Posts.Where(p => p.AuthorId == authorId)
                .OrderByDescending(p => p.CreateDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Post>> GetAllPostsDescendingAsync()
        {
            return await context.Posts.OrderByDescending(p => p.CreateDate).ToListAsync();
        }

        public void Update(Post post)
        {
            context.Posts.Update(post);
        }
    }
}
