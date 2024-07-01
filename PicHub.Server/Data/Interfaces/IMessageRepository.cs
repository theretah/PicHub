using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IMessageRepository : IRepository<Message>
    {
        void Update(Message message);
    }
}
