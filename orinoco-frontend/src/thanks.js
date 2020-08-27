import euroConverter from './utils';

// CLASSE - Stocker les coordonnées utilisateur pour la livraison
class Contact {
    constructor (firstname, lastname, address, city, email) {	
    this.firstname = firstname;	
    this.lastname = lastname;	
    this.address = address;
    this.city = city;
    this.email = email;	
    }
}

// FONCTION GLOBALE - Afficher le récapitulatif de commande envoyé au serveur
export default function showConfirmationOfOrder() {
    const newContact = new Contact (
        localStorage.getItem('firstName'),
        localStorage.getItem('lastName'),
        localStorage.getItem('address'),
        localStorage.getItem('city'),
        localStorage.getItem('email')
    );

    const basketConfirmed = JSON.parse(localStorage.getItem("basketStored"))

    // Envoi du bon de commande au serveur
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "contact": {
                "firstName":    newContact.firstname,
                "lastName":     newContact.lastname,
                "address":      newContact.address,
                "city":         newContact.city,
                "email":        newContact.email
            },
            "products":         basketConfirmed
        })
    })
    .then(response => {
        console.log(response.status + ":" + response.statusText);
        return response.json();
    })
    .then(data =>{
        console.log(data);
        console.log(data.orderId);

        let thanksResult = document.getElementById('thanksResult');
 
        // Message d'information contenant le montant total de la commande et son numéro d'enregistrement sur le serveur
        thanksResult.innerHTML += `<p>Votre commande d'un montant de <h3>${euroConverter(localStorage.getItem("totalAmountStored"))}</h3> est enregistrée sous la référence <h3>${data.orderId}</h3>.</p>`;

        // Suppression des paires clés/valeurs relatives au parcours utilisateur durant sa commande
        localStorage.removeItem("basketStored");
        localStorage.removeItem("totalAmountStored");
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('address');
        localStorage.removeItem('city');
        localStorage.removeItem('email');
    })
    .catch(err => {
        console.log("Quelque chose s'est mal passé durant le POST de la commande !", err);
    });
}

// localStorage.clear;