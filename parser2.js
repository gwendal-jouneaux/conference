"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxErr = exports.parse = exports.Parser = exports.ASTKinds = void 0;
var ASTKinds;
(function (ASTKinds) {
    ASTKinds["Root"] = "Root";
    ASTKinds["Rooms"] = "Rooms";
    ASTKinds["Room"] = "Room";
    ASTKinds["Room_$0"] = "Room_$0";
    ASTKinds["Papers"] = "Papers";
    ASTKinds["Paper"] = "Paper";
    ASTKinds["Person"] = "Person";
    ASTKinds["Person_$0"] = "Person_$0";
    ASTKinds["Person_$1"] = "Person_$1";
    ASTKinds["Person_$2"] = "Person_$2";
    ASTKinds["Abstract"] = "Abstract";
    ASTKinds["Video"] = "Video";
    ASTKinds["Events"] = "Events";
    ASTKinds["Event_1"] = "Event_1";
    ASTKinds["Event_2"] = "Event_2";
    ASTKinds["Event_3"] = "Event_3";
    ASTKinds["SimpleEvent"] = "SimpleEvent";
    ASTKinds["OrganizedEvent"] = "OrganizedEvent";
    ASTKinds["TalkSession"] = "TalkSession";
    ASTKinds["TalkSession_$0"] = "TalkSession_$0";
    ASTKinds["Program"] = "Program";
    ASTKinds["Day"] = "Day";
    ASTKinds["EventInfo"] = "EventInfo";
    ASTKinds["EventInfo_$0"] = "EventInfo_$0";
    ASTKinds["EMAIL"] = "EMAIL";
    ASTKinds["LINK"] = "LINK";
    ASTKinds["DATE"] = "DATE";
    ASTKinds["HOUR"] = "HOUR";
    ASTKinds["STRING"] = "STRING";
    ASTKinds["MULTISTRING"] = "MULTISTRING";
    ASTKinds["INT"] = "INT";
    ASTKinds["ENDLINE"] = "ENDLINE";
    ASTKinds["_"] = "_";
})(ASTKinds = exports.ASTKinds || (exports.ASTKinds = {}));
class Parser {
    constructor(input) {
        this.negating = false;
        this.memoSafe = true;
        this.pos = { overallPos: 0, line: 1, offset: 0 };
        this.input = input;
    }
    reset(pos) {
        this.pos = pos;
    }
    finished() {
        return this.pos.overallPos === this.input.length;
    }
    clearMemos() {
    }
    matchRoot($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$rooms;
            let $scope$papers;
            let $scope$events;
            let $scope$program;
            let $$res = null;
            if (true
                && ($scope$rooms = this.matchRooms($$dpth + 1, $$cr)) !== null
                && ($scope$papers = this.matchPapers($$dpth + 1, $$cr)) !== null
                && ($scope$events = this.matchEvents($$dpth + 1, $$cr)) !== null
                && ($scope$program = this.matchProgram($$dpth + 1, $$cr)) !== null) {
                $$res = { kind: ASTKinds.Root, rooms: $scope$rooms, papers: $scope$papers, events: $scope$events, program: $scope$program };
            }
            return $$res;
        });
    }
    matchRooms($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$rooms;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:#)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:[Rr]ooms)`, $$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$rooms = this.loop(() => this.matchRoom($$dpth + 1, $$cr), true)) !== null) {
                $$res = { kind: ASTKinds.Rooms, rooms: $scope$rooms };
            }
            return $$res;
        });
    }
    matchRoom($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$name;
            let $scope$capacite;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:-)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$name = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && (($scope$capacite = this.matchRoom_$0($$dpth + 1, $$cr)) || true)
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.Room, name: $scope$name, capacite: $scope$capacite };
            }
            return $$res;
        });
    }
    matchRoom_$0($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$value;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:,)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$value = this.matchINT($$dpth + 1, $$cr)) !== null) {
                $$res = { kind: ASTKinds.Room_$0, value: $scope$value };
            }
            return $$res;
        });
    }
    matchPapers($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$papers;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:#)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:[Pp]apers)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$papers = this.loop(() => this.matchPaper($$dpth + 1, $$cr), true)) !== null) {
                $$res = { kind: ASTKinds.Papers, papers: $scope$papers };
            }
            return $$res;
        });
    }
    matchPaper($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$paperName;
            let $scope$authors;
            let $scope$abstract;
            let $scope$video;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:##)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$paperName = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$authors = this.loop(() => this.matchPerson($$dpth + 1, $$cr), true)) !== null
                && (($scope$abstract = this.matchAbstract($$dpth + 1, $$cr)) || true)
                && (($scope$video = this.matchVideo($$dpth + 1, $$cr)) || true)) {
                $$res = { kind: ASTKinds.Paper, paperName: $scope$paperName, authors: $scope$authors, abstract: $scope$abstract, video: $scope$video };
            }
            return $$res;
        });
    }
    matchPerson($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$name;
            let $scope$homepage;
            let $scope$email;
            let $scope$about;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:-)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$name = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && (($scope$homepage = this.matchPerson_$0($$dpth + 1, $$cr)) || true)
                && (($scope$email = this.matchPerson_$1($$dpth + 1, $$cr)) || true)
                && (($scope$about = this.matchPerson_$2($$dpth + 1, $$cr)) || true)
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.Person, name: $scope$name, homepage: $scope$homepage, email: $scope$email, about: $scope$about };
            }
            return $$res;
        });
    }
    matchPerson_$0($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$value;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:,)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$value = this.matchLINK($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.Person_$0, value: $scope$value };
            }
            return $$res;
        });
    }
    matchPerson_$1($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$value;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:,)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$value = this.matchEMAIL($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.Person_$1, value: $scope$value };
            }
            return $$res;
        });
    }
    matchPerson_$2($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$value;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:,)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$value = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.Person_$2, value: $scope$value };
            }
            return $$res;
        });
    }
    matchAbstract($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$text;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:\*abstract\*:)`, $$dpth + 1, $$cr) !== null
                && this.matchENDLINE($$dpth + 1, $$cr) !== null
                && ($scope$text = this.matchMULTISTRING($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.Abstract, text: $scope$text };
            }
            return $$res;
        });
    }
    matchVideo($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$url;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:\*video\*:)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$url = this.matchLINK($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.Video, url: $scope$url };
            }
            return $$res;
        });
    }
    matchEvents($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$events;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:#)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:[Ee]vents)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$events = this.loop(() => this.matchEvent($$dpth + 1, $$cr), true)) !== null) {
                $$res = { kind: ASTKinds.Events, events: $scope$events };
            }
            return $$res;
        });
    }
    matchEvent($$dpth, $$cr) {
        return this.choice([
            () => this.matchEvent_1($$dpth + 1, $$cr),
            () => this.matchEvent_2($$dpth + 1, $$cr),
            () => this.matchEvent_3($$dpth + 1, $$cr),
        ]);
    }
    matchEvent_1($$dpth, $$cr) {
        return this.matchSimpleEvent($$dpth + 1, $$cr);
    }
    matchEvent_2($$dpth, $$cr) {
        return this.matchOrganizedEvent($$dpth + 1, $$cr);
    }
    matchEvent_3($$dpth, $$cr) {
        return this.matchTalkSession($$dpth + 1, $$cr);
    }
    matchSimpleEvent($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$eventName;
            let $scope$abstract;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:##)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$eventName = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && (($scope$abstract = this.matchAbstract($$dpth + 1, $$cr)) || true)
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.SimpleEvent, eventName: $scope$eventName, abstract: $scope$abstract };
            }
            return $$res;
        });
    }
    matchOrganizedEvent($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$eventType;
            let $scope$eventName;
            let $scope$organizers;
            let $scope$abstract;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:##)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:\()`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$eventType = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:\))`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$eventName = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$organizers = this.loop(() => this.matchPerson($$dpth + 1, $$cr), true)) !== null
                && (($scope$abstract = this.matchAbstract($$dpth + 1, $$cr)) || true)
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.OrganizedEvent, eventType: $scope$eventType, eventName: $scope$eventName, organizers: $scope$organizers, abstract: $scope$abstract };
            }
            return $$res;
        });
    }
    matchTalkSession($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$eventType;
            let $scope$eventName;
            let $scope$organizers;
            let $scope$abstract;
            let $scope$papers;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:##)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:\[)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$eventType = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:\])`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$eventName = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$organizers = this.loop(() => this.matchPerson($$dpth + 1, $$cr), true)) !== null
                && (($scope$abstract = this.matchAbstract($$dpth + 1, $$cr)) || true)
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && this.regexAccept(String.raw `(?:###)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:[Pp]apers)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$papers = this.loop(() => this.matchTalkSession_$0($$dpth + 1, $$cr), true)) !== null) {
                $$res = { kind: ASTKinds.TalkSession, eventType: $scope$eventType, eventName: $scope$eventName, organizers: $scope$organizers, abstract: $scope$abstract, papers: $scope$papers };
            }
            return $$res;
        });
    }
    matchTalkSession_$0($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$name;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:-)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$name = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.TalkSession_$0, name: $scope$name };
            }
            return $$res;
        });
    }
    matchProgram($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$days;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:#)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:[Pp]rogram)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$days = this.loop(() => this.matchDay($$dpth + 1, $$cr), true)) !== null) {
                $$res = { kind: ASTKinds.Program, days: $scope$days };
            }
            return $$res;
        });
    }
    matchDay($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$date;
            let $scope$eventinfo;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:##)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$date = this.matchDATE($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$eventinfo = this.loop(() => this.matchEventInfo($$dpth + 1, $$cr), true)) !== null) {
                $$res = { kind: ASTKinds.Day, date: $scope$date, eventinfo: $scope$eventinfo };
            }
            return $$res;
        });
    }
    matchEventInfo($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$timeSlot;
            let $scope$roomName;
            let $scope$eventName;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:-)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$timeSlot = this.matchEventInfo_$0($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:in)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$roomName = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?::)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$eventName = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.EventInfo, timeSlot: $scope$timeSlot, roomName: $scope$roomName, eventName: $scope$eventName };
            }
            return $$res;
        });
    }
    matchEventInfo_$0($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$start;
            let $scope$end;
            let $$res = null;
            if (true
                && ($scope$start = this.matchHOUR($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:-)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$end = this.matchHOUR($$dpth + 1, $$cr)) !== null) {
                $$res = { kind: ASTKinds.EventInfo_$0, start: $scope$start, end: $scope$end };
            }
            return $$res;
        });
    }
    matchEMAIL($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:[a-zA-Z0-9.!#$%&\'*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)`, $$dpth + 1, $$cr);
    }
    matchLINK($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))`, $$dpth + 1, $$cr);
    }
    matchDATE($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:(19|20)[0-9][0-9]-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]))`, $$dpth + 1, $$cr);
    }
    matchHOUR($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]))`, $$dpth + 1, $$cr);
    }
    matchSTRING($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:[a-zA-Z0-9]([a-zA-Z0-9.\- ]*[a-zA-Z0-9.])?)`, $$dpth + 1, $$cr);
    }
    matchMULTISTRING($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:([^\n\r]+\r?\n)*)`, $$dpth + 1, $$cr);
    }
    matchINT($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:[0-9]+)`, $$dpth + 1, $$cr);
    }
    matchENDLINE($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:;|\n)`, $$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.ENDLINE, };
            }
            return $$res;
        });
    }
    match_($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:[ \t\r\f]*)`, $$dpth + 1, $$cr);
    }
    test() {
        const mrk = this.mark();
        const res = this.matchRoot(0);
        const ans = res !== null;
        this.reset(mrk);
        return ans;
    }
    parse() {
        const mrk = this.mark();
        const res = this.matchRoot(0);
        if (res)
            return { ast: res, errs: [] };
        this.reset(mrk);
        const rec = new ErrorTracker();
        this.clearMemos();
        this.matchRoot(0, rec);
        const err = rec.getErr();
        return { ast: res, errs: err !== null ? [err] : [] };
    }
    mark() {
        return this.pos;
    }
    loop(func, star = false) {
        const mrk = this.mark();
        const res = [];
        for (;;) {
            const t = func();
            if (t === null) {
                break;
            }
            res.push(t);
        }
        if (star || res.length > 0) {
            return res;
        }
        this.reset(mrk);
        return null;
    }
    run($$dpth, fn) {
        const mrk = this.mark();
        const res = fn();
        if (res !== null)
            return res;
        this.reset(mrk);
        return null;
    }
    choice(fns) {
        for (const f of fns) {
            const res = f();
            if (res !== null) {
                return res;
            }
        }
        return null;
    }
    regexAccept(match, dpth, cr) {
        return this.run(dpth, () => {
            const reg = new RegExp(match, "y");
            const mrk = this.mark();
            reg.lastIndex = mrk.overallPos;
            const res = this.tryConsume(reg);
            if (cr) {
                cr.record(mrk, res, {
                    kind: "RegexMatch",
                    // We substring from 3 to len - 1 to strip off the
                    // non-capture group syntax added as a WebKit workaround
                    literal: match.substring(3, match.length - 1),
                    negated: this.negating,
                });
            }
            return res;
        });
    }
    tryConsume(reg) {
        const res = reg.exec(this.input);
        if (res) {
            let lineJmp = 0;
            let lind = -1;
            for (let i = 0; i < res[0].length; ++i) {
                if (res[0][i] === "\n") {
                    ++lineJmp;
                    lind = i;
                }
            }
            this.pos = {
                overallPos: reg.lastIndex,
                line: this.pos.line + lineJmp,
                offset: lind === -1 ? this.pos.offset + res[0].length : (res[0].length - lind - 1)
            };
            return res[0];
        }
        return null;
    }
    noConsume(fn) {
        const mrk = this.mark();
        const res = fn();
        this.reset(mrk);
        return res;
    }
    negate(fn) {
        const mrk = this.mark();
        const oneg = this.negating;
        this.negating = !oneg;
        const res = fn();
        this.negating = oneg;
        this.reset(mrk);
        return res === null ? true : null;
    }
    memoise(rule, memo) {
        const $scope$pos = this.mark();
        const $scope$memoRes = memo.get($scope$pos.overallPos);
        if (this.memoSafe && $scope$memoRes !== undefined) {
            this.reset($scope$memoRes[1]);
            return $scope$memoRes[0];
        }
        const $scope$result = rule();
        if (this.memoSafe)
            memo.set($scope$pos.overallPos, [$scope$result, this.mark()]);
        return $scope$result;
    }
}
exports.Parser = Parser;
function parse(s) {
    const p = new Parser(s);
    return p.parse();
}
exports.parse = parse;
class SyntaxErr {
    constructor(pos, expmatches) {
        this.pos = pos;
        this.expmatches = [...expmatches];
    }
    toString() {
        return `Syntax Error at line ${this.pos.line}:${this.pos.offset}. Expected one of ${this.expmatches.map(x => x.kind === "EOF" ? " EOF" : ` ${x.negated ? 'not ' : ''}'${x.literal}'`)}`;
    }
}
exports.SyntaxErr = SyntaxErr;
class ErrorTracker {
    constructor() {
        this.mxpos = { overallPos: -1, line: -1, offset: -1 };
        this.regexset = new Set();
        this.pmatches = [];
    }
    record(pos, result, att) {
        if ((result === null) === att.negated)
            return;
        if (pos.overallPos > this.mxpos.overallPos) {
            this.mxpos = pos;
            this.pmatches = [];
            this.regexset.clear();
        }
        if (this.mxpos.overallPos === pos.overallPos) {
            if (att.kind === "RegexMatch") {
                if (!this.regexset.has(att.literal))
                    this.pmatches.push(att);
                this.regexset.add(att.literal);
            }
            else {
                this.pmatches.push(att);
            }
        }
    }
    getErr() {
        if (this.mxpos.overallPos !== -1)
            return new SyntaxErr(this.mxpos, this.pmatches);
        return null;
    }
}
