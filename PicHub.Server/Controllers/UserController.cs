using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper.Configuration.Annotations;
using CMSReactDotNet.Server.Data.IRepositories;
using CMSReactDotNet.Server.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pichub.Server.Utilities;
using PicHub.Server.Entities;
using PicHub.Server.ViewModels;
using SixLabors.ImageSharp;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IUnitOfWork unit;

        public UserController(UserManager<AppUser> userManager, IUnitOfWork unit)
        {
            this.userManager = userManager;
            this.unit = unit;
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> Update(EditProfileViewModel model)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
            {
                return Unauthorized();
            }

            var user = await userManager.FindByIdAsync(loggedInUserId);
            if (user == null)
            {
                return Unauthorized();
            }
            if (model.ProfileImageFile != null)
            {
                var imageFile = ImageUtilities.CompressImage(model.ProfileImageFile, 150);
                user.ProfileImageUrl = FileUtilities.FileToByteArray(imageFile);
                // user.ProfileImageUrl = FileUtilities.FileToByteArray(model.ProfileImageFile);
            }
            else
            {
                user.ProfileImageUrl = null;
            }
            user.FullName = model.FullName;
            user.UserName = model.UserName;
            user.Gender = model.Gender;
            user.Bio = model.Bio;
            try
            {
                var result = await userManager.UpdateAsync(user);
                if (result.Succeeded)
                { return Ok(); }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            catch (Exception)
            {
                return BadRequest("Profile could not be updated.");
            }
        }

        [HttpGet("getPostsCount")]
        public async Task<IActionResult> GetPostsCount(string userName)
        {
            var user = await userManager.FindByNameAsync(userName);
            if (user == null) return NotFound();
            var posts = unit.Posts.Find(p => p.AuthorId == user.Id);
            return Ok(posts.Count());
        }

        [HttpGet("getFollowersCount")]
        public IActionResult GetFollowersCount(string userId)
        {
            var followers = unit.Follows.Find(f => f.FollowingId == userId);
            return Ok(followers.Count());
        }

        [HttpGet("getFollowingsCount")]
        public IActionResult GetFollowingsCount(string userId)
        {
            var followings = unit.Follows.Find(f => f.FollowerId == userId);
            return Ok(followings.Count());
        }

        [HttpGet("getIsFollowing")]
        public IActionResult GetIsFollowing(string followingId)
        {
            var followerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (followerId == null) return Unauthorized();

            var isFollowing = unit.Follows
                .Find(f => f.FollowerId == followerId && f.FollowingId == followingId).Any();

            return Ok(isFollowing);
        }

        [HttpPost("follow")]
        public IActionResult Follow(string followingId)
        {
            try
            {
                var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (loggedInUserId == null) return Unauthorized();

                unit.Follows.Add(new Follow
                {
                    FollowerId = loggedInUserId,
                    FollowingId = followingId
                });
                unit.Complete();

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("unFollow")]
        public IActionResult UnFollow(string followingId)
        {
            try
            {
                var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var follow = unit.Follows
                    .Find(f => f.FollowerId == loggedInUserId && f.FollowingId == followingId).Single();

                unit.Follows.Remove(follow);
                unit.Complete();

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string? query)
        {
            var users = await userManager.Users.ToListAsync();
            if (string.IsNullOrWhiteSpace(query) || users.Count == 0)
            {
                return Ok(new List<AppUser>());
            }
            return Ok(users.Where(u => u.UserName.ToLower().Contains(query.ToLower())));
        }
    }
}