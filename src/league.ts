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

import {Calendar, GameDay, GamesDay, CalendarGenerator} from './calendar.js'
import {Game} from './game.js';
import {Player} from './player.js';
import {Team} from './team.js';

class League {
    settings: LeagueSettings;
    calendar: Calendar;
    conferences: Conference[];
    teams: Team[];
    interGames: number;
    currentDate: Date;
    todayGames: GamesDay;
    salaryCap: number;
    floorCap: number;
    leagueId: number;

    constructor(id: number) {
        this.settings = new LeagueSettings();
        this.conferences = [];
        this.teams = [];
        this.interGames = 2;
        this.leagueId = id;
    }

    addConference(conference: Conference): void {
        this.conferences.push(conference);
    }

    addConferences(...conferences: Conference[]): void {
        for (let conference of conferences) {
            this.addConference(conference);
        }
    }

    getTeam(teamId: number): Team {
        return this.teams.find(t => t.id === teamId)
    }

    static generateTestLeague(players: Player[]): League {
        let league: League;
        let teamDiv1 = ["Boston", "Buffalo", "Detroit", "Florida", "Montréal", "Ottawa", "Tampa Bay", "Toronto"];
        let teamDiv2 = ["Carolina", "Columbus", "New Jersey", "New York I", "New York R", "Philadelphia", "Pittsburgh", "Washington"];
        let teamDiv3 = ["Arizona", "Chicago", "Colorado", "Dallas", "Minnesota", "Nashville", "St. Louis", "Winniped"];
        let teamDiv4 = ["Anaheim", "Calgary", "Edmonton", "Los Angeles", "San Jose", "Seattle", "Vancouver", "Vegas"];
        let i: number;

        i = 1;
        league = new League(1);

        let conf1: Conference, conf2: Conference;
        let div1: Division, div2: Division, div3: Division, div4: Division;

        div1 = new Division(0);
        div2 = new Division(1);
        div3 = new Division(2);
        div4 = new Division(3);

        i = div1.generateTestTeams(league, teamDiv1, i, players);
        i = div2.generateTestTeams(league, teamDiv2, i, players);
        i = div3.generateTestTeams(league, teamDiv3, i, players);
        i = div4.generateTestTeams(league, teamDiv4, i, players);

        conf1 = new Conference(0);
        conf2 = new Conference(1);

        conf1.addDivisions(div1, div2);
        conf2.addDivisions(div3, div4);

        league.addConferences(conf1, conf2);

        let calendar = new CalendarGenerator(league);
        calendar.generate(league);

        return league;
    }

    goToNextDay() : void {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        this.setTodayGames();
    }

    setTodayGames(): void {
        this.todayGames = this.calendar.gamesDays.find(r => r.date.valueOf() === this.currentDate.valueOf());
    }

    generateGameDayTable(): string {
        let gameDay: GameDay;
        let strTable: string;
        let i: number = 1;

        strTable = "<tr><td><i>Home</i></td><td><i>Away</i></td></tr>"

        for(gameDay of this.todayGames.games) {
            let homeTeam = this.teams.find(r => r.id === gameDay.homeTeamId);
            let awayTeam = this.teams.find(r => r.id === gameDay.awayTeamId);

            strTable += `<tr id="game${i}" data-gameId="${i - 1}"><td>${homeTeam.name}</td><td>${awayTeam.name}</td></tr>`;
            i++;
        }

        return strTable;
    }

    generateGameDayResultTable(): string {
        let gameDay: GameDay;
        let strTable: string;
        let i: number = 1;

        strTable = "<tr><td><i>Home</i></td><td><i>Away</i></td><td></td></tr>"

        for(gameDay of this.todayGames.games) {
            let homeTeam = this.teams.find(r => r.id === gameDay.homeTeamId);
            let awayTeam = this.teams.find(r => r.id === gameDay.awayTeamId);

            strTable += `<tr id="game${i}" data-gameId="${i - 1}"><td>${homeTeam.name} ${gameDay.game.homeTeam.goal}</td><td>${awayTeam.name} ${gameDay.game.awayTeam.goal}</td><td onclick="toggleScore(${i})">↓</td></tr>`;
            strTable += `<tr id="gameScore${i}" hidden><td colspan="3">${gameDay.game.score.toString()}</td></tr>`;
            i++;
        }

        return strTable;
    }

    simulateDay(players: Player[]): void {
        let gameDay: GameDay;

        if (this.todayGames.gamesPlayed)
            return;

        for(gameDay of this.todayGames.games) {
            let game: Game;

            let homeTeam = this.teams.find(r => r.id === gameDay.homeTeamId);
            let awayTeam = this.teams.find(r => r.id === gameDay.awayTeamId);

            game = new Game(this.currentDate, homeTeam, awayTeam);
            game.setGameLines(players);
            game.simulate();
            gameDay.game = game;
        }

        this.todayGames.gamesPlayed = true;
    }

    static fromObject(obj: any): League {
        let inst: League;

        inst = Object.assign(new League(0), obj);
        inst.currentDate = new Date(inst.currentDate);
        inst.calendar = Calendar.fromObject(inst.calendar);
        for (let i = 0; i < inst.conferences.length; i++) {
            inst.conferences[i] = Conference.fromObject(inst.conferences[i]);
        }
        for (let i = 0; i < inst.teams.length; i++) {
            inst.teams[i] = Team.fromObject(inst.teams[i]);
        }

        return inst;
    }
}

class LeagueSettings {
    periodLength: number;
    periodDesc: boolean;
    nbPeriod: number;
    nbOffensiveLine: number;
    nbDefensiveLine: number;

    constructor() {
        this.periodLength = 20;
        this.periodDesc = true;
        this.nbPeriod = 3;
        this.nbOffensiveLine = 4;
        this.nbDefensiveLine = 3;
    }
}

class Conference {
    divisions: Division[];
    conferenceId: number;
    intraGames: number;

    constructor(id: number) {
        this.conferenceId = id;
        this.divisions = [];
        this.intraGames = 3;
    }

    addDivision(division: Division): void {
        division.conferenceId = this.conferenceId;
        this.divisions.push(division);
    }

    addDivisions(...divisions: Division[]): void {
        for (let division of divisions) {
            this.addDivision(division);
        }
    }

    static fromObject(obj: any): Conference {
        let inst: Conference;

        inst = Object.assign(new Conference(0), obj);
        for (let i = 0; i < inst.divisions.length; i++) {
            inst.divisions[i] = Division.fromObject(inst.divisions[i]);
        }

        return inst;
    }
}

class Division {
    divisionId: number;
    conferenceId: number;
    intraGamesMax: number;
    intraGamesMin: number;

    constructor(id: number) {
        this.divisionId = id;
        this.conferenceId = undefined;
        this.intraGamesMax = 4;
        this.intraGamesMin = 3;
    }

    generateTestTeams(league: League, teamsNames: string[], teamId: number, players: Player[]): number {
        let id: number = 0;

        if (players.length > 0) {
            id = players.map(r => r.id).reduce((a, b) => Math.max(a, b)) + 1;
        }

        for (let str of teamsNames) {
            let team = new Team(teamId++, str, this.conferenceId, this.divisionId);
            id = team.generateTeamPlayers(players, id);
            team.autoLine(players.filter(r => r.teamId === team.id), league.settings.nbOffensiveLine, league.settings.nbDefensiveLine);
            league.teams.push(team);
        }

        return teamId;
    }

    static fromObject(obj: any): Division {
        let inst: Division;

        inst = Object.assign(new Division(0), obj);

        return inst;
    }
}

export {
    League,
    Division,
    Conference
};