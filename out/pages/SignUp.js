let current_question_num = 0;
const num_questions = document.getElementsByClassName("single-question-container").length;
let progress_button_conditions = [
    () => { return document.getElementById("username-input-field").value !== ""; },
    () => { return validEmailEntered(); },
    () => { return usernameAndPasswordEntered(); }
];
let current_user = "test_user";
document.addEventListener("DOMContentLoaded", function () {
    if (num_questions !== progress_button_conditions.length) {
        console.error("There aren't as many conditions as there are questions. Questions: ", num_questions, " Conditions: ", progress_button_conditions.length);
        return;
    }
    initializeUI();
    addAllEventListeners();
});
function initializeUI() {
    addProgressBarElems();
    updateUI();
}
function addProgressBarElems() {
    let progress_bar_list = document.getElementsByClassName("progress-bar");
    for (let i = 0; i < num_questions; i++) {
        let new_prog_bar_elem = document.createElement("div");
        new_prog_bar_elem.classList.add("progress-bar-elem");
        for (let progress_bar of progress_bar_list) {
            progress_bar.appendChild(new_prog_bar_elem);
        }
    }
}
function addAllEventListeners() {
    // Progress question buttons
    let progress_question_buttons = document.getElementsByClassName("progress-question-button");
    for (let progress_question_button of progress_question_buttons) {
        progress_question_button.addEventListener("click", function () {
            // Make sure the user has answered the question before moving on
            if (!progress_button_conditions[current_question_num]()) {
                return;
            }
            // No further questions. Should add event listener to last button with page-specific functionality
            if (current_question_num >= progress_button_conditions.length - 1) {
                return;
            }
            current_question_num++;
            updateUI();
        });
    }
    ;
    // Back Button
    let backbutton = document.getElementById("back-button");
    backbutton.addEventListener("click", function () {
        if (current_question_num === 0) {
            location.href = "../Splash/Splash.html";
            return;
        }
        current_question_num--;
        updateUI();
    });
    // Progress bar elems
    /*let progress_bar_elems = document.getElementsByClassName("progress-bar-elem");
    for (let i = 0; i < progress_bar_elems.length; i++ ) {
        let prog_bar_elem = progress_bar_elems[i];
        prog_bar_elem.addEventListener("click", () => {
            // Need to take into account that different questions rely on previous ones.
            current_question_num = i; updateUI();
        });
    }*/
    // Sign in nav Button
    let signin_nav_button = document.getElementById("signin-nav-button");
    signin_nav_button.addEventListener("click", function () {
        location.href = "../SignIn/SignIn.html";
    });
    // Text input fields
    let text_input_fields = document.getElementsByClassName("text-input-field");
    for (let text_input_widget of text_input_fields) {
        text_input_widget.addEventListener("change", () => { updateUI(); });
    }
    // Username question button
    let username_question_button = document.getElementById("username-question-button");
    username_question_button.addEventListener("click", function () {
        let username_input = document.getElementById("username-input-field");
        let username_signin_input = document.getElementById("username-signin-input-field");
        username_signin_input.value = username_input.value;
    });
    // Send email Button
    let send_email_button = document.getElementById("signin-button");
    send_email_button.addEventListener("click", function () {
        // Using php, create account and send email
    });
    // Sign in Button
    let signin_button = document.getElementById("signin-button");
    signin_button.addEventListener("click", function () {
        // Sign in.php    
    });
}
function saveResponses() {
    // Initialize localStorage["userdata"]
    if (localStorage.getItem("userdata") === null) {
        localStorage["userdata"] = "";
    }
    let facts_to_add = "";
    localStorage["userdata"] = localStorage["userdata"] + " " + facts_to_add;
}
/***************************************** START Update UI *****************************************/
function updateUI() {
    updateProgressBar();
    updateVisibleQuestions();
    updateProgressQuestionButtons();
}
function updateProgressBar() {
    let progress_bar_elems = document.getElementsByClassName("progress-bar-elem");
    for (let i = 0; i < progress_bar_elems.length; i++) {
        let prog_bar_elem = progress_bar_elems[i];
        if (i === current_question_num) {
            prog_bar_elem.classList.remove("completed-progress-bar-elem");
            prog_bar_elem.classList.add("current-progress-bar-elem");
        }
        else {
            prog_bar_elem.classList.remove("current-progress-bar-elem");
            if (i < current_question_num) {
                prog_bar_elem.classList.add("completed-progress-bar-elem");
            }
        }
    }
}
function updateVisibleQuestions() {
    let single_question_containers = document.getElementsByClassName("single-question-container");
    for (let i = 0; i < single_question_containers.length; i++) {
        let question_container = single_question_containers[i];
        if (!(question_container instanceof HTMLElement)) {
            console.error("question container isn't an HTML Element");
            continue;
        }
        if (i === current_question_num) {
            question_container.style.display = "block";
        }
        else {
            question_container.style.display = "none";
        }
    }
}
function updateProgressQuestionButtons() {
    let progress_question_buttons = document.getElementsByClassName("progress-question-button");
    for (let i = 0; i < progress_question_buttons.length; i++) {
        let progress_question_button = progress_question_buttons[i];
        if (i !== current_question_num) {
            continue;
        }
        if (progress_button_conditions[current_question_num]()) {
            progress_question_button.classList.remove("disabled-button");
        }
        else {
            progress_question_button.classList.add("disabled-button");
        }
    }
}
/***************************************** END Update UI *****************************************/
function validEmailEntered() {
    let email_input_string = document.getElementById("email-input-field").value;
    return isValidEmailString(email_input_string);
}
// Courtesy of ChatGPT
function isValidEmailString(email_string) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email_string);
}
function usernameAndPasswordEntered() {
    return (document.getElementById("username-signin-input-field").value !== "") &&
        (document.getElementById("password-signin-input-field").value !== "");
}
//# sourceMappingURL=SignUp.js.map