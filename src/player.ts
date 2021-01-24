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

import {randomBetween} from './utils.js'

const names = require("./names/defaultNames.json");

class Player {
    id: number;
    name: string;
    teamId: number;
    pos: PlayerPosition;
    ov: number;
    salary: number;

    constructor(id: number, name: string, teamId: number, pos: PlayerPosition, ov: number) {
        this.id = id;
        this.name = name;
        this.pos = pos;
        this.teamId = teamId;
        this.ov = ov;
    }

    getPositionCode(): string {
        let text: string = "";

        switch (this.pos) {
            case PlayerPosition.leftWing:
                text = "LW";
                break;
            case PlayerPosition.center:
                text = "C";
                break;
            case PlayerPosition.rightWing:
                text = "RW";
                break;
            case PlayerPosition.leftDefenceman:
                text = "LD";
                break;
            case PlayerPosition.rightDefenceman:
                text = "RD";
                break;
            case PlayerPosition.goalie:
                text = "G";
                break;
        }

        return text;
    }

    static generatePlayerName(): string {
        let canadaNames = names[0];

        let indexFN = randomBetween(0, canadaNames.MaleFirstNames.length - 1);
        let indexLN = randomBetween(0, canadaNames.LastNames.length - 1);
    
        let firstName = canadaNames.MaleFirstNames[indexFN];
        let lastName = canadaNames.LastNames[indexLN];
    
        return firstName + " " + lastName;
    }
}

enum PlayerPosition {
    leftWing,
    center,
    rightWing,
    leftDefenceman,
    rightDefenceman,
    goalie
}

class Skater extends Player{
    id: number;
    name: string;
    off: number;
    def: number;
    goal: number;
    assist: number;
    stats: SkaterStatistics;

    constructor(id: number, name: string, teamId: number, pos: PlayerPosition, off: number, def: number) {
        super(id, name, teamId, pos, Math.round((off + def) / 2));
        this.off = off;
        this.def = def;
        this.goal = 0;
        this.assist = 0;

        this.stats = new SkaterStatistics();
    }

    resetScore(): void {
        this.goal = 0;
        this.assist = 0;
    }

    static fromObject(obj: any): Skater {
        let inst: Skater;

        inst = obj;
        inst = Object.assign(new Skater(0, "", 0, 0, 0, 0), obj);
        inst.stats = SkaterStatistics.fromObject(inst.stats);

        return inst;
    }
}

class Goalie extends Player {
    constructor(id: number, name: string, teamId: number, ov: number) {
        super(id, name, teamId, PlayerPosition.goalie, ov);
    }

    static fromObject(obj: any): Goalie {
        let inst: Goalie;

        inst = obj;
        inst = Object.assign(new Goalie(0, "", 0, 0), obj);

        return inst;
    }
}

class SkaterStatistics {
    gamePlayed: number;
    goal: number;
    assist: number;

    constructor () {
        this.gamePlayed = 0;
        this.goal = 0;
        this.assist = 0;
    }

    public getPoints() {
        return this.goal + this.assist;
    }

    static fromObject(obj: any): SkaterStatistics {
        let inst: SkaterStatistics;

        inst = obj;
        inst = Object.assign(new SkaterStatistics(), obj);

        return inst;
    }
}

export {
    Player,
    Skater,
    Goalie,
    PlayerPosition
};