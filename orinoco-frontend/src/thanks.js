
import euroConverter from './utils';


// FONCTION GLOBALE - Afficher le récapitulatif de commande envoyé au serveur
export default function showConfirmationOfOrder() {
    
    let thanksResult = document.getElementById('thanksResult');
    

    // Message d'information contenant le montant total de la commande et son numéro d'enregistrement sur le serveur
    thanksResult.innerHTML += `<p>Votre commande d'un montant de <h5 class="mt-3 mb-4">${euroConverter(localStorage.getItem("totalAmountStored"))}</h5> est enregistrée sous la référence <h5 class="mt-3 mb-4">${localStorage.getItem("orderId")}.</h5></p>`;

    // Suppression des paires clés/valeurs relatives au parcours utilisateur durant sa commande
    localStorage.removeItem("orderId");
    localStorage.removeItem("basketStored");
    localStorage.removeItem("totalAmountStored");
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('address');
    localStorage.removeItem('city');
    localStorage.removeItem('email');

}

// localStorage.clear;