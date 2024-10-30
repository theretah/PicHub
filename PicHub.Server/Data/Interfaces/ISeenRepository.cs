using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface ISeenRepository : IRepository<Seen>
    {
        void Update(Seen seen);
    }
}
