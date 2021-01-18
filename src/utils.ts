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

function getGameTime(time: number): string {
    let scoreTime = new Date(time * 1000);
    return scoreTime.getMinutes().toString().padStart(2, "0") + ":" + scoreTime.getSeconds().toString().padStart(2, "0");
}

function randomBetween(min: number, max: number): number {
    return min + Math.round(Math.random() * (max - min));
}

export {
    getGameTime,
    randomBetween
};