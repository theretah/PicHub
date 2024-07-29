using PicHub.Server.Entities;
using PicHub.Server.Metadata;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IAppUserRepository
    {
        Task<(IEnumerable<AppUser>, PaginationMetadata)> Search(string searchQuery, int pageNumber, int pageSize);
    }
}
