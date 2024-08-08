namespace PicHub.Server.DTOs
{
    public class UserDto
    {
        public required string Id { get; set; }
        public required string UserName { get; set; }
        public required string FullName { get; set; }
        public required string Email { get; set; }
        public byte[]? ProfileImageUrl { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int Gender { get; set; }
        public string? Bio { get; set; }
    }
}