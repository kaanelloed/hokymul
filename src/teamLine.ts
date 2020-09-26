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

    constructor(time: number) {
        this.time = time;
        this.currentTOI = time;
    }

    resetTime(): void {
        this.currentTOI = this.time;
    }
}

class ForwardLine extends TeamLine {
    leftWing: Skater;
    center: Skater;
    rightWing: Skater;

    constructor(leftWing: Skater, center: Skater, rightWing: Skater, time: number) {
        super(time);
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

    constructor(leftDefenceman: Skater, rightDefenceman: Skater, time: number) {
        super(time);
        this.leftDefenceman = leftDefenceman;
        this.rightDefenceman = rightDefenceman;
    }

    resetScore(): void {
        this.leftDefenceman.resetScore();
        this.rightDefenceman.resetScore();
    }
}

class TeamLines {
    firstLine: ForwardLine;
    secondLine: ForwardLine;
    thirdLine: ForwardLine;
    fourthLine: ForwardLine;
    currentFwdLine: ForwardLine;
    firstDuo: DefenceLine;
    secondDuo: DefenceLine;
    thirdDuo: DefenceLine;
    currentDefLine: DefenceLine;
    firstGoalie: Goalie;
    secondGoalie: Goalie;
    currentFwdLineInd: number;
    currentDefLineInd: number;
    offenceImpactOnOffence: number;
    defenceImpactOnDefence: number;

    constructor(firstLine: ForwardLine, secondLine: ForwardLine, thirdLine: ForwardLine, fourthLine: ForwardLine, firstDuo: DefenceLine, secondDuo: DefenceLine, thirdDuo: DefenceLine, firstGoalie: Goalie, secondGoalie: Goalie) {
        this.firstLine = firstLine;
        this.secondLine = secondLine;
        this.thirdLine = thirdLine;
        this.fourthLine = fourthLine;
        this.firstDuo = firstDuo;
        this.secondDuo = secondDuo;
        this.thirdDuo = thirdDuo;
        this.firstGoalie = firstGoalie;
        this.secondGoalie = secondGoalie;

        this.currentFwdLineInd = 1;
        this.currentDefLineInd = 1;
        this.currentFwdLine = firstLine;
        this.currentDefLine = firstDuo;

        this.offenceImpactOnOffence = 0.7;
        this.defenceImpactOnDefence = 0.7;
    }

    nextFwdLine(): ForwardLine {
        let line: ForwardLine;

        this.currentFwdLineInd++;

        if (this.currentFwdLineInd > 4) this.currentFwdLineInd = 1;

        switch (this.currentFwdLineInd) {
            case 1:
               line = this.firstLine;
               break;
            case 2:
               line = this.secondLine;
               break; 
            case 3:
               line = this.thirdLine;
               break; 
            case 4:
               line = this.fourthLine;
               break; 
        }

        line.resetTime();

        return line;
    }

    nextDefLine(): DefenceLine {
        let line: DefenceLine;

        this.currentDefLineInd++;

        if (this.currentDefLineInd > 3) this.currentDefLineInd = 1;

        switch (this.currentDefLineInd) {
            case 1:
               line = this.firstDuo;
               break;
            case 2:
               line = this.secondDuo;
               break; 
            case 3:
               line = this.thirdDuo;
               break; 
        }

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
        this.currentFwdLine = this.firstLine;
        this.currentDefLine = this.firstDuo;
        this.currentFwdLineInd = 1;
        this.currentDefLineInd = 1;
        
        this.currentFwdLine.resetTime();
        this.currentDefLine.resetTime();
    }

    resetScore(): void {
        this.firstLine.resetScore();
        this.secondLine.resetScore();
        this.thirdLine.resetScore();
        this.fourthLine.resetScore();
        this.firstDuo.resetScore();
        this.secondDuo.resetScore();
        this.thirdDuo.resetScore();
    }
}