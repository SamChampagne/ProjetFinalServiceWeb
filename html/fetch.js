document.getElementById('formCreateUser').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const nom = formData.get('nom');
    const prenom = formData.get('prenom');
    const email = formData.get('email');
    const motdepasse = formData.get('motdepasse');
    console.log(motdepasse)
    const userData = {
        nom: nom,
        prenom: prenom,
        email: email,
        mot_de_passe: motdepasse
    };
    fetch('https://apiservicewebprojetfinal.onrender.com/api/utilisateur/ajouter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').hidden = false
        document.getElementById('result').innerHTML = `<p>Réponse de la création d'utilisateur: ${JSON.stringify(data)}</p>`;
    })
    .catch(error => {
        console.error('Erreur lors de la création d\'utilisateur:', error);
        document.getElementById('result').innerHTML = `<p>Erreur lors de la création d'utilisateur.</p>`;
    });
});

document.getElementById('formGenerateApiKey').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('emailApiKey');
    const motdepasse = formData.get('motdepasseApiKey');

    try {
        const response = await fetch('https://apiservicewebprojetfinal.onrender.com/api/utilisateur/token', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mot_de_passe: motdepasse, email: email })
        });
        
        if (!response.ok) { 
            throw new Error();
        }

        const data = await response.json();
        document.getElementById('result').hidden = false
        document.getElementById('result').innerHTML = `<p>Nouvelle clé API générée: ${data.cle_api}</p>`;
    } catch (error) {
        console.error('Erreur:', error);
        document.getElementById('result').hidden = false
        document.getElementById('result').innerHTML = `<p>Erreur lors de la génération de la clé API ou l'utilisateur n'existe pas ${error.message}</p>`;
    }
});