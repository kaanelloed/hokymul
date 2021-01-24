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

import {Player, Skater, Goalie, PlayerPosition} from './player.js';
import {ForwardLine, DefenceLine, GameLines} from './gameLine.js';
import {Team} from './team.js';
import {HokymulLeague} from './hokymulLeague.js'

const { ipcRenderer } = require('electron')

let hokyLeague: HokymulLeague = undefined;

addTabClickEvent();

document.getElementById("btnNewGame").onclick = btnNewGame_Click;
document.getElementById("btnSave").onclick = saveHokymul_Click;
document.getElementById("btnOpen").onclick = openHokymul_Click;
document.getElementById("btnSimulate").onclick = btnSimulate_Click;
document.getElementById("btnNextDay").onclick = btnNextDay_Click;
document.getElementById("btnStanding").onclick = btnStanding_Click;
document.getElementById("btnStats").onclick = btnStats_Click;

document.getElementById("defaultTab").click();

function addTabClickEvent() {
    let tabButtons: HTMLCollectionOf<HTMLButtonElement>;

    tabButtons = document.getElementsByClassName("tabBtn") as HTMLCollectionOf<HTMLButtonElement>;
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].onclick = btnTab_Click;
    }
}

function btnSimulate_Click(): void {
    if (hokyLeague === undefined) return;
    
    hokyLeague.mainLeague.simulateDay(hokyLeague.players);
    document.getElementById("tblGames").innerHTML = hokyLeague.mainLeague.generateGameDayResultTable();
}

function btnEditLines_Click(btn: HTMLButtonElement): void {
    if (hokyLeague === undefined) return;
    let teamId = Number(btn.getAttribute("data-teamid"));
    let game = undefined;

    let currentTeam = teamId === game.homeTeam.id ? game.homeTeam : game.awayTeam;
    let lineTeam = document.getElementById("lineTeamName");
    lineTeam.innerText = currentTeam.name;
    lineTeam.setAttribute("data-teamId", currentTeam.id.toString());

    let playersList = document.getElementById("linePlayersList") as HTMLDivElement;

    let htmlPlayers = "";

    for (let player of currentTeam.players) {
        if (player instanceof Skater) {
            let skater = player as Skater;
            htmlPlayers += `<div class="linePlayer" draggable="true" ondragstart="dragstart_handler(event)" data-playerId="${skater.id}">${skater.name} ${skater.getPositionCode()} ${skater.off} ${skater.def} ${skater.ov}</div>`;
        }

        if (player instanceof Goalie) {
            htmlPlayers += `<div class="linePlayer" draggable="true" ondragstart="dragstart_handler(event)" data-playerId="${player.id}">${player.name} ${player.getPositionCode()} ${player.ov}</div>`;
        }
    }

    playersList.innerHTML = htmlPlayers;

    let tblLines = document.getElementById("tblTeams") as HTMLTableElement;
    let linesContent = "";
    let maxLines = Math.max(hokyLeague.mainLeague.settings.nbOffensiveLine, hokyLeague.mainLeague.settings.nbDefensiveLine);

    for (let i = 1; i <= maxLines; i++) {
        linesContent += "<tr><td>" + getLineName(i) + " Line</td></tr>";

        if (i <= hokyLeague.mainLeague.settings.nbOffensiveLine) {
            linesContent += "<tr><td>Left Wing</td><td>Center</td><td>Right Wing</td><td>TOI</td></tr>";
            linesContent += "<tr>";
            linesContent += "<td><p id=\"lw" + i + "\" class=\"teamLine\" ondrop=\"drop_handler(event)\" ondragover=\"dragover_handler(event)\">?</p></td>";
            linesContent += "<td><p id=\"c" + i + "\" class=\"teamLine\" ondrop=\"drop_handler(event)\" ondragover=\"dragover_handler(event)\">?</p></td>";
            linesContent += "<td><p id=\"rw" + i + "\" class=\"teamLine\" ondrop=\"drop_handler(event)\" ondragover=\"dragover_handler(event)\">?</p></td>";
            linesContent += "<td><input id=\"toiF" + i + "\" class=\"teamLine\" type=\"text\"></td>";
            linesContent += "</tr>";
        }

        if (i <= hokyLeague.mainLeague.settings.nbDefensiveLine) {
            linesContent += "<tr><td>Left Defenceman</td><td>Right Defenceman</td><td>TOI</td></tr>";
            linesContent += "<tr>";
            linesContent += "<td><p id=\"ld" + i + "\" class=\"teamLine\" ondrop=\"drop_handler(event)\" ondragover=\"dragover_handler(event)\">?</p></td>";
            linesContent += "<td><p id=\"rd" + i + "\" class=\"teamLine\" ondrop=\"drop_handler(event)\" ondragover=\"dragover_handler(event)\">?</p></td>";
            linesContent += "<td><input id=\"toiD" + i + "\" class=\"teamLine\" type=\"text\"></td>";
            linesContent += "</tr>";
        }
    }

    linesContent += "<tr><td>Goalies</td></tr>";
    linesContent += "<tr><td>1</td><td>2</td></tr>"
    linesContent += "<tr>"
    linesContent += "<td><p id=\"g1\" class=\"teamLine\" ondrop=\"drop_handler(event)\" ondragover=\"dragover_handler(event)\">?</p></td>"
    linesContent += "<td><p id=\"g2\" class=\"teamLine\" ondrop=\"drop_handler(event)\" ondragover=\"dragover_handler(event)\">?</p></td>"
    linesContent += "<td><button onclick=\"btnSaveLines_Click()\">Save</button></td>"
    linesContent += "<td><button onclick=\"btnAutoLines_Click()\">Auto</button></td>"
    linesContent += "</tr>"

    tblLines.innerHTML = linesContent;
}

function getLineName(lineNumber: number) : string {
    let name = "";

    switch (lineNumber) {
        case 1: name = "First";
            break;
        case 2: name = "Second";
            break;
        case 3: name = "Third";
            break;
        case 4: name = "Fourth";
            break;
        default: name = "Other";
            break;
    }

    return name;
}

function btnNewGame_Click(): void {
    hokyLeague = new HokymulLeague();
    hokyLeague.generateTestLeague();

    hokyLeague.mainLeague.setTodayGames();
    document.getElementById("tblGames").innerHTML = hokyLeague.mainLeague.generateGameDayTable();
    document.getElementById("currDate").innerHTML = hokyLeague.mainLeague.currentDate.toLocaleDateString();
}

function saveHokymul_Click(): void {
    if (hokyLeague === undefined) return;

    let jsonString: string;

    jsonString = JSON.stringify(hokyLeague);

    ipcRenderer.invoke("saveLeague", "scripts/test.json", jsonString).then((result) => {
        console.log(result);
    });
}

function openHokymul_Click(): void {
    ipcRenderer.invoke("openLeague", "scripts/test.json").then((result) => {
        hokyLeague = HokymulLeague.fromObject(JSON.parse(result));

        document.getElementById("tblGames").innerHTML = hokyLeague.mainLeague.generateGameDayTable();
        document.getElementById("currDate").innerHTML = hokyLeague.mainLeague.currentDate.toLocaleDateString();
    });
}

function btnNextDay_Click(): void {
    if (hokyLeague === undefined) return;

    if (!hokyLeague.mainLeague.todayGames.gamesPlayed)
        return;

    hokyLeague.mainLeague.goToNextDay();
    document.getElementById("tblGames").innerHTML = hokyLeague.mainLeague.generateGameDayTable();
    document.getElementById("currDate").innerHTML = hokyLeague.mainLeague.currentDate.toLocaleDateString();
}

function btnTab_Click(ev: MouseEvent): void {
    let tabs: HTMLCollectionOf<HTMLDivElement>;
    let tabButtons: HTMLCollectionOf<HTMLButtonElement>;

    tabs = document.getElementsByClassName("tabContent") as HTMLCollectionOf<HTMLDivElement>;
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }

    tabButtons = document.getElementsByClassName("tabBtn") as HTMLCollectionOf<HTMLButtonElement>;
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    let btn = ev.target as HTMLButtonElement

    document.getElementById(btn.getAttribute("data-divId")).style.display = "block";
    btn.className += " active";
}

function dragstart_handler(event: DragEvent) {
    let elm = (event.target) as HTMLElement;
    event.dataTransfer.setData("text/plain", elm.getAttribute("data-playerId"));
    event.dataTransfer.dropEffect = "copy";
}

function dragover_handler(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
}

function drop_handler(event: DragEvent) {
    event.preventDefault();

    let game = undefined;

    let playerId = Number(event.dataTransfer.getData("text/plain"));
    let teamId = Number(document.getElementById("lineTeamName").getAttribute("data-teamId"));
    let currentTeam = teamId === game.homeTeam.id ? game.homeTeam : game.awayTeam;

    for (let player of currentTeam.players) {
        if (player.id === playerId) {
            setPlayerToElement(player, event.target as HTMLElement);
        }
    }
}

function setPlayerToElement(player: Player, elm: HTMLElement) {
    elm.innerText = player.name;
    elm.setAttribute("data-playerId", player.id.toString());
}

function btnSaveLines_Click(): void {
    if (hokyLeague === undefined) return;

    let game = undefined;

    let teamId = Number(document.getElementById("lineTeamName").getAttribute("data-teamId"));
    let currentTeam = teamId === game.homeTeam.id ? game.homeTeam : game.awayTeam;

    if (!checkLines()) return;

    currentTeam.lines = new GameLines();

    let toi = 80;
    for (let i = 1; i <= hokyLeague.mainLeague.settings.nbOffensiveLine; i++) {
        currentTeam.lines.addForwardLine(new ForwardLine(getSkaterFromLine(currentTeam, "lw" + i), getSkaterFromLine(currentTeam, "c" + i), getSkaterFromLine(currentTeam, "rw" + i), toi, i));
        toi -= 20;
    }

    toi = 70
    for (let i = 1; i <= hokyLeague.mainLeague.settings.nbDefensiveLine; i++) {
        currentTeam.lines.addDefenceLine(new DefenceLine(getSkaterFromLine(currentTeam, "ld" + i), getSkaterFromLine(currentTeam, "rd" + i), toi, i));
        toi -= 20;
    }

    currentTeam.lines.addGoalies(getGoalieFromLine(currentTeam, "g1"), getGoalieFromLine(currentTeam, "g2"));
}

function btnSaveSettings_Click(): void {
    if (hokyLeague === undefined) return;
}

function checkLines(): boolean {
    let filled = true;

    filled = filled && checkLinesPosition("lw", 4);
    filled = filled && checkLinesPosition("c", 4);
    filled = filled && checkLinesPosition("rw", 4);
    filled = filled && checkLinesPosition("ld", 3);
    filled = filled && checkLinesPosition("rd", 3);
    filled = filled && checkLinesPosition("g", 2);

    return filled;
}

function checkLinesPosition(startingPos: string, numberOfLine: number): boolean {
    let filled = true;

    for(let i = 1; i <= numberOfLine; i++) {
        filled = filled && document.getElementById(startingPos + i).getAttribute("data-playerId") !== null;
    }

    return filled;
}

function getSkaterFromLine(team: Team, elementId: string): Skater {
    return getPlayerFromLine(team, elementId) as Skater;
}

function getGoalieFromLine(team: Team, elementId: string): Goalie {
    return getPlayerFromLine(team, elementId) as Goalie;
}

function getPlayerFromLine(team: Team, elementId: string): Player {
    let playerId = Number(document.getElementById(elementId).getAttribute("data-playerId"));

    for (let player of hokyLeague.players) {
        if (playerId === player.id) {
            return player;
        }
    }

    return undefined;
}

function btnAutoLines_Click(): void {
    if (hokyLeague === undefined) return;

    let teamIdStr = document.getElementById("lineTeamName").getAttribute("data-teamId");

    if (teamIdStr === null)
        return;

    let game = undefined;

    let teamId = Number(teamIdStr);
    let currentTeam = teamId === game.homeTeam.id ? game.homeTeam : game.awayTeam;
    let leftWings: Player[] = [];
    let centers: Player[] = [];
    let rightWings: Player[] = [];
    let leftDefencemen: Player[] = [];
    let rightDefencemen: Player[] = [];
    let goalies: Player[] = [];
    let i = 0;

    for (let player of currentTeam.players) {
        switch (player.pos) {
            case PlayerPosition.leftWing:
                leftWings.push(player);
                break;
            case PlayerPosition.center:
                centers.push(player);
                break;
            case PlayerPosition.rightWing:
                rightWings.push(player);
                break;
            case PlayerPosition.leftDefenceman:
                leftDefencemen.push(player);
                break;
            case PlayerPosition.rightDefenceman:
                rightDefencemen.push(player);
                break;
            case PlayerPosition.goalie:
                goalies.push(player);
                break;
        }
    }

    autoLinesByPosition(leftWings, "lw");
    autoLinesByPosition(centers, "c");
    autoLinesByPosition(rightWings, "rw");
    autoLinesByPosition(leftDefencemen, "ld");
    autoLinesByPosition(rightDefencemen, "rd");
    autoLinesByPosition(goalies, "g");
}

function autoLinesByPosition(players: Player[], idStart: string): void {
    players.sort((a, b) => b.ov - a.ov);
    let i = 1;
    for (let player of players) {
        setPlayerToElement(player, document.getElementById(idStart + i++));
    }
}

function toggleScore(id: number): void {
    let elem: HTMLElement;

    elem = document.getElementById("gameScore" + id);
    elem.hidden = !elem.hidden;
}

function btnStanding_Click(): void {
    let teams: Team[];
    let table: HTMLElement;
    let contents: string;
    let position: number;

    if (hokyLeague === undefined) return;

    contents = "<tr><td>Position</td><td>Team</td><td>GP</td><td>Win</td><td>Lose</td><td>OTL</td><td>Points</td></tr>";
    teams = hokyLeague.mainLeague.teams.sort((a, b) => a.results.getPoints() - b.results.getPoints()).reverse();

    position = 1;
    for (let team of teams) {
        contents += `<tr><td>${position}</td><td>${team.name}</td><td>${team.results.getGamesPlayed()}</td><td>${team.results.win}</td><td>${team.results.lose}</td><td>${team.results.otl}</td><td>${team.results.getPoints()}</td></tr>`;
        position++;
    }

    table = document.getElementById("tblStanding");
    table.innerHTML = contents;
}

function btnStats_Click(): void {
    let players: Player[];
    let skaters: Skater[] = [];
    let table: HTMLElement;
    let contents: string;
    let rank: number;

    if (hokyLeague === undefined) return;

    contents = "<tr><td>Rank</td><td>Player</td><td>Team</td><td>GP</td><td>Goal</td><td>Assist</td><td>Points</td></tr>";
    players = hokyLeague.players;

    for (let player of players) {
        if (player instanceof Skater) {
            skaters.push(player);
        }
    }

    skaters = skaters.sort((a, b) => b.stats.getPoints() - a.stats.getPoints() || a.stats.gamePlayed - b.stats.gamePlayed);

    rank = 1;
    for (let skater of skaters) {
        let team = hokyLeague.mainLeague.getTeam(skater.teamId);
        contents += `<tr><td>${rank}</td><td>${skater.name}</td><td>${team.name}</td><td>${skater.stats.gamePlayed}</td><td>${skater.stats.goal}</td><td>${skater.stats.assist}</td><td>${skater.stats.getPoints()}</td></tr>`;
        rank++;
    }

    table = document.getElementById("tblStats");
    table.innerHTML = contents;
}