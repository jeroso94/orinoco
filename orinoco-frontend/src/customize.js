import euroConverter from './utils';

// FONCTION GLOBALE - Afficher le détail d'un ourson et les coloris disponibles
export default function showDetailsAndCustomize() {

    /* REQUETE API GET pour afficher le détail du produit sélectionné
    -- DEBUT -- */
    //const url = 'http://localhost:3000/api/teddies/' + localStorage.getItem('selectedProductId');
    let params = (new URL(document.location)).searchParams;
    let selectedProductId = params.get('id');
    const url = 'http://localhost:3000/api/teddies/' + selectedProductId;
    //console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(selectedProduct => {
        let teddyPicture = document.getElementById('teddyPicture');
        teddyPicture.innerHTML += `<img class="img-fluid" src='${selectedProduct.imageUrl}' alt='${selectedProduct._id}' width='100%'>`;

        let teddyTitle = document.getElementById('teddyTitle');
        teddyTitle.innerText += `Et voici... ${selectedProduct.name}`;

        let teddyStory = document.getElementById('teddyStory');
        teddyStory.innerText += `Mon histoire : ${selectedProduct.description}`;

        let teddyPrice = document.getElementById('teddyPrice');
        teddyPrice.innerText += `Prix unitaire : ${euroConverter(selectedProduct.price)}`;

        // Gestion des produits - Coloris disponibles à la vente
        const selectTeddyColor = document.getElementById('teddyColor');
        for (let availableChoice in selectedProduct.colors) {
            //console.log (selectedProduct.colors[availableChoice]);
            const newColor = document.createElement("option");
            selectTeddyColor.appendChild(newColor);
            newColor.setAttribute("value",selectedProduct.colors[availableChoice]);
            newColor.innerHTML += selectedProduct.colors[availableChoice];
        }

        /* Gestion EVENEMENT - Liste déroulante CHOIX DU COLORIS PELUCHE
        -- DEBUT -- */
        selectTeddyColor.addEventListener('change', (event) => {
            const logTeddyColor = document.getElementById('logTeddyColor');
            logTeddyColor.textContent = `Coloris ${event.target.value} retenu.`;
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
            logTeddyQty.textContent = `${event.target.value} exemplaire(s) retenu(s).`;
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