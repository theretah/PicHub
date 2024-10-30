using System.Text.RegularExpressions;
using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class PrivateChatRepository : Repository<PrivateChat>, IPrivateChatRepository
    {
        private readonly PicHubContext context;

        public PrivateChatRepository(PicHubContext context)
            : base(context)
        {
            this.context = context;
        }

        public void Update(PrivateChat privateChat)
        {
            context.PrivateChats.Update(privateChat);
        }
    }

    public class BlockRepository : Repository<Block>, IBlockRepository
    {
        private readonly PicHubContext context;

        public BlockRepository(PicHubContext context)
            : base(context)
        {
            this.context = context;
        }

        public void Update(Block block)
        {
            context.Blocks.Update(block);
        }
    }

    public class SeenRepository : Repository<Seen>, ISeenRepository
    {
        private readonly PicHubContext context;

        public SeenRepository(PicHubContext context)
            : base(context)
        {
            this.context = context;
        }

        public void Update(Seen seen)
        {
            context.Seens.Update(seen);
        }
    }
}
