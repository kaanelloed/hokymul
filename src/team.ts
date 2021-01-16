class Team {
    id: number;
    name: string;
    shoot: number;
    goal: number;
    lines: TeamLines;
    players: Player[];
    results: TeamResults;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.shoot = 0;
        this.goal = 0;
        this.players = [];

        this.lines = undefined;
        this.results = new TeamResults();
    }

    isLinesSet(): boolean {
        return this.lines !== undefined;
    }

    resetScore(): void {
        this.shoot = 0;
        this.goal = 0;

        //this.lines.resetScore();
    }

    getPlayersTable(): string {
        let text = "<table><tr><td>Name</td><td>Position</td><td>Off</td><td>Def</td><td>Ov</td></tr>";
        let off = 0;
        let def = 0;

        for (let player of this.players) {
            if (player instanceof Skater) {
                off = player.off;
                def = player.def;
            }
            
            text += `<tr><td>${player.name}</td><td>${player.getPositionCode()}</td><td>${off ?? 0}</td><td>${def ?? 0}</td><td>${player.ov}</td></tr>`;

            off = 0;
            def = 0;
        }

        text += "</table>";
        return text;
    }

    generateTeamPlayers() {
        let id = 0;
        this.players = [];
    
        id = this.generateSkatersForPosition(this, PlayerPosition.leftWing, 60, 85, 55, 80, 4, id);
        id = this.generateSkatersForPosition(this, PlayerPosition.center, 60, 85, 55, 80, 4, id);
        id = this.generateSkatersForPosition(this, PlayerPosition.rightWing, 60, 85, 55, 80, 4, id);
        id = this.generateSkatersForPosition(this, PlayerPosition.leftDefenceman, 60, 85, 55, 80, 3, id);
        id = this.generateSkatersForPosition(this, PlayerPosition.rightDefenceman, 55, 80, 65, 85, 3, id);
        id = this.generateGoalies(this, 70, 85, 2, id);
    }

    generateSkatersForPosition(team: Team, pos: PlayerPosition, minOffence: number, maxOffence: number, minDefence: number, maxDefence: number, nbToGenerate: number, startingId: number): number {
        for(let i = 0; i < nbToGenerate; i++) {
            new Skater(startingId++, Player.generatePlayerName(), team, pos, randomBetween(minOffence, maxOffence), randomBetween(minDefence, maxDefence));
        }

        return startingId;
    }

    generateGoalies(team: Team, minOveral: number, maxOveral: number, nbToGenerate: number, startingId: number): number {
        for(let i = 0; i < nbToGenerate; i++) {
            new Goalie(startingId++, Player.generatePlayerName(), team, randomBetween(minOveral, maxOveral));
        }

        return startingId;
    }

    autoLine(): void {
        let leftWings: Player[] = [];
        let centers: Player[] = [];
        let rightWings: Player[] = [];
        let leftDefencemen: Player[] = [];
        let rightDefencemen: Player[] = [];
        let goalies: Player[] = [];

        leftWings = this.getPlayerDescending(PlayerPosition.leftWing);
        centers = this.getPlayerDescending(PlayerPosition.center);
        rightWings = this.getPlayerDescending(PlayerPosition.rightWing);
        leftDefencemen = this.getPlayerDescending(PlayerPosition.leftDefenceman);
        rightDefencemen = this.getPlayerDescending(PlayerPosition.rightDefenceman);
        goalies = this.getPlayerDescending(PlayerPosition.goalie);

        this.lines = new TeamLines();

        let toi = 80;
        for (let i = 1; i <= league.settings.nbOffensiveLine; i++) {
            this.lines.addForwardLine(new ForwardLine(leftWings[i - 1] as Skater, centers[i - 1] as Skater, rightWings[i - 1] as Skater, toi, i));
            toi -= 20;
        }

        toi = 70
        for (let i = 1; i <= league.settings.nbDefensiveLine; i++) {
            this.lines.addDefenceLine(new DefenceLine(leftDefencemen[i - 1] as Skater, rightDefencemen[i - 1] as Skater, toi, i));
            toi -= 20;
        }

        this.lines.addGoalies(goalies[0], goalies[1]);
    }

    private getPlayerDescending(position: PlayerPosition): Player[] {
        return this.players.filter(r => r.pos === position).sort((a, b) => b.ov - a.ov);
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

class TeamCapHit {
    projectedCapHit: number;
    dailyCapHit: number;
    projectedCapSpace: number;
    todayCapSpace: number;
    currentCapSpace: number;
    tradeDeadlineCapSpace: number;

    public calculateCap(team: Team, league: League) {
        let totalSalary: number = 0;
        let salaryOfDay: number;
        let daysLeft: number;
        let accruedCapSpace: number;
        let accruedCapHit: number;
        let date: Date;

        date = league.calendar.seasonStart;
        daysLeft = league.calendar.seasonLength;
        accruedCapHit = league.salaryCap;
        accruedCapSpace = 0;

        while (date.valueOf() <= league.currentDate.valueOf()) {
            salaryOfDay = 0;
            daysLeft--;

            for (let player of team.players) {
                salaryOfDay += player.salary / league.calendar.seasonLength;
            }

            totalSalary += salaryOfDay;

            this.projectedCapHit = salaryOfDay * daysLeft + totalSalary;
            this.dailyCapHit = salaryOfDay * league.calendar.seasonLength;

            this.projectedCapSpace = league.salaryCap - this.projectedCapHit;
            this.todayCapSpace = league.salaryCap - this.dailyCapHit;

            accruedCapHit += accruedCapSpace;
            this.currentCapSpace = accruedCapHit - this.dailyCapHit;
            accruedCapSpace = this.currentCapSpace / daysLeft;
        }
    }
}