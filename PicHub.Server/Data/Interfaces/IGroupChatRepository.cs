using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IGroupChatRepository : IRepository<GroupChat>
    {
        void Update(GroupChat groupChat);
    }
}
