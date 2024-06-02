namespace Pichub.Server.Utilities
{
    public static class ImageUtilities
    {
        public static string GenerateImageDataUrl(byte[] bytes)
        {
            return string.Format("data:image/png;base64,{0}", Convert.ToBase64String(bytes));
        }
    }
}
