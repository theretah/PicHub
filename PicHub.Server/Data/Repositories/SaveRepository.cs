using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class SaveRepository : Repository<Save>, ISaveRepository
    {
        private readonly PicHubContext context;

        public SaveRepository(PicHubContext context) : base(context)
        {
            this.context = context;
        }

        public void Update(Save save)
        {
            context.Saves.Update(save);
        }


        public async IAsyncEnumerable<Save> GetSavesByUserId(string userId)
        {
            await foreach (var saved in context.Saves.Where(s => s.UserId == userId).AsAsyncEnumerable())
            {
                yield return saved;
            }
        }
    }
}
