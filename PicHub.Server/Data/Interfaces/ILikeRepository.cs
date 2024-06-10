using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface ILikeRepository : IRepository<Like>
    {
        void Update(Like like);
    }
}
