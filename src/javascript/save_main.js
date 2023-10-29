//  Module pattern in JS
//  The module pattern encapsulates 'privacy', state and organization using closures
//  Protects pieces from leaking to global scope

const app = (function () {

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
            if (allDogsFromAPIResponse.ok != true) {
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
            // Get random image of each breed
            for (const breed in allDogsFromAPI.message) {
                let imageUrl = "";
                //imageUrl = getRandomImageOfBreed(breed);

                imageUrl = await getRandomImageOfBreedAsync(breed);

                // Render dog image and name in html
                renderBreedInfo(breed, imageUrl);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const renderBreedInfo = (breed, imageUrl) => {
        // Render dog image and name in html
        try {
            const container = document.getElementById("all");

            const divElement = document.createElement("div");
            divElement.style.boxShadow = "4px 4px 8px rgba(0, 0, 0, 0.2)";
            divElement.style.padding = "2em";

            const nameElement = document.createElement("p");
            nameElement.textContent = breed;
            nameElement.style.color = "#66b2b2";

            const imageElement = document.createElement("img");
            imageElement.width = "200";
            imageElement.height = "200";
            //let workingUrlOrNot = await checkIfImageIsAvailableWithFetch(imageUrl);

            //CartButton
            const cartButton = document.createElement("a");
            cartButton.textContent("Add to cart");
            cartButton.className("add-to-cart btn btn-primary");
            //CartButton END

            if (imageUrl !== false) {
                imageElement.src = imageUrl;
            } else {
                const ErrorMessage = document.createElement("p");
                ErrorMessage.textContent = "No image available";
                divElement.appendChild(ErrorMessage);
            }

            divElement.appendChild(nameElement);
            divElement.appendChild(imageElement);
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
            const breedUrl = getRandomImageAPIEndpoint.replace('*', breed)
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

    //public functions and variables
    return {
        //getAllBreeds: getAllBreeds,
        getAllBreedsAsync: getAllBreedsAsync
    }
}());

app.getAllBreedsAsync();