using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using PicHub.Server.Utilities;
using Xunit;

namespace PicHub.Tests
{
    public class JWTTokenGeneratorTests
    {

        [Fact]
        public void GenerateJwtToken_SecretIsNull_ThrowApplicationException()
        {
            Assert.Throws<NullReferenceException>(() => JwtTokenGenerator.GenerateJwtToken(null, "abcd"));
        }
    }
}