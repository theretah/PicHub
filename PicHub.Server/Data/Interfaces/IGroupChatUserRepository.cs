using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IGroupChatUserRepository : IRepository<GroupChatUser>
    {
        void Update(GroupChatUser groupChatUser);
    }
}
