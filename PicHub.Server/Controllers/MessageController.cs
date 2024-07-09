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
        public IActionResult CreateChat(string recieverId)
        {
            var senderId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (senderId == null)
            {
                return Unauthorized();
            }

            try
            {
                unit.Chats.Add(new Chat
                {
                    RecieverId = recieverId,
                    SenderId = senderId
                });
                unit.Complete();
                return Ok(unit.Chats.Find(c =>
                (c.SenderId == senderId && c.RecieverId == recieverId) ||
                (c.SenderId == recieverId && c.RecieverId == senderId)).Single().Id);
            }
            catch (Exception)
            {
                return BadRequest("Could not start chat.");
            }
        }

        [HttpPost("send")]
        public IActionResult Send(int chatId, string content)
        {
            var senderId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (senderId == null)
            {
                return Unauthorized();
            }

            try
            {
                unit.Messages.Add(new Message
                {
                    AuthorId = senderId,
                    ChatId = chatId,
                    Content = content,
                    Date = DateTime.Now,
                });
                unit.Complete();
                return Created();
            }
            catch (Exception)
            {
                return BadRequest("Could not send message");
            }
        }

        [HttpDelete("unSend")]
        public IActionResult UnSend(int messageId)
        {
            try
            {
                unit.Messages.Remove(messageId);
                unit.Complete();

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Could not delete message.");
            }
        }

        [HttpDelete("deleteChat")]
        public IActionResult DeleteChat(int chatId)
        {
            try
            {
                unit.Chats.Remove(chatId);
                unit.Complete();

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
            return Ok(unit.Chats.Find(c =>
                (c.SenderId == senderId && c.RecieverId == recieverId) ||
                (c.SenderId == recieverId && c.RecieverId == senderId))
                .Any());
        }

        [HttpGet("getChat")]
        public IActionResult GetChat(string recieverId, string senderId)
        {
            return Ok(unit.Chats.Find(c =>
                (c.SenderId == senderId && c.RecieverId == recieverId) ||
                (c.SenderId == recieverId && c.RecieverId == senderId)).Single());
        }

        [HttpGet("getChats")]
        public IActionResult GetChats()
        {
            string? UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (UserId == null) { return Unauthorized(); }

            return Ok(unit.Chats.Find(c => c.SenderId == UserId || c.RecieverId == UserId).ToList());
        }

        [HttpGet("getMessages")]
        public IActionResult GetMessages(int chatId)
        {
            return Ok(unit.Messages.Find(m => m.ChatId == chatId).ToList());
        }
    }
}