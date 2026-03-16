// 1. CHARGEMENT DU HEADER
fetch('header.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('header-placeholder').innerHTML = html;
    })
    .catch(error => console.error('Erreur lors du chargement du header:', error));

// 2. CHARGEMENT DES DONNÉES
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        document.querySelectorAll('.data-prenom').forEach(el => el.textContent = data.prenom);
        document.querySelectorAll('.data-nom').forEach(el => el.textContent = data.nom);
        document.querySelectorAll('.data-metier').forEach(el => el.textContent = data.metier);
        document.querySelectorAll('.data-email').forEach(el => el.textContent = data.email);
        document.querySelectorAll('.data-annee').forEach(el => el.textContent = data.annee);
    })
    .catch(error => console.error('Erreur lors du chargement des données:', error));

// 3. GESTION DU FORMULAIRE DE CONTACT
// On cherche d'abord si le formulaire existe sur la page actuelle
const formulaireContact = document.getElementById('contact-form');

// Si le formulaire existe (donc on est sur la page contact.html), on applique le code
if (formulaireContact) {
    formulaireContact.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupération des données du formulaire
        const formData = new FormData(this);
        const nom = formData.get('nom');
        const email = formData.get('email');
        const message = formData.get('message');

        // Création du contenu du fichier texte
        const contenuFichier = `Date d'envoi: ${new Date().toLocaleString('fr-FR')}\n\nNom: ${nom}\nEmail: ${email}\n\nMessage:\n${message}`;

        // Formatage de la date pour le nom du fichier
        const now = new Date();
        const dateStr = now.getFullYear() + "-" + 
                        String(now.getMonth() + 1).padStart(2, '0') + "-" + 
                        String(now.getDate()).padStart(2, '0') + "_" + 
                        String(now.getHours()).padStart(2, '0') + "-" + 
                        String(now.getMinutes()).padStart(2, '0') + "-" + 
                        String(now.getSeconds()).padStart(2, '0');
        
        const nomFichier = `contact_${dateStr}.txt`;

        // Logique de création et téléchargement du fichier
        const blob = new Blob([contenuFichier], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = nomFichier;
        document.body.appendChild(a);
        a.click(); 
        
        // Nettoyage de la mémoire et de la page
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Vider le formulaire et confirmer
        this.reset();
        alert('Votre message a été généré sous forme de fichier !');
    });
}