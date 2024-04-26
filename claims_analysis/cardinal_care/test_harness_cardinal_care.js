// Adds an event listener instead of setting onload, so that it doesn't get overwritten 
window.addEventListener("load", function() {

    let accumulated_test_results = [];

    console.log("============ BEGIN CARDINAL CARE TESTS ============");
    
    let ruleset = definemorerules([], readdata('q(X) :- p(X)'));
    
    // ================ Example test 1 ================
    let test_name = "Example Test 1";
    accumulated_test_results.push([test_name, run_unit_test(test_name, 'X', 'q(X)', ['b', 'a'], 'p(a) p(b)', ruleset, true)]); // Prints the verbose output
    
    // ================ Example test 2 ================
    test_name = "Example Test 2";
    accumulated_test_results.push([test_name, run_unit_test(test_name, 'X', 'q(X)', ['b'], 'p(a) p(b)', ruleset, true)]); // Prints the verbose output

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
  });