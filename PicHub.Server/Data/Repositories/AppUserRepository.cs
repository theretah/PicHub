using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly PicHubContext context;

        public AppUserRepository(PicHubContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<AppUser>> Search(string? searchQuery)
        {
            var users = await context.AppUsers.ToListAsync();
            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                try
                {
                    users = users
                        .Where(u =>
                            u.UserName.Contains(
                                searchQuery.Trim(),
                                StringComparison.OrdinalIgnoreCase
                            )
                        )
                        .ToList();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }

            return users.OrderBy(u => u.UserName).ToList();
        }
    }
}
