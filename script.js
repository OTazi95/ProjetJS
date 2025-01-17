// Variables globales
const loginForm = document.getElementById('loginForm');
const loginFormContainer = document.getElementById('login-form');
const homePageContainer = document.getElementById('home-page');
const errorMsg = document.getElementById('error-msg');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');
const vehiclesTableBody = document.getElementById("vehicles");
const commandeTableBody = document.getElementById("commande");
const carForm = document.getElementById("carForm");
const commandeForm = document.getElementById("commandeForm");

let vehicles = [
    { marque: "Renault", modele: "Megane", kilometrage: 22500, annee: 2023 },
    { marque: "Kia", modele: "Sportage", kilometrage: 35000, annee: 2023 },
    { marque: "Mini", modele: "Countryman", kilometrage: 150000, annee: 2013 },
    { marque: "BMW", modele: "X1", kilometrage: 90000, annee: 2018 },
    { marque: "Volvo", modele: "XC60", kilometrage: 110000, annee: 2024 }
];

let commandes = [
    { nom: "Meryem", prenom: "Erragragui", adressemail: "meryem@gmail.com", numerotel: "0652417896", date: "10/05/2024", marque: "Kia", modele: "Sportage" },
    { nom: "Omar", prenom: "Tazi", adressemail: "omar@gmail.com", numerotel: "0645632598", date: "20/08/2024", marque: "Renault", modele: "Megane" },
    { nom: "Yacout", prenom: "Bouzoubaa", adressemail: "yacout@gmail.com", numerotel: "0685320124", date: "01/12/2024", marque: "Mini", modele: "Countryman" },
    { nom: "Moncef", prenom: "Bennani", adressemail: "moncef@gmail.com", numerotel: "0632652490", date: "09/11/2024", marque: "BMW", modele: "X1" },
    { nom: "Mly Hfid", prenom: "Benjelloun", adressemail: "mlyhfid@gmail.com", numerotel: "06320326587", date: "05/04/2024", marque: "Volvo", modele: "XC60" }
];

// Gestion de la connexion
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === 'omar' && password === 'om1234') {
        loginFormContainer.style.display = 'none'; // Masque le formulaire de connexion
        homePageContainer.classList.remove('hidden'); // Affiche la page d'accueil
        homePageContainer.style.display = 'block';  // Assure que l'élément est visible
        initializeApp();  // Initialise l'application
    } else {
        errorMsg.textContent = "Nom d'utilisateur ou mot de passe incorrect !";
    }
});


// Gestion de la sidebar
openSidebarBtn.addEventListener('click', function () {
    sidebar.style.width = "250px";
});

closeSidebarBtn.addEventListener('click', function () {
    sidebar.style.width = "0";
});

// Sélectionner les éléments du DOM
const showAddCarFormBtn = document.getElementById('showAddCarFormBtn');
const showAddCommandeFormBtn = document.getElementById('showAddCommandeFormBtn');
const addCarFormContainer = document.getElementById('addCarFormContainer');
const addCommandeFormContainer = document.getElementById('addCommandeFormContainer');
const cancelAddCarFormBtn = document.getElementById('cancelAddCarFormBtn');
const cancelAddCommandeFormBtn = document.getElementById('cancelAddCommandeFormBtn');

// Afficher le formulaire
showAddCommandeFormBtn.addEventListener("click", () => {
    addCommandeFormContainer.classList.remove("hidden");
});

// Cacher le formulaire
cancelAddCommandeFormBtn.addEventListener("click", () => {
    addCommandeFormContainer.classList.add("hidden");
});
// Afficher le formulaire
showAddCarFormBtn.addEventListener("click", () => {
    addCarFormContainer.classList.remove("hidden");
});

// Cacher le formulaire
cancelAddCarFormBtn.addEventListener("click", () => {
    addCarFormContainer.classList.add("hidden");
});

// Afficher le formulaire d'ajout de véhicule
showAddCarFormBtn.addEventListener('click', function() {
    addCarFormContainer.classList.remove('hidden'); // Afficher le formulaire
});


// Afficher le formulaire d'ajout de commande
showAddCommandeFormBtn.addEventListener('click', function() {
    addCommandeFormContainer.classList.remove('hidden'); // Afficher le formulaire
});

// Annuler l'ajout d'un véhicule
cancelAddCarFormBtn.addEventListener('click', function() {
    addCarFormContainer.classList.add('hidden'); // Cacher le formulaire
});

// Annuler l'ajout d'une commande
cancelAddCommandeFormBtn.addEventListener('click', function() {
    addCommandeFormContainer.classList.add('hidden'); // Cacher le formulaire
});

    // Fonction d'initialisation du graphique
    function initializeChart() {
        const kmChartCanvas = document.getElementById("kmChart").getContext("2d");

        const labels = vehicles.map(car => `${car.marque} ${car.modele}`);
        const kilometrageData = vehicles.map(car => car.kilometrage);
        new Chart(kmChartCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Kilométrage des Véhicules',
                    data: kilometrageData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Kilométrage (en km)'
                        }
                    }
                }
            }
        });
    }

    // Initialiser le graphique après le chargement de la page
    window.onload = initializeChart;
    
    function updateDashboard() {
        console.log("updateDashboard appelée");
        if (!vehicles || vehicles.length === 0) {
            console.error("Aucun véhicule disponible !");
            document.getElementById("total-vehicles").textContent = "0";
            document.getElementById("average-km").textContent = "N/A";
            document.getElementById("most-used-vehicle").textContent = "N/A";
            document.getElementById("least-used-vehicle").textContent = "N/A";
            document.getElementById("most-recent-vehicle").textContent = "N/A";
            document.getElementById("oldest-vehicle").textContent = "N/A";
            return;
        }

        const totalVehicles = vehicles.length;
        document.getElementById("total-vehicles").textContent = totalVehicles;

        const totalKilometrage = vehicles.reduce((sum, car) => sum + (car.kilometrage || 0), 0);
        const averageKilometrage = totalKilometrage / totalVehicles;
        document.getElementById("average-km").textContent = `${averageKilometrage.toFixed(2)} km`;

        const mostUsedVehicle = vehicles.reduce((max, car) => (car.kilometrage || 0) > max.kilometrage ? car : max, vehicles[0]);
        document.getElementById("most-used-vehicle").textContent =
            `${mostUsedVehicle.marque || "N/A"} ${mostUsedVehicle.modele || "N/A"}`;

        const leastUsedVehicle = vehicles.reduce((min, car) => (car.kilometrage || Infinity) < min.kilometrage ? car : min, vehicles[0]);
        document.getElementById("least-used-vehicle").textContent =
            `${leastUsedVehicle.marque || "N/A"} ${leastUsedVehicle.modele || "N/A"}`;

        const mostRecentVehicle = vehicles.reduce((latest, car) => (car.annee || 0) > latest.annee ? car : latest, vehicles[0]);
        document.getElementById("most-recent-vehicle").textContent =
            `${mostRecentVehicle.marque || "N/A"} ${mostRecentVehicle.modele || "N/A"}`;

        const oldestVehicle = vehicles.reduce((oldest, car) => (car.annee || Infinity) < oldest.annee ? car : oldest, vehicles[0]);
        document.getElementById("oldest-vehicle").textContent =
            `${oldestVehicle.marque || "N/A"} ${oldestVehicle.modele || "N/A"}`;
    }
    updateDashboard();
    
    // Appel de la fonction de mise à jour au chargement de la page
    document.addEventListener("DOMContentLoaded", updateDashboard);
    
// Initialisation de l'application après connexion
function initializeApp() {
    updateDashboard();
    refreshVehicleTable(); // Fonction à implémenter pour rafraîchir le tableau des véhicules
    refreshCommandeTable(); // Fonction à implémenter pour rafraîchir le tableau des commandes
    initializeChart(); // Fonction à implémenter pour initialiser le graphique
}

function updateDashboard() {
    const totalVehicles = vehicles.length;

    if (totalVehicles === 0) {
        // Gérer le cas où il n'y a pas de véhicule
        document.getElementById("total-vehicles").textContent = 0;
        document.getElementById("average-km").textContent = "0 km";
        document.getElementById("most-used-vehicle").textContent = "N/A";
        document.getElementById("least-used-vehicle").textContent = "N/A";
        document.getElementById("most-recent-vehicle").textContent = "N/A";
        document.getElementById("oldest-vehicle").textContent = "N/A";
        return;
    }

    const totalKilometrage = vehicles.reduce((sum, car) => sum + car.kilometrage, 0);
    const averageKilometrage = totalKilometrage / totalVehicles;

    document.getElementById("total-vehicles").textContent = totalVehicles;
    document.getElementById("average-km").textContent = `${averageKilometrage.toFixed(2)} km`;

    // Véhicule le plus utilisé
    const mostUsedVehicle = vehicles.reduce((max, car) => car.kilometrage > max.kilometrage ? car : max, vehicles[0]);
    document.getElementById("most-used-vehicle").textContent = `${mostUsedVehicle.marque} ${mostUsedVehicle.modele}`;

    // Véhicule le moins utilisé
    const leastUsedVehicle = vehicles.reduce((min, car) => car.kilometrage < min.kilometrage ? car : min, vehicles[0]);
    document.getElementById("least-used-vehicle").textContent = `${leastUsedVehicle.marque} ${leastUsedVehicle.modele}`;

    // Véhicule le plus récent
    const mostRecentVehicle = vehicles.reduce((max, car) => car.annee > max.annee ? car : max, vehicles[0]);
    document.getElementById("most-recent-vehicle").textContent = `${mostRecentVehicle.marque} ${mostRecentVehicle.modele}`;

    // Véhicule le plus ancien
    const oldestVehicle = vehicles.reduce((min, car) => car.annee < min.annee ? car : min, vehicles[0]);
    document.getElementById("oldest-vehicle").textContent = `${oldestVehicle.marque} ${oldestVehicle.modele}`;
}

// Rafraîchissement de la table des véhicules
function refreshVehicleTable() {
    vehiclesTableBody.innerHTML = "";
    vehicles.forEach((car, index) => {
        const row = `
            <tr>
                <td>${car.marque}</td>
                <td>${car.modele}</td>
                <td>${car.kilometrage} km</td>
                <td>${car.annee}</td>
                <td>
                    <button class="btn btn-warning btn-sm" id="actw" onclick="editCar(${index})">Modifier</button>
                    <button class="btn btn-danger btn-sm" id="actr" onclick="deleteCar(${index})">Supprimer</button>
                </td>
            </tr>
        `;
        vehiclesTableBody.innerHTML += row;
    });
}

// Ajouter une nouvelle voiture
carForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const marque = document.getElementById("marque").value.trim();
    const modele = document.getElementById("modele").value.trim();
    const kilometrage = parseInt(document.getElementById("kilometrage").value.trim(), 10);
    const annee = parseInt(document.getElementById("annee").value.trim(), 10);

    if (marque && modele && !isNaN(kilometrage) && !isNaN(annee)) {
        vehicles.push({ marque, modele, kilometrage, annee });
        refreshVehicleTable();
        updateDashboard();
        carForm.reset();
    }
});

// Récupérer les éléments du DOM
const commandesTableBody = document.getElementById("commande");

// Fonction pour rafraîchir le tableau des commandes
function refreshCommandeTable() {
    commandesTableBody.innerHTML = ""; // Efface les lignes existantes

    commandes.forEach((commande, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${commande.nom}</td>
            <td>${commande.prenom}</td>
            <td>${commande.adressemail}</td>
            <td>${commande.numerotel}</td>
            <td>${commande.date}</td>
            <td>${commande.marque}</td>
            <td>${commande.modele}</td>
            <td>
                 <button class="btn btn-warning btn-sm" id="actw" onclick="editCommande(${index})">Modifier</button>
                 <button class="btn btn-danger btn-sm" id="actr" onclick="deleteCommande(${index})">Supprimer</button>
            </td>
        `;
        commandesTableBody.appendChild(row);
    });
}

// Fonction pour ajouter une commande
commandeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Récupérer les valeurs des champs
    const nomc = document.getElementById("nomc").value.trim();
    const prenomc = document.getElementById("prenomc").value.trim();
    const adressemailc = document.getElementById("adressemailc").value.trim();
    const numerotelc = document.getElementById("numerotelc").value.trim();
    const datec = document.getElementById("datec").value.trim();
    const marquec = document.getElementById("marquec").value.trim();
    const modelec = document.getElementById("modelec").value.trim();

    // Vérifier si tous les champs sont correctement remplis
    if (nomc && prenomc && adressemailc && numerotelc && datec && marquec && modelec) {
        // Ajouter la commande au tableau
        commandes.push({
            nom: nomc,
            prenom: prenomc,
            adressemail: adressemailc,
            numerotel: numerotelc,
            date: datec,
            marque: marquec,
            modele: modelec,
        });

        refreshCommandeTable(); // Met à jour le tableau
        commandeForm.reset(); // Réinitialise le formulaire
        document.getElementById("addCommandeFormContainer").classList.add("hidden"); // Cache le formulaire
    } else {
        alert("Veuillez remplir tous les champs correctement !");
    }
});

// Boutons pour afficher ou cacher le formulaire
document.getElementById("showAddCommandeFormBtn").addEventListener("click", () => {
    document.getElementById("addCommandeFormContainer").classList.remove("hidden");
});

document.getElementById("cancelAddCommandeFormBtn").addEventListener("click", () => {
    document.getElementById("addCommandeFormContainer").classList.add("hidden");
});


// Supprimer une voiture
function deleteCar(index) {
    alert("Voulez-vous vraiment supprimer ce véhicule ?");
    vehicles.splice(index, 1);
    refreshVehicleTable();
    updateDashboard();
}

// Supprimer une commande
function deleteCommande(index) {
    alert("Voulez-vous vraiment supprimer cette commande ?");
    commandes.splice(index, 1);
    refreshCommandeTable();
}

// Initialisation de l'application
function initializeApp() {
    updateDashboard();
    refreshVehicleTable();
    refreshCommandeTable();
}

// Références aux éléments
const logoutBtn = document.getElementById('logoutBtn');

// Gestion de la déconnexion
logoutBtn.addEventListener('click', function () {
    // Réaffiche le formulaire de connexion
    alert("Voulez-vous vraiment vous déconnecter ?");
    loginFormContainer.style.display = 'flex'; // Assure que le formulaire est visible
    homePageContainer.classList.add('hidden'); // Masque la page d'accueil
    homePageContainer.style.display = 'none'; // Assure que l'élément est invisible

    // Réinitialise les champs du formulaire de connexion si nécessaire
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('error-msg').textContent = ''; // Supprime les éventuels messages d'erreur
});

let editVehicleIndex = null;
let editCommandeIndex = null;

// Modifier une voiture
function editCar(index) {
    editVehicleIndex = index;
    const car = vehicles[index];

    document.getElementById("editVehicleMarque").value = car.marque;
    document.getElementById("editVehicleModele").value = car.modele;
    document.getElementById("editVehicleKilometrage").value = car.kilometrage;
    document.getElementById("editVehicleAnnee").value = car.annee;

    document.getElementById("editVehicleFormContainer").classList.remove("hidden");
}

// Modifier une commande
function editCommande(index) {
    editCommandeIndex = index;
    const commande = commandes[index];

    document.getElementById("editCommandeNom").value = commande.nom;
    document.getElementById("editCommandePrenom").value = commande.prenom;
    document.getElementById("editCommandeEmail").value = commande.adressemail;
    document.getElementById("editCommandeTel").value = commande.numerotel;
    document.getElementById("editCommandeMarque").value = commande.marque;
    document.getElementById("editCommandeModele").value = commande.modele;

    document.getElementById("editCommandeFormContainer").classList.remove("hidden");
}

// Sauvegarder les modifications de la voiture
document.getElementById("editVehicleForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const marque = document.getElementById("editVehicleMarque").value;
    const modele = document.getElementById("editVehicleModele").value;
    const kilometrage = parseInt(document.getElementById("editVehicleKilometrage").value, 10);
    const annee = parseInt(document.getElementById("editVehicleAnnee").value, 10);

    vehicles[editVehicleIndex] = { marque, modele, kilometrage, annee };
    refreshVehicleTable();
    document.getElementById("editVehicleFormContainer").classList.add("hidden");
});

// Sauvegarder les modifications de la commande
document.getElementById("editCommandeForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const nom = document.getElementById("editCommandeNom").value;
    const prenom = document.getElementById("editCommandePrenom").value;
    const adressemail = document.getElementById("editCommandeEmail").value;
    const numerotel = document.getElementById("editCommandeTel").value;
    const marque = document.getElementById("editCommandeMarque").value;
    const modele = document.getElementById("editCommandeModele").value;

    commandes[editCommandeIndex] = { nom, prenom, adressemail, numerotel, marque, modele };
    refreshCommandeTable();
    document.getElementById("editCommandeFormContainer").classList.add("hidden");
});

// Annuler les modifications
document.getElementById("cancelEditVehicleBtn").addEventListener("click", () => {
    document.getElementById("editVehicleFormContainer").classList.add("hidden");
});

document.getElementById("cancelEditCommandeBtn").addEventListener("click", () => {
    document.getElementById("editCommandeFormContainer").classList.add("hidden");
});
