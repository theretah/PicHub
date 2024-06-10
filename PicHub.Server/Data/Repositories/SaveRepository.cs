using CMSReactDotNet.Server.Data.IRepositories;
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
    }
}
