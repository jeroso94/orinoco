import euroConverter from './utils';

// FONCTION GLOBALE - Afficher les oursons disponibles à l'adoption
export default function showAllTeddies() {
    /* REQUETE API GET pour afficher la liste des produits
    -- DEBUT -- */

    fetch('http://localhost:3000/api/teddies')
    .then(response => response.json())
    .then(listOfProducts => {
        let listResult = document.getElementById('result');

        console.log (listOfProducts);

        for (const value in listOfProducts) {

            listResult.innerHTML += `<article>
                <img src='${listOfProducts[value].imageUrl}' alt='${listOfProducts[value]._id}' width=25% />
                <p>Référence: ${listOfProducts[value]._id}</p>
                <h2><a id='${listOfProducts[value].name}' href='/views/customize.html'>${listOfProducts[value].name}</a></h2>
                <h3>${euroConverter(listOfProducts[value].price)}</h3>
            </article>`;

            //console.log (listOfProducts[value].name);
            //console.log (listOfProducts[value]._id);

            console.log(document.getElementById(listOfProducts[value].name));
        }

        for (const value in listOfProducts) {
            document.getElementById(listOfProducts[value].name).onclick = () => {
                localStorage.setItem ('selectedProductId', listOfProducts[value]._id);
                //alert ("LocalStorage : " + localStorage.getItem ('selectedProductId'));
                location.href = "/views/customize.html";  
            }
        } 
    })
    .catch(err => {
        console.log("Quelque chose s'est mal passé durant le GET pour constituer la liste des produits !", err);
    });
    /* REQUETE API GET pour afficher la liste des produits
    -- FIN -- */	
}