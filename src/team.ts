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

import {Player, Skater, Goalie, PlayerPosition} from './player.js';
import {randomBetween} from './utils.js'

class Team {
    id: number;
    conferenceId: number;
    divisionId: number;
    name: string;
    lines: TeamLine[];
    results: TeamResults;

    constructor(id: number, name: string, conferenceId: number, divisionId: number) {
        this.id = id;
        this.name = name;

        this.conferenceId = conferenceId;
        this.divisionId = divisionId;

        this.lines = undefined;
        this.results = new TeamResults();
    }

    isLinesSet(): boolean {
        return this.lines !== undefined;
    }

    getPlayersTable(players: Player[]): string {
        let text = "<table><tr><td>Name</td><td>Position</td><td>Off</td><td>Def</td><td>Ov</td></tr>";
        let off = 0;
        let def = 0;

        let teamPlayers = players.filter(r => r.teamId === this.id);

        for (let player of teamPlayers) {
            if (player instanceof Skater) {
                off = player.off;
                def = player.def;
            }
            
            text += `<tr><td>${player.name}</td><td>${player.getPositionCode()}</td><td>${(off ?? 0)}</td><td>${(def ?? 0)}</td><td>${player.ov}</td></tr>`;

            off = 0;
            def = 0;
        }

        text += "</table>";
        return text;
    }

    generateTeamPlayers(players: Player[], id: number): number {
        id = this.generateSkatersForPosition(this, PlayerPosition.leftWing, 60, 85, 55, 80, 4, id, players);
        id = this.generateSkatersForPosition(this, PlayerPosition.center, 60, 85, 55, 80, 4, id, players);
        id = this.generateSkatersForPosition(this, PlayerPosition.rightWing, 60, 85, 55, 80, 4, id, players);
        id = this.generateSkatersForPosition(this, PlayerPosition.leftDefenceman, 60, 85, 55, 80, 3, id, players);
        id = this.generateSkatersForPosition(this, PlayerPosition.rightDefenceman, 55, 80, 65, 85, 3, id, players);
        id = this.generateGoalies(this, 70, 85, 2, id, players);

        return id;
    }

    generateSkatersForPosition(team: Team, pos: PlayerPosition, minOffence: number, maxOffence: number, minDefence: number, maxDefence: number, nbToGenerate: number, startingId: number, players: Player[]): number {
        for(let i = 0; i < nbToGenerate; i++) {
            players.push(new Skater(startingId++, Player.generatePlayerName(), team.id, pos, randomBetween(minOffence, maxOffence), randomBetween(minDefence, maxDefence)));
        }

        return startingId;
    }

    generateGoalies(team: Team, minOveral: number, maxOveral: number, nbToGenerate: number, startingId: number, players: Player[]): number {
        for(let i = 0; i < nbToGenerate; i++) {
            players.push(new Goalie(startingId++, Player.generatePlayerName(), team.id, randomBetween(minOveral, maxOveral)));
        }

        return startingId;
    }

    autoLine(players: Player[], offLines: number, defLines: number): void {
        let leftWings: Player[] = [];
        let centers: Player[] = [];
        let rightWings: Player[] = [];
        let leftDefencemen: Player[] = [];
        let rightDefencemen: Player[] = [];
        let goalies: Player[] = [];

        leftWings = this.getPlayerDescending(players, PlayerPosition.leftWing);
        centers = this.getPlayerDescending(players, PlayerPosition.center);
        rightWings = this.getPlayerDescending(players, PlayerPosition.rightWing);
        leftDefencemen = this.getPlayerDescending(players, PlayerPosition.leftDefenceman);
        rightDefencemen = this.getPlayerDescending(players, PlayerPosition.rightDefenceman);
        goalies = this.getPlayerDescending(players, PlayerPosition.goalie);

        this.lines = [];

        let toi = 80;
        for (let i = 1; i <= offLines; i++) {
            let offLine = new TeamLine(i, LineType.ForwardLine, toi);
            offLine.playerLines.push(new PlayerLine(PlayerPosition.leftWing, leftWings[i - 1].id));
            offLine.playerLines.push(new PlayerLine(PlayerPosition.center, centers[i - 1].id));
            offLine.playerLines.push(new PlayerLine(PlayerPosition.rightWing, rightWings[i - 1].id));
            this.lines.push(offLine);
            
            toi -= 20;
        }

        toi = 70
        for (let i = 1; i <= defLines; i++) {
            let defLine = new TeamLine(i, LineType.DefenceLine, toi);
            defLine.playerLines.push(new PlayerLine(PlayerPosition.leftDefenceman, leftDefencemen[i - 1].id));
            defLine.playerLines.push(new PlayerLine(PlayerPosition.rightDefenceman, rightDefencemen[i - 1].id));
            this.lines.push(defLine);

            toi -= 20;
        }

        let goalie1 = new TeamLine(1, LineType.Goalie, toi);
        goalie1.playerLines.push(new PlayerLine(PlayerPosition.goalie, goalies[0].id));
        this.lines.push(goalie1);

        let goalie2 = new TeamLine(2, LineType.Goalie, toi);
        goalie2.playerLines.push(new PlayerLine(PlayerPosition.goalie, goalies[1].id));
        this.lines.push(goalie2);
    }

    private getPlayerDescending(players: Player[], position: PlayerPosition): Player[] {
        return players.filter(r => r.pos === position).sort((a, b) => b.ov - a.ov);
    }

    static fromObject(obj: any): Team {
        let inst: Team;

        inst = obj;
        inst = Object.assign(new Team(0, "", 0, 0), obj);
        inst.results = Object.assign(new TeamResults(), inst.results);

        return inst;
    }
}

class TeamResults {
    win: number;
    lose: number;
    otl: number;

    constructor() {
        this.win = 0;
        this.lose = 0;
        this.otl = 0;
    }

    public getPoints() {
        return this.win * 2 + this.otl;
    }

    public getGamesPlayed() {
        return this.win + this.otl + this.lose;
    }
}

enum LineType {
    ForwardLine,
    DefenceLine,
    Goalie,
    Powerplay,
    PenaltyKill,
    Even4vs4,
    Even3vs3
}

class TeamLine {
    playerLines: PlayerLine[];
    type: LineType;
    lineNumber: number;
    timeOnIce: number;

    constructor(lineNumber: number, type: LineType, timeOnIce: number) {
        this.lineNumber = lineNumber;
        this.type = type;
        this.timeOnIce = timeOnIce;

        this.playerLines = [];
    }
}

class PlayerLine {
    position: PlayerPosition;
    playerId: number;

    constructor(position: PlayerPosition, playerId: number) {
        this.position = position;
        this.playerId = playerId;
    }
}

class TeamCapHit {
    projectedCapHit: number;
    dailyCapHit: number;
    projectedCapSpace: number;
    todayCapSpace: number;
    currentCapSpace: number;
    tradeDeadlineCapSpace: number;

    public calculateCap(team: Team, players: Player[], salaryCap: number, seasonLength: number, seasonStart: Date, seasonEnd: Date, currentDate: Date) {
        let totalSalary: number = 0;
        let salaryOfDay: number;
        let daysLeft: number;
        let accruedCapSpace: number;
        let accruedCapHit: number;
        let date: Date;

        date = seasonStart;
        daysLeft = seasonLength;
        accruedCapHit = salaryCap;
        accruedCapSpace = 0;

        while (date.valueOf() <= currentDate.valueOf()) {
            salaryOfDay = 0;
            daysLeft--;

            for (let player of players) {
                salaryOfDay += player.salary / seasonLength;
            }

            totalSalary += salaryOfDay;

            this.projectedCapHit = salaryOfDay * daysLeft + totalSalary;
            this.dailyCapHit = salaryOfDay * seasonLength;

            this.projectedCapSpace = salaryCap - this.projectedCapHit;
            this.todayCapSpace = salaryCap - this.dailyCapHit;

            accruedCapHit += accruedCapSpace;
            this.currentCapSpace = accruedCapHit - this.dailyCapHit;
            accruedCapSpace = this.currentCapSpace / daysLeft;
        }
    }
}

export {
    Team,
    TeamLine,
    LineType
};