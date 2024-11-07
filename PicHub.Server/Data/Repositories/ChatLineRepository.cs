using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class ChatLineRepository : Repository<ChatLine>, IChatLineRepository
    {
        private readonly PicHubContext context;

        public ChatLineRepository(PicHubContext context)
            : base(context)
        {
            this.context = context;
        }

        public async Task SendGroupChatAsync(
            string groupChatId,
            string senderId,
            CreateChatLineDTO dto
        )
        {
            await context.ChatLines.AddAsync(
                new ChatLine
                {
                    SenderId = senderId,
                    GroupChatId = groupChatId,
                    Content = dto.Content,
                    ReplyingToId = dto.ReplyingToId,
                }
            );
        }

        public async Task SendPrivateChatAsync(
            string privateChatId,
            string senderId,
            CreateChatLineDTO dto
        )
        {
            await context.ChatLines.AddAsync(
                new ChatLine
                {
                    SenderId = senderId,
                    PrivateChatId = privateChatId,
                    Content = dto.Content,
                    ReplyingToId = dto.ReplyingToId,
                }
            );
        }

        public void Update(ChatLine chatLine)
        {
            context.ChatLines.Update(chatLine);
        }
    }
}
