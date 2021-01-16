class ScoreBoard {
    id: number;
    date: Date;
    homeTeam: Team;
    awayTeam: Team;
    periods: GamePeriod[];

    constructor(id: number, date: Date, homeTeam: Team, awayTeam: Team) {
        this.id = id;
        this.date = date;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.periods = [];
    }

    toString(): string {
        let text = `<div>${this.date.toLocaleDateString()}</div>`;

        text += `<div>${this.homeTeam.name} ${this.homeTeam.goal} - ${this.awayTeam.name} ${this.awayTeam.goal}</div>`;
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

    constructor(time: number, goalScorer: Skater, goalNumber: number, firstAssist: Skater, firstAssisNumber: number, secondAssist: Skater, secondAssisNumber: number, homeGoalNumber: number, awayGoalNumber: number) {
        this.time = time;
        this.goalScorer = goalScorer;
        this.goalNumber = goalNumber;
        this.firstAssist = firstAssist;
        this.firstAssisNumber = firstAssisNumber;
        this.secondAssist = secondAssist;
        this.secondAssisNumber = secondAssisNumber;
        this.homeGoalNumber = homeGoalNumber;
        this.awayGoalNumber = awayGoalNumber;
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

        return `${getGameTime(this.time)} ${this.goalScorer.team.name} ${this.homeGoalNumber}-${this.awayGoalNumber} | ${this.goalScorer.name} (${this.goalNumber}) ${assistString}`
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
    homeTeam: Team;
    awayTeam: Team;

    constructor(date: Date, homeTeam: Team, awayTeam: Team) {
        this.date = date;
        this.scoringRate = 1.5;
        this.scoreModifier = 0.02;
        this.periodLength = 20;
        this.nbPeriod = 3;

        this.goalieBase = 0.6;

        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }

    simulate(): void {
        let homeTeamWin: Boolean;
        let overTime: boolean = false;

        this.score = new ScoreBoard(1, this.date, this.homeTeam , this.awayTeam)
    
        this.homeTeam.resetScore();
        this.awayTeam.resetScore();
    
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
                this.homeTeam.results.win++;
                this.awayTeam.results.otl++;
            } else {
                this.homeTeam.results.otl++;
                this.awayTeam.results.win++;
            }
        }
        else {
            if (homeTeamWin) {
                this.homeTeam.results.win++;
                this.awayTeam.results.lose++;
            } else {
                this.homeTeam.results.lose++;
                this.awayTeam.results.win++;
            }
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
            let defenseTeam = offenceTeam.id === this.homeTeam.id ? this.awayTeam : this.homeTeam;
    
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

                period.goals.push(new GameGoal(time, scorer, scorer.goal, primAssistSkater, primAssistSkater?.assist, secAssistSkater, secAssistSkater?.assist, this.homeTeam.goal, this.awayTeam.goal));
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
    
    generatePlayers(): void {
        document.getElementById("team1").innerHTML = this.homeTeam.getPlayersTable();
        document.getElementById("team2").innerHTML = this.awayTeam.getPlayersTable();
    }
}