document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0;
    const cartCountElement = document.getElementById("cart-count");
    const buyButtons = document.querySelectorAll(".buy-btn");

    buyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            cartCount++;
            cartCountElement.textContent = cartCount;
            alert("Produto adicionado ao carrinho!");
        });
    });
});