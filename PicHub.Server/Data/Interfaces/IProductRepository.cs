using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IPostRepository : IRepository<Post>
    {
        void Update(Post post);
    }
}
