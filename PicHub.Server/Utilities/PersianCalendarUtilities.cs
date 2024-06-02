using System.Globalization;

namespace PicHub.Server.Utilities
{
    public static class PersianCalendarUtilities
    {
        public static string YearMonthDay(DateTime date)
        {
            var pc = new PersianCalendar();
            return pc.GetYear(date) + "/" + pc.GetMonth(date) + "/" + pc.GetDayOfMonth(date);
        }
    }
}
