const { jsx } = require("react/jsx-runtime");

const storage_key = 'teamData';
let teams = [];

// --- load teams from localStorage ---
function loadTeams() {
    const saved =localStorage.getItem(storage_key);
    teams = saved ? JSON.parse(saved) : [];
}

function saveTeams() {
    localStorage.setItem(storage_key, JSON.stringify(teams));
}

function renderTeamDropdown() {
    loadTeams();

    const select = document.getElementById('teamSelect');
    select.innerHTML = "";

    teams.forEach((team, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = team.name;
        select.appendChild(opt);
    });
}

function renderMatchSection() {
    loadTeams();

    const team1Name = document.getElementById('team1Name');
    const team2Container = document.getElementById('team2Container');
    const team2Input = document.getElementById('team2Input');
    const team2Name = document.getElementById('team2Name');
    const saveTeam2Btn = document.getElementById('saveTeam2Btn');
// --- get first team ---
    if (teams.length > 0) {
        team1Name.textContent = teams[0].name;
    } else {
        team1Name.textContent = 'No team saved Yet';
    }
    
// --- save second team ---
    saveTeam2Btn.addEventListener('click', () => {
        const name = team2Input.value.trim();
        if (!name) return;

    // --- add secont team to localStorage ---
        teams.push({ name, players: [] });
        saveTeams();

    // --- lock and show team name ---
        team2Container.style.display = 'none';
        team2Name.textContent = name;
        team2Name.style.display = 'block';
    });
}

window.addEventListener("DOMContentLoaded", () => {
    renderMatchSection();
    renderTeamDropdown();
});

