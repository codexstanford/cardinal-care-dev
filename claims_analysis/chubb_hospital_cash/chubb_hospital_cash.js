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

const INPUT_FIELD_IDS = [
  POLICY_ID_INPUT_ID,
  POLICY_SIGNED_INPUT_ID,
  WELLNESS_VISIT_CONFIRMATION_INPUT_ID,
  PREMIUM_PAID_AMOUNT_INPUT_ID,
  POLICY_CANCELED_INPUT_ID,
  CLAIM_ID_INPUT_ID,
  CLAIMANT_ID_INPUT_ID,
  CLAIM_DATE_INPUT_ID,
  PATIENT_AGE_INPUT_ID,
  HOSPITALIZATION_ID_INPUT_ID,
  HOSPITALIZATION_REASON_INPUT_ID,
  HOSPITALIZATION_CAUSE_INPUT_ID,
  HOSPITALIZATION_COUNTRY_INPUT_ID,
  HOSPITALIZATION_STARTDATE_INPUT_ID,
  HOSPITALIZATION_STARTTIME_INPUT_ID,
  HOSPITALIZATION_ENDDATE_INPUT_ID,
  HOSPITALIZATION_ENDTIME_INPUT_ID
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
    return [];
  }
  
  let facts_to_add = "claim.policy(" + CLAIM_ID_VALUE + ", " + POLICY_ID_VALUE + ") claim.hospitalization(" + CLAIM_ID_VALUE + ", " + HOSPITALIZATION_ID_VALUE + ")";

  // Policy facts
  const POLICY_SIGNED_VALUE = document.getElementById(POLICY_SIGNED_INPUT_ID).checked;
  if (POLICY_SIGNED_VALUE === true) {
    facts_to_add += "policy.signed(" + POLICY_ID_VALUE + ", yes) ";
  } else {
    facts_to_add += "policy.signed(" + POLICY_ID_VALUE + ", no) ";
  }

  const WELLNESS_VISIT_CONFIRMATION_VALUE = document.getElementById(WELLNESS_VISIT_CONFIRMATION_INPUT_ID).checked;
  if (WELLNESS_VISIT_CONFIRMATION_VALUE === true) {
    facts_to_add += "policy.wellness_visit_confirmation_provided(" + POLICY_ID_VALUE + ", yes) ";
  } else {
    facts_to_add += "policy.wellness_visit_confirmation_provided(" + POLICY_ID_VALUE + ", no) ";
  }

  const PREMIUM_PAID_AMOUNT_VALUE = document.getElementById(PREMIUM_PAID_AMOUNT_INPUT_ID).value;
  if (PREMIUM_PAID_AMOUNT_VALUE === '') {
    facts_to_add += "policy.premium_amount_paid(" + POLICY_ID_VALUE + ", 0) ";
  } else {
    facts_to_add += "policy.premium_amount_paid(" + POLICY_ID_VALUE + ", "+ PREMIUM_PAID_AMOUNT_VALUE +") ";
  }

  const POLICY_CANCELED_VALUE = document.getElementById(POLICY_CANCELED_INPUT_ID).checked;
  if (POLICY_CANCELED_VALUE === true) {
    facts_to_add += "policy.canceled(" + POLICY_ID_VALUE + ", yes) ";
  } else {
    facts_to_add += "policy.canceled(" + POLICY_ID_VALUE + ", no) ";
  }


  // Claim facts
  const CLAIMANT_ID_VALUE = document.getElementById(CLAIMANT_ID_INPUT_ID).value;
  if (CLAIMANT_ID_VALUE !== "") {
    facts_to_add += "claim.claimant(" + CLAIM_ID_VALUE + ", " + CLAIMANT_ID_VALUE + ") ";
    facts_to_add += "hospitalization.patient(" + HOSPITALIZATION_ID_VALUE + ", " + CLAIMANT_ID_VALUE + ") "
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

  // Hospitalization facts

  const HOSPITALIZATION_REASON_VALUE = document.getElementById(HOSPITALIZATION_REASON_INPUT_ID).value;
  if (HOSPITALIZATION_REASON_VALUE !== "") {
    facts_to_add += "hospitalization.reason(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_REASON_VALUE + ") ";
  } 

  const HOSPITALIZATION_CAUSE_VALUE = document.getElementById(HOSPITALIZATION_CAUSE_INPUT_ID).value;
  if (HOSPITALIZATION_CAUSE_VALUE !== "") {
    facts_to_add += "hospitalization.causal_event(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_CAUSE_VALUE + ") ";
  } 

  const HOSPITALIZATION_COUNTRY_VALUE = document.getElementById(HOSPITALIZATION_COUNTRY_INPUT_ID).value;
  if (HOSPITALIZATION_COUNTRY_VALUE !== "") {
    facts_to_add += "hospitalization.country(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_COUNTRY_VALUE + ") ";
  }

  // Only adds start{date, time} data to the dataset if both are present.
  const HOSPITALIZATION_STARTDATE_VALUE = document.getElementById(HOSPITALIZATION_STARTDATE_INPUT_ID).value;
  const HOSPITALIZATION_STARTTIME_VALUE = document.getElementById(HOSPITALIZATION_STARTTIME_INPUT_ID).value;
  if (HOSPITALIZATION_STARTDATE_VALUE !== "" && HOSPITALIZATION_STARTTIME_VALUE !== "") {
    let formattedDate = HOSPITALIZATION_STARTDATE_VALUE.replace(/-/g, '_');
    let formattedTime = HOSPITALIZATION_STARTTIME_VALUE.replace(/:/g, '_') + "_00";
    
    facts_to_add += "hospitalization.startdate(" + HOSPITALIZATION_ID_VALUE + ", " + formattedDate + ") ";
    facts_to_add += "hospitalization.starttime(" + HOSPITALIZATION_ID_VALUE + ", " + formattedTime + ") ";

    // Manually perform datetimetotimestamp and add result to the database
    let splitDate = formattedDate.split("_");
    let splitTime = formattedTime.split("_");

    // maketimestamp is an epilog.js function
    let timeStamp = maketimestamp(splitDate[0], splitDate[1], splitDate[2], splitTime[0], splitTime[1], splitTime[2]);

    facts_to_add += "datetimetotimestamp(" + formattedDate + "," + formattedTime + "," + timeStamp + ") ";
  } 
  
  // Only adds end{date, time} data to the dataset if both are present.
  const HOSPITALIZATION_ENDDATE_VALUE = document.getElementById(HOSPITALIZATION_ENDDATE_INPUT_ID).value;
  const HOSPITALIZATION_ENDTIME_VALUE = document.getElementById(HOSPITALIZATION_ENDTIME_INPUT_ID).value;
  if (HOSPITALIZATION_ENDDATE_VALUE !== "" && HOSPITALIZATION_ENDTIME_VALUE !== "") {
    let formattedDate = HOSPITALIZATION_ENDDATE_VALUE.replace(/-/g, '_');
    let formattedTime = HOSPITALIZATION_ENDTIME_VALUE.replace(/:/g, '_') + "_00";
    
    facts_to_add += "hospitalization.enddate(" + HOSPITALIZATION_ID_VALUE + ", " + formattedDate + ") ";
    facts_to_add += "hospitalization.endtime(" + HOSPITALIZATION_ID_VALUE + ", " + formattedTime + ") ";

    // Manually perform datetimetotimestamp and add result to the database
    let splitDate = formattedDate.split("_");
    let splitTime = formattedTime.split("_");

    // maketimestamp is an epilog.js function
    let timeStamp = maketimestamp(splitDate[0], splitDate[1], splitDate[2], splitTime[0], splitTime[1], splitTime[2]);

    facts_to_add += "datetimetotimestamp(" + formattedDate + "," + formattedTime + "," + timeStamp + ") ";
  } 

  let output = definemorefacts([], readdata(facts_to_add));

  // Calling grindem on an epilog.js dataset or ruleset makes it palatable to read as a human
  //console.log(grindem(output));

  return output;
}

// Checks whether coverage holds for the claim and updates the indicator accordingly
function update_coverage_indicator() {
  const POLICY_ID_VALUE = document.getElementById(POLICY_ID_INPUT_ID).value;
  const CLAIM_ID_VALUE = document.getElementById(CLAIM_ID_INPUT_ID).value;

  let covers_query = "covers(" + POLICY_ID_VALUE + ", " + CLAIM_ID_VALUE + ")";

  let common_dataset = definemorefacts([], readdata(localStorage["commonData"]));
  let combined_dataset = definemorefacts(common_dataset, get_data_from_input_fields());
  
  let coverage_indicator = document.getElementById("coverage-indicator");

  let coverage = compfinds('covered', read(covers_query), combined_dataset, definemorerules([], readdata(policy_rules)));

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

// Onboarding task: 
  // Write a function that takes as input: a string containing epilog data corresponding to data for an example claim (which would otherwise be entered into the web form),
  // and outputs: true if the claim is covered by the policy, and false otherwise.
const {definemorefacts,read,readdata,compfinds,definemorerules,debugfinds,maketimestamp} = require('../../src/epilog.js')
if (typeof localStorage === 'undefined') {
  global.localStorage = {
      getItem: function(key) {
          return this[key] || null;
      },
      setItem: function(key, value) {
          this[key] = value.toString();
      },
      removeItem: function(key) {
          delete this[key];
      }
  };
}
function match_with_regex_2_arity(regex,string){
  let match = regex.exec(string);
  return [match[1],match[2]]
}
function match_with_regex_2_arity_conditional(regex,string,id){
  let match = regex.exec(string)
  console.assert(match[1]==id,"id of the clause is incorrect")
  return match[2]
}
function get_datetime_clause(date,time){
  let splitDate = date.split("_");
  let splitTime = time.split("_");
  // maketimestamp is an epilog.js function
  let timeStamp = maketimestamp(splitDate[0], splitDate[1], splitDate[2], splitTime[0], splitTime[1], splitTime[2]);
  return "datetimetotimestamp(" + date + "," + time + "," + timeStamp + ") ";
}
function test_input_string(input_str){
  load_common_data();
  let common_dataset = definemorefacts([], readdata(localStorage["commonData"]));
  let combined_dataset = definemorefacts(common_dataset, readdata(input_str));
  let [claim_id,policy_id] = match_with_regex_2_arity(/claim\.policy\(([^,]+),\s*([^)]+)\)/g,input_str);
  let hosp_id= match_with_regex_2_arity_conditional(/claim\.hospitalization\(([^,]+),\s*([^)]+)\)/g,input_str,claim_id);
  let hosp_startdate=match_with_regex_2_arity_conditional(/hospitalization\.startdate\(([^,]+),\s*([^)]+)\)/g,input_str,hosp_id);
  let hosp_starttime=match_with_regex_2_arity_conditional(/hospitalization\.starttime\(([^,]+),\s*([^)]+)\)/g,input_str,hosp_id);
  let hosp_enddate=match_with_regex_2_arity_conditional(/hospitalization\.enddate\(([^,]+),\s*([^)]+)\)/g,input_str,hosp_id);
  let hosp_endtime=match_with_regex_2_arity_conditional(/hospitalization\.endtime\(([^,]+),\s*([^)]+)\)/g,input_str,hosp_id);
  let datetime_clauses=get_datetime_clause(hosp_startdate,hosp_starttime)
  datetime_clauses+=get_datetime_clause(hosp_enddate,hosp_endtime)
  combined_dataset = definemorefacts(combined_dataset,readdata(datetime_clauses))
  let covers_query = "covers(" + policy_id + ", " + claim_id + ")";
  let coverage = compfinds('covered', read(covers_query), combined_dataset, definemorerules([], readdata(policy_rules)));
  if (coverage.length === 0) {
    console.log('false')
  } else {
    console.log('true')
  }
}
const {load_common_data} = require('../../src/load_common_data')
const {load_example_claim} = require('../../src/load_example_claim')
load_example_claim();
let policy_rules = `
covers(P, C) :-
  claim.policy(C, P) &
  covered(C, N)

covered(C, N) :- 
    claim.policy(C, P) & 
    policy.in_effect(P) & 
    claim.hospitalization(C, H) & 
    hospitalization_conditions_met(H) & 
    benefit_calc(C, N) & 
    ~geq(0, N) &
    ~exclusion_applies(C)

policy.in_effect(P) :- 
    policy.signed(P, yes) & 
    policy.paid_premium(P) & 
    condition_met_1.3(P) & 
    policy.canceled(P, no)

condition_met_1.3(P) :- policy.wellness_visit_confirmation_provided(P, yes)

policy.paid_premium(P) :- 
    policy.premium_amount_paid(P, A) &
    geq(A, 2000)

hospitalization_conditions_met(H) :- hospitalization_valid_reason(H) & hospitalization.country(H, usa)

hospitalization_valid_reason(H) :- hospitalization.reason(H, sickness)
hospitalization_valid_reason(H) :- hospitalization.reason(H, accidental_injury)

exclusion_applies(C) :- 
    claim.hospitalization(C, H) & 
    hospitalization.causal_event(H, skydiving)
exclusion_applies(C) :- 
    claim.hospitalization(C, H) & 
    hospitalization.causal_event(H, military_service)
exclusion_applies(C) :- 
    claim.hospitalization(C, H) & 
    hospitalization.causal_event(H, firefighting_service)
exclusion_applies(C) :- 
    claim.hospitalization(C, H) & 
    hospitalization.causal_event(H, police_service)
exclusion_applies(C) :- 
    claim.hospitalization(C, H) & 
    hospitalization.patient(H, X) &
    person.age(X, A) & 
    geq(A, 75)

benefit_calc(C,N) :- 
    claim.hospitalization(C, H) & 
    duration_days(H, D) & 
    evaluate(max(0,times(D, 500)), N)

duration_days(H, D) :- 
    duration(H, D_MS) & 
    evaluate(floor(quotient(D_MS, 86400000)), D)

duration(Z,DURATION) :-
    hospitalization.startdate(Z,SD) &
    hospitalization.starttime(Z,ST) &
    hospitalization.enddate(Z,ED) &
    hospitalization.endtime(Z,ET) &
    datetimetotimestamp(SD,ST,SS) &
    datetimetotimestamp(ED,ET,ES) &
    evaluate(minus(ES,SS),DURATION)

geq(X, Y) :- evaluate(min(X,Y), Y)
`;
test_input_string(localStorage["example_claim"]);