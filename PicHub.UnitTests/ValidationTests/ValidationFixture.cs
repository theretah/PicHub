namespace PicHub.UnitTests.ValidationTests
{
    public static class ValidationFixture
    {
        public static string UserName_LengthError =
            "Username is too long or too short. Must not be more than 20 or less than 8 characters.";
        public static string UserName_ContainsIllegalCharacterError =
            "Lowercase characters(a-z), digits(0-9), dot(.), and underscore(_) are the only characters allowed.";
        public static string UserName_IllegalOrderOfCharactersError =
            "Username cannot start with digits, dot or underscore. Also cannot end with dot or underscore.";

        public static string Password_LengthError = "Password must be at least 8 characters.";
        public static string Password_ContainsIllegalCharacterError =
            "Password can only contain characters (uppercase letters(A-Z), lowercase letters(a-z), special signs(!@#$%^&*), digits(0-9))";
        public static string Password_IllegalOrderOfCharactersError =
            "Password cannot start with digits or special characters.";
        public static string Password_LacksUppercaseError =
            "Password must contain at least 1 uppercase(A-Z) character.";
        public static string Password_LacksLowercaseError =
            "Password must contain at least 1 lowercase(a-z) character.";
        public static string Password_LacksDigitError =
            "Password must contain at least 1 digit(0-9).";
        public static string Password_LacksSpecialCharacterError =
            "Password must contain at least 1 special character(!@#$%^&*).";
    }
}
