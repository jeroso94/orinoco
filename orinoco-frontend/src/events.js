
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
        let basketReserved = JSON.parse(localStorage.getItem("basketStored")) || [];
        basketReserved.push(localStorage.selectedProductId);
        localStorage.setItem("basketStored", JSON.stringify(basketReserved));

        const newProductLine = new ProductLine (
            localStorage.getItem('selectedProductId'),
            localStorage.getItem('selectedProductColor'),
            localStorage.getItem('selectedProductQty'),
        );
        console.log(newProductLine.productid, newProductLine.productcolor, newProductLine.productqty);
        //document.getElementById('toOrder').disabled = false;
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