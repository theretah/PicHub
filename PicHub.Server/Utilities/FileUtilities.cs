using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pichub.Server.Utilities
{
    public static class FileUtilities
    {
        public static byte[] FileToByteArray(IFormFile file)
        {
            MemoryStream ms = new MemoryStream();
            file.CopyTo(ms);
            return ms.ToArray();
        }
    }
}