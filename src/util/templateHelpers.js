function pad(num) {
    return ('0' + num).slice(-2);
}

export function formatDate(value) {
    if(!value) return '';
    var d = new Date(value);
    return d instanceof Date && isFinite(d) ? `${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}` : '';
}

export function formatTime(value) {
    if(!value) return '';
    var d = new Date(value);
    return d instanceof Date && isFinite(d) ? `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}` : '';
}
