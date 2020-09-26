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

class Player {
    id: number;
    name: string;
    team: Team;
    pos: PlayerPosition;
    ov: number;

    constructor(id: number, name: string, team: Team, pos: PlayerPosition, ov: number) {
        this.id = id;
        this.name = name;
        this.pos = pos;
        this.setTeam(team);
        this.ov = ov;
    }

    setTeam(team: Team): void {
        this.team = team;
        team.players.push(this);
    }

    getPositionCode(): string {
        let text: string = "";

        switch (this.pos) {
            case PlayerPosition.leftWing:
                text = "LW";
                break;
            case PlayerPosition.center:
                text = "C";
                break;
            case PlayerPosition.rightWing:
                text = "RW";
                break;
            case PlayerPosition.leftDefenceman:
                text = "LD";
                break;
            case PlayerPosition.rightDefenceman:
                text = "RD";
                break;
            case PlayerPosition.goalie:
                text = "G";
                break;
        }

        return text;
    }
}

enum PlayerPosition {
    leftWing,
    center,
    rightWing,
    leftDefenceman,
    rightDefenceman,
    goalie
}

class Skater extends Player{
    id: number;
    name: string;
    off: number;
    def: number;
    goal: number;
    assist: number;

    constructor(id: number, name: string, team: Team, pos: PlayerPosition, off: number, def: number) {
        super(id, name, team, pos, Math.round((off + def) / 2));
        this.off = off;
        this.def = def;
        this.goal = 0;
        this.assist = 0;
    }

    resetScore(): void {
        this.goal = 0;
        this.assist = 0;
    }
}

class Goalie extends Player {
    constructor(id: number, name: string, team: Team, ov: number) {
        super(id, name, team, PlayerPosition.goalie, ov);
    }
}