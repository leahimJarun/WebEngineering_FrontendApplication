let cart = {};
let refresh = null;
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

let tbody = document.getElementById("tbody");

for (let id in cart) {
    let item = cart[id];

    let tr = document.createElement('tr')

    let title_td = document.createElement('td')
    title_td.textContent = item.title
    tr.appendChild(title_td)


    let price_td = document.createElement("td");
    price_td.textContent = item.price;
    tr.appendChild(price_td);

    let qty_td = document.createElement("td");
    qty_td.textContent = item.qty;
    tr.appendChild(qty_td);

    tbody.appendChild(tr)

}

//let btns = document.querySelectorAll("button");
let btns = document.getElementsByClassName("cartDeleteButton");

for (let i = 0; i < btns.length; i++) {
    let btn = btns[i];
    btn.addEventListener("click", deleteCart);
    btn.addEventListener("click", refreshFunction)
    // id = btn.dataset.id;
    // if (cart.indexOf(id) >= 0) {
    //     btn.className = "added";
    //     btn.textContent = "Remove";
    // }
    //deleteCart();
    //refreshPage();
}

function deleteCart() {
    localStorage.clear();
    //document.getElementById("refresh").textContent = refresh;
    refresh = 1;
    localStorage.setItem("refresh", JSON.stringify(refresh))
    localStorage.setItem("refresh", "refresh");
}

function refreshFunction() {
    window.location.reload("Refresh")
}

