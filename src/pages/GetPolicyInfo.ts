let current_question_num = 0;

const num_questions = document.getElementsByClassName("single-question-container").length;

let next_finish_button_conditions : (() => boolean)[] = [
    () => {return selected_policies.size > 0},
    () => {return coverageDatesAreValid()}
];

let current_user = "test_user";

// Page-specific state
let selected_policies : Set<string> = new Set();


document.addEventListener("DOMContentLoaded", function () {
    if (num_questions !== next_finish_button_conditions.length) {
        console.error("There aren't as many conditions as there are questions.");
        return;
    }

    initializeUI();

    addAllEventListeners();
});

function initializeUI() : void {

    addProgressBarElems();
    updateUI();
}

function addProgressBarElems() : void {
    let progress_bar_list = document.getElementsByClassName("progress-bar");

    for (let i = 0; i < num_questions; i++) {
        let new_prog_bar_elem = document.createElement("div");
        new_prog_bar_elem.classList.add("progress-bar-elem");
        for (let progress_bar of progress_bar_list) {
            progress_bar.appendChild(new_prog_bar_elem);
        }
    }
}

function addAllEventListeners() : void {
    
    // Next/Finish Button
    let next_finishbutton = document.getElementById("next-finish-button");
    next_finishbutton.addEventListener("click", function () {
        // Make sure the user has answered the question before moving on
        if (!next_finish_button_conditions[current_question_num]()) {
            return;
        }

        if (current_question_num >= next_finish_button_conditions.length-1) {
            saveResponses();
            location.href = "../ExploreCoverage/ExploreCoverage.html";
            return;
        }

        current_question_num++;

        updateUI();
        }
    );

    // Back Button
    let backbutton = document.getElementById("back-button");
    backbutton.addEventListener("click", function () {
        if (current_question_num === 0) {
            location.href = "../Landing/Landing.html";
            return;
        }

        current_question_num--;
        
        updateUI();
        }
    );
    
    // Policy multiselect buttons
    let policy_multiselect_buttons = document.getElementsByClassName("policy-multiselect-button");
    for (let multiselect_button of policy_multiselect_buttons) {
        
        multiselect_button.addEventListener("click", function () {
            // Select
            if (!selected_policies.has(multiselect_button.textContent)) {
                selected_policies.add(multiselect_button.textContent);
            }
            // Unselect
            else {
                selected_policies.delete(multiselect_button.textContent);
            }

            updateUI();
        });
    }

    // Text input fields
    let text_input_fields = document.getElementsByClassName("text-input-field");
    for (let text_input_widget of text_input_fields) { 
        text_input_widget.addEventListener("change", () => {updateUI();});
    }
}

/***************************************** START Update UI *****************************************/

function updateUI() : void {
    updateProgressBar();
    updateVisibleQuestions();
    updatePolicyMultiselectButtons();
    updateNextFinishButton();
}

function updateProgressBar() {
    let progress_bar_elems = document.getElementsByClassName("progress-bar-elem");

    for (let i = 0; i < progress_bar_elems.length; i++) {
        let prog_bar_elem = progress_bar_elems[i];

        if (i === current_question_num) {
            prog_bar_elem.classList.remove("completed-progress-bar-elem");
            prog_bar_elem.classList.add("current-progress-bar-elem");
        } else {
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
        } else {
            question_container.style.display = "none";
        }
    }
    
}

function updateNextFinishButton() {
    let next_finishbutton = document.getElementById("next-finish-button");
    if (next_finish_button_conditions[current_question_num]()) {
        next_finishbutton.classList.remove("disabled-button");
    }
    else {
        next_finishbutton.classList.add("disabled-button");
    }
    
    if (current_question_num < num_questions-1) {
        next_finishbutton.innerText = "NEXT";
    } else {
        next_finishbutton.innerText = "FINISH";
    }
}

function updatePolicyMultiselectButtons() : void {
    let policy_multiselect_buttons = document.getElementsByClassName("policy-multiselect-button");
    for (let multiselect_button of policy_multiselect_buttons) {
        // Selected
        if (selected_policies.has(multiselect_button.textContent)) {
            multiselect_button.classList.add("selected-button");
        }
        // Unselected
        else {
            multiselect_button.classList.remove("selected-button");
        }
    }
}

/***************************************** END Update UI *****************************************/

function saveResponses() : void {
    // Initialize localStorage["userdata"]
    if (localStorage.getItem("userdata") === null) {
        localStorage["userdata"] = "";
    }

    let facts_to_add =  "";

    
    let coverage_start_date_input_widget = document.getElementById("coverage-start-date-input") as HTMLInputElement;
    let coverage_end_date_input_widget = document.getElementById("coverage-end-date-input") as HTMLInputElement;

    facts_to_add += "policy.startdate(policy1, \"" + coverage_start_date_input_widget.value + "\") ";
    facts_to_add += "policy.enddate(policy1, \"" + coverage_end_date_input_widget.value + "\") ";

    for (let selected_policy of selected_policies) {
        facts_to_add += "policy.type(policy1, \"" + selected_policy + "\") ";
        facts_to_add += "policy.insuree(policy1, " + current_user + ") ";
    }

    localStorage["userdata"] = localStorage["userdata"] + " " + facts_to_add;
}

function coverageDatesAreValid() : boolean {
    let coverage_start_date_input_widget = document.getElementById("coverage-start-date-input") as HTMLInputElement;
    let coverage_end_date_input_widget = document.getElementById("coverage-end-date-input") as HTMLInputElement;

    let coverage_start_date_input = coverage_start_date_input_widget.value;
    let coverage_end_date_input = coverage_end_date_input_widget.value;

    return isValidDateString(coverage_start_date_input) && isValidDateString(coverage_end_date_input);
}


// Courtesy of ChatGPT
function isValidDateString(date_string : string) : boolean {
    const date_format_regex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;

    if (!date_format_regex.test(date_string)) {
        return false;
    }

    // Extracting month, day, and year from the input
    const [month, day, year] = date_string.split("-").map(Number);

    // Number of days in each month (accounting for leap years)
    const daysInMonth = [
        31, // January
        (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28, // February (considering leap year)
        31, // March
        30, // April
        31, // May
        30, // June
        31, // July
        31, // August
        30, // September
        31, // October
        30, // November
        31  // December
    ];

    // Validate the day based on the month
    if (day > daysInMonth[month - 1] || day < 1) {
        return false;
    }

    return true;
}

export {};