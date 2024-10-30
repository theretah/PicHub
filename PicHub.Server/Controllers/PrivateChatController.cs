using System.Security.Claims;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.Entities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrivateChatController : ControllerBase
    {
        private readonly IUnitOfWork unit;

        public PrivateChatController(IUnitOfWork unit)
        {
            this.unit = unit;
        }

        [HttpPost("start")]
        public async Task<IActionResult> StartAsync(string recieverId)
        {
            var starterId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (starterId == null)
            {
                return Unauthorized();
            }

            try
            {
                var id = Guid.NewGuid().ToString();
                await unit.PrivateChats.AddAsync(
                    new PrivateChat
                    {
                        Id = id,
                        User1Id = starterId,
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

        [HttpPost("send")]
        public async Task<IActionResult> SendAsync(
            string privateChatId,
            string content,
            string? replyingToId = null
        )
        {
            var senderId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (senderId == null)
                return Unauthorized();

            try
            {
                await unit.ChatLines.AddAsync(
                    new ChatLine
                    {
                        SenderId = senderId,
                        PrivateChatId = privateChatId,
                        Content = content,
                        ReplyingToId = replyingToId ?? null,
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

        [HttpDelete("unSend")]
        public async Task<IActionResult> UnSendAsync(int chatLineId)
        {
            try
            {
                await unit.ChatLines.RemoveByIdAsync(chatLineId);
                await unit.CompleteAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest("Could not delete message." + ex.Message);
            }
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAsync(string chatId)
        {
            try
            {
                await unit.PrivateChats.RemoveByIdAsync(chatId);
                await unit.CompleteAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest("Could not delete chat." + ex.Message);
            }
        }

        [HttpGet("exists")]
        public async Task<IActionResult> ExistsAsync(string user1Id, string user2Id)
        {
            return Ok(await GetAsync(user1Id, user2Id) != NotFound());
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAsync(string user1Id, string user2Id)
        {
            var chat = await unit.PrivateChats.GetByPredicateAsync(c =>
                (c.User1Id == user2Id && c.User2Id == user1Id)
                || (c.User1Id == user1Id && c.User2Id == user2Id)
            );

            if (chat == null)
                return NotFound();

            return Ok(chat);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetChatsAsync()
        {
            string? loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var chats = await unit.PrivateChats.GetAllByPredicateAsync(c =>
                c.User1Id == loggedInUserId || c.User2Id == loggedInUserId
            );
            if (chats == null)
                return NoContent();

            return Ok(chats);
        }

        [HttpGet("getChatLines")]
        public async Task<IActionResult> GetChatLinesAsync(string chatId)
        {
            var chatLines = await unit.ChatLines.GetAllByPredicateAsync(cl =>
                cl.PrivateChatId == chatId
            );
            if (chatLines == null)
                return NoContent();

            return Ok(chatLines);
        }
    }
}
