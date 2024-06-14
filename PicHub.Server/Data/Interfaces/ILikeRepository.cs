using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface ILikeRepository : IRepository<Like>
    {
        Task<IEnumerable<Like>> GetLikesByUserId(string userId);
        void Update(Like like);
    }
}
