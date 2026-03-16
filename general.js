// 1. CHARGEMENT DU HEADER
fetch('header.html')
    .then(response => response.text()) // On récupère du texte (HTML), pas du JSON
    .then(html => {
        // On injecte le code HTML dans la balise qui a l'id "header-placeholder"
        document.getElementById('header-placeholder').innerHTML = html;
    })
    .catch(error => console.error('Erreur lors du chargement du header:', error));
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