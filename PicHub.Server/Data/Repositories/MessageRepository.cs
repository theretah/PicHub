using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class ChatLineRepository : Repository<ChatLine>, IChatLineRepository
    {
        private readonly PicHubContext context;

        public ChatLineRepository(PicHubContext context)
            : base(context)
        {
            this.context = context;
        }

        public void Update(ChatLine chatLine)
        {
            context.ChatLines.Update(chatLine);
        }
    }
}
