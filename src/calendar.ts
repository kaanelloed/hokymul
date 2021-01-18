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

import {League, Division, Conference} from './league.js';
import {Game} from './game.js';
import {Team} from './team.js';

class Calendar {
    gamesDays: GamesDay[];
    seasonStart: Date;
    seasonEnd: Date;
    seasonLength: number;

    constructor() {
        this.gamesDays = [];
    }

    addGameDay(gamesDay: GamesDay): void {
        this.gamesDays.push(gamesDay);
    }
}

class GamesDay {
    date: Date;
    games: GameDay[];
    gamesPlayed: boolean;

    constructor(date: Date) {
        this.date = date;
        this.games = [];
        this.gamesPlayed = false;
    }

    addGameDay(gameDay: GameDay): void {
        this.games.push(gameDay);
    }
}

class GameDay {
    homeTeam: Team;
    awayTeam: Team;
    game: Game;

    constructor(home: Team, away: Team) {
        this.homeTeam = home;
        this.awayTeam = away;

        this.game = undefined;
    }
}

class CalendarGenerator {
    league: League;
    seasonStart: Date;
    seasonEnd: Date;
    maxConsectiveGame: number;
    msInDay: number;
    seasonLength: number;

    constructor(league: League) {
        this.league = league;
        this.seasonStart = new Date(2020, 9, 5);
        this.seasonEnd = new Date(2021, 3, 3);
        this.maxConsectiveGame = 2;
        this.msInDay = this.getTotalMsInDay();
        this.seasonLength = this.daysDifference(this.seasonStart, this.seasonEnd)
    }

    generate(league: League): void {
        let calendar: Calendar;
        let currentDate: Date;
        let daysLeft: number;
        let availDays: number;

        calendar = new Calendar();
        let calLeague = new CalendarLeague(this.league);

        currentDate = new Date(this.seasonStart);
        availDays = this.maxConsectiveGame / (this.maxConsectiveGame + 1);

        while (currentDate.valueOf() <= this.seasonEnd.valueOf()) {
            let gamesDay = new GamesDay(new Date(currentDate));
            calLeague.resetToday();
            daysLeft = Math.floor(this.daysDifference(currentDate, this.seasonEnd) * availDays);

            for (let calTeam of calLeague.getTeams()) {
                let gameLeft = calTeam.totalHomeGames - calTeam.currentHomeGames;
        
                if (gameLeft / daysLeft > Math.random() && calTeam.teamAvailable()) {
                    let away = calLeague.getOtherRandomTeam(calTeam.team.id);;
                    
                    if (away !== undefined) {
                        calTeam.createHomeGame(away);
                        gamesDay.addGameDay(new GameDay(calTeam.team, away.team));
                        //console.log(`${currentDate.toLocaleDateString("fr-CA")} - ${calTeam.team.name} vs ${away.team.name}`);
                    }
                }
            }

            calendar.addGameDay(gamesDay);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        calendar.seasonStart = this.seasonStart;
        calendar.seasonEnd = this.seasonEnd;
        calendar.seasonLength = this.seasonLength;

        league.calendar = calendar;
        league.currentDate = this.seasonStart;
    }

    private getTotalMsInDay(): number {
        var totalMsInSec = 1000;
        var totalSecInMin = 60;
        var totalMinInHrs = 60;
        var totalHrsInDay = 24;
    
        return totalMsInSec * totalSecInMin * totalMinInHrs * totalHrsInDay;
    }

    private daysDifference(date1: Date, date2: Date): number {
        return Math.round((date2.valueOf() - date1.valueOf()) / this.msInDay)
    }
}

class CalendarLeague {
    calendarConferences: CalendarConference[];
    league: League;

    constructor(league: League) {
        this.calendarConferences = [];
        this.league = league;

        for (let conference of league.conferences) {
            this.calendarConferences.push(new CalendarConference(conference));
        }
    }

    getTeams(): CalendarTeam[] {
        let teams: CalendarTeam[] = [];

        for (let conference of this.calendarConferences) {
            teams = teams.concat(conference.getTeams());
        }

        return teams;
    }

    getOtherRandomTeam(teamId: number): CalendarTeam {
        let teams: CalendarTeam[], availTeams: CalendarTeam[] = [];
        let team: CalendarTeam;
        let i: number;

        teams = this.getTeams();

        for (let calTeam of teams) {
            if (calTeam.team.id !== teamId && calTeam.teamAvailable() && calTeam.currentAwayGames !== calTeam.totalAwayGames)
                availTeams.push(calTeam);
        }

        if (availTeams.length > 0) {
            i = Math.random() * availTeams.length;
            i = Math.round(i);
            team = availTeams[i];
        }

        return team;
    }

    resetToday(): void {
        let teams: CalendarTeam[];

        teams = this.getTeams();
        for (let team of teams) {
            team.resetToday();
        }
    }
}

class CalendarConference {
    calendarDivisions: CalendarDivison[];
    conference: Conference;

    constructor(conference: Conference) {
        this.calendarDivisions = [];
        this.conference = conference;

        for (let division of conference.divisions) {
            this.calendarDivisions.push(new CalendarDivison(division));
        }
    }

    getTeams(): CalendarTeam[] {
        let teams: CalendarTeam[] = [];

        for (let calDivision of this.calendarDivisions) {
            teams = teams.concat(calDivision.calendarTeams);
        }

        return teams;
    }
}

class CalendarDivison {
    calendarTeams: CalendarTeam[];
    division: Division;

    constructor(division: Division) {
        this.calendarTeams = [];
        this.division = division;

        for (let team of division.teams) {
            this.calendarTeams.push(new CalendarTeam(team));
        }
    }
}

class CalendarTeam {
    currentHomeGames: number;
    currentAwayGames: number;
    currentGames: number;
    totalHomeGames: number;
    totalAwayGames: number;
    totalGames: number;
    team: Team;
    playedToday: boolean;
    consecutiveGameDay: number;

    constructor(team: Team) {
        this.team = team;
        this.currentHomeGames = 0;
        this.currentAwayGames = 0;
        this.currentGames = 0;
        this.totalHomeGames = 41;
        this.totalAwayGames = 41;
        this.totalGames = 82;
        this.playedToday = false;
        this.consecutiveGameDay = 0;
    }

    createHomeGame(awayTeam: CalendarTeam): void {
        this.currentHomeGames++;
        this.createGame();

        awayTeam.createAwayGame();
    }

    createAwayGame(): void {
        this.currentAwayGames++;
        this.createGame();
    }

    createGame(): void {
        this.currentGames++;
        this.consecutiveGameDay++;
        this.playedToday = true;
    }

    teamAvailable(): boolean {
        return !this.playedToday && this.consecutiveGameDay <= 2;
    }

    resetToday(): void {
        if (!this.playedToday)
            this.consecutiveGameDay = 0;
        this.playedToday = false;
    }
};

export {
    Calendar,
    GameDay,
    GamesDay,
    CalendarGenerator
};