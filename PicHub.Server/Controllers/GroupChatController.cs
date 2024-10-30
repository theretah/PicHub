using System.Security.Claims;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.Entities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/groupChat")]
    public class GroupChatController : ControllerBase
    {
        private readonly IUnitOfWork unit;

        public GroupChatController(IUnitOfWork unit)
        {
            this.unit = unit;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateGroupChatAsync(
            string title,
            bool isPrivate,
            bool isChannel
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var id = Guid.NewGuid().ToString();

            await unit.GroupChats.AddAsync(
                new GroupChat
                {
                    Id = id,
                    Title = title,
                    OwnerId = loggedInUserId,
                    IsPrivate = isPrivate,
                    IsChannel = isChannel,
                    IsDisabled = false,
                }
            );
            await unit.CompleteAsync();

            await unit.GroupChatUsers.AddAsync(
                new GroupChatUser { UserId = loggedInUserId, GroupChatId = id }
            );
            await unit.CompleteAsync();

            return Ok(id);
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendAsync(
            string groupChatId,
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
                        GroupChatId = groupChatId,
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

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(string groupChatId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var groupChatUsers = await unit.GroupChatUsers.GetAllByPredicateAsync(gcu =>
                gcu.GroupChatId == groupChatId
            );
            unit.GroupChatUsers.RemoveRange(groupChatUsers);
            await unit.GroupChats.RemoveByIdAsync(groupChatId);
            await unit.CompleteAsync();

            return NoContent();
        }

        [HttpDelete("unSend")]
        public async Task<IActionResult> UnSendAsync(int chatLineId)
        {
            string? loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
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

        [HttpPost("addMember")]
        public async Task<IActionResult> AddMemberAsync(string groupChatId, string userId)
        {
            string? loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            await unit.GroupChatUsers.AddAsync(
                new GroupChatUser { UserId = userId, GroupChatId = groupChatId }
            );
            await unit.CompleteAsync();

            return NoContent();
        }

        [HttpDelete("removeMember")]
        public async Task<IActionResult> RemoveMemberAsync(string groupChatId, string userId)
        {
            string? loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var groupChatUser = await unit.GroupChatUsers.GetByPredicateAsync(gcu =>
                gcu.GroupChatId == groupChatId && gcu.UserId == userId
            );
            unit.GroupChatUsers.Remove(groupChatUser);
            await unit.CompleteAsync();

            return NoContent();
        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinAsync(string groupChatId)
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

                return Ok();
            }

            return BadRequest("You are already a member.");
        }

        [HttpDelete("leave")]
        public async Task<IActionResult> LeaveAsync(string groupChatId)
        {
            string? loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
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
