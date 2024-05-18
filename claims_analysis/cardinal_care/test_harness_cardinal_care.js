const fs = require('fs');
const { definemorerules, readdata, definemorefacts} = require('../../src/epilog.js');
const { run_unit_test } = require('../../src/test_running.js');
// Function to read file content synchronously
function readFileToStringSync(filePath) {
    try {
        // Read file content
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
}

// Function to extract the expected result list from the comment
function extractExpectedResult(fileContent) {
    const commentLine = fileContent.split('\n')[0]; // Get the first line
    const match = commentLine.match(/%\s*expected result\s*-\s*\[(.*)\]/i); // Match the expected result comment
    if (match && match[1]) {
        return match[1].split(',').map(item => item.trim()); // Split and trim the list items
    } else {
        return null;
    }
}

function main() {
    let accumulated_test_results = [];

    console.log("============ BEGIN CARDINAL CARE TESTS ============");
    // Load a test file from memory into a string
    let rule_file = 'cardinal_care.hrf';
    
    const rule_file_contents = readFileToStringSync(rule_file);
    if (!rule_file_contents) {
        console.error('Failed to read rule file.');
        return;
    }

    let ruleset = definemorerules([], readdata(rule_file_contents));

    const test_folder = 'test_cases';
    const test_files = fs.readdirSync(test_folder);
    
    for (let test_file of test_files) {
        let test_path = `${test_folder}/${test_file}`;
        const test_file_contents = readFileToStringSync(test_path);
        if (!test_file_contents) {
            console.error('Failed to read test file:', test_file);
            continue;
        }
        
        
        let expected_result = extractExpectedResult(test_file_contents);
        console.log("Expected Result: ", expected_result);
        
        let test_name = `Test ${test_file}`;
        // create save file path as traces/test_file_name.trace
        let save_file_path = `traces/${test_file}.txt`;
        accumulated_test_results.push([test_name, run_unit_test(test_name, 'X', 'covered(X)', expected_result, test_file_contents, ruleset, 1, false)]); // Prints the verbose output
    }

    // ==================== Aggregate results ====================
    let num_succeeded_tests = accumulated_test_results.filter(function(result_pair) {return result_pair[1]}).length;
    let failed_tests = accumulated_test_results.filter(function(result_pair) {return !result_pair[1]})

    console.log("======= CARDINAL CARE TEST RESULTS SUMMARY =======");
    console.log(num_succeeded_tests + " out of " + accumulated_test_results.length + " tests succeeded." );

    console.log("=== FAILING TESTS ===");
    for (let [failed_test_name, _] of failed_tests) {
        console.log(failed_test_name);
    }

    console.log("============ END CARDINAL CARE TESTS ============");
}

main();