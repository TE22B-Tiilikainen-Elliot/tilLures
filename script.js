const productList = document.getElementById("productContainer");
const shoppingCartList = document.getElementById("ShoppingCartContainer");
var products = [];
var shoppingList = [];

function addToCart(i) {
  shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
  shoppingList.push(products[i.id]);
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

function removeFromCart(i) {
  shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
  shoppingList.splice(i.id, 1);
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  loadShoppingCart();
}

function loadProducts() {
  var buttonid = 0;
  products.forEach((productitem) => {
    const product = document.createElement("div");
    product.id = "product";

    var productname = document.createElement("p");
    var productprice = document.createElement("p");
    var productimage = document.createElement("img");
    var productbutton = document.createElement("button");

    productname.id = "name";
    productprice.id = "price";
    productimage.id = "image";
    productbutton.id = buttonid;
    productbutton.className = "purchaseButton";
    productbutton.addEventListener("click", function () {
      addToCart(productbutton);
    });

    productname.innerHTML = productitem.name;
    productprice.innerHTML = productitem.price + "kr";
    productimage.src = "productImages/" + productitem.image;
    productimage.alt = productitem.alt;
    productbutton.innerHTML = "Köp";

    var namePrice = document.createElement("div");
    namePrice.appendChild(productname);
    namePrice.appendChild(productprice);

    var namepurchase = document.createElement("div");
    namepurchase.id = "underImage";
    namepurchase.appendChild(namePrice);
    namepurchase.appendChild(productbutton);

    product.appendChild(productimage);
    product.appendChild(namepurchase);

    productList.appendChild(product);
    buttonid++;
  });
}

function loadShoppingCart() {
  shoppingCartList.innerHTML = "";
  var buttonid = 0;
  var cartitems = JSON.parse(localStorage.getItem("shoppingList"));
  cartitems.forEach((productitem) => {
    const product = document.createElement("div");
    product.id = "product";

    var productname = document.createElement("p");
    var productprice = document.createElement("p");
    var productimage = document.createElement("img");
    var productbutton = document.createElement("button");

    productname.id = "name";
    productprice.id = "price";
    productimage.id = "image";
    productbutton.id = buttonid;
    productbutton.className = "purchaseButton";
    productbutton.addEventListener("click", function () {
      removeFromCart(productbutton);
    });

    productname.innerHTML = productitem.name;
    productprice.innerHTML = productitem.price + "kr";
    productimage.src = "productImages/" + productitem.image;
    productimage.alt = productitem.alt;
    productbutton.innerHTML = "Ta Bort";

    var namePrice = document.createElement("div");
    namePrice.appendChild(productname);
    namePrice.appendChild(productprice);

    var namepurchase = document.createElement("div");
    namepurchase.id = "underImage";
    namepurchase.appendChild(namePrice);
    namepurchase.appendChild(productbutton);

    product.appendChild(productimage);
    product.appendChild(namepurchase);

    shoppingCartList.appendChild(product);
    buttonid++;
  });
}

if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
  fetch("./products.json")
    .then((response) => response.json())
    .then((json) => {
      products = json.products;
      loadProducts();
    });
}

if(window.location.pathname === "/cart.html"){
  document.onload = loadShoppingCart();
}