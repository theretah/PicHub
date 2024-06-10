using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface ISaveRepository : IRepository<Save>
    {
        void Update(Save save);
    }
}
