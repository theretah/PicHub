using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PicHub.Server.Extensions;
using Xunit;

namespace PicHub.UnitTests
{
    public class SlugifyParameterTransformerTests
    {
        [Theory]
        [InlineData("TypicalControllerName", "typical-controller-name")]
        public void ShouldTransformMixedCaseString(object value, string expected)
        {
            var transformer = new SlugifyParameterTransformer();
            var result = transformer.TransformOutbound(value);

            Assert.Equal(expected, result);
        }
    }
}
