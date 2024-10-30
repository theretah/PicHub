using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IPrivateChatRepository : IRepository<PrivateChat>
    {
        void Update(PrivateChat privateChat);
    }
}
