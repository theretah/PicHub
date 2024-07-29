using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface ISaveRepository : IRepository<Save>
    {
        Task<IEnumerable<Save>> GetSavesByUserId(string userId);
        void Update(Save save);
    }
}
