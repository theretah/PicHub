namespace PicHub.Server.DTOs
{
    public class UserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public byte[]? ProfileImageUrl { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string? Bio { get; set; }
        public int GenderId { get; set; }
        public int? ProfessionalCategoryId { get; set; }
        public int AccountCategoryId { get; set; }
    }
}
