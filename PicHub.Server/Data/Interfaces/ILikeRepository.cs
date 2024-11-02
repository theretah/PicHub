using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface ILikeRepository : IRepository<Like>
    {
        Task<IEnumerable<Like>> GetLikesByUserId(string userId);
        Task<int> CountLikesByPostId(int postId);
        void Update(Like like);
    }
}
