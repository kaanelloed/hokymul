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

class League {
    settings: LeagueSettings;
    conferences: Conference[];
    interGames: number;

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

    getTeams(): Team[] {
        let teams: Team[] = [];

        for (let conference of this.conferences) {
            teams = teams.concat(conference.getTeams());
        }

        return teams;
    }

    generateLeague() {
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
            div1.addTeam(team);
        }

        for (let str of teamDiv2) {
            let team = new Team(i++, str);
            div2.addTeam(team);
        }

        for (let str of teamDiv3) {
            let team = new Team(i++, str);
            div3.addTeam(team);
        }

        for (let str of teamDiv4) {
            let team = new Team(i++, str);
            div4.addTeam(team);
        }

        conf1 = new Conference();
        conf2 = new Conference();

        conf1.addDivisions(div1, div2);
        conf2.addDivisions(div3, div4);

        league.addConferences(conf1, conf2);
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
}