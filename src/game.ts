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

import {Goalie, Player, PlayerPosition, Skater} from './player.js';
import {ForwardLine, DefenceLine, GameTeam, GameLines} from './gameLine.js';
import {Team, TeamLine, LineType} from './team.js';
import {getGameTime} from './utils.js'

class ScoreBoard {
    id: number;
    date: Date;
    homeTeam: GameTeam;
    awayTeam: GameTeam;
    periods: GamePeriod[];

    constructor(id: number, date: Date, homeTeam: GameTeam, awayTeam: GameTeam) {
        this.id = id;
        this.date = date;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.periods = [];
    }

    toString(): string {
        let text = `<div>${this.date.toLocaleDateString()}</div>`;

        text += `<div>${this.homeTeam.team.name} ${this.homeTeam.goal} - ${this.awayTeam.team.name} ${this.awayTeam.goal}</div>`;
        text += `<div>Shots: ${this.homeTeam.shoot} - ${this.awayTeam.shoot}</div>`;

        for (var per of this.periods) {
            text += `<div>${per.name}</div>`;

            if (per.goals.length === 0) {
                text += "No goal";
            }

            for (var goal of per.goals) {
                text += `<div>${goal}</div>`;
            }
        }

        return text;
    }
}

class GamePeriod {
    name: string;
    goals: GameGoal[];

    constructor(name: string) {
        this.name = name;
        this.goals = [];
    }
}

class GameGoal {
    time: number;
    goalScorer: Skater;
    goalNumber: number;
    firstAssist: Skater;
    firstAssisNumber: number;
    secondAssist: Skater;
    secondAssisNumber: number;
    homeGoalNumber: number;
    awayGoalNumber: number;
    team: Team;

    constructor(time: number, goalScorer: Skater, goalNumber: number, firstAssist: Skater, firstAssisNumber: number, secondAssist: Skater, secondAssisNumber: number, homeGoalNumber: number, awayGoalNumber: number, team: Team) {
        this.time = time;
        this.goalScorer = goalScorer;
        this.goalNumber = goalNumber;
        this.firstAssist = firstAssist;
        this.firstAssisNumber = firstAssisNumber;
        this.secondAssist = secondAssist;
        this.secondAssisNumber = secondAssisNumber;
        this.homeGoalNumber = homeGoalNumber;
        this.awayGoalNumber = awayGoalNumber;
        this.team = team;
    }

    toString() : string {
        let assistString: string;

        if (this.firstAssist !== undefined) {
            assistString = `${this.firstAssist.name} (${this.firstAssisNumber})`;

            if (this.secondAssist !== undefined) {
                assistString += ` ${this.secondAssist.name} (${this.secondAssisNumber})`;
            }
        }
        else {
            assistString = "Unassisted";
        }

        return `${getGameTime(this.time)} ${this.team.name} ${this.homeGoalNumber}-${this.awayGoalNumber} | ${this.goalScorer.name} (${this.goalNumber}) ${assistString}`
    }
}

class Game {
    score: ScoreBoard;
    date: Date;
    scoringRate: number;
    scoreModifier: number;
    periodLength: number;
    nbPeriod: number;
    goalieBase: number;
    homeTeam: GameTeam;
    awayTeam: GameTeam;

    constructor(date: Date, homeTeam: Team, awayTeam: Team) {
        this.date = date;
        this.scoringRate = 1.5;
        this.scoreModifier = 0.02;
        this.periodLength = 20;
        this.nbPeriod = 3;

        this.goalieBase = 0.6;

        this.homeTeam = new GameTeam(homeTeam);
        this.awayTeam = new GameTeam(awayTeam);
    }

    setGameLines(players: Player[]) {
        this.setTeamGameLines(this.homeTeam, players);
        this.setTeamGameLines(this.awayTeam, players);
    }

    setTeamGameLines(gameTeam: GameTeam, players: Player[]) {
        gameTeam.lines = new GameLines();

        let offLines = gameTeam.team.lines.filter(r => r.type === LineType.ForwardLine).sort((a, b) => a.lineNumber - b.lineNumber);
        for (let offLine of offLines) {
            let leftWingId = offLine.playerLines.find(r => r.position === PlayerPosition.leftWing).playerId;
            let leftWing = players.find(r => r.id === leftWingId) as Skater;
            let centerId = offLine.playerLines.find(r => r.position === PlayerPosition.center).playerId;
            let center = players.find(r => r.id === centerId) as Skater;
            let rightWingId = offLine.playerLines.find(r => r.position === PlayerPosition.rightWing).playerId;
            let rightWing = players.find(r => r.id === rightWingId) as Skater;

            gameTeam.lines.addForwardLine(new ForwardLine(leftWing, center, rightWing, offLine.timeOnIce, offLine.lineNumber));
        }

        let defLines = gameTeam.team.lines.filter(r => r.type === LineType.DefenceLine).sort((a, b) => a.lineNumber - b.lineNumber);
        for (let defLine of defLines) {
            let leftDefId = defLine.playerLines.find(r => r.position === PlayerPosition.leftDefenceman).playerId;
            let leftDef = players.find(r => r.id === leftDefId) as Skater;
            let rightDefId = defLine.playerLines.find(r => r.position === PlayerPosition.rightDefenceman).playerId;
            let rightDef = players.find(r => r.id === rightDefId) as Skater;

            gameTeam.lines.addDefenceLine(new DefenceLine(leftDef, rightDef, defLine.timeOnIce, defLine.lineNumber));
        }

        let goalies = gameTeam.team.lines.filter(r => r.type === LineType.Goalie);
        let goalie1Id = goalies.find(r => r.lineNumber === 1).playerLines[0].playerId;
        let goalie1 = players.find(r => r.id === goalie1Id) as Goalie;
        let goalie2Id = goalies.find(r => r.lineNumber === 2).playerLines[0].playerId;
        let goalie2 = players.find(r => r.id === goalie2Id) as Goalie;

        gameTeam.lines.addGoalies(goalie1, goalie2);
    }

    simulate(): void {
        let homeTeamWin: Boolean;
        let overTime: boolean = false;

        this.score = new ScoreBoard(1, this.date, this.homeTeam, this.awayTeam)
    
        for (var p = 1; p <= this.nbPeriod; p++) {
            let per = {name: "Period " + p, goals: []};

            this.homeTeam.lines.resetLines();
            this.awayTeam.lines.resetLines();
    
            for (var i = 0; i < 60 * this.periodLength; i++) {
                this.simulateMin(i, per);
            }
    
            this.score.periods.push(per);
        }
    
        if (this.homeTeam.goal === this.awayTeam.goal) {
            let per = {name: "Overtime", goals: []};
    
            let otGoal = false;
            let i = 0;
            
            while (!otGoal) {
                otGoal = this.simulateMin(i, per);
    
                i++;
            }
    
            this.score.periods.push(per);

            overTime = true;
        }

        homeTeamWin = this.homeTeam.goal > this.awayTeam.goal;

        if (overTime) {
            if (homeTeamWin) {
                this.homeTeam.team.results.win++;
                this.awayTeam.team.results.otl++;
            } else {
                this.homeTeam.team.results.otl++;
                this.awayTeam.team.results.win++;
            }
        }
        else {
            if (homeTeamWin) {
                this.homeTeam.team.results.win++;
                this.awayTeam.team.results.lose++;
            } else {
                this.homeTeam.team.results.lose++;
                this.awayTeam.team.results.win++;
            }
        }
        
        let homePlayers = this.homeTeam.lines.getSkater();
        for (let homePlayer of homePlayers) {
            homePlayer.stats.gamePlayed++;
        }
        let awayPlayers = this.awayTeam.lines.getSkater();
        for (let awayPlayer of awayPlayers) {
            awayPlayer.stats.gamePlayed++;
        }
    }
    
    simulateMin(time: number, period: GamePeriod): boolean {
        let goal = false;
    
        let totOff = this.homeTeam.lines.lineOffense() + this.awayTeam.lines.lineOffense();
        let totDef = this.homeTeam.lines.lineDefense() + this.awayTeam.lines.lineDefense();
    
        let score = (totOff / 2) - (totDef / 2);
        score *= this.scoreModifier;
    
        if (this.scoringRate + score > Math.random() * 100) {
            let offenceTeam = ((this.homeTeam.lines.lineOffense() - this.awayTeam.lines.lineOffense()) / 100) + 0.5 < Math.random() ? this.homeTeam : this.awayTeam;
            let defenseTeam = offenceTeam.team.id === this.homeTeam.team.id ? this.awayTeam : this.homeTeam;
    
            offenceTeam.shoot++;
    
            if (defenseTeam.lines.firstGoalie.ov * (1 - this.goalieBase) + (this.goalieBase * 100) < Math.random() * 100) {
                offenceTeam.goal++;
                goal = true;
    
                let scorer = this.getGoalScorer(offenceTeam.lines.currentFwdLine, offenceTeam.lines.currentDefLine);
                let primAssistSkater = this.getGoalPrimAssist(offenceTeam.lines.currentFwdLine, offenceTeam.lines.currentDefLine, scorer);
                let secAssistSkater : Skater = undefined;
                scorer.goal++;
                scorer.stats.goal++;

                if (primAssistSkater !== undefined) {
                    primAssistSkater.assist++;
                    primAssistSkater.stats.assist++;
    
                    secAssistSkater = this.getGoalSecAssist(offenceTeam.lines.currentFwdLine, offenceTeam.lines.currentDefLine, scorer, primAssistSkater);
                    if (secAssistSkater !== undefined) {
                        secAssistSkater.assist++;
                        secAssistSkater.stats.assist++;
                    }
                }

                period.goals.push(new GameGoal(time, scorer, scorer.goal, primAssistSkater, primAssistSkater?.assist, secAssistSkater, secAssistSkater?.assist, this.homeTeam.goal, this.awayTeam.goal, offenceTeam.team));
            }
        }
    
        this.homeTeam.lines.changeIfTired();
        this.awayTeam.lines.changeIfTired();
    
        return goal;
    }
    
    getGoalScorer(fwdLine: ForwardLine, defLine: DefenceLine): Skater {
        return this.getSkaterBasedOnOffence(fwdLine, defLine, 0);
    }
    
    getGoalPrimAssist(fwdLine: ForwardLine, defLine: DefenceLine, scorer: Skater): Skater {
        return this.getSkaterBasedOnOffence(fwdLine, defLine, 50, scorer);
    }
    
    getGoalSecAssist(fwdLine: ForwardLine, defLine: DefenceLine, scorer: Skater, primAssist: Skater): Skater {
        return this.getSkaterBasedOnOffence(fwdLine, defLine, 50, scorer, primAssist);
    }
    
    getSkaterBasedOnOffence(fwdLine: ForwardLine, defLine: DefenceLine, noSkater: number, ...skaterToExclude: Skater[]): Skater {
        let rdn = Math.random();
        let skater: Skater;
    
        let idsToExclude = new Array(skaterToExclude.length);
        let offToExclude = 0;
        for (let i = 0; i < skaterToExclude.length; i++) {
            offToExclude += skaterToExclude[i].off;
            idsToExclude.push(skaterToExclude[i].id);
        }
        
        let totOff = fwdLine.leftWing.off + fwdLine.center.off + fwdLine.rightWing.off + defLine.leftDefenceman.off + defLine.rightDefenceman.off + noSkater - offToExclude;
        
        let lw = !idsToExclude.includes(fwdLine.leftWing.id, 0) ? fwdLine.leftWing.off / totOff : 0;
        let c = !idsToExclude.includes(fwdLine.center.id, 0) ? fwdLine.center.off / totOff : 0;
        let rw = !idsToExclude.includes(fwdLine.rightWing.id, 0) ? fwdLine.rightWing.off / totOff : 0;
        let ld = !idsToExclude.includes(defLine.leftDefenceman.id, 0) ? defLine.leftDefenceman.off / totOff : 0;
        let rd = !idsToExclude.includes(defLine.rightDefenceman.id, 0) ? defLine.rightDefenceman.off / totOff : 0;
        let none = noSkater / totOff;
    
        if (lw > rdn)
            skater = fwdLine.leftWing;
        else if (lw + c > rdn)
            skater = fwdLine.center;
        else if (lw + c + rw > rdn)
            skater = fwdLine.rightWing;
        else if (lw + c + rw + ld > rdn)
            skater = defLine.leftDefenceman;
        else if (lw + c + rw + ld + rd > rdn)
            skater = defLine.rightDefenceman;
        else if (lw + c + rw + ld + rd + none > rdn)
            skater = undefined;
    
        return skater;
    }
    
    generatePlayers(players: Player[]): void {
        document.getElementById("team1").innerHTML = this.homeTeam.team.getPlayersTable(players);
        document.getElementById("team2").innerHTML = this.awayTeam.team.getPlayersTable(players);
    }
}

export {
    Game
};