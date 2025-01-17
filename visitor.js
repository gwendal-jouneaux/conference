"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
const Parser = require("./parser2");
function evaluate(input) {
    const p = new Parser.Parser(input);
    const tree = p.parse();
    if (tree.errs.length == 0 && tree.ast)
        return calcRoot(tree.ast, {
            rooms: [],
            papers: [],
            events: [],
            scheduleByDay: new Map()
        });
    console.log('' + tree.errs);
    return null;
}
exports.evaluate = evaluate;
function calcRoot(node, context) {
    calcRooms(node.rooms, context);
    calcPapers(node.papers, context);
    calcEvents(node.events, context);
    calcProgram(node.program, context);
    let out = [];
    let fullSchedule = context.scheduleByDay;
    for (const [day, schedule] of fullSchedule) {
        let entry = {};
        entry["name"] = day.toDateString();
        entry["rooms"] = schedule.getRooms();
        entry["sessionGroups"] = [];
        let times = schedule.getTimes();
        let roomsSchedule = [];
        for (const room of entry["rooms"]) {
            roomsSchedule.push(schedule.getTimeSlots(room));
        }
        for (let t = 0; t < times.length - 1; t++) {
            let line = [];
            // add time on left
            let startTime = times[t].toISOString().split("T")[1].substring(0, 5);
            line.push({ start: startTime, rowSpan: 1 });
            // for each room add the appropriate event or nothing if rowspan
            for (let roomID = 0; roomID < roomsSchedule.length; roomID++) {
                const roomSchedule = roomsSchedule[roomID];
                let slot = roomSchedule[t];
                if (slot && slot.getEvent()) {
                    let event = slot.getEvent();
                    let theEvent = {
                        title: event.name,
                        description: event.abstract,
                    };
                    if (event.type)
                        theEvent["type"] = event.type;
                    if (event.organizers)
                        theEvent["organizers"] = event.organizers;
                    if (event.papers)
                        theEvent["papers"] = event.papers;
                    line.push({
                        start: startTime,
                        end: slot.getEnd().toISOString().split("T")[1].substring(0, 5),
                        rowSpan: slot.getRowspan(),
                        date: day.toISOString().split("T")[0],
                        room: entry["rooms"][roomID],
                        events: [theEvent]
                    });
                }
                else if (slot) {
                    line.push({
                        rowSpan: 1
                    });
                }
            }
            entry["sessionGroups"].push(line);
        }
        let line = [];
        line.push({
            end: times[times.length - 1].toISOString().split("T")[1].substring(0, 5),
            rowSpan: 1
        });
        for (const room of entry["rooms"]) {
            line.push({ rowSpan: 1 });
        }
        entry["sessionGroups"].push(line);
        out.push(entry);
    }
    //console.log(context);
    return out;
}
function calcRooms(node, context) {
    for (let room of node.rooms) {
        const theRoom = calcRoom(room, context);
        context.rooms.push(theRoom);
    }
    return null;
}
function calcRoom(node, context) {
    return { name: node.name, capacity: node.capacite ? parseInt(node.capacite.value) : null };
}
function calcPapers(node, context) {
    for (let paper of node.papers) {
        const thePaper = calcPaper(paper, context);
        context.papers.push(thePaper);
    }
    return null;
}
function calcPaper(node, context) {
    const thePaper = {
        authors: [],
        title: node.paperName,
        abstract: node.abstract ? calcAbstract(node.abstract, context) : null,
        video: node.video ? calcVideo(node.video, context) : null
    };
    for (let author of node.authors) {
        const theAuthor = calcPerson(author, context);
        thePaper.authors.push(theAuthor);
    }
    return thePaper;
}
function calcPerson(node, context) {
    let out = {
        name: node.name
    };
    if (node.about)
        out["about"] = node.about.value;
    if (node.homepage)
        out["homepage"] = node.homepage.value;
    if (node.email)
        out["email"] = node.email.value;
    return out;
}
function calcAbstract(node, context) {
    return node.text;
}
function calcVideo(node, context) {
    return node.url;
}
function calcEvents(node, context) {
    for (let event of node.events) {
        const theEvent = calcEvent(event, context);
        context.events.push(theEvent);
    }
    return null;
}
function calcEvent(node, context) {
    if (node.kind == Parser.ASTKinds.SimpleEvent) {
        return calcSimpleEvent(node, context);
    }
    if (node.kind == Parser.ASTKinds.OrganizedEvent) {
        return calcOrganizedEvent(node, context);
    }
    if (node.kind == Parser.ASTKinds.TalkSession) {
        return calcTalkSession(node, context);
    }
    return null;
}
function calcSimpleEvent(node, context) {
    let out = {
        name: node.eventName
    };
    if (node.abstract)
        out["abstract"] = calcAbstract(node.abstract, context);
    return out;
}
function calcOrganizedEvent(node, context) {
    let organizers = [];
    for (const person of node.organizers) {
        organizers.push(calcPerson(person, context));
    }
    let out = {
        name: node.eventName,
        type: node.eventType,
        organizers: organizers
    };
    if (node.abstract)
        out["abstract"] = calcAbstract(node.abstract, context);
    return out;
}
function calcTalkSession(node, context) {
    let papersList = [];
    for (let entry of node.papers) {
        let paperName = entry.name;
        for (let paper of context.papers) {
            if (paper.title == paperName) {
                papersList.push(paper);
            }
        }
        ;
    }
    let organizers = [];
    for (const person of node.organizers) {
        organizers.push(calcPerson(person, context));
    }
    let out = {
        name: node.eventName,
        type: node.eventType,
        organizers: organizers,
        papers: papersList
    };
    if (node.abstract)
        out["abstract"] = calcAbstract(node.abstract, context);
    return out;
}
function calcProgram(node, context) {
    for (const day of node.days) {
        let schedule = calcDay(day, context);
        schedule.sortAndFillHoles();
    }
}
function calcDay(node, context) {
    let schedule = new Schedule();
    context.scheduleByDay.set(parseISOString(node.date + "T00:00"), schedule);
    for (const infos of node.eventinfo) {
        let session = calcEventInfo(infos, context);
        let startIso = node.date + "T" + session.start;
        let endIso = node.date + "T" + session.end;
        let ts = new TimeSlot(parseISOString(startIso), parseISOString(endIso), session.event);
        schedule.add(session.room, ts);
    }
    return schedule;
}
function calcEventInfo(node, context) {
    let theEvent = null;
    for (let event of context.events) {
        if (event.name == node.eventName) {
            theEvent = event;
            break;
        }
    }
    let theRoom = null;
    for (let room of context.rooms) {
        if (room.name == node.roomName) {
            theRoom = room;
            break;
        }
    }
    return {
        start: node.timeSlot.start,
        end: node.timeSlot.end,
        room: theRoom,
        event: theEvent
    };
}
// Schedule class
class Schedule {
    constructor() {
        this.schedulePerRoom = new Map();
    }
    ;
    getTimes() {
        return this.displayTimes;
    }
    getRooms() {
        return Array.from(this.schedulePerRoom.keys());
    }
    getTimeSlots(room) {
        return this.schedulePerRoom.get(room);
    }
    add(room, timeslot) {
        let slots = [];
        if (this.schedulePerRoom.has(room)) {
            slots = this.schedulePerRoom.get(room);
        }
        slots.push(timeslot);
        this.schedulePerRoom.set(room, slots);
    }
    sortAndFillHoles() {
        let timeSet = new DateSet();
        for (let [room, slots] of this.schedulePerRoom) {
            let sorted = slots.sort((obj1, obj2) => { return obj1.compareTo(obj2); });
            this.schedulePerRoom.set(room, sorted);
            for (const slot of sorted) {
                timeSet.add(slot.getStart());
                timeSet.add(slot.getEnd());
            }
        }
        this.displayTimes = Array.from(timeSet.values()).sort((a, b) => { return a.getTime() - b.getTime(); });
        for (let [room, slots] of this.schedulePerRoom) {
            let slotIndex = 0;
            for (let index = 0; index < this.displayTimes.length - 1; index++) {
                if (slotIndex >= slots.length) {
                    let ts = new TimeSlot(this.displayTimes[index], this.displayTimes[index + 1], null);
                    slots.push(ts);
                    slotIndex++;
                }
                else if (Math.abs(this.displayTimes[index].getTime() - slots[slotIndex].getStart().getTime()) < 60000) {
                    let rowspan = 0;
                    while (Math.abs(this.displayTimes[index + rowspan].getTime() - slots[slotIndex].getEnd().getTime()) > 60000) {
                        rowspan++; // compute rowspan
                    }
                    for (var i = 1; i < rowspan; i++) {
                        slots.splice(slotIndex + 1, 0, null);
                    }
                    index += rowspan - 1; // counter the loop ++
                    slots[slotIndex].setRowspan(rowspan);
                    slotIndex += rowspan;
                }
                else if (this.displayTimes[index].getTime() < slots[slotIndex].getStart().getTime()) {
                    let ts = new TimeSlot(this.displayTimes[index], this.displayTimes[index + 1], null);
                    slots.splice(slotIndex, 0, ts);
                    slotIndex++;
                }
            }
        }
    }
}
class TimeSlot {
    constructor(start, end, event) {
        this.start = start;
        this.end = end;
        this.event = event;
        this.rowspan = 1;
    }
    ;
    compareTo(other) {
        return this.start.getTime() - other.start.getTime();
    }
    ;
    getStart() {
        return this.start;
    }
    getEnd() {
        return this.end;
    }
    getEvent() {
        return this.event;
    }
    setRowspan(rowspan) {
        this.rowspan = rowspan;
    }
    getRowspan() {
        return this.rowspan;
    }
}
class DateSet {
    constructor() {
        this.set = new Set();
        this[Symbol.iterator] = this.values;
    }
    add(item) {
        let itemTime = item.getTime();
        for (const elem of this.set) {
            if (Math.abs(itemTime - elem.getTime()) < 60000) {
                return;
            }
        }
        this.set.add(item);
    }
    values() {
        return this.set.values();
    }
}
function parseISOString(iso) {
    var numbers = iso.split(/\D+/);
    return new Date(Date.UTC(parseInt(numbers[0]), parseInt(numbers[1]) - 1, parseInt(numbers[2]), parseInt(numbers[3]), parseInt(numbers[4]), 0, 0));
}
