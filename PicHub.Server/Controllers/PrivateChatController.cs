using System.Security.Claims;
using AutoMapper;
using CMSReactDotNet.Server.Data.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.Entities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/private-chats")]
    public class PrivateChatController : ControllerBase
    {
        private readonly IUnitOfWork unit;
        private readonly IMapper mapper;

        public PrivateChatController(IUnitOfWork unit, IMapper mapper)
        {
            this.mapper = mapper;
            this.unit = unit;
        }

        [HttpGet("{user-id}")]
        public async Task<ActionResult<PrivateChatDTO>> GetAsync(
            [FromRoute(Name = "user-id")] string userId
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var privateChat = await unit.PrivateChats.GetByPredicateAsync(c =>
                (c.User1Id == loggedInUserId && c.User2Id == userId)
                || (c.User1Id == userId && c.User2Id == loggedInUserId)
            );

            return privateChat == null ? NotFound() : Ok(mapper.Map<PrivateChatDTO>(privateChat));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PrivateChatDTO>>> GetPrivateChatsAsync()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var chats = await unit.PrivateChats.GetAllByPredicateAsync(c =>
                c.User1Id == loggedInUserId || c.User2Id == loggedInUserId
            );

            return Ok(mapper.Map<IEnumerable<PrivateChatDTO>>(chats));
        }

        [HttpPost("{reciever-id}")]
        public async Task<ActionResult<string>> CreateAsync(
            [FromRoute(Name = "reciever-id")] string recieverId
        )
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
        public async Task<ActionResult> DeleteAsync(
            [FromRoute(Name = "private-chat-id")] string privateChatId
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                var chatLines = await unit.ChatLines.GetAllByPredicateAsync(cl =>
                    cl.PrivateChatId == privateChatId
                );
                unit.ChatLines.RemoveRange(chatLines);
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
