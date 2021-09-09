function beforeToday(day) {
    return day.isBefore(new Date(), 'day');
}

function isToday(day) {
    return day.isSame(new Date(), 'day');
}

export default function dayStyles(day, value) {
    if(isToday(day)) return 'today'
    if(beforeToday(day)) return 'before'
    return ''
}
