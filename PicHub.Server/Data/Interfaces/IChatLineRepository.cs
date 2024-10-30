using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IChatLineRepository : IRepository<ChatLine>
    {
        void Update(ChatLine message);
    }
}
