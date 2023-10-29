//  Module pattern in JS
//  The module pattern encapsulates 'privacy', state and organization using closures
//  Protects pieces from leaking to global scope

const app = ( function () {

    const allBreedsListAPIEndpoint = 'https://dog.ceo/api/breeds/list/all';

    const getRandomImageAPIEndpoint = `https://dog.ceo/api/breed/*/images/random`;
    /*
    let getAllBreeds = function() {
        // Get all dog breeds from API
        fetch('https://dog.ceo/api/breeds/list/all')
            .then( function(response) {
                if(response.ok != true){
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then( function(data) {
                // Get random image of each breed
                for (const breed in data.message){
                    let imageUrl = "";
                    //imageUrl = getRandomImageOfBreed(breed);
                    imageUrl = getRandomImageOfBreedAsync(breed);

                    // Render dog image and name in html
                    const container = document.getElementById("all");

                    const divElement = document.createElement("div");
                    divElement.style.boxShadow = "4px 4px 8px rgba(0, 0, 0, 0.2)";
                    divElement.style.padding = "2em";

                    const nameElement = document.createElement("p");
                    nameElement.textContent = breed;
                    nameElement.style.color = "#66b2b2";

                    const imageElement = document.createElement("img");
                    imageElement.width = "200";
                    //imageElement.src = imageUrl;
                    imageUrl.then(function (url) {
                        try {
                            var http = new XMLHttpRequest();
                            http.open('HEAD', url, false);
                            http.send();
                            if (http.status != 404) {
                                imageElement.src = url;
                                //console.log(error);
                            }
                        } catch (error) {
                            const ErrorMessage = document.createElement("p");
                            ErrorMessage.textContent = "No image available";
                            divElement.appendChild(ErrorMessage);
                        }
                    })



                    divElement.appendChild(nameElement);
                    divElement.appendChild(imageElement);
                    container.appendChild(divElement);
                }
            })
            .catch( function(error) {
                console.log(error);
            });
    };

     */


    const fetchAllBreedsFromApiAsync = async () => {
        try {
            const allDogsFromAPIResponse = await fetch(allBreedsListAPIEndpoint)
            if(allDogsFromAPIResponse.ok != true){
                throw new Error(`Error: ${allDogsFromAPIResponse.status}`);
            }
            return allDogsFromAPIResponse.json();
        } catch (error) {
            console.log(error);
        }
    }

    const getAllBreedsAsync = async () => {
        // Get all dog breeds from API
        const allDogsFromAPI = await fetchAllBreedsFromApiAsync();
            try {
                let dataId = 1;
                    // Get random image of each breed
                for (const breed in allDogsFromAPI.message){
                    let imageUrl = "";
                    //imageUrl = getRandomImageOfBreed(breed);

                    imageUrl = await getRandomImageOfBreedAsync(breed);



                    // Render dog image and name in html
                    renderBreedInfo(breed, imageUrl, dataId);
                    dataId = dataId + 1;
                }
            } catch (error) {
                console.log(error);
            }
    };

    const renderBreedInfo = (breed, imageUrl, dataId) => {
        // Render dog image and name in html
        try {
            const container = document.getElementById("all");

            const divElement = document.createElement("div");
            divElement.style.boxShadow = "4px 4px 8px rgba(0, 0, 0, 0.2)";
            divElement.style.padding = "2em";
            divElement.className = "product";

            //const nameElement = document.createElement("p");
            const h1 = document.createElement("h3");
            h1.textContent = breed;
            //nameElement.textContent = breed;
            //nameElement.style.color = "#66b2b2";

            const imageElement = document.createElement("img");
            //imageElement.width = "200";
            //imageElement.height = "200";
            imageElement.style = "width:100%";
            //let workingUrlOrNot = await checkIfImageIsAvailableWithFetch(imageUrl);

            //Cart-Add-Button
            const divElementProduct = document.createElement("div");
            divElementProduct.className = "product";
            const p = document.createElement("p");
            const cartButton = document.createElement("button");
            //cartButton.className = "product";
            cartButton.textContent = "Add to cart";
            p.textContent = "Price: 2000"
            cartButton.setAttribute("data-id", dataId);
            cartButton.setAttribute("data-price", "2000")
            cartButton.setAttribute("data-title", breed);
            cartButton.className = "cartButton";
            //cartButton.setAttribute("onclick", "app.add()");
            cartButton.addEventListener("click", add);
            //cartButton.addEventListener("click", cart.add);
            //cartButton.className("add-to-cart btn btn-primary");
            //CartButton END

            if (imageUrl !== false) {
                imageElement.src = imageUrl;
            } else {
                const ErrorMessage = document.createElement("p");
                ErrorMessage.textContent = "No image available";
                divElement.appendChild(ErrorMessage);
            }
            divElement.appendChild(h1);
            divElement.appendChild(imageElement);
            divElement.appendChild(p);
            divElement.appendChild(cartButton);
            container.appendChild(divElement);
        } catch (error) {
            console.log(error);
        }
    }

    /*
    let checkIfImageIsAvailableWithHttpRequest = async (uRL) => {
        try {
            let http = new XMLHttpRequest();
            http.open('HEAD', uRL, false);
            http.send();
            if (http.status != 404) {
                return true;
                //console.log(error);
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
    */

    /*
    let checkIfImageIsAvailableWithFetch = async (uRL) => {
        try {
            let fetchResponse = await fetch(uRL);

            if (!fetchResponse.ok) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    }
     */

    const getRandomImageOfBreedAsync = async (breed) => {
        try {
            const breedUrl= getRandomImageAPIEndpoint.replace('*', breed)
            const responseRandomImage = await fetch(breedUrl)
            const responseRandomImageFetched = await responseRandomImage.json()

            const responseFromUrlFetch = await fetch(responseRandomImageFetched.message)
            const responseFromUrlFetchRdy = await responseFromUrlFetch;
            if (!responseFromUrlFetchRdy.ok) {
                return false;
                //throw new Error(`Error: ${responseRandomImage.status}`);
            } else {
                console.log('breed images :>> ', responseRandomImageFetched);
                return responseRandomImageFetched.message;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /*
    let getRandomImageOfBreed = (breed) => {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then( (response) => {
                if(!response.ok){
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then( (data) => {
                console.log('breed images :>> ', data);
                return data.message;
            })
            .catch( (error) => {
                console.log(error);
            });
    }
    */

    /////INSERT

    let count = 0;
    let sum = 0;
    let cart = {};
    let refresh = null;

    if (localStorage.getItem("count")) {
        count = parseInt(localStorage.getItem("count"));
    }

    if (localStorage.getItem("sum")) {
        sum = parseInt(localStorage.getItem("sum"));
    }

    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    if(localStorage.getItem("refresh") !== null){
        if (localStorage.getItem("refresh").length !== 0) {
            refresh = 1;
        }
    }

    const indexPage = document.getElementById("index");
    //console.log("indexPage" + indexPage);
    if (document.getElementById("index") !== null) {
    updateCart();
    }

    (function () {
        window.onpageshow = function(event) {
            if (event.persisted && refresh === 1) {
                window.location.reload("Refresh");
                refresh = 0;

                localStorage.setItem("refresh", JSON.stringify(refresh))
                localStorage.setItem("refresh", "refresh");
                localStorage.removeItem("refresh");
            }
        };
    })();

    //let btns = document.querySelectorAll("button");
//.products button
/*
    for (let i = 0; i < btns.length; i++) {
        let btn = btns[i];
        btn.addEventListener("click", add);

        // id = btn.dataset.id;
        // if (cart.indexOf(id) >= 0) {
        //     btn.className = "added";
        //     btn.textContent = "Remove";
        // }
    }

 */

    function add(event) {
        let price = Number(event.target.dataset.price);
        let title = event.target.dataset.title;
        let id = event.target.dataset.id;

        if (id in cart) {
            cart[id].qty++;
        } else {
            let cartItem = {
                title: title,
                price: price,
                qty: 1
            };
            cart[id] = cartItem
        }

        count++;
        sum += price;

        console.log(cart);

        // let index = cart.indexOf(event.target.dataset.id);
        // if (index >= 0) {
        //     cart.splice(index, 1);
        //     count--;
        //     sum -= price;
        //     event.target.className = "";
        //     event.target.textContent = "Add to cart";
        // } else {
        //     cart.push(event.target.dataset.id);
        //     count++;
        //     sum += price;
        //     event.target.className = "added";
        //     event.target.textContent = "Remove";
        // }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();

    }


    function updateCart() {
        //if (localStorage.getItem("sum")) {
        //    sum = parseInt(localStorage.getItem("sum"));
        //}
        //console.log("SUM="+sum);
        //if (sum !== null)
        //{
        document.getElementById("sum").textContent = sum;
        document.getElementById("count").textContent = count;
        localStorage.setItem("sum", sum);
        localStorage.setItem("count", count);
    }




    /////INSERT END



    //public functions and variables
    return {
        //getAllBreeds: getAllBreeds,
        getAllBreedsAsync: getAllBreedsAsync
    }
}());

app.getAllBreedsAsync();