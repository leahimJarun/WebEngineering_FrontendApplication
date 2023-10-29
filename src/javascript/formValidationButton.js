const formValidationButton = (function () {

    function formValidSubmit() {
        console.log("formValidButtonSUBMIT PRESSED");
        let x = document.forms["myForm"]["fname"].value;
        if (x === "") {
            alert("Name must be filled out");
            return false;
        }
    }
    function formValidButton() {
        let submitButton = document.getElementById("formValidationSubmitButton");
        submitButton.setAttribute("onsubmit","return formValidSubmit()");
        //submitButton.addEventListener("click", formValidSubmit);
    }


    return {
        //getAllBreeds: getAllBreeds,
        formValidSubmit: formValidSubmit
    }
}());

formValidationButton.formValidSubmit();