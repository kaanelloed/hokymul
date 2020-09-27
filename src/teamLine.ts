// Hokymul - Hockey simulator
// Copyright (C) 2020  David Proulx

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

class TeamLine {
    time: number;
    currentTOI: number;
    lineNumber: number;

    constructor(time: number, lineNumber: number) {
        this.time = time;
        this.currentTOI = time;
        this.lineNumber = lineNumber
    }

    resetTime(): void {
        this.currentTOI = this.time;
    }
}

class ForwardLine extends TeamLine {
    leftWing: Skater;
    center: Skater;
    rightWing: Skater;

    constructor(leftWing: Skater, center: Skater, rightWing: Skater, time: number, lineNumber: number) {
        super(time, lineNumber);
        this.leftWing = leftWing;
        this.center = center;
        this.rightWing = rightWing;
    }

    resetScore(): void {
        this.leftWing.resetScore();
        this.center.resetScore();
        this.rightWing.resetScore();
    }
}

class DefenceLine extends TeamLine {
    leftDefenceman: Skater;
    rightDefenceman: Skater;

    constructor(leftDefenceman: Skater, rightDefenceman: Skater, time: number, lineNumber: number) {
        super(time, lineNumber);
        this.leftDefenceman = leftDefenceman;
        this.rightDefenceman = rightDefenceman;
    }

    resetScore(): void {
        this.leftDefenceman.resetScore();
        this.rightDefenceman.resetScore();
    }
}

class TeamLines {
    forwardLines: ForwardLine[];
    defenceLines: DefenceLine[];
    currentFwdLine: ForwardLine;
    currentDefLine: DefenceLine;
    firstGoalie: Goalie;
    secondGoalie: Goalie;
    currentFwdLineInd: number;
    currentDefLineInd: number;
    offenceImpactOnOffence: number;
    defenceImpactOnDefence: number;

    constructor() {
        this.firstGoalie = undefined;
        this.secondGoalie = undefined;

        this.currentFwdLineInd = 1;
        this.currentDefLineInd = 1;
        this.currentFwdLine = undefined;
        this.currentDefLine = undefined;

        this.offenceImpactOnOffence = 0.7;
        this.defenceImpactOnDefence = 0.7;

        this.forwardLines = [];
        this.defenceLines = [];
    }

    addForwardLine(forwardLine: ForwardLine) : void {
        this.forwardLines.push(forwardLine);
    }

    addForwardLines(...forwardLines: ForwardLine[]) : void {
        for (let forwardLine of forwardLines) {
            this.addForwardLine(forwardLine);
        }
    }

    addDefenceLine(defenceLine: DefenceLine) : void {
        this.defenceLines.push(defenceLine);
    }

    addDefenceLines(...defenceLines: DefenceLine[]) : void {
        for (let defenceLine of defenceLines) {
            this.addDefenceLine(defenceLine);
        }
    }

    addGoalies(starter: Goalie, backup: Goalie) : void {
        this.firstGoalie = starter;
        this.secondGoalie = backup;
    }

    nextFwdLine(): ForwardLine {
        let line: ForwardLine;

        this.currentFwdLineInd++;

        if (this.currentFwdLineInd > this.forwardLines.length) this.currentFwdLineInd = 1;

        line = this.forwardLines[this.currentFwdLineInd - 1];
        line.resetTime();

        return line;
    }

    nextDefLine(): DefenceLine {
        let line: DefenceLine;

        this.currentDefLineInd++;

        if (this.currentDefLineInd > this.defenceLines.length) this.currentDefLineInd = 1;

        line = this.defenceLines[this.currentDefLineInd - 1];
        line.resetTime();

        return line;
    }

    lineOffense(): number {
        let avgFor = (this.currentFwdLine.leftWing.off + this.currentFwdLine.center.off + this.currentFwdLine.rightWing.off) / 3;
        let avgDef = (this.currentDefLine.leftDefenceman.off + this.currentDefLine.rightDefenceman.off) / 2
        return (avgFor * this.offenceImpactOnOffence) + (avgDef * (1 - this.offenceImpactOnOffence));
    }

    lineDefense(): number {
        let avgFor = (this.currentFwdLine.leftWing.def + this.currentFwdLine.center.def + this.currentFwdLine.rightWing.def) / 3;
        let avgDef = (this.currentDefLine.leftDefenceman.def + this.currentDefLine.rightDefenceman.def) / 2
        return (avgFor * (1 - this.defenceImpactOnDefence)) + (avgDef * this.defenceImpactOnDefence);
    }

    changeIfTired(): void {
        this.currentFwdLine.currentTOI--;
        this.currentDefLine.currentTOI--;

        if (this.currentFwdLine.currentTOI === 0 ) {
            this.currentFwdLine = this.nextFwdLine();
        }

        if (this.currentDefLine.currentTOI === 0 ) {
            this.currentDefLine = this.nextDefLine();
        }
    }

    resetLines(): void {
        this.currentFwdLine = this.forwardLines[0];
        this.currentDefLine = this.defenceLines[0];
        this.currentFwdLineInd = 1;
        this.currentDefLineInd = 1;
        
        this.currentFwdLine.resetTime();
        this.currentDefLine.resetTime();
    }

    resetScore(): void {
        for (let forwardLine of this.forwardLines) {
            forwardLine.resetScore();
        }

        for (let defenceLine of this.defenceLines) {
            defenceLine.resetScore();
        }
    }
}