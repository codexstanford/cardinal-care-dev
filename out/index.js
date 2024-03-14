document.addEventListener("DOMContentLoaded", function () {
    this.location.href = "pages/Splash/Splash.html";
    //addAllEventListeners();
});
function addAllEventListeners() {
    let signUpButton = document.getElementById("signup-button");
    signUpButton.addEventListener("click", () => { location.href = "pages/SignUp/SignUp.html"; });
    let logInButton = document.getElementById("signin-button");
    logInButton.addEventListener("click", () => { location.href = "pages/SignIn/SignIn.html"; });
    let firstLogInButton = document.getElementById("first-loginlanding-button");
    firstLogInButton.addEventListener("click", () => { location.href = "pages/FirstLoginLanding/FirstLoginLanding.html"; });
    let landingButton = document.getElementById("landing-button");
    landingButton.addEventListener("click", () => { location.href = "pages/Landing/Landing.html"; });
}
export {};
//# sourceMappingURL=index.js.map