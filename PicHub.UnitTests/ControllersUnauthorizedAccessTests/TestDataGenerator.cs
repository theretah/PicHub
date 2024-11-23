using System.Text;
using Microsoft.AspNetCore.JsonPatch;
using Newtonsoft.Json;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;

namespace PicHub.UnitTests.ControllersUnauthorizedAccessTests
{
    public static class TestDataGenerator
    {
        public static IEnumerable<object[]> HttpPost_GroupChats_SendChatLineAsync_EndpointData =>
            new List<object[]>
            {
                new object[]
                {
                    "chat-lines/group-chats/1",
                    new StringContent(
                        System.Text.Json.JsonSerializer.Serialize(
                            new CreateChatLineDTO { Content = string.Empty, ReplyingToId = null }
                        ),
                        Encoding.UTF8,
                        "application/json"
                    ),
                },
            };

        public static IEnumerable<object[]> HttpPost_GroupChats_CreateGroupChatAsync_EndpointData =>
            new List<object[]>
            {
                new object[]
                {
                    "group-chats",
                    new StringContent(
                        System.Text.Json.JsonSerializer.Serialize(
                            new CreateGroupChatDTO
                            {
                                Title = string.Empty,
                                IsPrivate = false,
                                IsChannel = false,
                            }
                        ),
                        Encoding.UTF8,
                        "application/json"
                    ),
                },
            };

        public static IEnumerable<object[]> HttpPost_PrivateChats_SendChatLineAsync_EndpointData =>
            new List<object[]>
            {
                new object[]
                {
                    "chat-lines/private-chats/1",
                    new StringContent(
                        System.Text.Json.JsonSerializer.Serialize(
                            new CreateChatLineDTO { Content = string.Empty, ReplyingToId = null }
                        ),
                        Encoding.UTF8,
                        "application/json"
                    ),
                },
            };

        public static IEnumerable<object[]> HttpPost_Posts_CreateAsync_EndpointData =>
            new List<object[]>
            {
                new object[]
                {
                    "posts",
                    new StringContent(
                        System.Text.Json.JsonSerializer.Serialize(
                            new CreateEditPostDTO
                            {
                                Caption = string.Empty,
                                ImageFile = null,
                                CommentsAllowed = false,
                            }
                        ),
                        Encoding.UTF8,
                        "application/json"
                    ),
                },
            };

        public static IEnumerable<object[]> HttpPatch_ChatLines_EditChatLineAsync_EndpointData =>
            new List<object[]>
            {
                new object[]
                {
                    "chat-lines/1",
                    new StringContent(
                        System.Text.Json.JsonSerializer.Serialize(string.Empty),
                        Encoding.UTF8,
                        "application/json"
                    ),
                },
            };

        public static IEnumerable<object[]> HttpPatch_Users_EditProfileAsync_EndpointData =>
            new List<object[]>
            {
                new object[]
                {
                    "users",
                    new StringContent(
                        JsonConvert.SerializeObject(
                            new JsonPatchDocument<AppUser>().Replace(
                                dto => dto.UserName,
                                "newUserName"
                            )
                        ),
                        Encoding.UTF8,
                        "application/json"
                    ),
                },
            };
        public static IEnumerable<object[]> HttpPatch_Posts_UpdatePostAsync_EndpointData
        {
            get
            {
                return new List<object[]>
                {
                    new object[]
                    {
                        $"posts/1",
                        new StringContent(
                            JsonConvert.SerializeObject(
                                new JsonPatchDocument<Post>().Replace(
                                    dto => dto.Caption,
                                    "replaced caption"
                                )
                            ),
                            Encoding.UTF8,
                            "application/json"
                        ),
                    },
                };
            }
        }
    }
}
