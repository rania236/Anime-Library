// script.js

// Fonction pour récupérer la liste des animes à partir de l'API AnimeFacts
const fetchAnimeFacts = async () => {
    try {
        const response = await fetch('https://anime-facts-rest-api.herokuapp.com/api/v1');
        const data = await response.json();
        // Vérifiez si la réponse contient des données et appelez la fonction pour afficher les animes
        if (data && data.data) {
            displayAnimeFacts(data.data);
        } else {
            console.error('Aucune donnée trouvée');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
};

// Fonction pour afficher la liste des animes sur la page
const displayAnimeFacts = (animeFacts) => {
    const factContainer = document.getElementById('fact-container');
    factContainer.innerHTML = ''; // Vider le conteneur avant d'ajouter de nouveaux éléments

    // Pour chaque anime dans les données récupérées
    animeFacts.forEach(anime => {
        // Créer un nouvel élément div pour chaque anime
        const animeElement = document.createElement('div');
        animeElement.classList.add('anime');
        
        // Ajouter le contenu HTML pour chaque anime
        animeElement.innerHTML = `
            <h2>${anime.anime_name}</h2>
            <img src="${anime.anime_img}" alt="${anime.anime_name}">
            <button onclick="fetchFacts('${anime.anime_name}')">Afficher les faits</button>
            <div class="facts" id="facts-${anime.anime_name.replace(/\s+/g, '')}"></div>
        `;
        
        // Ajouter l'élément anime au conteneur principal
        factContainer.appendChild(animeElement);
    });
};

// Fonction pour récupérer les faits spécifiques à un anime
const fetchFacts = async (animeName) => {
    try {
        const response = await fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1/${animeName}`);
        const data = await response.json();
        // Vérifiez si la réponse contient des données et appelez la fonction pour afficher les faits
        if (data && data.data) {
            displayFacts(animeName, data.data);
        } else {
            console.error('Aucune donnée de faits trouvée pour:', animeName);
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération des faits pour ${animeName}:`, error);
    }
};

// Fonction pour afficher les faits d'un anime spécifique
const displayFacts = (animeName, facts) => {
    const factsContainer = document.getElementById(`facts-${animeName.replace(/\s+/g, '')}`);
    factsContainer.innerHTML = ''; // Vider le conteneur avant d'ajouter de nouveaux éléments

    // Pour chaque fait dans les données récupérées
    facts.forEach(fact => {
        // Créer un nouvel élément paragraphe pour chaque fait
        const factElement = document.createElement('p');
        factElement.innerText = fact.fact;
        // Ajouter l'élément fait au conteneur des faits
        factsContainer.appendChild(factElement);
    });
};

// Ajouter un événement pour charger les animes lorsque le contenu de la page est entièrement chargé
document.addEventListener('DOMContentLoaded', fetchAnimeFacts);
