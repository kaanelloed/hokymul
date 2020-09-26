class Team {
    id: number;
    name: string;
    shoot: number;
    goal: number;
    lines: TeamLines;
    players: Player[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.shoot = 0;
        this.goal = 0;
        this.players = [];

        this.lines = undefined;
    }

    isLinesSet(): boolean {
        return this.lines !== undefined;
    }

    resetScore(): void {
        this.shoot = 0;
        this.goal = 0;

        this.lines.resetScore();
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
}