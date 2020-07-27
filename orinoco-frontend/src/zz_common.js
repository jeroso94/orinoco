let selectedProductId = "NONE";

//Page Selection - Construire l'affichage de la liste des produits
fetch('http://localhost:3000/api/teddies')
    .then(function (response) {
        return response.json();
    })
    .then(function(listOfProducts){
        console.log (document.getElementsByTagName('title')[0].innerHTML);
        let listResult = document.getElementById('result');

        switch (document.getElementsByTagName('title')[0].innerHTML) {            
            case "Orinoco - Sélection":
                console.log ('dans le cas Orinoco - Selection');
                for (const value in listOfProducts) {
                    listResult.innerHTML += "<div class='product'>"
                    + "<img src=" + listOfProducts[value].imageUrl + " width=25% />"
                    + "<p>Prénom: " + listOfProducts[value].name + " ("
                    + "<a id='detailProduit' href='./views/customize.html'>Détails...</a>)</p>"
                    + "<p>Valeur: "+ euroConverter(listOfProducts[value].price) + "</p>"
                    + "<p> Référence: " + listOfProducts[value]._id + "</p>"
                    + "</div>";

                    // Stocker la référence produit sélectionnée et autoriser le chargement de la page "customize.html" pour de ce produit 
                    const elt = document.getElementById('detailProduit');	
                    elt.addEventListener('click',function(event) {	
                        selectedProductId = listOfProducts[value]._id;
                        console.log ('valeur pour selectedProductId: ' + selectedProductId);
                    //	event.preventDefault(); // Prevenir la réaction du navigateur par défaut
                        event.stopPropagation(); // Stopper la propagation du clic aux éléments parents
                    });	
                }
                break;

            case "Orinoco - Produit":
                console.log('dans le cas Orinoco - Produit')
//                for (const value in listOfProducts) {
//                    console.log(listOfProducts[value]._id);
                    console.log ('valeur pour selectedProductId: ' + selectedProductId);
                    switch (selectedProductId) {
                        case '5be9c8541c9d440000665243':
                            listResult.innerHTML += "<div class='product'>"
                            + "<img src=" + listOfProducts[value].imageUrl + " width=25% />"
                            
                            + "<p> (Référence: " + listOfProducts[value]._id + ")</p>"
                            
                            + "<div> Bonjour ! Je m'appelle " + listOfProducts[value].name + "</div>"
                            + "<div> Voici mon histoire: " + listOfProducts[value].description + "</div>"
                            + "<p> Tu peux m'adopter pour " + euroConverter(listOfProducts[value].price) + " !</p>"
                            + "</div>";


                            const selectElement = document.querySelector('.selector');	
                            for (const availableChoice in listOfProducts[value].colors) {
                                console.log (listOfProducts[value].colors[availableChoice]);
                                const newOption = document.createElement("option");
                                selectElement.appendChild(newOption);
                                newOption.setAttribute("value",listOfProducts[value].colors[availableChoice]);
                                newOption.innerHTML += listOfProducts[value].colors[availableChoice];
                            }
                            
                            selectElement.addEventListener('change', (event) => {	
                                const logTeddyColor = document.querySelector('.logTeddyColor');
                                logTeddyColor.textContent = `Tu préfères le coloris "${event.target.value}"`;
                            });	
                            break;
                    
                        default:
                            break;
                    }
                    break;
//                }
            default:
                break;
        }

    })
    .catch(function (err) {
        console.log("Quelque chose s'est mal passé !", err);
    });


// Convertir les cents en Euros
const euroConverter = (cents) => {	
	let euros = cents / 100;
	return euros + " Euros";
}	



/* Debugging
console.log (this.response[0].name);
let response;
try{
    response = this.response[0].name;
}catch (e){
    console.log (e);
}
*/
