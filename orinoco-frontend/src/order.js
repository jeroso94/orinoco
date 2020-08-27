import euroConverter from './utils';

// FONCTION GLOBALE - Afficher les oursons ajoutés au panier de commande
export default function showTeddiesInBasket() {
    let basket = JSON.parse(localStorage.getItem("basketStored"));
    let totalAmount = 0;
    //let totalAmount = parseInt(localStorage.getItem("totalAmountStored")) || 0;
    let basketRow = 0;

    for (const item of basket) {
        console.log (item);
        /* REQUETE API GET pour afficher le détail du produit sélectionné
        -- DEBUT -- */

        const url = 'http://localhost:3000/api/teddies/' + item;
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then(productsInBasket => {
            let orderResult = document.getElementById('orderResult');
            orderResult.innerHTML += `<tr class='product'>
                <td>(<a id='${productsInBasket._id}_btnToDelete' href='../views/order.html'>Supprimer</a>)</td>
                <td>(<a id='${productsInBasket.name}' href='/views/customize.html'>Détails...</a>)</td>
                <td>${productsInBasket._id}</td>
                <td><img src='${productsInBasket.imageUrl}' width='50%'/></td>
                <td>${productsInBasket.name}</td>
                <td>${'vide'}</td>
                <td>${'vide'}</td>
                <td>${euroConverter(productsInBasket.price)}</td>
                <td>${'vide'}</td>
            </tr>`;
            
            //console.log (productsInBasket.name + ":" + euroConverter(productsInBasket.price));

            totalAmount += parseInt(productsInBasket.price);
            //console.log ("Montant total: " + euroConverter(totalAmount));
            localStorage.setItem("totalAmountStored", totalAmount);
            basketRow ++;
            //console.log ("basketRow: " + basketRow);

            if ( basketRow === basket.length ){
                let totalAmountArea = document.getElementById('totalAmountArea');
                totalAmountArea.innerHTML += "<h2>Montant total : " + euroConverter(localStorage.getItem("totalAmountStored")) + "</h2>";
            }
        })
        .catch(err => {
            console.log("Quelque chose s'est mal passé durant le GET !", err);
        });
        /* REQUETE API GET pour afficher le détail de l'article sélectionné
        -- FIN -- */

        /* REQUETE API GET pour afficher le détail de l'article sélectionné depuis le panier
        -- FIN -- */
        fetch(url)
        .then(response => response.json())
        .then(pIB => {
            console.log(document.getElementById(pIB.name));
            document.getElementById(pIB.name).onclick = () => {
                localStorage.setItem ('selectedProductId', pIB._id);
                //alert ("LocalStorage : " + localStorage.getItem ('selectedProductId'));
                location.href = "/views/customize.html";
            }

            document.getElementById(pIB._id+'_btnToDelete').onclick = (evt) => {
                evt.preventDefault;
                let newBasket = [];
                const array=JSON.parse(localStorage.getItem("basketStored"));
                for (let token in array) {
                    if(array[token] != pIB._id) newBasket.push(array[token]);
                }
                localStorage.setItem('basketStored', JSON.stringify(newBasket));
            }
        })
        .catch((err) => {
            console.log("Quelque chose s'est mal passé durant le GET !", err);
        });
                /* REQUETE API GET pour afficher le détail de l'article sélectionné depuis le panier
        -- FIN -- */
    }
}