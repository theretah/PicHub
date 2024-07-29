using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IPostRepository : IRepository<Post>
    {
        Task<IEnumerable<Post>> GetAllPostsDescendingAsync();
        Task<IEnumerable<Post>> GetAllByAuthorIdAsync(string authorId);
        void Update(Post post);
    }
}
