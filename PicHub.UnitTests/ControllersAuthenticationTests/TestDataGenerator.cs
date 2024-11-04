using System.Collections;
using System.Text;
using System.Text.Json;
using PicHub.Server.DTOs;

namespace PicHub.UnitTests.ControllersAuthenticationTests
{
    public static class TestDataGenerator
    {
        public static IEnumerable<object[]> HttpPost_GroupChats_SendChatLineAsync_EndpointData =>
            new List<object[]>
            {
                new object[]
                {
                    $"group-chats/1/chat-lines",
                    new StringContent(
                        JsonSerializer.Serialize(
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
                        JsonSerializer.Serialize(
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
                    $"private-chats/1/chat-lines",
                    new StringContent(
                        JsonSerializer.Serialize(
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
                        JsonSerializer.Serialize(
                            new CreatePostDto
                            {
                                Caption = string.Empty,
                                ImageFile = null,
                                TurnOffComments = false,
                            }
                        ),
                        Encoding.UTF8,
                        "application/json"
                    ),
                },
            };
    }
}
