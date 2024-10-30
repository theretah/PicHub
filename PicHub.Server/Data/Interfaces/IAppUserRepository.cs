using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IAppUserRepository
    {
        Task<IEnumerable<AppUser>> Search(string? searchQuery);
    }
}
