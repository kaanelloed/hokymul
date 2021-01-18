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
    interGames: number;
    currentDate: Date;
    todayGames: GamesDay;
    salaryCap: number;
    floorCap: number;

    constructor() {
        this.settings = new LeagueSettings();
        this.conferences = [];
        this.interGames = 2;
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
        return this.getTeams().find(t => t.id === teamId)
    }

    getTeams(): Team[] {
        let teams: Team[] = [];

        for (let conference of this.conferences) {
            teams = teams.concat(conference.getTeams());
        }

        return teams;
    }

    getPlayers(): Player[] {
        let players: Player[] = [];

        for (let conference of this.conferences) {
            players = players.concat(conference.getPlayers());
        }

        return players;
    }

    generateTestLeague(league: League) {
        let teamDiv1 = ["Boston", "Buffalo", "Detroit", "Florida", "Montréal", "Ottawa", "Tampa Bay", "Toronto"];
        let teamDiv2 = ["Carolina", "Columbus", "New Jersey", "New York I", "New York R", "Philadelphia", "Pittsburgh", "Washington"];
        let teamDiv3 = ["Arizona", "Chicago", "Colorado", "Dallas", "Minnesota", "Nashville", "St. Louis", "Winniped"];
        let teamDiv4 = ["Anaheim", "Calgary", "Edmonton", "Los Angeles", "San Jose", "Seattle", "Vancouver", "Vegas"];
        let i: number;

        i = 1;

        let conf1: Conference, conf2: Conference;
        let div1: Division, div2: Division, div3: Division, div4: Division;

        div1 = new Division();
        div2 = new Division();
        div3 = new Division();
        div4 = new Division();

        for (let str of teamDiv1) {
            let team = new Team(i++, str);
            team.generateTeamPlayers();
            team.autoLine(league.settings.nbOffensiveLine, league.settings.nbDefensiveLine);
            div1.addTeam(team);
        }

        for (let str of teamDiv2) {
            let team = new Team(i++, str);
            team.generateTeamPlayers();
            team.autoLine(league.settings.nbOffensiveLine, league.settings.nbDefensiveLine);
            div2.addTeam(team);
        }

        for (let str of teamDiv3) {
            let team = new Team(i++, str);
            team.generateTeamPlayers();
            team.autoLine(league.settings.nbOffensiveLine, league.settings.nbDefensiveLine);
            div3.addTeam(team);
        }

        for (let str of teamDiv4) {
            let team = new Team(i++, str);
            team.generateTeamPlayers();
            team.autoLine(league.settings.nbOffensiveLine, league.settings.nbDefensiveLine);
            div4.addTeam(team);
        }

        conf1 = new Conference();
        conf2 = new Conference();

        conf1.addDivisions(div1, div2);
        conf2.addDivisions(div3, div4);

        league.addConferences(conf1, conf2);

        let calendar = new CalendarGenerator(league);
        calendar.generate(league);
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
            strTable += `<tr id="game${i}" data-gameId="${i - 1}"><td>${gameDay.homeTeam.name}</td><td>${gameDay.awayTeam.name}</td></tr>`;
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
            strTable += `<tr id="game${i}" data-gameId="${i - 1}"><td>${gameDay.homeTeam.name} ${gameDay.game.homeTeam.goal}</td><td>${gameDay.awayTeam.name} ${gameDay.game.awayTeam.goal}</td><td onclick="toggleScore(${i})">↓</td></tr>`;
            strTable += `<tr id="gameScore${i}" hidden><td colspan="3">${gameDay.game.score.toString()}</td></tr>`;
            i++;
        }

        return strTable;
    }

    simulateDay(): void {
        let gameDay: GameDay;

        if (this.todayGames.gamesPlayed)
            return;

        for(gameDay of this.todayGames.games) {
            let game: Game;

            game = new Game(this.currentDate, gameDay.homeTeam, gameDay.awayTeam);
            game.simulate();
            gameDay.game = game;
        }

        this.todayGames.gamesPlayed = true;
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
    intraGames: number;

    constructor() {
        this.divisions = [];
        this.intraGames = 3;
    }

    addDivision(division: Division): void {
        this.divisions.push(division);
    }

    addDivisions(...divisions: Division[]): void {
        for (let division of divisions) {
            this.addDivision(division);
        }
    }

    getTeams(): Team[] {
        let teams: Team[] = [];

        for (let division of this.divisions) {
            teams = teams.concat(division.teams);
        }

        return teams;
    }

    getPlayers(): Player[] {
        let players: Player[] = [];

        for (let division of this.divisions) {
            players = players.concat(division.getPlayers());
        }

        return players;
    }
}

class Division {
    teams: Team[];
    intraGamesMax: number;
    intraGamesMin: number;

    constructor() {
        this.teams = [];
        this.intraGamesMax = 4;
        this.intraGamesMin = 3;
    }

    addTeam(team: Team): void {
        this.teams.push(team);
    }

    addTeams(...teams: Team[]): void {
        for (let team of teams) {
            this.addTeam(team);
        }
    }

    getPlayers(): Player[] {
        let players: Player[] = [];

        for (let team of this.teams) {
            players = players.concat(team.players);
        }

        return players;
    }
}

export {
    League,
    Division,
    Conference
};