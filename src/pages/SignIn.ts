document.addEventListener("DOMContentLoaded", function () {
    
    updateUI();

    addAllEventListeners();
});

function addAllEventListeners() : void {
    // Back Button
    let backbutton = document.getElementById("back-button");
    backbutton.addEventListener("click", function () {
            location.href = "../Splash/Splash.html";
        }
    );

    // Text input fields
    let text_input_fields = document.getElementsByClassName("text-input-field");
    for (let text_input_widget of text_input_fields) { 
        text_input_widget.addEventListener("change", () => {updateUI();});
    }

    // Sign in Button
    let signin_button = document.getElementById("signin-button");
    signin_button.addEventListener("click", function () {
        // Run the sign in php code

        // Load the user-specific file that indicates whether they have logged in before, which was created when the user signed up. 
        // If they haven't logged in before (indicated by that file being empty), log that they have by adding "hasLoggedIn()" to that file, then redirecting to FirstLoginLanding.
        // If they have logged in before, redirect to Landing 
    });
}

/***************************************** START Update UI *****************************************/

function updateUI() : void {
    updateSignInButton();
}

function updateSignInButton() : void {
    let signin_button = document.getElementById("signin-button") as HTMLElement;

    // Disable if no username or no password
    if (((document.getElementById("username-signin-input-field") as HTMLInputElement).value !== "") &&
    ((document.getElementById("password-signin-input-field") as HTMLInputElement).value !== "")) {
        signin_button.classList.remove("disabled-button");
    }
    else {
        signin_button.classList.add("disabled-button");
    }
}

/***************************************** END Update UI *****************************************/

export {};