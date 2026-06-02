
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");

const cartSidebar = document.getElementById("cart-sidebar");

const cartItemsContainer =
document.getElementById("cart-items");

const cartTotal =
document.getElementById("cart-total");

const cartCount =
document.getElementById("cart-count");

const addButtons =
document.querySelectorAll(".add-cart");


let cart =
JSON.parse(localStorage.getItem("gatoGagoCart"))
|| [];


cartBtn.addEventListener("click", () => {

    cartSidebar.classList.add("active");

});

closeCart.addEventListener("click", () => {

    cartSidebar.classList.remove("active");

});

function saveCart(){

    localStorage.setItem(
        "gatoGagoCart",
        JSON.stringify(cart)
    );

}


function updateCart(){

    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item,index)=>{

        total += item.price;

        const product = document.createElement("div");

        product.classList.add("cart-product");

        product.innerHTML = `

            <div class="cart-item">

                <div>

                    <h4>${item.name}</h4>

                    <p>
                        R$ ${item.price.toFixed(2)}
                    </p>

                </div>

                <button
                    class="remove-item"
                    data-index="${index}"
                >
                    ✕
                </button>

            </div>

        `;

        cartItemsContainer.appendChild(product);

    });

    cartTotal.textContent =
    `R$ ${total.toFixed(2)}`;

    cartCount.textContent =
    cart.length;

    saveCart();

    attachRemoveEvents();
}

function attachRemoveEvents(){

    const removeButtons =
    document.querySelectorAll(".remove-item");

    removeButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            const index =
            button.dataset.index;

            cart.splice(index,1);

            updateCart();

        });

    });

}

addButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const product = {

            name:
            button.dataset.name,

            price:
            parseFloat(
                button.dataset.price
            )

        };

        cart.push(product);

        updateCart();

        cartSidebar.classList.add("active");

    });

});


const finishBtn =
document.querySelector(".finish-btn");

finishBtn.addEventListener("click",()=>{

    if(cart.length === 0){

        alert(
        "Seu carrinho está vazio!"
        );

        return;
    }

    alert(
    "Pedido realizado com sucesso! 🐾"
    );

    cart = [];

    updateCart();

});

updateCart();