using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class GroupChatUserRepository : Repository<GroupChatUser>, IGroupChatUserRepository
    {
        private readonly PicHubContext context;

        public GroupChatUserRepository(PicHubContext context)
            : base(context)
        {
            this.context = context;
        }

        public void Update(GroupChatUser groupChatUser)
        {
            context.GroupChatUsers.Update(groupChatUser);
        }
    }
}
