using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Processing;

namespace Pichub.Server.Utilities
{
    public static class ImageUtilities
    {
        public static string GenerateImageDataUrl(byte[] bytes)
        {
            return string.Format("data:image/png;base64,{0}", Convert.ToBase64String(bytes));
        }

        public static FormFile CompressImage(IFormFile imageFile, int compressedDimension)
        {
            using var image = Image.Load(imageFile.OpenReadStream());
            image.Mutate(x => x.Resize(compressedDimension, compressedDimension));

            var memoryStream = new MemoryStream();
            image.Save(memoryStream, new PngEncoder());
            memoryStream.Position = 0;

            var formFile = new FormFile(memoryStream, 0, memoryStream.Length, "profileImage", imageFile.FileName)
            {
                Headers = new HeaderDictionary(),
                ContentType = imageFile.ContentType,
            };
            return formFile;
        }
    }
}
