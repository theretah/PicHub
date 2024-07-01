using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class MessageRepository : Repository<Message>, IMessageRepository
    {
        private readonly PicHubContext context;

        public MessageRepository(PicHubContext context) : base(context)
        {
            this.context = context;
        }



        public void Update(Message message)
        {
            context.Messages.Update(message);
        }
    }
}
