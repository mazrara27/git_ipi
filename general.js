// general.js
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        // Remplacement de toutes les données si les classes existent sur la page
        document.querySelectorAll('.data-prenom').forEach(el => el.textContent = data.prenom);
        document.querySelectorAll('.data-nom').forEach(el => el.textContent = data.nom);
        document.querySelectorAll('.data-metier').forEach(el => el.textContent = data.metier);
        document.querySelectorAll('.data-email').forEach(el => el.textContent = data.email);
        document.querySelectorAll('.data-annee').forEach(el => el.textContent = data.annee);
    })
    .catch(error => console.error('Erreur lors du chargement des données:', error));