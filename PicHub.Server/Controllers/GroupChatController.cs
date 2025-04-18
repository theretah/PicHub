using System.Security.Claims;
using CMSReactDotNet.Server.Data.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/group-chats")]
    public class GroupChatController : ControllerBase
    {
        private readonly IUnitOfWork unit;

        public GroupChatController(IUnitOfWork unit)
        {
            this.unit = unit;
        }

        [HttpGet("{group-chat-id}")]
        public async Task<IActionResult> GetAsync(
            [FromRoute(Name = "group-chat-id")] string groupChatId
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var groupChat = await unit.GroupChats.GetByIdAsync(groupChatId);
            return groupChat == null ? NotFound() : Ok(groupChat);
        }

        [HttpGet]
        public async Task<IActionResult> GetGroupChatsAsync()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var groupChatUsers = await unit.GroupChatUsers.GetAllByPredicateAsync(gcu =>
                gcu.UserId == loggedInUserId
            );

            var groupChats = new List<GroupChat>();
            foreach (var groupChatUserId in groupChatUsers.Select(gcu => gcu.GroupChatId))
            {
                groupChats.Add(await unit.GroupChats.GetByIdAsync(groupChatUserId));
            }
            return Ok(groupChats);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CreateGroupChatDTO dto)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var id = Guid.NewGuid().ToString();

            await unit.GroupChats.AddAsync(
                new GroupChat
                {
                    Id = id,
                    Title = dto.Title,
                    OwnerId = loggedInUserId,
                    IsPrivate = dto.IsPrivate,
                    IsChannel = dto.IsChannel,
                    IsDisabled = false,
                }
            );
            await unit.CompleteAsync();

            await unit.GroupChatUsers.AddAsync(
                new GroupChatUser { UserId = loggedInUserId, GroupChatId = id }
            );
            await unit.CompleteAsync();

            return Created();
        }

        [HttpPost("{group-chat-id}/members")]
        public async Task<IActionResult> JoinAsync(
            [FromRoute(Name = "group-chat-id")] string groupChatId
        )
        {
            string? loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var groupChatUser = await unit.GroupChatUsers.GetByPredicateAsync(gcu =>
                gcu.GroupChatId == groupChatId && gcu.UserId == loggedInUserId
            );
            if (groupChatUser == null)
            {
                await unit.GroupChatUsers.AddAsync(
                    new GroupChatUser { UserId = loggedInUserId, GroupChatId = groupChatId }
                );
                await unit.CompleteAsync();

                return Created();
            }

            return BadRequest("You are already a member.");
        }

        [HttpPost("{group-chat-id}/members/{user-id}")]
        public async Task<IActionResult> AddMemberAsync(
            [FromRoute(Name = "group-chat-id")] string groupChatId,
            [FromRoute(Name = "user-id")] string userId
        )
        {
            string? loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var groupChatUser = await unit.GroupChatUsers.GetByPredicateAsync(gcu =>
                gcu.GroupChatId == groupChatId && gcu.UserId == userId
            );
            if (groupChatUser == null)
            {
                await unit.GroupChatUsers.AddAsync(
                    new GroupChatUser { UserId = userId, GroupChatId = groupChatId }
                );
                await unit.CompleteAsync();

                return Created();
            }

            return BadRequest("Already a member!");
        }

        [HttpDelete("{group-chat-id}")]
        public async Task<IActionResult> DeleteAsync(
            [FromRoute(Name = "group-chat-id")] string groupChatId
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var groupChatUsers = await unit.GroupChatUsers.GetAllByPredicateAsync(gcu =>
                gcu.GroupChatId == groupChatId
            );
            unit.GroupChatUsers.RemoveRange(groupChatUsers);

            var chatLines = await unit.ChatLines.GetAllByPredicateAsync(cl =>
                cl.GroupChatId == groupChatId
            );
            unit.ChatLines.RemoveRange(chatLines);

            await unit.GroupChats.RemoveByIdAsync(groupChatId);
            await unit.CompleteAsync();

            return NoContent();
        }

        [HttpDelete("{group-chat-id}/members/{user-id}")]
        public async Task<IActionResult> RemoveMemberAsync(
            [FromRoute(Name = "group-chat-id")] string groupChatId,
            [FromRoute(Name = "user-id")] string userId
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var groupChatUser = await unit.GroupChatUsers.GetByPredicateAsync(gcu =>
                gcu.GroupChatId == groupChatId && gcu.UserId == userId
            );
            unit.GroupChatUsers.Remove(groupChatUser);
            await unit.CompleteAsync();

            return NoContent();
        }

        [HttpDelete("{group-chat-id}/members")]
        public async Task<IActionResult> LeaveAsync(
            [FromRoute(Name = "group-chat-id")] string groupChatId
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var groupChatUser = await unit.GroupChatUsers.GetByPredicateAsync(gcu =>
                gcu.GroupChatId == groupChatId && gcu.UserId == loggedInUserId
            );
            unit.GroupChatUsers.Remove(groupChatUser);
            await unit.CompleteAsync();

            return NoContent();
        }
    }
}
