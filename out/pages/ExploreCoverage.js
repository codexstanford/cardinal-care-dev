document.addEventListener("DOMContentLoaded", function () {
    redirectIfNoPolicyInfo();
});
function redirectIfNoPolicyInfo() {
    if (!hasUserPolicyInfo()) {
        location.href = "../GetPolicyInfo/GetPolicyInfo.html";
    }
}
function hasUserPolicyInfo() {
    if (localStorage.getItem("userdata") === null) {
        return false;
    }
    let userdata_dataset = definemorefacts([], readdata(localStorage.getItem("userdata")));
    return compfindp(read("policy.insuree(X, test_user)"), userdata_dataset, []);
}
//# sourceMappingURL=ExploreCoverage.js.map