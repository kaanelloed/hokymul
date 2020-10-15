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

class Calendar {
    league: League;
    seasonStart: Date;
    seasonEnd: Date;
    maxConsectiveGame: number;
    msInDay: number;

    constructor(league: League) {
        this.league = league;
        this.seasonStart = new Date(2020, 9, 5);
        this.seasonEnd = new Date(2021, 3, 3);
        this.maxConsectiveGame = 2;
        this.msInDay = this.getTotalMsInDay();
    }

    generate(): void {
        let currentDate: Date;
        let daysLeft: number;
        let availDays: number;

        let calLeague = new CalendarLeague(this.league);

        currentDate = this.seasonStart;
        availDays = this.maxConsectiveGame / (this.maxConsectiveGame + 1);

        while (currentDate.valueOf() <= this.seasonEnd.valueOf()) {
            calLeague.resetToday();
            daysLeft = Math.floor(this.daysDifference(currentDate, this.seasonEnd) * availDays);

            for (let calTeam of calLeague.getTeams()) {
                let gameLeft = calTeam.totalHomeGames - calTeam.currentHomeGames;
        
                if (gameLeft / daysLeft > Math.random() && calTeam.teamAvailable()) {
                    let away = calLeague.getOtherRandomTeam(calTeam.team.id);;
                    
                    if (away !== undefined) {
                        calTeam.createHomeGame(away);
                        console.log(`${currentDate.toLocaleDateString("fr-CA")} - ${calTeam.team.name} vs ${away.team.name}`);
                    }
                }
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }
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
}