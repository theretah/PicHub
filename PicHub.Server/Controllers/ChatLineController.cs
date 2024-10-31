using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.Entities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/chat-lines")]
    public class ChatLineController : ControllerBase
    {
        private readonly IUnitOfWork unit;

        public ChatLineController(IUnitOfWork unit)
        {
            this.unit = unit;
        }

        [HttpPut("{chat-line-id}")]
        public async Task<IActionResult> EditChatLineAsync(int chatLineId, string newContent)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                var chatLine = await unit.ChatLines.GetByIdAsync(chatLineId);
                if (chatLine.SenderId != loggedInUserId)
                    return Forbid();

                chatLine.Content = newContent;
                chatLine.LastUpdatedAt = DateTime.Now;

                unit.ChatLines.Update(chatLine);
                await unit.CompleteAsync();

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{chat-line-id}")]
        public async Task<IActionResult> UnSendChatLineAsync(int chatLineId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

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
    }
}
