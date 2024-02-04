// Loads the data common to all insurance claims into localstorage
function load_example_claim() {
    localStorage.setItem('example_claim', example_claim_text);
}

let example_claim_text = `
claim.policy(claim1,policy1)
claim.hospitalization(claim1, hosp1)
policy.signed(policy1, yes)
policy.wellness_visit_confirmation_provided(policy1, yes)
policy.premium_amount_paid(policy1, 2001)
policy.canceled(policy1, no)
claim.claimant(claim1 , person1)
hospitalization.patient(hosp1 , person1)
hospitalization.reason(hosp1, sickness)
person.age(person1, 74)
hospitalization.causal_event(hosp1, covid) 
hospitalization.country(hosp1, usa) 
hospitalization.startdate(hosp1, 2023_1_1)
hospitalization.starttime(hosp1, 00_00_00)
hospitalization.enddate(hosp1, 2023_1_3)
hospitalization.endtime(hosp1, 00_00_00)
policy.wellness_visit_confirmation_provided(policy1, yes)
`