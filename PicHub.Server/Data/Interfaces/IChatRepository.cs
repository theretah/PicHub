using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IChatRepository : IRepository<Chat>
    {
        void Update(Chat chat);
    }
}
