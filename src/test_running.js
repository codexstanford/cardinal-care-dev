// Depends on epilog.js

// Returns true if the query run on the dataset (induced by dataset_str) and the ruleset produces exactly the results in expected_result_list (ignoring order)
    // and false otherwise

// Parameters:
    // test_name (string): a string that will be used to refer to the test when debug messages are printed to the console
    // variable_expr (string): the name of the variable in query_str that will be matched for results
    // query_str (string): the query to run on the dataset and ruleset
    // expected_result_list (array<string>): the values that variable_expr is expected to match with. The results of the query when run on the dataset and ruleset should exactly match this list (ignoring order).
    // dataset_str (string): a string specifying the Epilog dataset that will be queried
    // ruleset (epilog ruleset): the ruleset that will be queried
    // verbose (boolean): if true, prints additional debug information to the console. If false, only prints whether the test failed or succeeded.

function run_unit_test(test_name, variable_expr, query_str, expected_result_list, dataset_str, ruleset, verbose = false) {
    let query = read(query_str);
    let dataset = definemorefacts([], readdata(dataset_str));

    let results = compfinds(variable_expr, query, dataset, ruleset);

    let expected_result_set = new Set(expected_result_list);

    if (verbose) {
        console.log("====== Verbose Output for test:", test_name, "======");
        console.log("variable_expr:", variable_expr);
        console.log("query_str:", query_str);
        console.log("dataset_str:", dataset_str);
        console.log("dataset generated from dataset_str:", grindem(dataset));
        console.log("ruleset:", ruleset);
        console.log("expected_result_list:", expected_result_list);
        console.log("RESULTS:", results);
    }

    for (let result of results) {
        if (!expected_result_set.has(result)) {
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