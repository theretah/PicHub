using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Entities;
using PicHub.Server.Metadata;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly UserManager<AppUser> userManager;

        public AppUserRepository(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<(IEnumerable<AppUser>, PaginationMetadata)> Search(string? searchQuery, int pageNumber, int pageSize)
        {
            var usersCollection = userManager.Users;
            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                searchQuery = searchQuery.Trim();
                usersCollection = usersCollection.Where(u => u.UserName.Contains(searchQuery.ToLower()));
            }

            var totalItemCount = await usersCollection.CountAsync();
            var paginationMetaData = new PaginationMetadata(totalItemCount, pageSize, pageNumber);
            var collectionToReturn = await usersCollection
            .OrderBy(u => u.UserName)
            .Skip(pageSize * (pageNumber - 1))
            .Take(pageSize)
            .ToListAsync();

            return (collectionToReturn, paginationMetaData);
        }
    }
}
