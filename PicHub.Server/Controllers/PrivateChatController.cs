using System.Security.Claims;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.Entities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/private-chats")]
    public class PrivateChatController : ControllerBase
    {
        private readonly IUnitOfWork unit;

        public PrivateChatController(IUnitOfWork unit)
        {
            this.unit = unit;
        }

        [HttpGet]
        public async Task<IActionResult> GetPrivateChatsAsync()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var chats = await unit.PrivateChats.GetAllByPredicateAsync(c =>
                c.User1Id == loggedInUserId || c.User2Id == loggedInUserId
            );

            return chats == null ? NoContent() : Ok(chats);
        }

        [HttpGet("{user-id}")]
        public async Task<IActionResult> GetPrivateChatAsync(string userId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var chat = await unit.PrivateChats.GetByPredicateAsync(c =>
                (c.User1Id == loggedInUserId && c.User2Id == userId)
                || (c.User1Id == userId && c.User2Id == loggedInUserId)
            );

            return chat == null ? NotFound() : Ok(chat);
        }

        [HttpGet("{private-chat-id}/chat-lines")]
        public async Task<IActionResult> GetChatLinesAsync(string privateChatId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var chatLines = await unit.ChatLines.GetAllByPredicateAsync(cl =>
                cl.PrivateChatId == privateChatId
            );

            return chatLines == null ? NoContent() : Ok(chatLines);
        }

        [HttpPost("{private-chat-id}/chat-lines")]
        public async Task<IActionResult> SendChatLineAsync(
            string privateChatId,
            string content,
            int? replyingToId = null
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                await unit.ChatLines.AddAsync(
                    new ChatLine
                    {
                        SenderId = loggedInUserId,
                        PrivateChatId = privateChatId,
                        Content = content,
                        ReplyingToId = replyingToId,
                    }
                );
                await unit.CompleteAsync();
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest("Could not send message. " + ex.Message);
            }
        }

        [HttpPost("{reciever-id}")]
        public async Task<IActionResult> StartPrivateChatAsync(string recieverId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                var id = Guid.NewGuid().ToString();
                await unit.PrivateChats.AddAsync(
                    new PrivateChat
                    {
                        Id = id,
                        User1Id = loggedInUserId,
                        User2Id = recieverId,
                    }
                );
                await unit.CompleteAsync();

                return Ok(id);
            }
            catch (Exception ex)
            {
                return BadRequest("Could not start chat. " + ex.Message);
            }
        }

        [HttpDelete("{private-chat-id}")]
        public async Task<IActionResult> DeletePrivateChatAsync(string privateChatId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                await unit.PrivateChats.RemoveByIdAsync(privateChatId);
                await unit.CompleteAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest("Could not delete chat." + ex.Message);
            }
        }
    }
}
