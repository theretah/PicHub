using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class GroupChatRepository : Repository<GroupChat>, IGroupChatRepository
    {
        private readonly PicHubContext context;

        public GroupChatRepository(PicHubContext context)
            : base(context)
        {
            this.context = context;
        }

        public void Update(GroupChat groupChat)
        {
            context.GroupChats.Update(groupChat);
        }
    }
}
