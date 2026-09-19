
//--- Local Storage ---
const storage_key = 'teamData';
let teams = [];

function loadTeams() {
    const saved = localStorage.getItem(storage_key);
    teams = saved ? JSON.parse(saved) : [];
}

function saveTeams() {
    localStorage.setItem(storage_key, JSON.stringify(teams));
}

let pendingDeleteIndex = null;

const deleteOverlay = document.getElementById('deleteOverlay');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

confirmDeleteBtn.addEventListener('click', () => {
    if (pendingDeleteIndex !== null) {
        teams.splice(pendingDeleteIndex, 1);
        saveTeams();
        renderTeams();
        pendingDeleteIndex = null;
    }
    deleteOverlay.classList.add('hidden');
});

cancelDeleteBtn.addEventListener('click', () => {
    pendingDeleteIndex = null;
    deleteOverlay.classList.add('hidden');     // hide overlay
});

// --- render ---
function renderTeams() {
    deleteOverlay.classList.add('hidden');

    const container = document.getElementById('teamContainer');
    container.innerHTML = '';

    teams.forEach((team, teamIndex) => {
        const teamDiv = document.createElement('div');
        teamDiv.className = 'team';

        const header = document.createElement('div');
        header.className = 'team-header';

        const title = document.createElement('span');
        title.textContent = team.name;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-team-btn';
        deleteBtn.textContent = '🗑️'

        deleteBtn.addEventListener('click', () => {
            pendingDeleteIndex = teamIndex;
            deleteOverlay.classList.remove('hidden');
        });

    header.appendChild(title);
    header.appendChild(deleteBtn);
    teamDiv.appendChild(header);

// --- add player ---
    const playerForm = document.createElement('div');
    playerForm.className = 'player-form';

    const nameInput = document.createElement('input');
    nameInput.placeholder = 'Player name';

    const numberInput = document.createElement('input');
    numberInput.placeholder = 'Number';
    numberInput.type = 'number';

    const addPlayerBtn = document.createElement('button');
    addPlayerBtn.textContent = 'Add Player';

    addPlayerBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const number = numberInput.value.trim();

        if (!name || !number) return;

        teams[teamIndex].players.push({ name, number });
        saveTeams();
        renderTeams();
    });

    playerForm.appendChild(nameInput);
    playerForm.appendChild(numberInput);
    playerForm.appendChild(addPlayerBtn);
    teamDiv.appendChild(playerForm);

// --- drop down list ---
    const playerContainer = document.createElement('div');
    playerContainer.className = 'playercardcontainer';

    team.players.forEach((player, playerIndex) => {
        const card = document.createElement('div');
        card.className = 'player-card';

        card.innerHTML =`
            <div class="player-content">
                <div class="player-row">
                    <div class="player-info">
                        <p class="player-number">#${player.number}</p>
                        <p class="player-name">${player.name}</p>
                    </div>
                    <button class="delete-player-btn">Delete</button>
                </div>  
            </div>
        `;
// --- delete player ---
        card.querySelector('.delete-player-btn').addEventListener('click', () => {
            teams[teamIndex].players.splice(playerIndex, 1);
            saveTeams();
            renderTeams();
        });

        playerContainer.appendChild(card);
    });
    teamDiv.appendChild(playerContainer);
    container.appendChild(teamDiv);
  });
}

// --- add team ---
document.getElementById('addTeamBtn').addEventListener('click', () => {
    const input = document.getElementById('teamNameInput');
    const name = input.value.trim();
    if (!name) return;

    teams.push({ name, players: [] });
    input.value = '';
    saveTeams();
    renderTeams();
});

loadTeams();
renderTeams();



