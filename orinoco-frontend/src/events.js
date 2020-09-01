
class ProductLine {
    constructor (productid, productcolor, productqty) {	
    this.productid = productid;	
    this.productcolor = productcolor;	
    this.productqty = productqty;
    }
}

export function keepTeddy() {
    const btnToAddInBasket = document.getElementById('toAddInBasket');
    btnToAddInBasket.addEventListener('click', updateBasket);

    function updateBasket() {
        const newProductLine = new ProductLine (
            localStorage.getItem('selectedProductId'),
            localStorage.getItem('selectedProductColor'),
            localStorage.getItem('selectedProductQty'),
        );
        let basketReserved = JSON.parse(localStorage.getItem("basketStored")) || [];
        // A condition que le panier ne soit pas vide
        if (JSON.stringify(basketReserved) != '[]') {
            let sameIdSameColor = null;
            // Pour chaque ligne du panier
            for (const elt in basketReserved) {
                // A condition que le teddy selectionné ait la même référence et le même coloris
                if ((basketReserved[elt].productid === newProductLine.productid) && (basketReserved[elt].productcolor === newProductLine.productcolor)) {
                    //Mise à jour théorique des quantités
                    basketReserved[elt].productqty = parseInt (basketReserved[elt].productqty) + parseInt (newProductLine.productqty);
                    sameIdSameColor = true;
                // Autrement, à condition d'avoir lu tout le panier et que le teddy selectionné ait la même référence mais pas le même coloris
                } else if ((sameIdSameColor === null) && (basketReserved[elt].productid === newProductLine.productid) && (basketReserved[elt].productcolor != newProductLine.productcolor)) {
                    sameIdSameColor = false;
                }
            }

            // En définitif, mise à jour du panier
            if (sameIdSameColor) {
                // Pérénisé la nouvelle quantité
                localStorage.setItem("basketStored", JSON.stringify(basketReserved));
            } else if (!sameIdSameColor) {
                // Nouvelle ligne dans le panier & sauvegarde
                basketReserved.push(newProductLine);
                localStorage.setItem("basketStored", JSON.stringify(basketReserved));
            } else {
                // Nouvelle ligne dans le panier & sauvegarde
                basketReserved.push(newProductLine);
                localStorage.setItem("basketStored", JSON.stringify(basketReserved));
            }

        } else {
            // Nouvelle ligne dans le panier & sauvegarde
            basketReserved.push(newProductLine);
            localStorage.setItem("basketStored", JSON.stringify(basketReserved));
        }
    }
}

export function fillInOrder() {
    const btnToOrder = document.getElementById('toOrder');
    btnToOrder.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la réaction du navigateur par défaut
        e.stopPropagation(); // Stopper la propagation du clic aux éléments parents
        localStorage.removeItem ('selectedProductId');
        localStorage.removeItem ('selectedProductColor');
        localStorage.removeItem ('selectedProductQty');
        location.href = "/views/order.html";
    });
}

export function confirmOrder() {
    const btnToValidateOrder = document.getElementById('toValidateOrder');
    btnToValidateOrder.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la réaction du navigateur par défaut
        e.stopPropagation(); // Stopper la propagation du clic aux éléments parents

        localStorage.setItem('firstName', document.getElementById('firstName').value);
        localStorage.setItem('lastName', document.getElementById('lastName').value);
        localStorage.setItem('address', document.getElementById('address').value);
        localStorage.setItem('city', document.getElementById('city').value);
        localStorage.setItem('email', document.getElementById('email').value);

        location.href = "/views/thanks.html";

    });
}