class League {
    settings: LeagueSettings;
    teams: Team[];

    constructor() {
        this.settings = new LeagueSettings();
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