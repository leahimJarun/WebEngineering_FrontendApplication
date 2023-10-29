const navBar = ( function () {
function burgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

return {
    burgerMenu: burgerMenu
}
}());

navBar.burgerMenu();