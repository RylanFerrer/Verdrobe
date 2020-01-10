export function time() {
    const date = new Date();
    const hour = date.getHours()
    if(hour >= 6 && hour <= 11 )
    {
        return "Good Morning"
    } else if (hour >= 12 && hour <= 16) {
        return "Good Afternoon"
    } else if (hour >= 17 && hour <= 19) {
        return "Good Evening"
    }
    return "Good Night"
}