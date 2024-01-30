// Caridinal Care Waiver
const INTERNATIONAL_INPUT_ID = "international_input";
const EVAC_COVERAGE_INPUT_ID = "evac_coverage_input";
const REPATRIATION_COVERAGE_INPUT_ID = "repatriation_coverage_input";
const J_VISA_HOLDER_INPUT_ID = "j_visa_holder_input";
const J_VISA_DEDUCTIBLE_INPUT_ID = "j_visa_deductible_input";
const VISA_COPY_INPUT_ID = "visa_copy_input";
const INTERNATIONAL_TRANSLATED_INPUT_ID = "international_translated_input";
const ACADEMIC_YEAR_COVERED_INPUT_ID = "academic_year_covered_input";
const SF_BAY_CARE_MEDICAL_INPUT_ID = "sf_bay_care_medical_input" ;
const SF_BAY_CARE_MENTAL_INPUT_ID = "sf_bay_care_mental_input" ;
const ANNUAL_DEDUCTIBLE_INPUT_ID = "annual_deductible_input";
const ANNUAL_DEDUCTIBLE_EMPLOYER_INPUT_ID = "annual_deductible_employer_input";
const OOP_MINIMUM_INPUT_ID = "oop_minimum_input";
const OOP_EMPLOYER_INPUT_ID = "oop_employer_input";
const EMB_PPACA_INPUT_ID = "emb_ppaca_input";
const PC_PPACA_INPUT_ID = "pc_ppaca_input";
const PRE_EXISTING_CONDITIONS_INPUT_ID = "pre_existing_conditions_input";
const PRESCRIPTIONS_INPUT_ID = "prescriptions_input";
const DOUBLE_CARE_INPUT_ID = "double_care_input";
const AGGREGATE_MAX_BENEFIT_INPUT_ID = "aggregate_max_benefit_input";

const INPUT_FIELD_IDS = [
  INTERNATIONAL_INPUT_ID,
  EVAC_COVERAGE_INPUT_ID,
  REPATRIATION_COVERAGE_INPUT_ID,
  J_VISA_HOLDER_INPUT_ID,
  J_VISA_DEDUCTIBLE_INPUT_ID,
  VISA_COPY_INPUT_ID,
  INTERNATIONAL_TRANSLATED_INPUT_ID,
  ACADEMIC_YEAR_COVERED_INPUT_ID,
  SF_BAY_CARE_MEDICAL_INPUT_ID,
  SF_BAY_CARE_MENTAL_INPUT_ID,
  ANNUAL_DEDUCTIBLE_INPUT_ID,
  ANNUAL_DEDUCTIBLE_EMPLOYER_INPUT_ID,
  OOP_MINIMUM_INPUT_ID,
  OOP_EMPLOYER_INPUT_ID,
  EMB_PPACA_INPUT_ID,
  PC_PPACA_INPUT_ID,
  PRE_EXISTING_CONDITIONS_INPUT_ID,
  PRESCRIPTIONS_INPUT_ID,
  DOUBLE_CARE_INPUT_ID,
  AGGREGATE_MAX_BENEFIT_INPUT_ID
];

const INPUT_FIELD_VALUES = {};

window.onload = function() {
  load_common_data();

  init_coverage_indicator();

  add_event_listeners();
};



function get_data_from_input_fields() { // This is version without Epilog
  for (const input_field_id of INPUT_FIELD_IDS) {
    const input_field = document.getElementById(input_field_id);
    if (input_field) {
      const name = input_field.id.replace(/_input?$/, '').toUpperCase();
      let value;
      if (input_field.type === 'checkbox') {
        value = (input_field.checked ? 'yes' : 'no');
      } else if (input_field.type === 'date') {
        value = input_field.value;
      } else {
        value = parseFloat(input_field.value) || 0; 
      }
      INPUT_FIELD_VALUES[name] = value;
      }
    }

  let facts_to_add = "";

  
  facts_to_add += "international(" + INPUT_FIELD_VALUES['INTERNATIONAL'] + ") ";
  facts_to_add += "has_home_evac_travel_coverage(" + INPUT_FIELD_VALUES['EVAC_COVERAGE'] + ") ";
  facts_to_add += "repatriation_coverage(" + INPUT_FIELD_VALUES['REPATRIATION_COVERAGE'] + ") ";
  facts_to_add += "j_visa_holder(" + INPUT_FIELD_VALUES['J_VISA_HOLDER'] + ") ";
  facts_to_add += "j_visa_deductible(" + INPUT_FIELD_VALUES['J_VISA_DEDUCTIBLE'] + ") ";
  facts_to_add += "visa_copy(" + INPUT_FIELD_VALUES['VISA_COPY'] + ") ";
  facts_to_add += "international_translated(" + INPUT_FIELD_VALUES['INTERNATIONAL_TRANSLATED'] + ") ";
  facts_to_add += "academic_year_covered(" + INPUT_FIELD_VALUES['ACADEMIC_YEAR_COVERED'] + ") ";
  facts_to_add += "sf_bay_care_medical(" + INPUT_FIELD_VALUES['SF_BAY_CARE_MEDICAL'] + ") ";
  facts_to_add += "sf_bay_care_mental(" + INPUT_FIELD_VALUES['SF_BAY_CARE_MENTAL'] + ") ";
  facts_to_add += "annual_deductible(" + INPUT_FIELD_VALUES['ANNUAL_DEDUCTIBLE'] + ") ";
  facts_to_add += "annual_deductible_employer(" + INPUT_FIELD_VALUES['ANNUAL_DEDUCTIBLE_EMPLOYER'] + ") ";
  facts_to_add += "oop_minimum(" + INPUT_FIELD_VALUES['OOP_MINIMUM'] + ") ";
  facts_to_add += "oop_minimum_employer(" + INPUT_FIELD_VALUES['OOP_EMPLOYER'] + ") ";
  facts_to_add += "emb_ppaca(" + INPUT_FIELD_VALUES['EMB_PPACA'] + ") ";
  facts_to_add += "pc_paca(" + INPUT_FIELD_VALUES['PC_PPACA'] + ") ";
  facts_to_add += "pre_existing_conditions(" + INPUT_FIELD_VALUES['PRE_EXISTING_CONDITIONS'] + ") ";
  facts_to_add += "prescriptions(" + INPUT_FIELD_VALUES['PRESCRIPTIONS'] + ") ";
  facts_to_add += "double_care(" + INPUT_FIELD_VALUES['DOUBLE_CARE'] + ") ";
  facts_to_add += "aggregate_max_benefit(" + INPUT_FIELD_VALUES['AGGREGATE_MAX_BENEFIT'] + ") ";
  
  
  let output = definemorefacts([], readdata(facts_to_add));
  return output;
}

function update_coverage_indicator() {
  let covered = check_coverage();
  let coverage_indicator = document.getElementById("coverage-indicator");

  if (covered !== 0) {
    coverage_indicator.innerHTML = "<td colspan=\"2\">Cannot Waive</td>";
    coverage_indicator.classList.add("covered-false");
    coverage_indicator.classList.remove("covered-true");
  } else {
    coverage_indicator.innerHTML = "<td colspan=\"2\">Can Waive</td>";
    coverage_indicator.classList.add("covered-true");
    coverage_indicator.classList.remove("covered-false");
  }
}

function check_coverage() {
  let covers_query = "can_waive";
  let common_dataset = definemorefacts([], readdata(localStorage["commonData"])); // use definemorefacts for indexing 
  let combined_dataset = definemorefacts(common_dataset, get_data_from_input_fields());
  

  let coverage = debugfinds('covered', read(covers_query), combined_dataset, definemorerules([], readdata(waiver_rules)));
  console.log(grindem(get_data_from_input_fields()));
  //debugfinds for stack trace
  
  return (coverage.length !== 0);
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


// Make new page and link to it <-- just do visibility changes if you need multiple things added
// Change to be no args



// C = Claim, P = Policy.
let waiver_rules = `


can_waive :-
  covered

covered :-
  international(yes) &
  evacuation_covered(yes) &
  requirements(yes)

evacuation_covered(yes)  :-
  has_home_evac_travel_coverage(yes) &
  repatriation_coverage(yes) &
  visa_coverage(yes)  &
  visa_copy(yes) &
  international_translated(yes)


visa_coverage(yes)  :-
  j_visa_holder(yes) &
  j_visa_deductible(yes)

visa_coverage(yes) :-
  j_visa_holder(no)

covered  :-
  international(no) &
  requirements(yes) 

requirements(yes)  :-
  academic_year_covered(yes) &
  sf_bay_care(yes) &
  annual_deductible(yes) &
  oop_minimum(yes) &
  emb_ppaca(yes) &
  fpaca_preventative_care(yes) &
  pre_existing_conditions(yes) &
  prescriptions(yes) &
  double_care(yes) &
  aggregate_max_benefit(yes)


academic_year_covered(yes)  %:-
  %valid_dates(yes)

sf_bay_care(yes)  :- 
  sf_bay_care_medical(yes) &
  sf_bay_care_mental(yes)

annual_deductible(yes)  :-
  annual_deductible_employer(yes)

oop_minimum(yes)  :-
  oop_minimum_employer(yes)

pre_existing_condition(yes) s :-
  excluded_conditions(no)
`;
