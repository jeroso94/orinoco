import euroConverter from './utils';

// FONCTION GLOBALE - Afficher les oursons ajoutés au panier de commande
export default function showTeddiesInBasket() {
    let basket = JSON.parse(localStorage.getItem("basketStored"));
    let midAmount = 0;
    let totalAmount = 0;
    let basketRow = 0;

    for (let item of basket) {

        /* REQUETE API GET pour afficher le détail du produit sélectionné
        -- DEBUT -- */        
       
        const url = 'http://localhost:3000/api/teddies/' + item.productid;
        //console.log(url);
        fetch(url)
        .then(response => response.json())
        .then(thisItem => {
            midAmount = parseInt(thisItem.price) * item.productqty;
            let cart = document.getElementById('orderResult');
            cart.innerHTML += `<tr class='product'>
                <td>(<a class='btnToDeleteAProduct' data-id='${thisItem._id}' data-color='${item.productcolor}' href='../views/order.html'>Supprimer</a>)</td>
                <td>${thisItem._id}</td>
                <td><img src='${thisItem.imageUrl}' width='50%'/></td>
                <td><a class='NameOfTeddy' data-id='${thisItem._id}' data-name='${thisItem.name}' data-color='${item.productcolor}' href='../views/customize.html'>${thisItem.name}</a></td>
                <td>${item.productcolor}</td>
                <td>${item.productqty}</td>
                <td>${euroConverter(thisItem.price)}</td>
                <td>${euroConverter(midAmount)}</td>
            </tr>`;

            // console.log(cart);

            totalAmount += midAmount;
            //console.log ("Montant total: " + euroConverter(totalAmount));
            localStorage.setItem("totalAmountStored", totalAmount);
            basketRow ++;
            //console.log ("basketRow: " + basketRow);

            if ( basketRow === basket.length ){
                let totalAmountArea = document.getElementById('totalAmountArea');
                totalAmountArea.innerHTML += "<h2>Montant total : " + euroConverter(localStorage.getItem("totalAmountStored")) + "</h2>";
            }

            const eltNameOfTeddy = document.getElementsByClassName('NameOfTeddy');
            //console.log(eltNameOfTeddy);
            for (let v of eltNameOfTeddy) {
                v.addEventListener ('click', (evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    localStorage.setItem ('selectedProductId', v.dataset.id);
                    location.href = "/views/customize.html";
                });
            }

            const eltBtnToDeleteAProduct = document.getElementsByClassName('btnToDeleteAProduct');
            //console.log (eltBtnToDeleteAProduct);
            for (let v of eltBtnToDeleteAProduct) {
                v.addEventListener ('click', (evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    let newBasket = [];
                    const searchArray = JSON.parse(localStorage.getItem("basketStored"));
                    for (let elt of searchArray) {
                        if(elt.productid != v.dataset.id || elt.productcolor != v.dataset.color) newBasket.push(elt);
                    }
                    localStorage.setItem('basketStored', JSON.stringify(newBasket));
                    location.href = "/views/order.html";
                });
            }
        })
        .catch(err => {
            console.log("Quelque chose s'est mal passé durant le GET !", err);
        });
        /* REQUETE API GET pour afficher le détail de l'article sélectionné
        -- FIN -- */
        
    }
}