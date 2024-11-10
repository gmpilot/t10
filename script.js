// Sample team's data with match details
const teams = [
    {
        name: "Team Gen Z", 
        logo: "https://raw.githubusercontent.com/gmpilot/t10/master/genz.JPG", // Full URL for image
        matches: [
            { ownRunScore: 102, ownOver: 10, againstTeamRunScore: 103, againstTeamOver: 9.3, wickets: 6 },
            { ownRunScore: 93, ownOver: 10, againstTeamRunScore: 95, againstTeamOver: 5.5, wickets: 4 },
            { ownRunScore: 72, ownOver: 10, againstTeamRunScore: 69, againstTeamOver: 10, wickets: 6 },
        ],
        runRate: 0,
        points: 0
    },
    {
        name: "Crack Platoon",
        logo: "https://raw.githubusercontent.com/gmpilot/t10/master/crack.JPG", // Full URL for image
        matches: [
            { ownRunScore: 110, ownOver: 8.2, againstTeamRunScore: 109, againstTeamOver: 10, wickets: 3 },
            { ownRunScore: 95, ownOver: 5.5, againstTeamRunScore: 93, againstTeamOver: 10, wickets: 2 },
            
               { ownRunScore: 95, ownOver: 10, againstTeamRunScore:112, againstTeamOver: 10, wickets: 6 },
              { ownRunScore: 76,ownOver: 8.1,againstTeamRunScore: 75,againstTeamOver: 10,wickets: 5},
        ],
        runRate: 0,
        points: 0
    },
    {
        name: "Freedom Fighters",
        logo: "https://raw.githubusercontent.com/gmpilot/t10/master/freedom.PNG", // Full URL for image
        matches: [
            { ownRunScore: 103, ownOver: 9.3, againstTeamRunScore: 102, againstTeamOver: 10, wickets: 3 },
            { ownRunScore: 127, ownOver: 9.3, againstTeamRunScore: 126, againstTeamOver: 10, wickets: 8 },
               { ownRunScore: 112, ownOver: 10, againstTeamRunScore:95, againstTeamOver: 10, wickets: 6 },
            
              { ownRunScore: 67,ownOver: 10, againstTeamRunScore: 68,againstTeamOver: 7.1,wickets: 9},
        ],
        runRate: 0,
        points: 0
    },
    {
        name: "Tiger Battalions",
        logo: "https://raw.githubusercontent.com/gmpilot/t10/master/tiger.JPG", // Full URL for image
        matches: [
            { ownRunScore: 96, ownOver: 9.5, againstTeamRunScore: 92, againstTeamOver: 10, wickets: 4 },
            { ownRunScore: 126, ownOver: 10, againstTeamRunScore: 127, againstTeamOver: 9.3, wickets: 1 },
                { ownRunScore: 75, ownOver: 10, againstTeamRunScore: 76, againstTeamOver: 8.1,wickets: 8},
        ],
        runRate: 0,
        points: 0
    },
    {
        name: "Bangladesh Reborn",
        logo: "https://raw.githubusercontent.com/gmpilot/t10/master/reborn.PNG", // Full URL for image
        matches: [
            { ownRunScore: 109, ownOver: 10, againstTeamRunScore: 110, againstTeamOver: 8.2, wickets: 4 },
            { ownRunScore: 92, ownOver: 10, againstTeamRunScore: 96, againstTeamOver: 9.5, wickets: 5 },
            { ownRunScore: 69, ownOver: 10, againstTeamRunScore: 72, againstTeamOver: 10, wickets: 5 },
              { ownRunScore: 68,ownOver: 7.1, againstTeamRunScore: 67,againstTeamOver: 10, wickets: 1},
        ],
        runRate: 0,
        points: 0
    }
];


// Function to calculate stats based on matches played
function calculateStats() {
    teams.forEach(team => {
        let totalRunsScored = 0;
        let totalOversFaced = 0;
        let totalRunsConceded = 0;
        let totalOversBowled = 0;
        let wins = 0;
        let losses = 0;

        // Loop through each match and calculate the stats
        team.matches.forEach(match => {
            totalRunsScored += match.ownRunScore;
            totalOversFaced += match.ownOver;
            totalRunsConceded += match.againstTeamRunScore;
            totalOversBowled += match.againstTeamOver;

            // Check for win or loss based on runs scored
            if (match.ownRunScore > match.againstTeamRunScore) {
                wins++;
            } else if (match.ownRunScore < match.againstTeamRunScore) {
                losses++;
            }
        });

        // Calculate run rate: (runsScored / oversFaced) - (runsConceded / oversBowled)
        let runRate = (totalRunsScored / totalOversFaced) - (totalRunsConceded / totalOversBowled);
        team.runRate = runRate.toFixed(2);

        // Assign points: 2 points for a win, 0 for a loss
        team.points = wins * 2;  // No ties in this example; modify if necessary

        // Update team stats
        team.matchesPlayed = team.matches.length;
        team.wins = wins;
        team.losses = losses;
    });
}

// Function to sort teams based on points and run rate
function sortTeams() {
    // Sort first by points, then by run rate
    teams.sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points; // Higher points first
        } else {
            return b.runRate - a.runRate; // Higher run rate if points are the same
        }
    });
}

// Function to update points table
function updatePointsTable() {
    calculateStats();  // Ensure stats are calculated before sorting
    sortTeams();  // Sort teams based on points and run rate

    const tableBody = document.querySelector("#pointsTable tbody");
    tableBody.innerHTML = "";  // Clear existing table content

    teams.forEach(team => {
        const row = document.createElement("tr");

        // Add team logo
        const logoCell = document.createElement("td");
        const logoImage = document.createElement("img");
        logoImage.src = team.logo;
        logoImage.alt = team.name + " Logo";
        logoCell.appendChild(logoImage);
        row.appendChild(logoCell);

        // Add team name
        const nameCell = document.createElement("td");
        nameCell.textContent = team.name;
        row.appendChild(nameCell);

        // Add matches played, wins, losses, run rate, points
        const stats = [team.matchesPlayed, team.wins, team.losses, team.runRate, team.points];
        stats.forEach(stat => {
            const cell = document.createElement("td");
            cell.textContent = stat;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

// Function to update top 5 scorers list with table rows
function updateTopScorers() {
    const topScorersTable = document.getElementById("topScorersTable").getElementsByTagName('tbody')[0];
    topScorersTable.innerHTML = "";  // Clear existing rows

    const topScorers = [
        { name: "Hakim", runs: 65, matches: 2 },
        { name: "Apon", runs: 56, matches: 2 },
        { name: "Sakur", runs: 55, matches: 2 },
        { name: "Nayem", runs: 51, matches: 2 },
        { name: "Nahid", runs: 50, matches: 1 },
        { name: "Mostafij", runs: 40, matches: 1 }
    ];

    topScorers.forEach(player => {
        const row = topScorersTable.insertRow();
        row.insertCell(0).textContent = player.name;
        row.insertCell(1).textContent = player.runs;
        row.insertCell(2).textContent = player.matches;
    });
}

// Function to update top 5 wicket takers list with table rows
function updateTopWicketTakers() {
    const topWicketTakersTable = document.getElementById("topWicketTakersTable").getElementsByTagName('tbody')[0];
    topWicketTakersTable.innerHTML = "";  // Clear existing rows

    const topWicketTakers = [
        { name: "-", wickets: 0, matches: 0 },
        { name: "-", wickets: 0, matches: 0 },
        { name: "-", wickets: 0, matches: 0 },
        { name: "-", wickets: 0, matches: 0 },
        { name: "-", wickets: 0, matches: 0 },
        { name: "-", wickets: 0, matches: 0 }
    ];

    topWicketTakers.forEach(player => {
        const row = topWicketTakersTable.insertRow();
        row.insertCell(0).textContent = player.name;
        row.insertCell(1).textContent = player.wickets;
        row.insertCell(2).textContent = player.matches;
    });
}

// Call the function to update the tables on page load
window.onload = function() {
    updatePointsTable();
    updateTopScorers();
    updateTopWicketTakers();
};

