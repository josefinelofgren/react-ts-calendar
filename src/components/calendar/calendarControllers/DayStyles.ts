function beforeToday(day:any) {
    return day.isBefore(new Date(), 'day');
}

function isToday(day:any) {
    return day.isSame(new Date(), 'day');
}

export default function dayStyles(day:any, value:any) {
    if(isToday(day)) return 'today'
    if(beforeToday(day)) return 'before'
    return ''
}
