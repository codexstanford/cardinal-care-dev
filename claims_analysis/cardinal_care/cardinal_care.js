const POLICY_ID_INPUT_ID = "policy_id_input";
const POLICY_OPTED_OUT_INPUT_ID = "policy_opted_out_input";
const CLAIM_ID_INPUT_ID = "claim_id_input";
const CLAIMANT_ID_INPUT_ID = "claimant_id_input";
const CLAIM_DATE_INPUT_ID = "claim_date_input";
const PATIENT_AGE_INPUT_ID = "patient_age_input";
const HOSPITALIZATION_ID_INPUT_ID = "hospitalization_id_input";
const HOSPITALIZATION_TREATMENT_LOCATION_INPUT_ID = "hospitalization_treatment_location_input";
const HOSPITALIZATION_HOSPITAL_INPUT_ID = "hospitalization_hospital_input";
const HOSPITALIZATION_TYPE_OF_HEALTHCARE_INPUT_ID = "hospitalization_type_of_healthcare_input";
const HOSPITALIZATION_NUM_PREV_VISITS_ID = "hospitalization_num_prev_visits_input";
const HOSPITALIZATION_CAUSE_INPUT_ID = "hospitalization_cause_input";
const HOSPITALIZATION_COUNTRY_INPUT_ID = "hospitalization_country_input";
const HOSPITALIZATION_STARTDATE_INPUT_ID = "hospitalization_startdate_input";
const HOSPITALIZATION_STARTTIME_INPUT_ID = "hospitalization_starttime_input";
const HOSPITALIZATION_ENDDATE_INPUT_ID = "hospitalization_enddate_input";
const HOSPITALIZATION_ENDTIME_INPUT_ID = "hospitalization_endtime_input";

const INPUT_FIELD_IDS = [
  POLICY_ID_INPUT_ID,
  POLICY_OPTED_OUT_INPUT_ID,
  CLAIM_ID_INPUT_ID,
  CLAIMANT_ID_INPUT_ID,
  CLAIM_DATE_INPUT_ID,
  PATIENT_AGE_INPUT_ID,
  HOSPITALIZATION_ID_INPUT_ID,
  HOSPITALIZATION_TREATMENT_LOCATION_INPUT_ID,
  HOSPITALIZATION_HOSPITAL_INPUT_ID,
  HOSPITALIZATION_TYPE_OF_HEALTHCARE_INPUT_ID,
  HOSPITALIZATION_NUM_PREV_VISITS_ID,
  HOSPITALIZATION_CAUSE_INPUT_ID,
  HOSPITALIZATION_COUNTRY_INPUT_ID,
  HOSPITALIZATION_STARTDATE_INPUT_ID,
  HOSPITALIZATION_STARTTIME_INPUT_ID,
  HOSPITALIZATION_ENDDATE_INPUT_ID,
  HOSPITALIZATION_ENDTIME_INPUT_ID
];


window.onload = function() {
  load_common_data();

  init_fields();

  init_coverage_indicator();

  add_event_listeners();
  };

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
  facts_to_add += "policy.type(" + POLICY_ID_VALUE + ", stanford_cardinal) ";
  // Policy facts
  const POLICY_OPTED_OUT_VALUE = document.getElementById(POLICY_OPTED_OUT_INPUT_ID).checked;
  if (POLICY_OPTED_OUT_VALUE === true) {
    facts_to_add += "policy.opted_out(" + POLICY_ID_VALUE + ", yes) ";
  } else {
    facts_to_add += "policy.opted_out(" + POLICY_ID_VALUE + ", no) ";
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

  const HOSPITALIZATION_TREATMENT_LOCATION_VALUE = document.getElementById(HOSPITALIZATION_TREATMENT_LOCATION_INPUT_ID).value;
  if (HOSPITALIZATION_TREATMENT_LOCATION_VALUE !== "") {
    facts_to_add += "hospitalization.treatment_location(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_TREATMENT_LOCATION_VALUE + ") ";
  }

  const HOSPITALIZATION_HOSPITAL_VALUE = document.getElementById(HOSPITALIZATION_HOSPITAL_INPUT_ID).value;
  if (HOSPITALIZATION_HOSPITAL_VALUE !== "") {
    facts_to_add += "hospitalization.hospital(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_HOSPITAL_VALUE + ") ";
  }

  const HOSPITALIZATION_TYPE_OF_HEALTHCARE_VALUE = document.getElementById(HOSPITALIZATION_TYPE_OF_HEALTHCARE_INPUT_ID).value;
  if (HOSPITALIZATION_TYPE_OF_HEALTHCARE_VALUE !== "") {
    facts_to_add += "hospitalization.type_of_healthcare(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_TYPE_OF_HEALTHCARE_VALUE + ") ";
  }

  const HOSPITALIZATION_NUM_PREV_VISITS_VALUE = document.getElementById(HOSPITALIZATION_NUM_PREV_VISITS_ID).value;
  if (HOSPITALIZATION_NUM_PREV_VISITS_VALUE === "") {
    facts_to_add += "hospitalization.num_prev_visits(" + HOSPITALIZATION_ID_VALUE + ", -1) ";
  } else {
    facts_to_add += "hospitalization.num_prev_visits(" + HOSPITALIZATION_ID_VALUE + ", "+ HOSPITALIZATION_NUM_PREV_VISITS_VALUE +") ";
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

  console.log(facts_to_add);
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

function check_chaim(claim_id, claim_data){
  const POLICY_ID_VALUE = document.getElementById(POLICY_ID_INPUT_ID).value;
  let common_dataset = definemorefacts([], readdata(localStorage["commonData"]));
  let combined_dataset = definemorefacts(common_dataset, definemorefacts([], readdata(claim_data)));
  
  let covers_query = "covers(" + POLICY_ID_VALUE + ", " + claim_id + ")";

  let coverage = compfinds('covered', read(covers_query), combined_dataset, definemorerules([], readdata(policy_rules)));

  if (coverage.length === 0) {
    return false;
  }
  else {
    return true;
  }
}

let policy_rules = `de

benefit.guidelines(Product, Treatment, Guidelines) :-
  evaluate(guideline_1,Guidelines)

guidelines.compliant(Guidelines,Min_Age,Max_Age,Allowed_Visits) :-
  evaluate(2,Allowed_Visits) &
  evaluate(0,Min_Age) &
  evaluate(21,Max_Age)

covers(P, C) :-
  claim.policy(C, P) &
  covered(C)

covered(C) :- 
    policy.type(Policy,stanford_cardinal) &
    ~policy.opted_out(P, yes) &
    eligible(C,Policy) &
    ~exclusion_applies(C)

    eligible(C,Policy) :-
    policy.type(Policy, Product) &
    claim.hospitalization(C,H) &
    hospitalization.type_of_healthcare(H, Benefit) &
    policy_includes(Product,Benefit) &
    fits_benefit(Product,C,Benefit)
  
  policy_includes(stanford_cardinal,routine_physical_exams)
  policy_includes(stanford_cardinal,preventive_care_immunizations)
  
  total_allowed_visits(Product, routine_physical_exams, AGE, Allowed_Visits) :-
    leq(22,AGE) & evaluate(1,Allowed_Visits)
  total_allowed_visits(Product, preventive_care_immunizations, AGE, Allowed_Visits) :-
    leq(22,AGE) & evaluate(1,Allowed_Visits)
    
  total_allowed_visits(Product, Treatment, AGE, Allowed_Visits) :- 
    benefit.guidelines(Product, Treatment, Guidelines) &
    guidelines.compliant(Guidelines,Min_Age,Max_Age,Allowed_Visits) & 
    leq(AGE,Max_Age) & leq(Min_Age, AGE)
  
  allowed_locations(stanford_cardinal,routine_physical_exams,physician_office)
  fits_benefit(Product,C,routine_physical_exams) :-
    claim.hospitalization(C,H) &
    hospitalization.treatment_location(H,physician_office) &
    hospitalization.patient(H,Person) & person.age(Person,AGE) & leq(0,AGE) & 
    total_allowed_visits(Product,routine_physical_exams,AGE, Allowed_Visits) &
    hospitalization.num_prev_visits(H,Prev_Visits) & leq(0,Prev_Visits) & 
    evaluate(plus(Prev_Visits,1),Num_Visits) &
    leq(Num_Visits,Allowed_Visits)
  
  allowed_locations(stanford_cardinal,preventive_care_immunizations,physician_office)
  allowed_locations(stanford_cardinal,preventive_care_immunizations,facility)
  fits_benefit(Product,C,preventive_care_immunizations) :-
    claim.hospitalization(C,H) &
    hospitalization.treatment_location(H,L) &
    allowed_locations(Product,preventive_care_immunizations,L) &
    hospitalization.patient(H,Person) & person.age(Person,AGE) & leq(0,AGE) &
    total_allowed_visits(Product,preventive_care_immunizations,AGE, _)
  
  %% Armed forces
  exclusion_applies(C):-
      claim.hospitalization(C, H) & 
      hospitalization.causal_event(H, military_service)
  
  %% Alternative Healthcare
  exclusion_applies(C):-
      claim.hospitalization(C, H) & 
      ~ hospitalization.type_of_healthcare(H, preventive_care_immunizations) &
      ~ hospitalization.type_of_healthcare(H, routine_physical_exams)
  
  %% Is tier 1
  tier_1_hospital(C):-
      claim.hospitalization(C, H) & 
      hospitalization.hospital(H, Hos) &
      hospital.tier(stanford_cardinal, Hos, 1)
  
  
  definition(parsedate(DATE),map(readstring,tail(matches(stringify(DATE),"(....)_(..)_(..)"))))
  definition(parsetime(TIME),map(readstring,tail(matches(stringify(TIME),"(..)_(..)_(..)"))))
  definition(head(X!L),X)
  definition(tail(X!L),L)
`;