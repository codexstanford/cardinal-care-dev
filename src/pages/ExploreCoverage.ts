document.addEventListener("DOMContentLoaded", function () {
    redirectIfNoPolicyInfo();
});

function redirectIfNoPolicyInfo() : void {
    if (!hasUserPolicyInfo()) {
        location.href = "../GetPolicyInfo/GetPolicyInfo.html";
    }
}

function hasUserPolicyInfo() : boolean {
    if (localStorage.getItem("userdata") === null) {
        return false;
    }

    let userdata_dataset = definemorefacts([], readdata(localStorage.getItem("userdata")));

    return compfindp(read("policy.insuree(X, test_user)"), userdata_dataset, []);
}