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

    let test_path = 'test_cases/test_case3.hdf';
    const test_file_contents = readFileToStringSync(test_path);
    if (!test_file_contents) {
        console.error('Failed to read test file.');
        return;
    }

    // Assuming definemorerules and readdata are defined elsewhere in your code
    let ruleset = definemorerules([], readdata(rule_file_contents));
    let dataset = definemorefacts([], readdata(test_file_contents));

    // ================ Example test 1 ================
    let test_name = "Example Test 1";
    accumulated_test_results.push([test_name, run_unit_test(test_name, 'X', 'covered(X)', ['claim3'], dataset, ruleset, true)]); // Prints the verbose output
    
    // ================ Example test 2 ================
    // test_name = "Example Test 2";
    // accumulated_test_results.push([test_name, run_unit_test(test_name, 'X', 'q(X)', ['b'], 'p(a) p(b)', ruleset, true)]); // Prints the verbose output

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