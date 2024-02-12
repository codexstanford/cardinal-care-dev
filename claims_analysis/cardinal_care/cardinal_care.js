const POLICY_ID_INPUT_ID = "policy_id_input";
const POLICY_INSUREE_ID = "policy_insuree_input";
const POLICY_STARTDATE_ID = "policy_start_date_input";
const POLICY_ENDDATE_ID = "policy_end_date_input"
const CLAIM_ID_INPUT_ID = "claim_id_input";
const CLAIMANT_ID_INPUT_ID = "claimant_id_input";
const CLAIM_DATE_INPUT_ID = "claim_date_input";
const CLAIM_TIME_INPUT_ID = "claim_time_input";
const PATIENT_DOB_INPUT_ID = "patient_dob_input";
const PATIENT_SEX_INPUT_ID = "patient_sex_input";
const PATIENT_OCCUPATION_ID = "patient_occupation_input";
const HOSPITALIZATION_ID_INPUT_ID = "hospitalization_id_input";
const HOSPITALIZATION_REASON_INPUT_ID = "hospitalization_reason_input";
const HOSPITALIZATION_VACCINE_INPUT_ID = "hospital_visit_vaccine_input";
const HOSPITALIZATION_CONTRACEPTIVE_SERVICE_INPUT_ID = "contraceptive_service_input";
const HOSPITALIZATION_ALLERGY_SERVICE_INPUT_ID = "allergy_service_input";
const HOSPITALIZATION_HOSPITAL_ID = "hospital_visit_hospital_input";
const HOSPITALIZATION_STARTDATE_INPUT_ID = "hospitalization_startdate_input";
const HOSPITALIZATION_STARTTIME_INPUT_ID = "hospitalization_starttime_input";
const HOSPITALIZATION_ENDDATE_INPUT_ID = "hospitalization_enddate_input";
const HOSPITALIZATION_ENDTIME_INPUT_ID = "hospitalization_endtime_input";
const HOSPITALIZATION_COO_ID = "hospitalization_coo_input";
const HOSPITALIZATION_COUNSELLING_ID = "hospital_visit_counselling_input";
const HOSPITALIZATION_CANCER_ID = "hospital_visit_cancer_input";
const HOSPITALIZATION_LOCATION_ID = "hospital_visit_location_input";

const INPUT_FIELD_IDS = [
  POLICY_ID_INPUT_ID,
  POLICY_INSUREE_ID,
  POLICY_STARTDATE_ID,
  POLICY_ENDDATE_ID,
  CLAIM_ID_INPUT_ID,
  CLAIMANT_ID_INPUT_ID,
  CLAIM_DATE_INPUT_ID,
  CLAIM_TIME_INPUT_ID,
  PATIENT_DOB_INPUT_ID,
  PATIENT_SEX_INPUT_ID,
  PATIENT_OCCUPATION_ID,
  HOSPITALIZATION_ID_INPUT_ID,
  HOSPITALIZATION_REASON_INPUT_ID,
  HOSPITALIZATION_VACCINE_INPUT_ID,
  HOSPITALIZATION_ALLERGY_SERVICE_INPUT_ID,
  HOSPITALIZATION_HOSPITAL_ID,
  HOSPITALIZATION_STARTDATE_INPUT_ID,
  HOSPITALIZATION_STARTTIME_INPUT_ID,
  HOSPITALIZATION_ENDDATE_INPUT_ID,
  HOSPITALIZATION_ENDTIME_INPUT_ID,
  HOSPITALIZATION_COO_ID,
  HOSPITALIZATION_COUNSELLING_ID,
  HOSPITALIZATION_CANCER_ID,
  HOSPITALIZATION_LOCATION_ID
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

function reformatDate(dateStr) {
  // Split the input date string on the hyphen character
  const parts = dateStr.split('-');
  
  // Reorder the date parts to DD_MM_YYYY format
  // Note that parts array is [year, month, day] for YYYY-MM-DD format
  const reformattedDate = parts[2] + '_' + parts[1] + '_' + parts[0];
  
  return reformattedDate;
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

  facts_to_add += "policy.type(" + POLICY_ID_VALUE + ", cardinal) ";
  // Policy facts
  const POLICY_INSUREE_VALUE = document.getElementById(POLICY_INSUREE_ID).value
  if (POLICY_INSUREE_VALUE !== ""){
  facts_to_add += "policy.insuree(" + POLICY_ID_VALUE + ", " + POLICY_INSUREE_VALUE + ") ";
  }
  const POLICY_STARTDATE_VALUE = document.getElementById(POLICY_STARTDATE_ID).value;
  if (POLICY_STARTDATE_VALUE !== "") {
    let formattedDate = reformatDate(POLICY_STARTDATE_VALUE);
    facts_to_add += "policy.startdate(" + POLICY_ID_VALUE + ", " + POLICY_INSUREE_VALUE +", "+ formattedDate + ") ";
  } 
  const POLICY_ENDDATE_VALUE = document.getElementById(POLICY_ENDDATE_ID).value;
  if (POLICY_ENDDATE_VALUE !== "") {
    let formattedDate = reformatDate(POLICY_ENDDATE_VALUE);
    facts_to_add += "policy.enddate(" + POLICY_ID_VALUE + ", " + POLICY_INSUREE_VALUE +", "+  formattedDate + ") ";
  } 
  // Claim facts
  const CLAIMANT_ID_VALUE = document.getElementById(CLAIMANT_ID_INPUT_ID).value;
  if (CLAIMANT_ID_VALUE !== "") {
    facts_to_add += "claim.claimant(" + CLAIM_ID_VALUE + ", " + CLAIMANT_ID_VALUE + ") ";
  } 

  const CLAIM_DATE_VALUE = document.getElementById(CLAIM_DATE_INPUT_ID).value;
  const CLAIM_TIME_VALUE = document.getElementById(CLAIM_TIME_INPUT_ID).value;
  if (CLAIM_DATE_VALUE !== "" && CLAIM_TIME_VALUE !== "") {
    let formattedDate = reformatDate(CLAIM_DATE_VALUE);
    let formattedTime = CLAIM_TIME_VALUE.replace(/:/g, '_');
    facts_to_add += "claim.time(" + CLAIM_ID_VALUE + ", " + formattedDate + ", " + formattedTime + ") ";
  }

  // Patient facts
  const PATIENT_DOB_VALUE = document.getElementById(PATIENT_DOB_INPUT_ID).value;
  if (PATIENT_DOB_VALUE !== "") {
    let formattedDate = reformatDate(PATIENT_DOB_VALUE);
    facts_to_add += "person.dob(" + CLAIMANT_ID_VALUE + ", " + formattedDate + ") ";
  }

  const PATIENT_OCCUPATION_VALUE = document.getElementById(PATIENT_OCCUPATION_ID).value;
  if (PATIENT_OCCUPATION_VALUE !== "") {
    facts_to_add += "person.occupation(" + CLAIMANT_ID_VALUE + ", "+ PATIENT_OCCUPATION_VALUE +") ";
  }

  const PATIENT_SEX_VALUE = document.getElementById(PATIENT_SEX_INPUT_ID).value;
  if (PATIENT_SEX_VALUE !== "") {
    facts_to_add += "person.sex(" + CLAIMANT_ID_VALUE + ", "+ PATIENT_SEX_VALUE +") ";
  }

  // Hospitalization facts

  const HOSPITALIZATION_REASON_VALUE = document.getElementById(HOSPITALIZATION_REASON_INPUT_ID).value;
  if (HOSPITALIZATION_REASON_VALUE !== "") {
    facts_to_add += "hospitalization.reason(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_REASON_VALUE + ") ";
  }

  var vaccineAdministeredRow = document.getElementById('hospital_visit_vaccine_input').closest('tr');
  if(HOSPITALIZATION_REASON_VALUE === "preventive_care") {
    vaccineAdministeredRow.style.display = '';
  }
  else {
    vaccineAdministeredRow.style.display = 'none';
  }

  var counsellingRow = document.getElementById('hospital_visit_counselling_input').closest('tr');
  if(HOSPITALIZATION_REASON_VALUE === "specialized_screening_counselling") {
    counsellingRow.style.display = '';
  }
  else {
    counsellingRow.style.display = 'none';
  }

  const HOSPITALIZATION_VACCINE_VALUE = document.getElementById(HOSPITALIZATION_VACCINE_INPUT_ID).value;
  if (HOSPITALIZATION_VACCINE_VALUE !== "") {
    facts_to_add += "hospitalization.vaccine(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_VACCINE_VALUE + ") ";
  }

  const HOSPITALIZATION_CONTRACEPTIVE_SERVICE_VALUE = document.getElementById(HOSPITALIZATION_CONTRACEPTIVE_SERVICE_INPUT_ID).value;
  if (HOSPITALIZATION_CONTRACEPTIVE_SERVICE_VALUE !== "") {
    facts_to_add += "hospitalization.contraceptive_service(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_CONTRACEPTIVE_SERVICE_VALUE + ") ";
  }
  
  const HOSPITALIZATION_ALLERGY_SERVICE_VALUE = document.getElementById(HOSPITALIZATION_ALLERGY_SERVICE_INPUT_ID).value;
  if (HOSPITALIZATION_ALLERGY_SERVICE_VALUE !== "") {
    facts_to_add += "hospitalization.allergy_service(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_ALLERGY_SERVICE_VALUE + ") ";
  }

  const HOSPITALIZATION_HOSPITAL_VALUE = document.getElementById('hospital_visit_hospital_input').value;
  if (HOSPITALIZATION_HOSPITAL_VALUE !== "") {
    facts_to_add += "hospitalization.hospital(" + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_HOSPITAL_VALUE + ") ";
  } 
  // Only adds start{date, time} data to the dataset if both are present.
  const HOSPITALIZATION_STARTDATE_VALUE = document.getElementById(HOSPITALIZATION_STARTDATE_INPUT_ID).value;
  const HOSPITALIZATION_STARTTIME_VALUE = document.getElementById(HOSPITALIZATION_STARTTIME_INPUT_ID).value;
  if (HOSPITALIZATION_STARTDATE_VALUE !== "" && HOSPITALIZATION_STARTTIME_VALUE !== "") {
    let formattedDate = reformatDate(HOSPITALIZATION_STARTDATE_VALUE);
    let formattedTime = HOSPITALIZATION_STARTTIME_VALUE.replace(/:/g, '_');
    
    facts_to_add += "hospitalization.start_time(" + HOSPITALIZATION_ID_VALUE + ", " + formattedDate + ", " + formattedTime + ") ";
  } 
  
  // Only adds end{date, time} data to the dataset if both are present.
  const HOSPITALIZATION_ENDDATE_VALUE = document.getElementById(HOSPITALIZATION_ENDDATE_INPUT_ID).value;
  const HOSPITALIZATION_ENDTIME_VALUE = document.getElementById(HOSPITALIZATION_ENDTIME_INPUT_ID).value;
  if (HOSPITALIZATION_ENDDATE_VALUE !== "" && HOSPITALIZATION_ENDTIME_VALUE !== "") {
    let formattedDate = reformatDate(HOSPITALIZATION_ENDDATE_VALUE);
    let formattedTime = HOSPITALIZATION_ENDTIME_VALUE.replace(/:/g, '_');
    
    facts_to_add += "hospitalization.end_time(" + HOSPITALIZATION_ID_VALUE + ", " + formattedDate + ", " + formattedTime + ") ";

  }
  
  const HOSPITALIZATION_COO_VALUE = document.getElementById(HOSPITALIZATION_COO_ID).checked;
  if (HOSPITALIZATION_COO_VALUE === true) {
    facts_to_add += "hospitalization.consequence_of_occupation("  + HOSPITALIZATION_ID_VALUE + ", yes)";
  } else {
    facts_to_add += "hospitalization.consequence_of_occupation("  + HOSPITALIZATION_ID_VALUE + ", no)";
  }

  const HOSPITALIZATION_COUNSELLING_VALUE = document.getElementById(HOSPITALIZATION_COUNSELLING_ID).value;
  if (HOSPITALIZATION_COUNSELLING_VALUE !== "") {
    facts_to_add += "hospitalization.screening_type("  + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_COUNSELLING_VALUE + ") ";
  }

  var cancerTypeRow = document.getElementById('hospital_visit_cancer_input').closest('tr');
  if(HOSPITALIZATION_COUNSELLING_VALUE === "cancer") {
    cancerTypeRow.style.display = '';
  } else {
    cancerTypeRow.style.display = 'none';
  }


  const HOSPITALIZATION_CANCER_VALUE = document.getElementById(HOSPITALIZATION_CANCER_ID).value;
  if (HOSPITALIZATION_CANCER_VALUE !== "") {
    facts_to_add += "hospitalization.cancer_type("  + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_CANCER_VALUE + ") ";
  }

  const HOSPITALIZATION_LOCATION_VALUE = document.getElementById(HOSPITALIZATION_LOCATION_ID).value;
  if (HOSPITALIZATION_LOCATION_VALUE !== "") {
    facts_to_add += "hospitalization.location("  + HOSPITALIZATION_ID_VALUE + ", " + HOSPITALIZATION_LOCATION_VALUE + ") ";
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
    policy.type(P,T) &
    covered(C,P,T).

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
  get_timestamp_from_date(H_START_DATE,H_START_STAMP) &
  get_timestamp_from_date(H_END_DATE,H_END_STAMP) &
  get_timestamp_from_date(P_END_DATE,P_END_STAMP) &
  get_timestamp_from_date(P_START_DATE,P_START_STAMP) &
  leq(P_START_STAMP,H_START_STAMP) &
  leq(H_END_STAMP,P_END_STAMP)

valid_hospitalization(C,P):-
  claim.hospitalization(C,H) &
  hospitalization.hospital(H,Hosp) &
  valid_hospital(Hosp, R) &
  hospitalization.reason(H,R) &
  eligible_service(C,P,R) &
  ~exception(C,P).

get_timestamp_from_datetime(DATE,TIME,STAMP) :-
  evaluate(parsedate(DATE),[D,M,Y]) &
  evaluate(parsetime(TIME),[HR,MIN]) &
  evaluate(maketimestamp(Y,M,D,HR,MIN,0),STAMP)

get_timestamp_from_date(DATE,STAMP) :-
  evaluate(parsedate(DATE),[D,M,Y]) &
  evaluate(maketimestamp(Y,M,D,0,0,0),STAMP)

definition(parsedate(DATE),map(readstring,tail(matches(stringify(DATE),"(..)_(..)_(....)"))))
definition(parsetime(TIME),map(readstring,tail(matches(stringify(TIME),"(..)_(..)"))))
definition(tail(X!L),L)

exception(C,P):-
  person.occupation(armed_forces) &
  claim.consequence_of_occupation(C,yes).

eligible_service(C,P,Service):-
  check_policy_year_limit(C,Service) &
  claim.hospitalization(C,H) &
  hospitalization.location(H,L) &
  valid_location(Service,L).

eligible_service(C,P,specialized_screening_counselling):-
  claim.hospitalization(C,H) &
  hospitalization.screening_type(H,Type) &
  valid_screening_list(List) &
  member(Type,List).

eligible_service(C,P,specialized_screening_counselling):-
  claim.hospitalization(C,H) &
  hospitalization.screening_type(H,cancer) &
  hospitalization.cancer_type(H,lung) &
  evaluate(countofall(X,lung_cancer_past_twelve_months(C,X)),0). 

eligible_service(C,P,specialized_screening_counselling):-
  claim.hospitalization(C,H) &
  hospitalization.screening_type(H,cancer) &
  check_age_range_limit(C,cancer).   

eligible_service(C,P,preventive_care):-
  claim.hospitalization(C,H) &
  hospitalization.location(H,L) &
  valid_location(preventive_care,L) &
  check_age_range_limit(C,vaccine).

eligible_service(C,P,X):-
  covered_list(List) &
  member(X,List).

check_age_range_limit(Claim, cancer):- 
  claim.claimant(Claim,Cl) &
  person.dob(Cl,DOB) &
  claim.time(Claim,C_D,C_T) &
  evaluate(parsedate(C_D),[D,M,Y]) &
  evaluate(parsedate(DOB),[D2,M2,Y2]) &
  evaluate(minus(Y,Y2),Age) &
  claim.hospitalization(Claim,Hosp) &
  hospitalization.screening_type(Hosp,cancer) &
  hospitalization.cancer_type(Hosp,Cancer) &
  get_age_range_limit(cancer,Cancer,Age,Limit,MinAge,MaxAge) &
  evaluate(plus(countofall(X,age_range_visit(Claim,X,Limit,MinAge,MaxAge,DOB)),1),Count) &
  leq(Count,Limit).

check_age_range_limit(Claim,vaccine):-
  claim.claimant(Claim,Cl) &
  person.dob(Cl,DOB) &
  claim.time(Claim,C_D,C_T) &
  evaluate(parsedate(C_D),[D,M,Y]) &
  evaluate(parsedate(DOB),[D2,M2,Y2]) &
  evaluate(minus(Y,Y2),Age) &
  claim.hospitalization(Claim,Hosp) &
  hospitalization.vaccine(Hosp,V) &
  get_age_range_limit(vaccine,V,Age,Limit,MinAge,MaxAge) &
  evaluate(plus(countofall(X,age_range_visit_vaccine(Claim,X)),1),Count) &
  leq(Count,Limit).
  
lung_cancer_past_twelve_months(Claim1,Claim2):-
  claim.claimant(Claim1,Cl) &
  claim.claimant(Claim2,Cl) &
  claim.hospitalization(Claim2,Hosp2) &
  claim.hospitalization(Claim1,Hosp1) &
  hospitalization.reason(Hosp1,specialized_screening_counselling) &
  hospitalization.reason(Hosp2,specialized_screening_counselling) &
  hospitalization.screening_type(Hosp1,cancer) &
  hospitalization.screening_type(Hosp2,cancer) &
  hospitalization.cancer_type(Hosp1,lung) &
  hospitalization.cancer_type(Hosp2,lung) &
  evaluate(parsedate(C1_D),[D,M,Y]) &
  evaluate(parsedate(C2_D),[D2,M2,Y2]) &
  same(Y,Y2). %%update later when date logic gets fixed


check_policy_year_limit(C,Service):-
  claim.claimant(C,Cl) &
  person.dob(Cl,DOB) &
  claim.time(C,C_D,C_T) &
  evaluate(parsedate(C_D),[D,M,Y]) &
  evaluate(parsedate(DOB),[D2,M2,Y2]) &
  evaluate(minus(Y,Y2),Age) &
  yearly_visit_limit(Service,Age,Limit) &
  evaluate(plus(countofall(X,visit_current_year(Service,C,X)),1),Count) &
  leq(Count,Limit).



eligible_service(C,P,female_contraceptives) :-
  claim.claimant(C,Cl) &
  person.sex(Cl, female) &
  claim.hospitalization(C,H) &
  hospitalization.contraceptive_service(H,Service) &
  fda_approved(Service).

eligible_service(C,P,physician_consultation).
eligible_service(C,P,allergy).

get_age_range_limit(Type,Case,Age,Limit,MinAge,MaxAge):-
  age_range_limit(Type,Case,MinAge,MaxAge,Limit) &
  evaluate(minus(MaxAge,1),MaxAgeMinus) &
  leq(Age,MaxAgeMinus) &
  leq(MinAge,Age).

yearly_visit_limit(Service,Age,Limit):-
  yearly_visit_limit(Service,MinAge,MaxAge,Limit) &
  evaluate(minus(MaxAge,1),MaxAgeMinus) &
  leq(Age,MaxAgeMinus) &
  leq(MinAge,Age).

visit_current_year(Service,Claim1,Claim2):-
  claim.claimant(Claim1,Person) &
  claim.claimant(Claim2,Person) &
  claim.policy(Claim1,Policy) &
  claim.policy(Claim2,Policy) &
  claim.hospitalization(Claim2,Hosp2) &
  claim.hospitalization(Claim1,Hosp1) &
  hospitalization.reason(Hosp1,Service) &
  hospitalization.reason(Hosp2,Service) &
  hospitalization.start_time(Hosp1,Hosp1_StartDate,Hosp1_StartTime) &
  hospitalization.start_time(Hosp2,Hosp2_StartDate,Hosp2_StartTime) &
  policy_year_startdate(Policy_StartDate) &
  get_timestamp_from_datetime(Hosp2_StartDate,Hosp2_StartTime,Hosp2_Timestamp) &
  get_timestamp_from_date(Policy_StartDate,Policy_Timestamp) &
  get_timestamp_from_datetime(Hosp1_StartDate,Hosp1_StartTime,Hosp1_Timestamp) &
  leq(Policy_Timestamp,Hosp2_Timestamp) &
  leq(Policy_Timestamp,Hosp1_Timestamp) &
  claim.time(Claim1,C1_D,C1_T) &
  claim.time(Claim2,C2_D,C2_T) &
  get_timestamp_from_datetime(C1_D,C1_T,C1_TS) &
  get_timestamp_from_datetime(C2_D,C2_T,C2_TS) &
  lt(C2_TS,C1_TS) &
  covered(Claim2)

age_range_visit_vaccine(Claim1,Claim2):-
  claim.claimant(Claim1,Person) &
  claim.claimant(Claim2,Person) &
  claim.policy(Claim1,Policy) &
  claim.policy(Claim2,Policy) &
  claim.hospitalization(Claim2,Hosp2) &
  claim.hospitalization(Claim1,Hosp1) &
  claim.time(Claim1,C1_D,C1_T) &
  hospitalization.reason(Hosp1,preventive_care) &
  hospitalization.reason(Hosp2,preventive_care) &
  hospitalization.vaccine(Hosp1,V) &
  hospitalization.vaccine(Hosp2,V) &
  person.dob(Person,DOB) &
  evaluate(parsedate(C1_D),[D1,M1,Y1]) &
  evaluate(parsedate(DOB),[D_dob,M_dob,Y_dob]) &
  evaluate(minus(Y1,Y_dob),Age) &
  get_age_range_limit(vaccine,V,Age,Limit,MinAge,MaxAge) &
  age_range_visit(Claim1,Claim2,Limit,MinAge,MaxAge,DOB).

age_range_visit_cancer(Claim1,Claim2):-
  claim.claimant(Claim1,Person) &
  claim.claimant(Claim2,Person) &
  claim.policy(Claim1,Policy) &
  claim.policy(Claim2,Policy) &
  claim.hospitalization(Claim2,Hosp2) &
  claim.hospitalization(Claim1,Hosp1) &
  claim.time(Claim1,C1_D,C1_T) &
  hospitalization.reason(Hosp1,specialized_screening_counselling) &
  hospitalization.reason(Hosp2,specialized_screening_counselling) &
  hospitalization.screening_type(Hosp1,cancer) &
  hospitalization.screening_type(Hosp2,cancer) &
  hospitalization.cancer_type(Hosp1,Cancer) &
  hospitalization.cancer_type(Hosp2,Cancer) &
  person.dob(Person,DOB) &
  evaluate(parsedate(C1_D),[D1,M1,Y1]) &
  evaluate(parsedate(DOB),[D_dob,M_dob,Y_dob]) &
  evaluate(minus(Y1,Y_dob),Age) &
  get_age_range_limit(cancer,Cancer,Age,Limit,MinAge,MaxAge) &
  age_range_visit(Claim1,Claim2,Limit,MinAge,MaxAge,DOB).

age_range_visit(Claim1,Claim2,Limit,MinAge,MaxAge,DOB):-
  claim.time(Claim1,C1_D,C1_T) &
  claim.time(Claim2,C2_D,C2_T) &
  evaluate(parsedate(DOB),[D_dob,M_dob,Y_dob]) &
  evaluate(parsedate(C2_D),[D2,M2,Y2]) &
  evaluate(minus(Y2,Y_dob),Age2) &
  evaluate(minus(MaxAge,1),MaxAgeMinus) &
  leq(Age2,MaxAgeMinus) &
  leq(MinAge,Age2) &
  get_timestamp_from_datetime(C1_D,C1_T,C1_TS) &
  get_timestamp_from_datetime(C2_D,C2_T,C2_TS) &
  lt(C2_TS,C1_TS) &
  covered(Claim2). %% update with claim line logic
  
lt(X,Y):-
  leq(X,Y) &
  ~same(X,Y).

policy_year_startdate(01_08_2023).

valid_hospital(Hosp, R):-
  valid_hospital(Hosp).

valid_hospital(telemedicine, physician_consultation).
valid_hospital(allergy_specialist, allergy).

valid_hospital(stanford_medical_center).
valid_hospital(menlo_medical_clinic).
valid_hospital(sutter_health).
yearly_visit_limit(routine_physical,0,22,0).
yearly_visit_limit(routine_physical,22,200,1)
yearly_visit_limit(gynecological_exam,0,200,1).
valid_location(routine_physical,phys_office).
valid_location(preventive_care,phys_office).
valid_location(preventive_care,facility).
valid_location(gynecological_exam,phys_office).
valid_location(gynecological_exam,ob_office).
valid_location(gynecological_exam,gyn_office).
valid_location(gynecological_exam,ob_gyn).
valid_screening_list([obesity,healthy_diet,alcohol_misuse,tobacco_missuse,depression,sti,
genetic_risk_cancer,stress_management,chronic_condition,lactation,prenatal_postpartum]).
covered_list([breast_pump_supplies]).
age_range_limit(vaccine,covid,0,200,3).
age_range_limit(vaccine,polio,0,5,5).
age_range_limit(vaccine,polio,5,100,0).
age_range_limit(vaccine,tb,0,24,1).
age_range_limit(vaccine,tb,24,200,0).
age_range_limit(cancer,prostate,0,200,1). 
age_range_limit(cancer,breast,0,200,1).

definition(parsedate(DATE),map(readstring,tail(matches(stringify(DATE),"(..)_(..)_(....)"))))
preventive_care_limit(covid,0,200,3).
preventive_care_limit(polio,0,5,5).
preventive_care_limit(polio,5,100,0).
preventive_care_limit(tb,0,24,1).
preventive_care_limit(tb,24,200,0).

fda_approved(counseling).
fda_approved(rod).
fda_approved(larc).
fda_approved(preogestin).
fda_approved(oral).
fda_approved(sterilization).

lt(X,Y):-
  leq(X,Y) &
  ~same(X,Y).

  definition(parsetime(TIME),map(readstring,tail(matches(stringify(TIME),"(..)_(..)"))))
`;