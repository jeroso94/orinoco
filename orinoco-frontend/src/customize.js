import euroConverter from './utils';

// FONCTION GLOBALE - Afficher le détail d'un ourson et les coloris disponibles
export default function showDetailsAndCustomize() {

    /* REQUETE API GET pour afficher le détail du produit sélectionné
    -- DEBUT -- */
    const url = 'http://localhost:3000/api/teddies/' + localStorage.getItem('selectedProductId');
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(selectedProduct => {
        let customizeResult = document.getElementById('customizeResult');
        customizeResult.innerHTML += `<h2> Et voici... ${selectedProduct.name} </h2>           
            <img src=${selectedProduct.imageUrl} alt='${selectedProduct._id}' width=25% />
            <p>Référence: ${selectedProduct._id}</p>
            <h3> Tu peux m'adopter pour ${euroConverter(selectedProduct.price)} !</h3>
            <p> Voici mon histoire: ${selectedProduct.description} </p>`;

        // Gestion des produits - Coloris disponibles à la vente
        const selectTeddyColor = document.getElementById('teddyColor');
        for (const availableChoice in selectedProduct.colors) {
            console.log (selectedProduct.colors[availableChoice]);
            const newColor = document.createElement("option");
            selectTeddyColor.appendChild(newColor);
            newColor.setAttribute("value",selectedProduct.colors[availableChoice]);
            newColor.innerHTML += selectedProduct.colors[availableChoice];
        }

        /* Gestion EVENEMENT - Liste déroulante CHOIX DU COLORIS PELUCHE
        -- DEBUT -- */
        selectTeddyColor.addEventListener('change', (event) => {
            const logTeddyColor = document.getElementById('logTeddyColor');
            logTeddyColor.textContent = `Coloris ${event.target.value} enregistré.`;
            localStorage.setItem ('selectedProductColor', `${event.target.value}`);
        });
        /* Gestion EVENEMENT - Liste déroulante CHOIX DU COLORIS PELUCHE
        -- FIN -- */

        // Gestion des produits - Quantités disponibles à la vente
        const selectTeddyQty = document.getElementById('teddyQty');
        for (let x = 1; x < 31; x ++){
            const newQty = document.createElement("option");
            selectTeddyQty.appendChild(newQty);
            newQty.setAttribute("value", x);
            newQty.innerHTML += x;
        }

        /* Gestion EVENEMENT - Liste déroulante CHOIX DE QUANTITE
        -- DEBUT -- */
        selectTeddyQty.addEventListener('change', (event) => {
            const logTeddyQty = document.getElementById('logTeddyQty');
            logTeddyQty.textContent = `${event.target.value} exemplaire(s) enregistré(s).`;
            localStorage.setItem ('selectedProductQty', `${event.target.value}`);
        });
        /* Gestion EVENEMENT - Liste déroulante CHOIX DE QUANTITE
        -- FIN -- */

        // Valeurs par défaut stockées pour le panier
        localStorage.setItem ('selectedProductColor', selectTeddyColor.firstElementChild.getAttribute("value"));
        localStorage.setItem ('selectedProductQty', selectTeddyQty.firstElementChild.getAttribute("value"));
    })
    .catch(err => {
        console.log("Quelque chose s'est mal passé durant le GET pour fournir le détail du produit selectionné !", err);
    });
    /* REQUETE API GET pour afficher le détail de l'article sélectionné
    -- FIN -- */
}