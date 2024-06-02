namespace PicHub.Server.Utilities
{
    public static class StringUtilities
    {
        public static string Divide3DigitsByComma(int input)
        {
            return input.ToString("N0");
        }
    }
}
