export const getRelativeTime = (
    date: Date,
    rtfOptions: Intl.RelativeTimeFormatOptions = {
        numeric: "auto",
        style: "long",
    },
) => {
    const rtf = new Intl.RelativeTimeFormat("en", rtfOptions);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return rtf.format(-seconds, "second");
    if (minutes < 60) return rtf.format(-minutes, "minute");
    if (hours < 24) return rtf.format(-hours, "hour");
    if (days < 7) return rtf.format(-days, "day");
    return "over a week ago";
};