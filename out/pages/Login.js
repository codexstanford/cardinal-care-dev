document.addEventListener("DOMContentLoaded", function () {
    addAllEventListeners();
});
function addAllEventListeners() {
    let signin_button = document.getElementById("signin-button");
    signin_button.addEventListener("click", function () {
        // Load the user-specific file that indicates whether they have logged in before, which was created when the user signed up. 
        // If they haven't logged in before (indicated by that file being empty), log that they have by adding "hasLoggedIn()" to that file, then redirecting to FirstLoginLanding.
        // If they have logged in before, redirect to Landing 
    });
}
export {};
//# sourceMappingURL=LogIn.js.map