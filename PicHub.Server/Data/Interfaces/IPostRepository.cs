using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IPostRepository : IRepository<Post>
    {
        IAsyncEnumerable<Post> GetAllPostsDescendigAsync();
        IAsyncEnumerable<Post> GetAllByAuthorIdAsync(string authorId);
        void Update(Post post);
    }
}
