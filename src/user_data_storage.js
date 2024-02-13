// Dependencies: epilog.js

const CURR_USER_KEY = "../../user_datasets/current_user.hdf";

// Return type: an epilog dataset
function getCurrentUserDataset() {
    return definemorefacts([], readdata(localStorage[CURR_USER_KEY]));
}

// Accepts an epilog dataset and saves it to localStorage as text
function setCurrentUserDataset(newDataset) {
    localStorage[CURR_USER_KEY] = grindem(newDataset);
}

// Deletes the user dataset localStorage
function clearCurrentUserDataset() {
    localStorage.removeItem(CURR_USER_KEY);
}

function printCurrentUserDataset() {
    if (localStorage.getItem(CURR_USER_KEY) === null) {
        console.log("NO CURRENT USER DATASET FOUND");
        return;
    }
    
    console.log(localStorage[CURR_USER_KEY]);
}