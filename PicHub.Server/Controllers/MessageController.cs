using System.Security.Claims;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.Entities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/message")]
    public class MessageController : ControllerBase
    {
        private readonly IUnitOfWork unit;

        public MessageController(IUnitOfWork unit)
        {
            this.unit = unit;
        }

        [HttpPost("createChat")]
        public async Task<IActionResult> CreateChat(string recieverId)
        {
            var senderId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (senderId == null)
            {
                return Unauthorized();
            }

            try
            {
                await unit.Chats.AddAsync(new Chat
                {
                    RecieverId = recieverId,
                    SenderId = senderId
                });
                await unit.CompleteAsync();

                var chat = await unit.Chats.GetByPredicateAsync(c =>
                    (c.SenderId == senderId && c.RecieverId == recieverId) ||
                    (c.SenderId == recieverId && c.RecieverId == senderId));

                return Ok(chat.Id);
            }
            catch (Exception)
            {
                return BadRequest("Could not start chat.");
            }
        }

        [HttpPost("send")]
        public async Task<IActionResult> Send(int chatId, string content)
        {
            var senderId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (senderId == null)
            {
                return Unauthorized();
            }

            try
            {
                await unit.Messages.AddAsync(new Message
                {
                    AuthorId = senderId,
                    ChatId = chatId,
                    Content = content,
                    DateTime = DateTime.Now,
                });
                await unit.CompleteAsync();
                return Created();
            }
            catch (Exception)
            {
                return BadRequest("Could not send message");
            }
        }

        [HttpDelete("unSend")]
        public async Task<IActionResult> UnSend(int messageId)
        {
            try
            {
                await unit.Messages.RemoveByIdAsync(messageId);
                await unit.CompleteAsync();

                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest("Could not delete message.");
            }
        }

        [HttpDelete("deleteChat")]
        public async Task<IActionResult> DeleteChat(int chatId)
        {
            try
            {
                await unit.Chats.RemoveByIdAsync(chatId);
                await unit.CompleteAsync();

                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest("Could not delete chat.");
            }
        }

        [HttpGet("chatExists")]
        public IActionResult ChatExists(string recieverId, string senderId)
        {
            return Ok(unit.Chats.ExistsByPredicateAsync(c =>
                (c.SenderId == senderId && c.RecieverId == recieverId) ||
                (c.SenderId == recieverId && c.RecieverId == senderId)));
        }

        [HttpGet("getChat")]
        public async Task<IActionResult> GetChat(string recieverId, string senderId)
        {
            var chat = await unit.Chats.GetByPredicateAsync(c =>
                (c.SenderId == senderId && c.RecieverId == recieverId) ||
                (c.SenderId == recieverId && c.RecieverId == senderId));

            if (chat == null)
                return NotFound();

            return Ok(chat);
        }

        [HttpGet("getChats")]
        public async Task<IActionResult> GetChats()
        {
            string? UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (UserId == null)
                return Unauthorized();

            var chats = await unit.Chats.GetAllByPredicateAsync(c => c.SenderId == UserId || c.RecieverId == UserId);
            if (chats == null)
                return NotFound();

            return Ok(chats);
        }

        [HttpGet("getMessages")]
        public async Task<IActionResult> GetMessages(int chatId)
        {
            var messages = await unit.Messages.GetAllByPredicateAsync(m => m.ChatId == chatId);
            if (messages == null)
                return NotFound();

            return Ok(messages);
        }
    }
}