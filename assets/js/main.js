/* navbar, showing links */
const showingInput = document.querySelector("nav .showing-links input");
const links = document.querySelector("nav .links");
showingInput.addEventListener("click", (e) => {
    if (showingInput.checked) {
        links.style.display = "block";
    } else {
        links.style.display = "none";
    }
})
window.onresize = () => {
    if (document.documentElement.clientWidth > 992) {
        links.style.display = "block";
    }
}


/* scroll to top button */

const scroll_to_top = document.querySelector(".scrollToTop");

window.addEventListener("scroll", (e) => {
    if (document.documentElement.scrollTop >= 500) {
        scroll_to_top.style.display = "flex";
    } else {
        scroll_to_top.style.display = "none";
    }
})

scroll_to_top.addEventListener("click", () => {
    document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})


/* Working on shopping Cart */


const addToCartButton = document.querySelectorAll(".product_content .actions-container .add");
const shoppingCart_Products = document.querySelector(".shopping-cart .products");

let choosenProducts = [];
if (localStorage.getItem("flowerShoppingCart")) {
    choosenProducts = JSON.parse(localStorage.getItem("flowerShoppingCart"));
    bringProductsFromLocalStorage(choosenProducts);
    closingCart()
    incearing_And_decreasing();
};



addToCartButton.forEach(button => {
    button.addEventListener("click", ({ target }) => {
        let productInformationObject = {};

        let productCard = target.closest(".product_card");

        let pImgSrc = productCard.children[0].children[0].getAttribute("src");
        let pName = productCard.children[1].querySelector(".name").innerText;
        let pPrice = +productCard.children[1].querySelector(".price .new-price").innerText.slice(1);

        productInformationObject["productImageSrc"] = pImgSrc;
        productInformationObject["productName"] = pName;
        productInformationObject["productPrice"] = pPrice;


        // checking if chosen product already choosen
        if (localStorage.getItem("flowerShoppingCart")) {
            let storedData = JSON.parse(localStorage.getItem("flowerShoppingCart"));
            let check = storedData.some((el) => {
                return el.productImageSrc === pImgSrc
            });
            if (!check) {
                choosenProducts.push(productInformationObject)
                shoppingCart_Products.innerHTML += `
                <div class="product">
                    <img src="${productInformationObject.productImageSrc}" alt="">

                    <div class="action">
                    <div class="name-price">
                        <span class="name">${productInformationObject.productName}</span>
                        <span class="price">${productInformationObject.productPrice}</span>
                    </div>
                    <div class="quantity">
                        <span class="decrease-quantity"><i class="fa-solid fa-minus"></i></span>
                        <span class="howmany">1</span>
                        <span class="increase-quantity"><i class="fa-solid fa-plus"></i></span>
                    </div>
                    <div class="result ttl">${productInformationObject.productPrice}</div>
                    </div>
                    <div class="remove-chosen-one"><i class="fa-solid fa-xmark i-remove-chosen-one"></i></div>
                </div>
                `;
                incearing_And_decreasing()
                closingCart();
            }
        } else {
            choosenProducts.push(productInformationObject)
            shoppingCart_Products.innerHTML += `
                <div class="product">
                    <img src="${productInformationObject.productImageSrc}" alt="">

                    <div class="action">
                    <div class="name-price">
                        <span class="name">${productInformationObject.productName}</span>
                        <span class="price">${productInformationObject.productPrice}</span>
                    </div>
                    <div class="quantity">
                        <span class="decrease-quantity"><i class="fa-solid fa-minus"></i></span>
                        <span class="howmany">1</span>
                        <span class="increase-quantity"><i class="fa-solid fa-plus"></i></span>
                    </div>
                    <div class="result ttl">${productInformationObject.productPrice}</div>
                    </div>
                    <div class="remove-chosen-one"><i class="fa-solid fa-xmark i-remove-chosen-one"></i></div>
                </div>
                `;
            incearing_And_decreasing()
            closingCart();
        }
        localStorage.setItem("flowerShoppingCart", JSON.stringify(choosenProducts))
    });
});

closingCart()


document.documentElement.addEventListener("click", ({ target }) => {
    if (!target.classList.contains("i-remove-chosen-one")) return;
    let parentEl = target.closest(".product").querySelector("img").getAttribute("src");

    let storedData = JSON.parse(localStorage.getItem("flowerShoppingCart"));
    let newData = storedData.filter(productObj => {
        return productObj.productImageSrc != parentEl
    });
    localStorage.setItem("flowerShoppingCart", JSON.stringify(newData))
    target.parentElement.parentElement.style.display = "none";
})

function bringProductsFromLocalStorage(data) {
    for (let i = 0; i < data.length; i++) {
        let currentProduct = data[i];
        shoppingCart_Products.innerHTML += `
        <div class="product">
            <img src="${currentProduct.productImageSrc}" alt="">

            <div class="action">
            <div class="name-price">
                <span class="name">${currentProduct.productName}</span>
                <span class="price">${currentProduct.productPrice}</span>
            </div>
            <div class="quantity">
                <span class="decrease-quantity"><i class="fa-solid fa-minus"></i></span>
                <span class="howmany">1</span>
                <span class="increase-quantity"><i class="fa-solid fa-plus"></i></span>
            </div>
            <div class="result ttl">${currentProduct.productPrice}</div>
            </div>
            <div class="remove-chosen-one"><i class="fa-solid fa-xmark i-remove-chosen-one"></i></div>
        </div>
        `;
    }
}

function incearing_And_decreasing() {

    const increas = document.querySelectorAll(".increase-quantity");
    const decreas = document.querySelectorAll(".decrease-quantity");
    const remove = document.querySelector(".remove-chosen-one");

    increas.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let closestHowmany = btn.closest(".quantity").querySelector(".howmany");
            let clocsestResult = btn.closest(".product").querySelector(".result");

            closestHowmany.innerHTML++;

            let productOriginalPrice = btn.closest(".product").querySelector(".price");
            clocsestResult.innerHTML = (closestHowmany.innerHTML * +productOriginalPrice.innerHTML).toFixed(2);

        });
    });

    decreas.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let closestHowmany = btn.closest(".quantity").querySelector(".howmany");
            let clocsestResult = btn.closest(".product").querySelector(".result");

            if (closestHowmany.innerHTML == 1) return;
            closestHowmany.innerHTML--;
            let productOriginalPrice = btn.closest(".product").querySelector(".price");
            clocsestResult.innerHTML = (closestHowmany.innerHTML * +productOriginalPrice.innerHTML).toFixed(2);
        });
    });
}

function closingCart() {
    const shoppingCartButton = document.querySelector(".cart-icon i");
    const shoppingCartWrapper = document.querySelector(".shopping-cart");
    const closeShoppingCart = document.querySelector(".shopping-cart .close-shopping-cart i");

    shoppingCartButton.addEventListener("click", (e) => {
        shoppingCartWrapper.style.display = "flex";
    });

    closeShoppingCart.addEventListener("click", (e) => {
        shoppingCartWrapper.style.display = "none";
    });
}

