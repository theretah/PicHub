using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IFollowRepository : IRepository<Follow>
    {
        void Update(Follow follow);
    }
}
