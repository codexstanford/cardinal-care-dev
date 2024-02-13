// No return value
// Fills the table with the specified ID with the rows in the list
function addRowsToTable(tableElemID, rowList) {
     let table = document.getElementById(tableElemID);

     for (let i = 0; i < rowList.length; i++) {
         table.appendChild(rowList[i]);
     }
}

function createTableRow(rowID, classList, innerHTML) {
    let row = document.createElement("tr");

    if (rowID !== "") {
        row.id = rowID;
    }

    row.classList.add(...classList);

    row.innerHTML = innerHTML;
    
    return row;
}

function createTableCell(colspan, innerHTML) {
    let cell = document.createElement("td");

    cell.colSpan = colspan;

    cell.innerHTML = innerHTML;
    
    return cell;
}

// selectOptions: should be null, unless inputType === "select". Should be a list of [value, text] pairs
function createInputElem(inputType, defaultInput, inputID, selectOptions = null) {
    let inputElement = null;
    
    if (inputType === "select") {
        inputElement = document.createElement("select");
    } else {
        inputElement = document.createElement("input");
        inputElement.type = inputType;
    }

    inputElement.id = inputID;

    if (inputType === "checkbox") {
        if (defaultInput === true) {
            inputElement.setAttribute("checked", "true");
        }

        return inputElement;
    }
    
    if (inputType === "text" || 
        inputType === "number" || 
        inputType === "date" ||
        inputType === "time") {
        
        inputElement.setAttribute("value", defaultInput);
        return inputElement;
    }
    
    if (inputType === "select") {
        inputElement.classList.add("option-dropdown");

        if (selectOptions !== null) {
    
            for (let i = 0; i < selectOptions.length; i++) {
                let option = document.createElement("option");
                option.value = selectOptions[i][0];
                option.text = selectOptions[i][1];
                inputElement.appendChild(option);
            }
        }

        return inputElement;
    }

    // Invalid element type
    let errorElement = document.createElement("template");
    errorElement.innerHTML = `<div><strong>Invalid input element type</strong></div>`;
    return errorElement.content.children[0];
}

// Functional for headings, subheadings, and subsubheadings
function newHeadingRow(titleText, rowID, classList) {
    let headingContent = createTableCell(2, "<strong>" + titleText + "</strong>");
    return createTableRow(rowID, classList, headingContent.outerHTML);
}

function newClaimsFormInputRow(cellList, addtlClassList = []) {
    let innerHTML = "";

    for (let cell of cellList) {
        innerHTML += cell.outerHTML;
    }

    return createTableRow("", ["info-row", "claim-info-row", ...addtlClassList], innerHTML);
}

function newClaimsFormInputCell(colSpan, inputType, defaultInput, cellText, inputID) {
    let inputElem = createInputElem(inputType, defaultInput, inputID);
    
    return createTableCell(colSpan, cellText + inputElem.outerHTML);
}

function newClaimsFormSelectCell(colSpan, defaultInput, cellText, inputID, selectOptions) {
    let inputElem = createInputElem("select", defaultInput, inputID, selectOptions);
    
    return createTableCell(colSpan, cellText + inputElem.outerHTML);
}