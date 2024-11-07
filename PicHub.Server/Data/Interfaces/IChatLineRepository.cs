using PicHub.Server.DTOs;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IChatLineRepository : IRepository<ChatLine>
    {
        void Update(ChatLine message);
        Task SendPrivateChatAsync(string privateChatId, string senderId, CreateChatLineDTO dto);
        Task SendGroupChatAsync(string groupChatId, string senderId, CreateChatLineDTO dto);
    }
}
