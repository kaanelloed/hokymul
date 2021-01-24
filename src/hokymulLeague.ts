// Hokymul - Hockey simulator
// Copyright (C) 2021  David Proulx
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { League } from "./league.js";
import { Goalie, Player, Skater } from "./player.js";

class HokymulLeague {
    players: Player[];
    mainLeague: League;
    createdDate: Date;
    lastUpdateDate: Date;

    constructor() {
        this.createdDate = new Date(Date.now());
        this.lastUpdateDate = new Date(Date.now());
    }

    generateTestLeague(): void {
        this.players = [];
        this.mainLeague = League.generateTestLeague(this.players);
    }

    static fromObject(obj: any): HokymulLeague {
        let inst: HokymulLeague;

        inst = Object.assign(new HokymulLeague(), obj);
        inst.createdDate = new Date(inst.createdDate);
        inst.lastUpdateDate = new Date(inst.lastUpdateDate);
        inst.mainLeague = League.fromObject(inst.mainLeague);
        for (let i = 0; i < inst.players.length; i++) {
            if (inst.players[i].pos !== 5) {
                inst.players[i] = Skater.fromObject(inst.players[i]);
            }
            else {
                inst.players[i] = Goalie.fromObject(inst.players[i]);
            }
        }

        return inst;
    }
}

export {
    HokymulLeague
};