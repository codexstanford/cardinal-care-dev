document.addEventListener("DOMContentLoaded", function () {
    addAllEventListeners();
});
function addAllEventListeners() {
    let fileClaimButton = document.getElementById("file-claim-button");
    fileClaimButton.addEventListener("click", () => { console.log("Link to page, once created."); });
    let exploreCoverageButton = document.getElementById("explore-coverage-button");
    exploreCoverageButton.addEventListener("click", function () {
        // Redirect if no policy info
        if (!hasUserPolicyInfo()) {
            location.href = "../GetPolicyInfo/GetPolicyInfo.html";
            return;
        }
        // Otherwise, proceed to explore coverage
        location.href = "../ExploreCoverage/ExploreCoverage.html";
    });
}
function hasUserPolicyInfo() {
    if (localStorage.getItem("userdata") === null) {
        return false;
    }
    let userdata_dataset = definemorefacts([], readdata(localStorage.getItem("userdata")));
    return compfindp(read("policy.insuree(X, test_user)"), userdata_dataset, []);
}
export {};
//# sourceMappingURL=Landing.js.map