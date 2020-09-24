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

        for (let value in listOfProducts) {

            listResult.innerHTML += `<article class='col-md-6 col-lg-4 p-3'>
                <img src='${listOfProducts[value].imageUrl}' alt='${listOfProducts[value]._id}' width=50% />
                <h3><a id='${listOfProducts[value].name}' href='/views/customize.html'>${listOfProducts[value].name}</a></h3>
                <h5>${euroConverter(listOfProducts[value].price)}</h5>
            </article>`;

            //console.log (listOfProducts[value].name);
            //console.log (listOfProducts[value]._id);

            console.log(document.getElementById(listOfProducts[value].name));
        }

        for (let value in listOfProducts) {
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