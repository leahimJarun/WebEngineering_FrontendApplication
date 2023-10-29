export const navBar = ( function () {
 function burgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

    //const burgerMenuButton = document.getElementById("burgerMenuButton");
    //burgerMenuButton.addEventListener("click", burgerMenu);


return {
    burgerMenu: burgerMenu
}
}());



// module.exports = {
//     navBar:navBar
// }

navBar.burgerMenu();

//export default navBar;