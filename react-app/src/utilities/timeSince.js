const timeSince = date => {
    const parsedDate = new Date(date)

    const seconds = Math.floor((new Date() - parsedDate) / 1000);

    let interval = seconds / 31536000;
    if (interval >= 2) return Math.floor(interval) + " years ago";
    if (interval >= 1) return Math.floor(interval) + " year ago";

    interval = seconds / 2592000;
    if (interval >= 2) return Math.floor(interval) + " months ago";
    if (interval >= 1) return Math.floor(interval) + " month ago";


    interval = seconds / 86400;
    if (interval >= 2) return Math.floor(interval) + " days ago";
    if (interval >= 1) return Math.floor(interval) + " day ago";


    interval = seconds / 3600;
    if (interval >= 2) return Math.floor(interval) + " hours ago";
    if (interval >= 1) return Math.floor(interval) + " hour ago";


    interval = seconds / 60;
    if (interval >= 2) return Math.floor(interval) + " minutes ago";
    if (interval >= 1) return Math.floor(interval) + " minute ago";

    return "Just now";
}

export default timeSince
