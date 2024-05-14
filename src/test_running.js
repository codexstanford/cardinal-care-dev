// Depends on epilog.js
const { definemorefacts, read, compfinds, readdata, grindem} = require('./epilog.js');

// Returns true if the query run on the dataset (induced by dataset_str) and ruleset produces exactly the results in expected_result_list (ignoring order)
    // and false otherwise

function run_unit_test(test_name, variable_expr, query_str, expected_result_list, dataset_str, ruleset, verbose = 0) {
    let query = read(query_str);
    let dataset = definemorefacts([], readdata(dataset_str));

    let results = compfinds(variable_expr, query, dataset, ruleset);

    let expected_result_set = new Set(expected_result_list);

    if (verbose > 1) {
        console.log("dataset_str:", dataset_str);
        console.log("dataset generated from dataset_str:", grindem(dataset));
        console.log("ruleset:", ruleset);
    }

    if (verbose > 0) {
        console.log("====== Verbose Output for test:", test_name, "======");
        console.log("variable_expr:", variable_expr);
        console.log("query_str:", query_str);

        console.log("expected_result_list:", expected_result_list);
        console.log("RESULTS:", results);
    }

    let results_set = new Set(results);

    //Check if the results contain the exactly same elements as the expected result set
    if (results_set.size != expected_result_set.size) {
        console.error("===== TEST FAILED: " + test_name + "===== ");
        return false;
    }
    
    for (let result of results_set) {
        if (!expected_result_set.has(result)) {
            console.error("===== TEST FAILED: " + test_name + "===== ");
            return false;
        }
    }

    for (let expected_result of expected_result_set) {
        if (!results_set.has(expected_result)) {
            console.error("===== TEST FAILED: " + test_name + "===== ");
            return false;
        }
    }

    console.log("===== TEST SUCCEEDED: " + test_name + "===== ");
    return true;
}


/* Example usage:
    let ruleset = definemorerules([], readdata('q(X) :- p(X)'));

    console.log(run_unit_test("Example Test", 'X', 'q(X)', ['b', 'a'], 'p(a) p(b)', ruleset, true)); // Prints 'true', in addition to the verbose output
*/
// Export the functions
module.exports = {
    run_unit_test
};