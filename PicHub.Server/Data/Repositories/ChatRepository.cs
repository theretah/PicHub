using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class ChatRepository : Repository<Chat>, IChatRepository
    {
        private readonly PicHubContext context;

        public ChatRepository(PicHubContext context) : base(context)
        {
            this.context = context;
        }

        public void Update(Chat chat)
        {
            context.Chats.Update(chat);
        }
    }
}
