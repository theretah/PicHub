using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IFollowRepository : IRepository<Follow>
    {
        Task<IEnumerable<Follow>> GetFollowersAsync(string userId);
        Task<IEnumerable<Follow>> GetFollowingsAsync(string userId);
        void Update(Follow follow);
    }
}
