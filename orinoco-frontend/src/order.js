import euroConverter from './utils';

// FONCTION GLOBALE - Afficher les oursons ajoutés au panier de commande
export default function showTeddiesInBasket() {
    let basket = JSON.parse(localStorage.getItem("basketStored"));
    let midAmount = 0;
    let totalAmount = 0;
    //let totalAmount = parseInt(localStorage.getItem("totalAmountStored")) || 0;
    let basketRow = 0;

    for (const item of basket) {
        console.log (item.productid);
        /* REQUETE API GET pour afficher le détail du produit sélectionné
        -- DEBUT -- */

        const url = 'http://localhost:3000/api/teddies/' + item.productid;
        //console.log(url);
        fetch(url)
        .then(response => response.json())
        .then(thisItem => {
            midAmount = parseInt(thisItem.price) * item.productqty;
            let orderResult = document.getElementById('orderResult');
            orderResult.innerHTML += `<tr class='product'>
                <td>(<a id='${thisItem._id}_btnToDeleteThisLine' href='../views/order.html'>Supprimer</a>)</td>
                <td>${thisItem._id}</td>
                <td><img src='${thisItem.imageUrl}' width='50%'/></td>
                <td><a id='${thisItem.name}' href='/views/customize.html'>${thisItem.name}</a></td>
                <td id='${item.productcolor}'>${item.productcolor}</td>
                <td>${item.productqty}</td>
                <td>${euroConverter(thisItem.price)}</td>
                <td>${euroConverter(midAmount)}</td>
            </tr>`;
            
            console.log (orderResult);

            totalAmount += midAmount;
            //console.log ("Montant total: " + euroConverter(totalAmount));
            localStorage.setItem("totalAmountStored", totalAmount);
            basketRow ++;
            //console.log ("basketRow: " + basketRow);

            if ( basketRow === basket.length ){
                let totalAmountArea = document.getElementById('totalAmountArea');
                totalAmountArea.innerHTML += "<h2>Montant total : " + euroConverter(localStorage.getItem("totalAmountStored")) + "</h2>";
            }

            return thisItem;
        })
        .then(thisItem => {
            console.log(thisItem._id + ' ' + thisItem.name);
            document.getElementById(thisItem.name).onclick = () => {
                localStorage.setItem ('selectedProductId', thisItem._id);
                //alert ("LocalStorage : " + localStorage.getItem ('selectedProductId'));
                location.href = "/views/customize.html";
            }

            document.getElementById(thisItem._id + '_btnToDeleteThisLine').onclick = (evt) => {
                evt.preventDefault;
                let newBasket = [];
                const searchArray = JSON.parse(localStorage.getItem("basketStored"));
                for (const elt of searchArray) {
                    if(elt.productid != thisItem._id) newBasket.push(elt);
                    if((elt.productid === thisItem._id) && (elt.productcolor != item.productcolor)) newBasket.push(elt);
                }
                localStorage.setItem('basketStored', JSON.stringify(newBasket));
            }

        })
        .catch(err => {
            console.log("Quelque chose s'est mal passé durant le GET !", err);
        });
        /* REQUETE API GET pour afficher le détail de l'article sélectionné
        -- FIN -- */
    }
}