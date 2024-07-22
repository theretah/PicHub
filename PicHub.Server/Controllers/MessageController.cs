using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.Entities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IUnitOfWork unit;
        private readonly UserManager<AppUser> userManager;

        public MessageController(IUnitOfWork unit, UserManager<AppUser> userManager)
        {
            this.unit = unit;
            this.userManager = userManager;
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

                return Ok(unit.Chats.GetByPredicateAsync(c =>
                    (c.SenderId == senderId && c.RecieverId == recieverId) ||
                    (c.SenderId == recieverId && c.RecieverId == senderId)).Id);
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
                    Date = DateTime.Now,
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

                return Ok();
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

                return Ok();
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
            return Ok(await unit.Chats.GetByPredicateAsync(c =>
                (c.SenderId == senderId && c.RecieverId == recieverId) ||
                (c.SenderId == recieverId && c.RecieverId == senderId)));
        }

        [HttpGet("getChats")]
        public async Task<IActionResult> GetChats()
        {
            string? UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (UserId == null) { return Unauthorized(); }

            return Ok(unit.Chats.FindByPredicateAsync(c => c.SenderId == UserId || c.RecieverId == UserId));
        }

        [HttpGet("getMessages")]
        public async Task<IActionResult> GetMessages(int chatId)
        {
            return Ok(unit.Messages.FindByPredicateAsync(m => m.ChatId == chatId));
        }
    }
}