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

let canadaMaleFirstNames = ["John", "David", "Robert", "Michael", "Paul", "Richard", "James", "Peter", "William", "Brian", "Daniel", "Mark", "Chris", "Michel", "Kevin", "Jean", "George", "Ken", "Steven", "Jim", "Andrew", "Pierre", "Eric", "Ron", "Andre", "Don", "Gary", "Frank", "Thomas", "Claude", "Jason", "Denis", "Jeff", "Roger", "Donald", "Scott", "Patrick", "Martin", "Wayne", "Dan", "Jacques", "Doug", "Joe", "Marc", "Terry", "Bob", "Bruce", "Gilles", "Greg", "Joseph", "Gordon", "Stephen", "Raymond", "Mike", "Rick", "Guy", "Edward", "Charles", "Larry", "Alain", "Tony", "Tim", "Ryan", "Jack", "Mario", "Lori", "Alex", "Ian", "Gerald", "Marcel", "Ronald", "Steve", "Fred", "Dennis", "Wm", "Keith", "Allan", "Robin", "Bill", "Dave", "Douglas", "Randy", "Barry", "Pat", "Serge", "Sylvain", "Brad", "Rene", "Francois", "Luc", "Alan", "Ray", "Yves", "Matthew", "Tom", "Stephane", "Louis", "Dale", "Adam", "Craig", "Norman", "Sean", "Jonathan", "Nick", "Roy", "Bernard", "Anthony", "Walter", "Maurice", "Yvon", "Neil", "Henry", "Albert", "Kenneth", "Shawn", "Simon", "Christian", "Glen", "Derek", "Harold", "Carl", "Christopher", "Gerard", "Sam", "Ted", "Glenn", "Brent", "Matt", "Harry", "Trevor", "Jamie", "Benoit", "Colin", "Dean", "Normand", "Arthur", "Rejean", "Murray", "Jerry", "Ralph", "Philip", "Ross", "Justin", "Todd", "Francis", "Al", "Gerry", "Danny", "Roland", "Ed", "Leo", "Vincent", "Bryan", "Lloyd", "Gaetan", "Grant", "Jocelyn", "Benjamin", "Lawrence", "Real", "Robt", "Leonard", "Rob", "Phil", "Philippe", "Aaron", "Kyle", "Gord", "Kerry", "Lee", "Bruno", "Jose", "Joel", "Stan", "Victor", "Howard", "Rod", "Jay", "Jeremy", "Lorne", "Renee", "Jody", "Tyler", "Jean-Guy", "Ivan", "Mathieu", "Shane", "Graham", "Russell", "Garry", "Gaston", "Yvan", "Jean-Pierre", "Bernie", "Fernand", "Jordan", "Ernest", "Dominique", "Terri", "Ali", "Jeffrey", "Gilbert", "Alexander", "Warren", "Jean-Francois", "Earl", "Jon", "Alfred", "Sebastien", "Karl", "Alexandre", "Eugene", "Allen", "Dominic", "Chad", "Stuart", "Gabriel", "Darryl", "Pascal", "Hugh", "Georges", "Nathan", "Nicolas", "Jean-Paul", "Stanley", "Adrian", "Antonio", "Robyn", "Les", "Lucien", "Harvey", "Darrell", "Nicholas", "Gregory", "Phyllis", "Cory", "Jean-Claude", "Josh", "Blair", "Dany", "Samuel", "Marco", "Laurent", "Len", "Curtis", "Geoff", "Troy", "Cameron", "Ben", "Patrice", "Carlos", "Art", "Jean-Marc", "Darcy", "Ghislain", "Jessie", "Brandon", "Jesse", "Dwayne", "Nelson", "Vince", "Lionel", "Andy", "Brett", "Timothy", "Clement", "Jake", "Noel", "Arnold", "Corey", "Jacob", "Calvin", "Leon", "Max", "Julien", "Maxime", "Mohamed", "Jimmy", "Víctor", "Lyle", "Rodney", "Joshua", "Mohammad", "Reg", "Manuel", "Frederic", "Daryl", "Geo", "Jo", "Travis", "Fran", "Clifford", "Bertrand", "Shaun", "Edwin", "Malcolm", "Cliff", "Henri", "Hans", "Eleanor", "Sheldon", "Armand", "Kirk", "Angelo", "Germain", "Kris", "Guillaume", "Phillip", "Kent", "Marvin", "Muhammad", "Wade", "Ernie", "Perry", "Charlie", "Clayton", "Remi", "Evan", "Olivier", "Courtney", "Mohammed", "Gayle", "Stewart", "Ahmed", "Herbert", "Faye", "Jerome", "Conrad", "Alvin", "Luke", "Syed", "Chuck", "Luis", "Kari", "Toni", "Jules", "Leigh", "Wes", "Russ", "Edgar", "Josie", "Marty", "Kerri", "Nicola", "Derrick", "Johnny", "Kurt", "Jean-Yves", "Lance", "Alexis", "Wilfred", "Will", "Frederick", "Bradley", "Melvin", "Jean-Marie", "Maxine", "Gino", "Erik", "Drew", "Joey", "Emile", "Juan", "Duncan", "Antoine", "Norm", "Raynald", "Iris", "Yan", "Yannick", "Wesley", "Shari", "Dustin", "Geoffrey", "Leão", "Dwight", "Blake", "Owen", "Brendan", "Rosaire", "Herman", "Sunny", "Carly", "Hugo", "Hubert", "Etienne", "Stefan", "Jean-Louis", "Dallas", "Adrien", "Hong", "Marc-Andre", "Taylor", "Blaine", "Garth", "Fernando", "Vernon", "Abdul", "Emmanuel", "Gene", "Roman", "Fern", "Jaime", "Jas", "Bobby", "Jodie", "Byron", "Li", "Cody", "Tommy", "Roberto", "Dee", "Wei", "Pearl", "Stephan", "Amir", "Angel", "Brandy", "Jorge", "Jean-Luc", "Felix", "Vern", "Mitch", "Janis", "Elmer", "Cyril", "Romeo", "Eddie", "Dick", "Julian", "Steeve", "Rae", "Dylan", "Luigi", "Omar", "Oliver", "Billy", "Casey", "Carlo", "Ahmad", "Vladimir", "Jared", "Jean-Philippe", "Micheal", "Ming", "Mitchell", "Pete", "Winnie", "Sasha", "Wai", "Winston", "Morris", "Alma", "Hector", "Judi", "Renald", "Raj", "Noreen", "Roch", "Randall", "Carey", "Igor", "Clint", "Giuseppe", "Merle", "Nigel", "Gavin", "Kenny", "Teri", "Ricky", "Eddy", "Giovanni", "Wally", "Lewis", "Yu", "Rolland", "Kelvin", "Anton", "Lin", "Trent", "Floyd", "Wilson", "Garnet", "Angus", "Andr", "Ricardo", "Miguel", "Gus", "Mildred", "Graeme", "Edmond", "Spencer", "Karim", "Mathew", "Isaac", "Jian", "Jing", "Wallace", "Ada", "Jp", "Ethel", "Domenic", "Amit", "Marcus", "André"];
let canadaLastNames = ["Smith", "Brown", "Tremblay", "Martin", "Roy", "Gagnon", "Lee", "Wilson", "Johnson", "MacDonald", "Taylor", "Campbell", "Anderson", "Jones", "Leblanc", "Cote", "Williams", "Miller", "Thompson", "Gauthier", "White", "Morin", "Wong", "Young", "Bouchard", "Scott", "Stewart", "Pelletier", "Lavoie", "Robinson", "Moore", "Belanger", "Singh", "Fortin", "Levesque", "Chan", "Reid", "Ross", "Clark", "Johnston", "Walker", "Thomas", "King", "Gagne", "Bergeron", "Li", "Boucher", "Landry", "Poirier", "Murray", "Murphy", "McDonald", "Wright", "Richard", "Mitchell", "Girard", "Clarke", "Davis", "Simard", "Kelly", "Lewis", "Graham", "Caron", "Wang", "Fraser", "Fournier", "Jackson", "Beaulieu", "Wood", "Hall", "Baker", "Chen", "Hill", "Harris", "Green", "Roberts", "Lapointe", "Bell", "Ouellet", "Patel", "Watson", "Kennedy", "Cloutier", "Robertson", "Allen", "Lefebvre", "Nguyen", "Hamilton", "Desjardins", "Adams", "Gill", "Khan", "Cameron", "Morrison", "Dube", "Evans", "Grant", "Nadeau", "Zhang", "Peters", "Armstrong", "Phillips", "Hebert", "Cook", "Poulin", "Liu", "Michaud", "Kim", "Martel", "Edwards", "Turner", "Nelson", "Bennett", "Cooper", "Ferguson", "Gray", "Paquette", "Marshall", "Cormier", "Simpson", "Harvey", "McLean", "Collins", "Leclerc", "Bedard", "Grenier", "Russell", "Couture", "Lessard", "Cyr", "Ward", "Shaw", "Boudreau", "Bernier", "Lambert", "Lalonde", "Friesen", "Blais", "Proulx", "Morris", "Arsenault", "Parker", "Henderson", "Demers", "Gilbert", "Hunter", "Gallant", "Davidson", "Dupuis", "Elliott", "Walsh", "Turcotte", "Lemieux", "Harrison", "Lachance", "Carter", "Richardson", "Beaudoin", "James", "Foster", "Gosselin", "MacKenzie", "Gordon", "Fisher", "Hughes", "Parent", "Theriault", "Lam", "Rogers", "Perron", "Gibson", "Ryan", "Morgan", "Langlois", "Savard", "Perreault", "Patterson", "Thibault", "McLeod", "Bailey", "Mercier", "McKay", "Villeneuve", "St-Pierre", "Raymond", "Thomson", "Dion", "Fortier", "Charbonneau", "Bernard", "Robert", "Dubois", "Giroux", "Leung", "Dufour", "Schmidt", "Paradis", "Black", "Davies", "Ouellette", "Houle", "MacLeod", "Menard", "Rose", "Champagne", "Plante", "Mills", "Benoit", "Tran", "MacLean", "Leduc", "Boisvert", "Wu", "Allard", "Legault", "Hamel", "Wiebe", "Stevens", "Berube", "Lemay", "Lacroix", "Rousseau", "Labelle", "Renaud", "Bolduc", "Klassen", "Paul", "Parsons", "Bertrand", "Perry", "Bilodeau", "Henry", "Ellis", "Ng", "Wallace", "Burns", "Mason", "Hunt", "Park", "Ho", "Fontaine", "Seguin", "Therrien", "Andrews", "Crawford", "Butler", "Brooks", "Gervais", "Kerr", "Yu", "Dyck", "Yang", "Alexander", "Price", "Burke", "Saunders", "Boivin", "McKenzie", "Tessier", "Richards", "Lawrence", "Holmes", "Dionne", "Goulet", "Sullivan", "Power", "Cole", "Guay", "O'Brien", "Lepage", "Lauzon", "MacKay", "Ali", "Vincent", "Huang", "Vachon", "Robichaud", "Doucet", "Jacques", "Dunn", "Gravel", "Picard", "Noel", "Doyle", "Matthews", "Carrier", "Paquet", "Moreau", "Larocque", "Peterson", "Chapman", "Sinclair", "Palmer", "Sutherland", "Duncan", "Cox", "Stevenson", "Pilon", "Vaillancourt", "Craig", "Porter", "Savoie", "Jean", "Godin", "Chartrand", "Mann", "Page", "Comeau", "Cheung", "Boyd", "Daigle", "Desrosiers", "George", "Sharma", "Trudel", "Hart", "Penner", "Wells", "Robitaille", "Pearson", "Rioux", "Lapierre", "Hansen", "Francis", "Dumont", "Charron", "Ford", "Douglas", "Fox", "Gingras", "Woods", "Dixon", "Warren", "Lau", "Barnes", "Chow", "Spencer", "Gendron", "Lin", "Reynolds", "Marchand", "Audet", "Jensen", "Lavigne", "Cunningham", "McIntyre", "Bourque", "Lavallee", "Bradley", "Deschenes", "Tang", "MacKinnon", "Larouche", "Powell", "Dawson", "Long", "Cheng", "Currie", "Fleming", "Potvin", "Drouin", "Laplante", "Gaudet", "Knight", "Olson", "Hayes", "Webb", "Carriere", "Ahmed", "Paquin", "Payne", "Thibodeau", "Bishop", "Wall", "Beauchamp", "Chabot", "Laflamme", "Pare", "Brunet", "Blanchard", "Little", "West", "Howard", "Lussier", "Tardif", "Nicholson", "Burton", "Day", "Boutin", "Blanchette", "McCarthy", "Duguay", "Chung", "Wagner", "Atkinson", "Williamson", "Bourgeois", "Breton", "Barrett", "Pepin", "Auger", "Turgeon", "Hardy", "Chang", "Desrochers", "McLaughlin", "Rivard", "Ma", "Chouinard", "Veilleux", "Racine", "Beaudry", "Neufeld", "Laroche", "Joseph", "Roberge", "Clement", "Giguere", "Chiasson", "Lamontagne", "Sandhu", "Denis", "Oliver", "Lang", "Sauve", "Gelinas", "Samson", "Stone", "Harper", "Coulombe", "Leroux", "Charette", "Fletcher", "Webster", "Sidhu", "David", "Carr", "Lane", "Ducharme", "Forget", "Munro", "McMillan", "Barker", "Lamoureux", "Lebel", "McIntosh", "Leger", "Dupont", "Hanson", "Tanguay", "Marcoux", "Vallee", "Marcotte", "Lacasse", "Reimer", "Spence", "Vezina", "Gregoire", "Hicks", "Myers", "Larose", "Lowe", "Boyer", "Pereira", "Plourde", "Labrecque", "MacNeil", "Xu", "Thiessen", "MacPherson", "Steele", "Laliberte", "Letourneau", "Bruce", "Beauregard", "Blouin", "Duchesne", "Jenkins", "Martineau", "Leonard", "Gillis", "Newman", "Sheppard", "Ball", "Allan", "Masse", "Asselin", "Dallaire", "Richer", "Weber", "Quinn", "Lafontaine", "Lu", "Lloyd", "Wilkinson", "Bisson", "Tucker", "Mathieu", "Cardinal", "Garcia", "Brisson", "Shah", "Arnold", "May", "Duval", "Doucette", "Talbot", "Pouliot", "Schneider", "Chambers", "Lafrance", "Blair", "Trottier", "Fowler", "Hudson", "Gardner", "O'Connor", "Lynch", "Ritchie", "Emond", "Lindsay", "Piche", "Berry", "Buchanan", "Leclair", "Zhou", "McNeil", "Forbes", "Carroll", "O'Neill", "Bird", "Belisle", "McKinnon", "Laurin", "Lafleur", "Rodrigue", "Mercer", "Dufresne", "Lawson", "Dumas", "Burgess", "Montgomery", "Chu", "Grewal", "Farrell", "Lariviere", "Sun", "Choi", "MacMillan", "Dhaliwal", "Albert", "Bond", "Labonte", "Law", "Thibeault", "Pellerin", "Germain", "Rowe", "Trepanier", "Paterson", "Le", "Giesbrecht", "Trudeau", "Sabourin", "Jordan", "Braun", "Dean", "Fernandes", "Archambault", "Delisle", "Jamieson", "Drolet", "Curtis", "Lemire", "Schultz", "Sirois", "Boulanger", "Griffin", "Cooke", "Lai", "Gaudreault", "Lo", "Fehr", "Brassard", "Carlson", "Desmarais", "Cross", "Zhao", "Poitras", "Wheeler", "Prevost", "Charest", "McGregor", "Noble", "Provost", "Freeman", "Durand", "Dagenais", "Morissette", "Rice", "Laberge", "Desbiens", "McDougall", "Lajoie", "Baxter", "Snow", "Tan", "Hopkins", "Simon", "Watt", "Aubin", "Croteau", "Matheson", "French", "Lachapelle", "Ethier", "Hawkins", "Dhillon", "Logan", "Gauvin", "Ferland", "Irwin", "Nielsen", "Cowan", "Maltais", "Morton", "Harding", "Dickson", "Tam", "Skinner", "Silva", "Martens", "Rochon", "Lafreniere", "Daoust", "McCallum", "Carson", "Lucas", "Labbe", "Castonguay", "McGrath", "Osborne", "Christie", "Hutchinson", "St-Onge", "Loewen", "Laporte", "Meyer", "Guillemette", "Brennan", "Boudreault", "Abbott", "Pearce", "Adam", "Mayer", "Langevin", "Wolfe", "Corriveau", "FitzGerald", "Kumar", "Deschamps", "Lim", "MacDougall", "Higgins", "Larochelle", "Stephens", "Maxwell", "Potter", "Brousseau", "Austin", "Bourassa", "Lagace", "Bissonnette", "Begin", "Gould", "Simmons", "Erickson", "Hickey", "Walters", "Blake", "Cantin", "Reed", "Doyon", "Weir", "Robillard", "Rempel", "Best", "Stephenson", "Melanson", "Beland", "Major", "Bastien", "Ramsay", "Frechette", "Barber", "Hogan", "Provencher", "Doiron", "Barry", "Gaudreau", "Sharpe", "Holland", "Sutton", "Durocher", "Prince", "Marsh", "Flynn", "Brochu", "Beck", "Lamarche", "Sanderson", "Coleman", "Hodgson", "Lepine", "Norman", "Watts", "Penney", "Corbeil", "Meunier", "Fillion", "Jacobs", "Julien", "Booth", "Brar", "Labrie", "Klein", "Lopez", "Bartlett", "Soucy", "Lamothe", "Janzen", "Chisholm", "Hanna", "Cadieux", "Faucher", "Rouleau", "Filion", "Levasseur", "Ladouceur", "Hoffman", "Benson", "St-Laurent", "Francoeur", "Kaur", "FitzPatrick", "Lord", "St Pierre", "McConnell", "Cochrane", "Cohen", "Marquis", "Howe", "Bates", "Riley", "Boily", "Olsen", "Butt", "Charles", "Newton", "Charlebois", "Zhu", "Roussel", "Grondin", "Lyons", "Baril", "Larson", "Milne", "Millar", "Savage", "Yeung", "Bowman", "Gallagher", "Garneau", "McPherson", "Rondeau", "Dennis", "Stuart", "Todd", "McCormick", "Ouimet", "Hammond", "Harder", "Fischer", "Blackburn", "Hamelin", "Frenette", "Fung", "Plouffe", "Huynh", "Steeves", "Hiebert", "Monette", "Duquette", "Joly", "Ferreira", "Leslie", "Fleury", "Campeau", "Rodriguez", "Daniels", "Jarvis", "McRae", "Stanley", "Goodwin", "Barton", "Lafond", "Funk", "Houde", "Gardiner", "Hewitt", "Desroches", "Brodeur", "Cousineau", "Delorme", "Barr", "Pratt", "McBride", "Foley", "Lamb", "St-Jean", "Boyle", "Hay", "Johnstone", "Barrette", "Mah", "Baird", "Muir", "Cummings", "Donaldson", "Lacombe", "Warner", "Kang", "Kwan", "Gillespie", "Christensen", "Jacob", "Norris", "Chiu", "McFarlane", "Orr", "Hu", "Santos", "Liang", "Martinez", "Bellemare", "Brisebois", "Sampson", "Nichols", "Dick", "Kent", "Godbout", "Roth", "Medeiros", "Beaupre", "Baldwin", "Enns", "Pike", "Owen", "Bouffard", "Deslauriers", "Mailloux", "Persaud", "Morrow", "Jobin", "Rodgers", "McArthur", "McGuire", "Pham", "Dumais", "Hudon", "Willis", "Ricard", "Hayward", "Irvine", "Banks", "Forest", "Chamberland", "Mueller", "Frank", "McLellan", "Plamondon", "John", "Poole", "Preston", "McMahon", "Becker", "Shepherd", "Griffiths", "Pitre", "Dubuc", "Gonzalez", "Donnelly", "Winter", "Small", "Legare", "Byrne", "Sharp", "Gregory", "Gamache", "Howell", "Chartier", "Robson", "McKee", "Wiens", "Guerin", "Walton", "Dugas", "Kenny", "Whalen", "Miles", "Caldwell", "Goyette", "Lamarre", "Beattie", "Arseneault", "Greene", "Beaudin", "Fong", "Corbett", "Dueck", "Guy", "Doherty", "Dunlop", "Hussain", "Blanchet", "Nash", "Huot", "Carpenter", "Berthiaume", "Lebrun", "Ahmad", "Thorne", "Larsen", "Huard", "Berg", "Pollock", "Viau", "Tait", "Manning", "Beauchemin", "Mohammed", "Malik", "English", "Shannon", "Hernandez", "Tetreault", "Read", "Hynes", "Matte", "Downey", "MacFarlane", "Patry", "Nixon", "Ayotte", "Sanders", "Reeves", "Fuller", "Love", "Han", "Guimond", "Beaton", "Coates", "Chin", "Costa", "Boulet", "Cossette", "Dussault", "Turnbull", "Donovan", "Mohamed", "Glover", "Auclair", "Messier", "He", "Song", "Chevalier", "Nickerson", "Welsh", "Carey", "McCann", "Allaire", "Rivest", "Berger", "Hillier", "Kemp", "Dore", "Lake", "Jiang", "Middleton", "Briere", "Gratton", "Dobson", "Kay", "Giles", "Toews", "Keller", "Patenaude", "Hache", "Vallieres", "McKenna"];

class Player {
    id: number;
    name: string;
    team: Team;
    pos: string;
    ov: number;

    constructor(id: number, name: string, team: Team, pos: string, ov: number) {
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
}

class Skater extends Player{
    id: number;
    name: string;
    off: number;
    def: number;
    goal: number;
    assist: number;

    constructor(id: number, name: string, team: Team, pos: string, off: number, def: number) {
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
        super(id, name, team, "G", ov);
    }
}

class TeamLine {
    time: number;
    currentTOI: number;

    constructor(time: number) {
        this.time = time;
        this.currentTOI = time;
    }

    resetTime(): void {
        this.currentTOI = this.time;
    }
}

class ForwardLine extends TeamLine {
    leftWing: Skater;
    center: Skater;
    rightWing: Skater;

    constructor(leftWing: Skater, center: Skater, rightWing: Skater, time: number) {
        super(time);
        this.leftWing = leftWing;
        this.center = center;
        this.rightWing = rightWing;
    }

    resetScore(): void {
        this.leftWing.resetScore();
        this.center.resetScore();
        this.rightWing.resetScore();
    }
}

class DefenceLine extends TeamLine {
    leftDefencemen: Skater;
    rightDefencemen: Skater;

    constructor(leftDefencemen: Skater, rightDefencemen: Skater, time: number) {
        super(time);
        this.leftDefencemen = leftDefencemen;
        this.rightDefencemen = rightDefencemen;
    }

    resetScore(): void {
        this.leftDefencemen.resetScore();
        this.rightDefencemen.resetScore();
    }
}

class TeamLines {
    firstLine: ForwardLine;
    secondLine: ForwardLine;
    thirdLine: ForwardLine;
    fourthLine: ForwardLine;
    currentFwdLine: ForwardLine;
    firstDuo: DefenceLine;
    secondDuo: DefenceLine;
    thirdDuo: DefenceLine;
    currentDefLine: DefenceLine;
    goalie: Goalie;
    currentFwdLineInd: number;
    currentDefLineInd: number;
    offenceImpactOnOffence: number;
    defenceImpactOnDefence: number;

    constructor(firstLine: ForwardLine, secondLine: ForwardLine, thirdLine: ForwardLine, fourthLine: ForwardLine, firstDuo: DefenceLine, secondDuo: DefenceLine, thirdDuo: DefenceLine, goalie: Goalie) {
        this.firstLine = firstLine;
        this.secondLine = secondLine;
        this.thirdLine = thirdLine;
        this.fourthLine = fourthLine;
        this.firstDuo = firstDuo;
        this.secondDuo = secondDuo;
        this.thirdDuo = thirdDuo;
        this.goalie = goalie;

        this.currentFwdLineInd = 1;
        this.currentDefLineInd = 1;
        this.currentFwdLine = firstLine;
        this.currentDefLine = firstDuo;

        this.offenceImpactOnOffence = 0.7;
        this.defenceImpactOnDefence = 0.7;
    }

    nextFwdLine(): ForwardLine {
        let line: ForwardLine;

        this.currentFwdLineInd++;

        if (this.currentFwdLineInd > 4) this.currentFwdLineInd = 1;

        switch (this.currentFwdLineInd) {
            case 1:
               line = this.firstLine;
               break;
            case 2:
               line = this.secondLine;
               break; 
            case 3:
               line = this.thirdLine;
               break; 
            case 4:
               line = this.fourthLine;
               break; 
        }

        line.resetTime();

        return line;
    }

    nextDefLine(): DefenceLine {
        let line: DefenceLine;

        this.currentDefLineInd++;

        if (this.currentDefLineInd > 3) this.currentDefLineInd = 1;

        switch (this.currentDefLineInd) {
            case 1:
               line = this.firstDuo;
               break;
            case 2:
               line = this.secondDuo;
               break; 
            case 3:
               line = this.thirdDuo;
               break; 
        }

        line.resetTime();

        return line;
    }

    lineOffense(): number {
        let avgFor = (this.currentFwdLine.leftWing.off + this.currentFwdLine.center.off + this.currentFwdLine.rightWing.off) / 3;
        let avgDef = (this.currentDefLine.leftDefencemen.off + this.currentDefLine.rightDefencemen.off) / 2
        return (avgFor * this.offenceImpactOnOffence) + (avgDef * (1 - this.offenceImpactOnOffence));
    }

    lineDefense(): number {
        let avgFor = (this.currentFwdLine.leftWing.def + this.currentFwdLine.center.def + this.currentFwdLine.rightWing.def) / 3;
        let avgDef = (this.currentDefLine.leftDefencemen.def + this.currentDefLine.rightDefencemen.def) / 2
        return (avgFor * (1 - this.defenceImpactOnDefence)) + (avgDef * this.defenceImpactOnDefence);
    }

    changeIfTired(): void {
        this.currentFwdLine.currentTOI--;
        this.currentDefLine.currentTOI--;

        if (this.currentFwdLine.currentTOI === 0 ) {
            this.currentFwdLine = this.nextFwdLine();
        }

        if (this.currentDefLine.currentTOI === 0 ) {
            this.currentDefLine = this.nextDefLine();
        }
    }

    resetLines(): void {
        this.currentFwdLine = this.firstLine;
        this.currentDefLine = this.firstDuo;
        this.currentFwdLineInd = 1;
        this.currentDefLineInd = 1;
        
        this.currentFwdLine.resetTime();
        this.currentDefLine.resetTime();
    }

    resetScore(): void {
        this.firstLine.resetScore();
        this.secondLine.resetScore();
        this.thirdLine.resetScore();
        this.fourthLine.resetScore();
        this.firstDuo.resetScore();
        this.secondDuo.resetScore();
        this.thirdDuo.resetScore();
    }
}

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
            
            text += `<tr><td>${player.name}</td><td>${player.pos}</td><td>${off ?? 0}</td><td>${def ?? 0}</td><td>${player.ov}</td></tr>`;

            off = 0;
            def = 0;
        }

        text += "</table>";
        return text;
    }
}

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
    scoringRate: number;
    scoreModifier: number;
    periodLength: number;
    nbPeriod: number;
    goalieBase: number;
    homeTeam: Team;
    awayTeam: Team;

    constructor() {
        this.scoringRate = 1.5;
        this.scoreModifier = 0.02;
        this.periodLength = 20;
        this.nbPeriod = 3;

        this.goalieBase = 0.6;

        this.homeTeam = new Team(1, "Home Team");
        this.awayTeam = new Team(2, "Away Team");
    }

    simulate(): void {
        let sb = new ScoreBoard(1, new Date(), this.homeTeam , this.awayTeam)
    
        this.homeTeam.resetScore();
        this.awayTeam.resetScore();
    
        for (var p = 1; p <= this.nbPeriod; p++) {
            let per = {name: "Period " + p, goals: []};
    
            let periodGoal = this.homeTeam.goal + this.awayTeam.goal;
    
            for (var i = 0; i < 60 * this.periodLength; i++) {
                this.simulateMin(i, per);
            }
    
            this.homeTeam.lines.resetLines();
            this.awayTeam.lines.resetLines();
    
            sb.periods.push(per);
        }
    
        if (this.homeTeam.goal === this.awayTeam.goal) {
            let per = {name: "Overtime", goals: []};
    
            let otGoal = false;
            let i = 0;
            
            while (!otGoal) {
                otGoal = this.simulateMin(i, per);
    
                i++;
            }
    
            sb.periods.push(per);
        }
    
        document.getElementById("game").innerHTML = sb.toString();
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
    
            if (defenseTeam.lines.goalie.ov * (1 - this.goalieBase) + (this.goalieBase * 100) < Math.random() * 100) {
                offenceTeam.goal++;
                goal = true;
    
                let scorer = this.getGoalScorer(offenceTeam.lines.currentFwdLine, offenceTeam.lines.currentDefLine);
                let primAssistSkater = this.getGoalPrimAssist(offenceTeam.lines.currentFwdLine, offenceTeam.lines.currentDefLine, scorer);
                let secAssistSkater : Skater = undefined;
                scorer.goal++;

                if (primAssistSkater !== undefined) {
                    primAssistSkater.assist++;
    
                    secAssistSkater = this.getGoalSecAssist(offenceTeam.lines.currentFwdLine, offenceTeam.lines.currentDefLine, scorer, primAssistSkater);
                    if (secAssistSkater !== undefined) {
                        secAssistSkater.assist++;
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
        
        let totOff = fwdLine.leftWing.off + fwdLine.center.off + fwdLine.rightWing.off + defLine.leftDefencemen.off + defLine.rightDefencemen.off + noSkater - offToExclude;
        
        let lw = !idsToExclude.includes(fwdLine.leftWing.id, 0) ? fwdLine.leftWing.off / totOff : 0;
        let c = !idsToExclude.includes(fwdLine.center.id, 0) ? fwdLine.center.off / totOff : 0;
        let rw = !idsToExclude.includes(fwdLine.rightWing.id, 0) ? fwdLine.rightWing.off / totOff : 0;
        let ld = !idsToExclude.includes(defLine.leftDefencemen.id, 0) ? defLine.leftDefencemen.off / totOff : 0;
        let rd = !idsToExclude.includes(defLine.rightDefencemen.id, 0) ? defLine.rightDefencemen.off / totOff : 0;
        let none = noSkater / totOff;
    
        if (lw > rdn)
            skater = fwdLine.leftWing;
        else if (lw + c > rdn)
            skater = fwdLine.center;
        else if (lw + c + rw > rdn)
            skater = fwdLine.rightWing;
        else if (lw + c + rw + ld > rdn)
            skater = defLine.leftDefencemen;
        else if (lw + c + rw + ld + rd > rdn)
            skater = defLine.rightDefencemen;
        else if (lw + c + rw + ld + rd + none > rdn)
            skater = undefined;
    
        return skater;
    }
    
    generatePlayerName(): string {
        let indexFN = randomBetween(0, canadaMaleFirstNames.length - 1);
        let indexLN = randomBetween(0, canadaLastNames.length - 1);
    
        let firstName = canadaMaleFirstNames[indexFN];
        let lastName = canadaLastNames[indexLN];
    
        return firstName + " " + lastName;
    }
    
    generatePlayers(): void {
        this.generateTeamPlayers(this.homeTeam);
        this.generateTeamPlayers(this.awayTeam);
    
        document.getElementById("team1").innerHTML = this.homeTeam.getPlayersTable();
        document.getElementById("team2").innerHTML = this.awayTeam.getPlayersTable();
    }
    
    generateTeamPlayers(team: Team) {
        team.players = [];
    
        let lw1 = new Skater(1, this.generatePlayerName(), team, "LW", randomBetween(75, 85), randomBetween(55, 80));
        let c1 = new Skater(2, this.generatePlayerName(), team, "C", randomBetween(75, 85), randomBetween(55, 80));
        let rw1 = new Skater(3, this.generatePlayerName(), team, "RW", randomBetween(75, 85), randomBetween(55, 80));
        let ld1 = new Skater(4, this.generatePlayerName(), team, "LD", randomBetween(55, 80), randomBetween(75, 85));
        let rd1 = new Skater(5, this.generatePlayerName(), team, "RD", randomBetween(55, 80), randomBetween(75, 85));
        let lw2 = new Skater(6, this.generatePlayerName(), team, "LW", randomBetween(70, 80), randomBetween(55, 80));
        let c2 = new Skater(7, this.generatePlayerName(), team, "C", randomBetween(70, 80), randomBetween(55, 80));
        let rw2 = new Skater(8, this.generatePlayerName(), team, "RW", randomBetween(70, 80), randomBetween(55, 80));
        let ld2 = new Skater(9, this.generatePlayerName(), team, "LD", randomBetween(55, 75), randomBetween(75, 80));
        let rd2 = new Skater(10, this.generatePlayerName(), team, "RD", randomBetween(55, 75), randomBetween(75, 80));
        let lw3 = new Skater(11, this.generatePlayerName(), team, "LW", randomBetween(65, 75), randomBetween(65, 75));
        let c3 = new Skater(12, this.generatePlayerName(), team, "C", randomBetween(65, 75), randomBetween(65, 75));
        let rw3 = new Skater(13, this.generatePlayerName(), team, "RW", randomBetween(65, 75), randomBetween(65, 75));
        let ld3 = new Skater(14, this.generatePlayerName(), team, "LD", randomBetween(55, 75), randomBetween(70, 75));
        let rd3 = new Skater(15, this.generatePlayerName(), team, "RD", randomBetween(55, 75), randomBetween(70, 75));
        let lw4 = new Skater(16, this.generatePlayerName(), team, "LW", randomBetween(60, 70), randomBetween(65, 75));
        let c4 = new Skater(17, this.generatePlayerName(), team, "C", randomBetween(60, 70), randomBetween(65, 75));
        let rw4 = new Skater(18, this.generatePlayerName(), team, "RW", randomBetween(60, 70), randomBetween(65, 75));
        let g1 = new Goalie(19, this.generatePlayerName(), team, randomBetween(75, 85));
    
        let f1 = new ForwardLine(lw1, c1, rw1, 80);
        let f2 = new ForwardLine(lw2, c2, rw2, 60);
        let f3 = new ForwardLine(lw3, c3, rw3, 40);
        let f4 = new ForwardLine(lw4, c4, rw4, 20);
        let d1 = new DefenceLine(ld1, rd1, 70);
        let d2 = new DefenceLine(ld2, rd2, 50);
        let d3 = new DefenceLine(ld3, rd3, 30);
    
        team.lines = new TeamLines(f1, f2, f3, f4, d1, d2, d3, g1);
    }
}

function getGameTime(time: number): string {
    let scoreTime = new Date(time * 1000);
    return scoreTime.getMinutes().toString().padStart(2, "0") + ":" + scoreTime.getSeconds().toString().padStart(2, "0");
}

function randomBetween(min: number, max: number): number {
    return min + Math.round(Math.random() * (max - min));
}

let game: Game;

function btnSimulate_Click(): void {
    if (game === undefined) return;
    game.simulate();
}

function btnGeneratePlayers_Click(): void {
    if (game === undefined) return;
    game.generatePlayers();
}

function btnNewGame_Click(): void {
    game = new Game();
    game.generatePlayers();
}