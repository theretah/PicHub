using System.Security.Claims;
using AutoMapper;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.DTOs;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/chat-lines")]
    public class ChatLineController : ControllerBase
    {
        private readonly IUnitOfWork unit;
        private readonly IMapper mapper;

        public ChatLineController(IUnitOfWork unit, IMapper mapper)
        {
            this.mapper = mapper;
            this.unit = unit;
        }

        [HttpGet("from-group-chat/{group-chat-id}")]
        public async Task<ActionResult<IEnumerable<ChatLineDTO>>> GetGroupChatLinesAsync(
            [FromRoute(Name = "group-chat-id")] string groupChatId
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var chatLines = await unit.ChatLines.GetAllByPredicateAsync(cl =>
                cl.GroupChatId == groupChatId
            );

            return chatLines.Any()
                ? Ok(mapper.Map<IEnumerable<ChatLineDTO>>(chatLines))
                : NotFound();
        }

        [HttpGet("from-private-chat/{private-chat-id}")]
        public async Task<ActionResult<IEnumerable<ChatLineDTO>>> GetPrivateChatLinesAsync(
            [FromRoute(Name = "private-chat-id")] string privateChatId
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var chatLines = await unit.ChatLines.GetAllByPredicateAsync(cl =>
                cl.PrivateChatId == privateChatId
            );

            return chatLines.Any()
                ? Ok(mapper.Map<IEnumerable<ChatLineDTO>>(chatLines))
                : NotFound();
        }

        [HttpPost("from-group-chat/{group-chat-id}/")]
        public async Task<ActionResult> SendGroupChatLineAsync(
            [FromRoute(Name = "group-chat-id")] string groupChatId,
            [FromBody] CreateChatLineDTO dto
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                await unit.ChatLines.SendGroupChatAsync(groupChatId, loggedInUserId, dto);
                await unit.CompleteAsync();
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest("Could not send message. " + ex.Message);
            }
        }

        [HttpPost("from-private-chat/{private-chat-id}/")]
        public async Task<ActionResult> SendPrivateChatLineAsync(
            [FromRoute(Name = "private-chat-id")] string privateChatId,
            [FromBody] CreateChatLineDTO dto
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                await unit.ChatLines.SendPrivateChatAsync(privateChatId, loggedInUserId, dto);
                await unit.CompleteAsync();
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest("Could not send message. " + ex.Message);
            }
        }

        [HttpPatch("{chat-line-id}")]
        public async Task<ActionResult> UpdateAsync(
            [FromRoute(Name = "chat-line-id")] int chatLineId,
            [FromBody] string newContent
        )
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
        public async Task<ActionResult> DeleteAsync(
            [FromRoute(Name = "chat-line-id")] int chatLineId
        )
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
