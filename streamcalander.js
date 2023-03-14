let moment = require('moment')

exports.nextStream = "3/16/23";
exports.calander = ["3/16/23", "3/22/23", "3/29/23", "3/30/23"]
exports.streamPast = (date) => {
    console.log(moment(new Date(date)).format("x"))
    if (moment(new Date(date)).format("x") > moment(new Date(this.nextStream)).format("x")) {
        return "PAST";
    } if (moment(new Date(date)).format("x") === moment(new Date(this.nextStream)).format("x")) {
        return "TODAY";
    } else {
        return "COMING";
    }
}
exports.getNext = (date) => {
    let stream = `${moment(this.nextStream).format("M/D/YYYY")}`;

    if (this.streamPast(date) === "PAST") {
        return `Next stream is ${this.calander[1]}!`
    } if (this.streamPast(date) === "TODAY") {
        return `Stream is Today!`
    } else {
        return `Next stream is ${this.nextStream}`
    }
}
