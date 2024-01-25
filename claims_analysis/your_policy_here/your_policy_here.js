const POLICY_ID_INPUT_ID = "policy_id_input";
const POLICY_SIGNED_INPUT_ID = "policy_signed_input";
const WELLNESS_VISIT_CONFIRMATION_INPUT_ID = "wellness_visit_confirmation_input";
const PREMIUM_PAID_AMOUNT_INPUT_ID = "premium_paid_amount_input";
const POLICY_CANCELED_INPUT_ID = "policy_canceled_input";
const CLAIM_ID_INPUT_ID = "claim_id_input";
const CLAIMANT_ID_INPUT_ID = "claimant_id_input";
const CLAIM_DATE_INPUT_ID = "claim_date_input";
const PATIENT_AGE_INPUT_ID = "patient_age_input";
const HOSPITALIZATION_ID_INPUT_ID = "hospitalization_id_input";
const HOSPITALIZATION_REASON_INPUT_ID = "hospitalization_reason_input";
const HOSPITALIZATION_CAUSE_INPUT_ID = "hospitalization_cause_input";
const HOSPITALIZATION_COUNTRY_INPUT_ID = "hospitalization_country_input";
const HOSPITALIZATION_STARTDATE_INPUT_ID = "hospitalization_startdate_input";
const HOSPITALIZATION_STARTTIME_INPUT_ID = "hospitalization_starttime_input";
const HOSPITALIZATION_ENDDATE_INPUT_ID = "hospitalization_enddate_input";
const HOSPITALIZATION_ENDTIME_INPUT_ID = "hospitalization_endtime_input";
const POLICY_INSUREE_ID = "policy_insuree_input";
const POLICY_STARTDATE_ID = "policy_start_date_input";
const PATIENT_OCCUPATION_ID = "patient_occupation_input";
const POLICY_ENDDATE_ID = "policy_end_date_input";
const HOSPITALIZATION_HOSPITAL_ID = "hospital_visit_hospital_input";
const HOSPITALIZATION_COO_ID = "hospitalization_coo_input";


const INPUT_FIELD_IDS = [
  POLICY_ID_INPUT_ID,
  CLAIM_ID_INPUT_ID,
  CLAIMANT_ID_INPUT_ID,
  CLAIM_DATE_INPUT_ID,
  PATIENT_AGE_INPUT_ID,
  HOSPITALIZATION_ID_INPUT_ID,
  HOSPITALIZATION_REASON_INPUT_ID,
  HOSPITALIZATION_STARTDATE_INPUT_ID,
  HOSPITALIZATION_STARTTIME_INPUT_ID,
  HOSPITALIZATION_ENDDATE_INPUT_ID,
  HOSPITALIZATION_ENDTIME_INPUT_ID,
  POLICY_INSUREE_ID,
  POLICY_STARTDATE_ID,
  PATIENT_OCCUPATION_ID,
  POLICY_ENDDATE_ID,
  HOSPITALIZATION_HOSPITAL_ID,
  HOSPITALIZATION_COO_ID
];

if (typeof window !== 'undefined') {
  window.onload = function() {
    load_common_data();

    init_fields();

    init_coverage_indicator();

    add_event_listeners();
    };
}
// Initialize the input fields by populating lists, or setting initial values.
function init_fields() {
  init_country_dropdowns();
}

// Initialize the country dropdowns with countries in the common data
function init_country_dropdowns() {
  let common_dataset = definemorefacts([], readdata(localStorage["commonData"]));

  let country_list = compfinds("C", read("type(C, country)"), common_dataset, []);

  // Build the protypical country selector
  let country_selector_prototype = document.createElement("select");

  let none_option = document.createElement("option");
  none_option.text = "";
  country_selector_prototype.add(none_option);

  for (const country_name of country_list ) {
    let country_option = document.createElement("option");
    country_option.text = country_name;
    country_selector_prototype.add(country_option);
  }

  // Get all of the country dropdowns and set their options to match the prototype
  let country_dropdown_selectors = document.getElementsByClassName("country-dropdown");

  for (const country_dropdown_selector of country_dropdown_selectors) {
    country_dropdown_selector.innerHTML=country_selector_prototype.innerHTML;
  }
}

// Returns an epilog.js dataset containing all the claims data that has been entered into the form
function get_data_from_input_fields() {

  // Need a policy, claim, and hospitalization ID
  const POLICY_ID_VALUE = document.getElementById(POLICY_ID_INPUT_ID).value;
  const CLAIM_ID_VALUE = document.getElementById(CLAIM_ID_INPUT_ID).value;
  const HOSPITALIZATION_ID_VALUE = document.getElementById(HOSPITALIZATION_ID_INPUT_ID).value;
  if (POLICY_ID_VALUE === '' || CLAIM_ID_VALUE === '' || HOSPITALIZATION_ID_VALUE === '') {
    console.log('wtf--')
    return [];
  }
  
  let facts_to_add = "claim.policy(" + CLAIM_ID_VALUE + ", " + POLICY_ID_VALUE + ") claim.hospitalization(" + CLAIM_ID_VALUE + ", " + HOSPITALIZATION_ID_VALUE + ")";

  // // Policy facts
  // const POLICY_SIGNED_VALUE = document.getElementById(POLICY_SIGNED_INPUT_ID).checked;
  // if (POLICY_SIGNED_VALUE === true) {
  //   facts_to_add += "policy.signed(" + POLICY_ID_VALUE + ", yes) ";
  // } else {
  //   facts_to_add += "policy.signed(" + POLICY_ID_VALUE + ", no) ";
  // }

  // const WELLNESS_VISIT_CONFIRMATION_VALUE = document.getElementById(WELLNESS_VISIT_CONFIRMATION_INPUT_ID).checked;
  // if (WELLNESS_VISIT_CONFIRMATION_VALUE === true) {
  //   facts_to_add += "policy.wellness_visit_confirmation_provided(" + POLICY_ID_VALUE + ", yes) ";
  // } else {
  //   facts_to_add += "policy.wellness_visit_confirmation_provided(" + POLICY_ID_VALUE + ", no) ";
  // }

  // const PREMIUM_PAID_AMOUNT_VALUE = document.getElementById(PREMIUM_PAID_AMOUNT_INPUT_ID).value;
  // if (PREMIUM_PAID_AMOUNT_VALUE === '') {
  //   facts_to_add += "policy.premium_amount_paid(" + POLICY_ID_VALUE + ", 0) ";
  // } else {
  //   facts_to_add += "policy.premium_amount_paid(" + POLICY_ID_VALUE + ", "+ PREMIUM_PAID_AMOUNT_VALUE +") ";
  // }

  // const POLICY_CANCELED_VALUE = document.getElementById(POLICY_CANCELED_INPUT_ID).checked;
  // if (POLICY_CANCELED_VALUE === true) {
  //   facts_to_add += "policy.canceled(" + POLICY_ID_VALUE + ", yes) ";
  // } else {
  //   facts_to_add += "policy.canceled(" + POLICY_ID_VALUE + ", no) ";
  // }

  const POLICY_INSUREE_VALUE = document.getElementById(POLICY_INSUREE_ID).value
  if (POLICY_INSUREE_VALUE !== ""){
  facts_to_add += "policy.insuree(" + POLICY_ID_VALUE + ", " + POLICY_INSUREE_VALUE + ") ";
  }
  const POLICY_STARTDATE_VALUE = document.getElementById(POLICY_STARTDATE_ID).value;
  if (POLICY_STARTDATE_VALUE !== "") {
    let formattedDate = POLICY_STARTDATE_VALUE.replace(/-/g, '_');
    facts_to_add += "policy.startdate(" + POLICY_ID_VALUE + ", " + POLICY_INSUREE_VALUE +", "+ formattedDate + ") ";
  } 
  const POLICY_ENDDATE_VALUE = document.getElementById(POLICY_ENDDATE_ID).value;
  if (POLICY_ENDDATE_VALUE !== "") {
    let formattedDate = POLICY_ENDDATE_VALUE.replace(/-/g, '_');
    facts_to_add += "policy.enddate(" + POLICY_ID_VALUE + ", " + POLICY_INSUREE_VALUE +", "+  formattedDate + ") ";
  } 
  // Claim facts
  const CLAIMANT_ID_VALUE = document.getElementById(CLAIMANT_ID_INPUT_ID).value;
  if (CLAIMANT_ID_VALUE !== "") {
    facts_to_add += "claim.claimant(" + CLAIM_ID_VALUE + ", " + CLAIMANT_ID_VALUE + ") ";
  } 

  const CLAIM_DATE_VALUE = document.getElementById(CLAIM_DATE_INPUT_ID).value;
  if (CLAIM_DATE_VALUE !== "") {
    let formattedDate = CLAIM_DATE_VALUE.replace(/-/g, '_');
    facts_to_add += "claim.date(" + CLAIM_ID_VALUE + ", " + formattedDate + ") ";
  } 

  // Patient facts
  const PATIENT_AGE_VALUE = document.getElementById(PATIENT_AGE_INPUT_ID).value;
  if (PATIENT_AGE_VALUE === "") {
    facts_to_add += "person.age(" + CLAIMANT_ID_VALUE + ", 0) ";
  } else {
    facts_to_add += "person.age(" + CLAIMANT_ID_VALUE + ", "+ PATIENT_AGE_VALUE +") ";
  }

  const PATIENT_OCCUPATION_VALUE = document.getElementById(PATIENT_OCCUPATION_ID).value;
  if (PATIENT_OCCUPATION_VALUE !== "") {
    facts_to_add += "person.occupation(" + CLAIMANT_ID_VALUE + ", "+ PATIENT_OCCUPATION_VALUE +") ";
  }

  // Hospitalization facts

  const HOSPITALIZATION_REASON_VALUE = document.getElementById(HOSPITALIZATION_REASON_INPUT_ID).value;
  if (HOSPITALIZATION_REASON_VALUE !== "") {
    facts_to_add += "hospitalization.reason(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_REASON_VALUE + ") ";
  } 

  const HOSPITALIZATION_HOSPITAL_VALUE = document.getElementById('hospital_visit_hospital_input').value;
  if (HOSPITALIZATION_HOSPITAL_VALUE !== "") {
    facts_to_add += "hospitalization.hospital(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_HOSPITAL_VALUE + ") ";
  } 
  // Only adds start{date, time} data to the dataset if both are present.
  const HOSPITALIZATION_STARTDATE_VALUE = document.getElementById(HOSPITALIZATION_STARTDATE_INPUT_ID).value;
  const HOSPITALIZATION_STARTTIME_VALUE = document.getElementById(HOSPITALIZATION_STARTTIME_INPUT_ID).value;
  if (HOSPITALIZATION_STARTDATE_VALUE !== "" && HOSPITALIZATION_STARTTIME_VALUE !== "") {
    let formattedDate = HOSPITALIZATION_STARTDATE_VALUE.replace(/-/g, '_');
    let formattedTime = HOSPITALIZATION_STARTTIME_VALUE.replace(/:/g, '_');
    
    facts_to_add += "hospitalization.start_time(" + HOSPITALIZATION_ID_VALUE + ", " + formattedDate + ", " + formattedTime + ") ";
  } 
  
  // Only adds end{date, time} data to the dataset if both are present.
  const HOSPITALIZATION_ENDDATE_VALUE = document.getElementById(HOSPITALIZATION_ENDDATE_INPUT_ID).value;
  const HOSPITALIZATION_ENDTIME_VALUE = document.getElementById(HOSPITALIZATION_ENDTIME_INPUT_ID).value;
  if (HOSPITALIZATION_ENDDATE_VALUE !== "" && HOSPITALIZATION_ENDTIME_VALUE !== "") {
    let formattedDate = HOSPITALIZATION_ENDDATE_VALUE.replace(/-/g, '_');
    let formattedTime = HOSPITALIZATION_ENDTIME_VALUE.replace(/:/g, '_');
    
    facts_to_add += "hospitalization.end_time(" + HOSPITALIZATION_ID_VALUE + ", " + formattedDate + ", " + formattedTime + ") ";

  }
  
  const HOSPITALIZATION_COO_VALUE = document.getElementById(HOSPITALIZATION_HOSPITAL_ID).checked;
  if (HOSPITALIZATION_COO_VALUE === true) {
    facts_to_add += "hospitalization.consequence_of_occupation("  + HOSPITALIZATION_ID_VALUE + ", yes)";
  } else {
    facts_to_add += "hospitalization.consequence_of_occupation("  + HOSPITALIZATION_ID_VALUE + ", no)";
  }
  console.log(facts_to_add)
  let output = definemorefacts([], readdata(facts_to_add));

  // Calling grindem on an epilog.js dataset or ruleset makes it palatable to read as a human
  console.log(grindem(output));
  console.log('------------------')

  return output;
}

// Checks whether coverage holds for the claim and updates the indicator accordingly
function update_coverage_indicator() {
  console.log('---here------')
  const CLAIM_ID_VALUE = document.getElementById(CLAIM_ID_INPUT_ID).value;

  let covers_query = "covered(" +CLAIM_ID_VALUE + ")";

  let common_dataset = definemorefacts([], readdata(localStorage["commonData"]));
  let combined_dataset = definemorefacts(common_dataset, get_data_from_input_fields());
  
  let coverage_indicator = document.getElementById("coverage-indicator");

  let coverage = debugfinds('covered', read(covers_query), combined_dataset, definemorerules([], readdata(policy_rules)));

  if (coverage.length === 0) {
    coverage_indicator.innerHTML = "<td colspan=\"2\">Not Covered</td>";
    coverage_indicator.classList.add("covered-false");
    coverage_indicator.classList.remove("covered-true");
  } else {
    coverage_indicator.innerHTML = "<td colspan=\"2\">Covered</td>";
    coverage_indicator.classList.add("covered-true");
    coverage_indicator.classList.remove("covered-false");
  }
  
}

function init_coverage_indicator() {
  update_coverage_indicator(); 
}

function add_event_listeners() {
  // Update the coverage indicator if any of the input fields change value.
  for (const INPUT_FIELD_ID of INPUT_FIELD_IDS) {
    const INPUT_FIELD_WIDGET = document.getElementById(INPUT_FIELD_ID);
    
    INPUT_FIELD_WIDGET.addEventListener("change", () => update_coverage_indicator());
  }
}

let policy_rules = `
covered(C):-
    claim.policy(C,P) &
    covered(C,P,cardinal).

covered(C,P,cardinal):-
    valid_insuree(C,P) &
    policy_active(C,P) &
    valid_hospitalization(C,P).

valid_insuree(C,P):-
    claim.claimant(C,Cl) &
    policy.insuree(P,Cl).

policy_active(C,P):-
  claim.claimant(C,Cl) &
  claim.hospitalization(C,H) &
  hospitalization.start_time(H,H_START_DATE,H_START_TIME) & 
  hospitalization.end_time(H,H_END_DATE,H_END_TIME) &
  policy.startdate(P,Cl,P_START_DATE) &
  policy.enddate(P,Cl,P_END_DATE) &
  get_timestamp(H_START_DATE,H_START_STAMP) &
  get_timestamp(H_END_DATE,H_END_STAMP) &
  get_timestamp(P_END_DATE,P_END_STAMP) &
  get_timestamp(P_START_DATE,P_START_STAMP) &
  leq(P_START_STAMP,H_START_STAMP) &
  leq(H_END_STAMP,P_END_STAMP)

valid_hospitalization(C,P):-
  claim.hospitalization(C,H) &
  hospitalization.hospital(H,Hosp) &
  valid_hospital(Hosp) &
  hospitalization.reason(H,R) &
  eligible_service(C,P,R) &
  ~exception(C,P).

get_timestamp(DATE,TIME,STAMP) :-
  evaluate(parsedate(DATE),[D,M,Y]) &
  evaluate(parsetime(TIME),[HR,MIN]) &
  evaluate(maketimestamp(Y,M,D,HR,MIN,0),STAMP)

get_timestamp(DATE,STAMP) :-
  evaluate(parsedate(DATE),[D,M,Y]) &
  evaluate(maketimestamp(Y,M,D,0,0,0),STAMP)

definition(parsedate(DATE),map(readstring,tail(matches(stringify(DATE),"(....)_(..)_(..)"))))
definition(parsetime(TIME),map(readstring,tail(matches(stringify(TIME),"(..)_(..)"))))
definition(tail(X!L),L)

exception(C,P):-
  person.occupation(armed_forces) &
  claim.hospitalization(C,H) &
  hospitalization.consequence_of_occupation(H,yes).

eligible_service(C,P,routine_physical).
eligible_service(C,P,preventive_care).
valid_hospital(stanford_medical_center).
valid_hospital(menlo_medical_clinic).
valid_hospital(sutter_health).
`;