document.addEventListener("DOMContentLoaded", function () {
    addAllEventListeners();
});
function addAllEventListeners() {
    let signUpButton = document.getElementById("signup-button");
    signUpButton.addEventListener("click", () => { location.href = "../SignUp/SignUp.html"; });
    let signInButton = document.getElementById("signin-button");
    signInButton.addEventListener("click", () => { location.href = "../SignIn/SignIn.html"; });
}
export {};
//# sourceMappingURL=Splash.js.map