

class Contact {
    constructor (id, surname, name, address, email) {
      this.id = id;	
      this.surname = surname;	
      this.name = name;	
      this.address = address;	
      this.email = email;	
    }
  }
          
  class Order {
    constructor (id, contactId, productId, totalAmount) {
      this.id = id;	
      this.contactId = contactId;	
      this.products = products;	
      this.totalAmount = totalAmount;	
    }
    addProduct(productID, productPrice) {
      this.products.push(productID);	
      this.totalAmount += productPrice;	
    }
    showValidateOrder() {
      console.log	(BePolite.SayThankYouTo (newContact.surname) + "la commande #" + this.id + " est confirmé pour un montant total de " + this.totalAmount + ".");
    }
  }		
          
  class BePolite {
    static sayTankYouTo (surname) {
      console.log	("Thanks, " + surname + " !");
    }
  }


const newContact = new Contact (	
	contactID,
	surname,
	name,
	address,
	email);
	
const newOrder = new Order (	
	orderID,
	newContact.id,
	products,
    totalAmount);
    

//Initialisation
let totalAmount = 0;

//Attribuer un ID aléatoire
const contactID = Math.round(Math.random()*1000000);
// const orderID = Math.round(Math.random()*1000000000);

//Ajouter un produit	
newOrder.addProduct (	
	myTeddy.id,
  myTeddy.price);

  
// Envoi du bon de commande au serveur
// POST : Tableau avec IDs des produits sélectionnés

/*
POST Request Body
{
    "contact": {
        "firstName":"julien",
        "lastName":"Violay",
        "address":"1 rue voltaire",
        "city":"Paris",
        "email":"jviolay@noos.fr"
    },
    "products": ["5be9c8541c9d440000665243"]
}
*/

fetch('http://localhost:3000/api/order', {method: 'POST'})
.then((response) => {
    return console.log(response.json());
}).catch((err) => {
    console.log("Quelque chose s'est mal passé durant le POST du bon de commande !", err);
});  


