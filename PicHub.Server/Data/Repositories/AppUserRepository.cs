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
        private readonly UserManager<AppUser> userManager;

        public AppUserRepository(PicHubContext context, UserManager<AppUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        public async Task<IEnumerable<AppUser>> Search(string? searchQuery)
        {
            var users = userManager.Users;
            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                users = users.Where(u =>
                    u.UserName.Contains(searchQuery.Trim(), StringComparison.OrdinalIgnoreCase)
                );
            }

            return users.OrderBy(u => u.UserName);
        }
    }
}
