// Caridinal Care Waiver
/* Note that for a simple implementation of a UI where all the questions are binary or inputs, not compared to another
* Policy, Claim, etc., then you can use basic HTML functionality to accomplish the logical comparisons, which is what this
* file does. This is not a good example of logic programming (the Epilog at the bottom isn't used at all!)
*/
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
        value = (input_field.checked ? true : false);
      } else if (input_field.type === 'date') {
        value = input_field.value;
      } else {
        value = parseFloat(input_field.value) || 0; 
      }
      INPUT_FIELD_VALUES[name] = value;
      }
    }

  let international = INPUT_FIELD_VALUES['INTERNATIONAL'];
  
  let has_home_evac_travel_coverage = INPUT_FIELD_VALUES['EVAC_COVERAGE'];
  let repatriation_coverage = INPUT_FIELD_VALUES['REPATRIATION_COVERAGE'];
  let j_visa_holder = INPUT_FIELD_VALUES['J_VISA_HOLDER'];
  let j_visa_deductible = INPUT_FIELD_VALUES['J_VISA_DEDUCTIBLE'];
  let visa_copy = INPUT_FIELD_VALUES['VISA_COPY'];
  let international_translated = INPUT_FIELD_VALUES['INTERNATIONAL_TRANSLATED'];
  
  let academic_year_covered = INPUT_FIELD_VALUES['ACADEMIC_YEAR_COVERED'];
  
  let sf_bay_care_medical = INPUT_FIELD_VALUES['SF_BAY_CARE_MEDICAL']; //
  let sf_bay_care_mental = INPUT_FIELD_VALUES['SF_BAY_CARE_MENTAL']; // 
  
  let annual_deductible = INPUT_FIELD_VALUES['ANNUAL_DEDUCTIBLE'];
  
  let annual_deductible_employer = INPUT_FIELD_VALUES['ANNUAL_DEDUCTIBLE_EMPLOYER'];
  let oop_minimum = INPUT_FIELD_VALUES['OOP_MINIMUM'];
  let oop_minimum_employer = INPUT_FIELD_VALUES['OOP_EMPLOYER'];
  
  let emb_ppaca = INPUT_FIELD_VALUES['EMB_PPACA'];
  let pc_ppaca = INPUT_FIELD_VALUES['PC_PPACA'];
  let pre_existing_conditions = INPUT_FIELD_VALUES['PRE_EXISTING_CONDITIONS'];
  let prescriptions = INPUT_FIELD_VALUES['PRESCRIPTIONS'];
  let double_care = INPUT_FIELD_VALUES['DOUBLE_CARE'];
  let aggregate_max_benefit = INPUT_FIELD_VALUES['AGGREGATE_MAX_BENEFIT'];

  let j_visa_approval = (j_visa_holder && j_visa_deductible) || (!j_visa_holder);
  let step_1 = (!international) || (has_home_evac_travel_coverage && repatriation_coverage && j_visa_approval && visa_copy &&international_translated);
  
  let annual_deductible_approval = (annual_deductible < 1000) || (annual_deductible_employer);
  let oop_minimum_approavl = (oop_minimum < 9100) || (oop_minimum_employer);

  let step_2 = (academic_year_covered && sf_bay_care_medical && sf_bay_care_mental && annual_deductible_approval && oop_minimum_approavl)

  let step_3 = emb_ppaca && pc_ppaca && !pre_existing_conditions && prescriptions && double_care && aggregate_max_benefit;

  let output = (step_1 && step_2 && step_3)
  return output;
}

function update_coverage_indicator() {
  let covered = check_coverage();
  let coverage_indicator = document.getElementById("coverage-indicator");

if (covered === true) {
  coverage_indicator.innerHTML = "<td colspan=\"2\">Can Waive</td>";
  coverage_indicator.classList.add("covered-true");
  coverage_indicator.classList.remove("covered-false");
} else {
    coverage_indicator.innerHTML = "<td colspan=\"2\">Cannot Waive</td>";
    coverage_indicator.classList.add("covered-false");
    coverage_indicator.classList.remove("covered-true");
  }
}

function check_coverage() {
  // let covers_query = "can_waive()";
  // let common_dataset = definemorefacts([], readdata(localStorage["commonData"])); // use definemorefacts for indexing 
  // let combined_dataset = definemorefacts(common_dataset, get_data_from_input_fields());
  

  // let coverage = compfinds('covered', read(covers_query), combined_dataset, definemorerules([], readdata(waiver_rules)));
  
  return get_data_from_input_fields();
  // let dataset = definemorefacts([], get_data_from_input_fields());
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

evacuation_covered(yes) :-
  evac_covered(yes) &
  repatriation_covered(yes) &
  visa_coverage(yes)  &
  visa_copy(yes) &
  international_translated(yes)

evac_covered(yes) :-
  evac_coverage_workaround(yes)

evac_covered(yes) :-
  evac_coverage(N) &
  leq(50000, N)

repatriation_covered(yes) :-
  repatriation_coverage_workaround(yes)

repatriation_covered(yes) :-
  repatriation_coverage(N) &
  leq(25000, N)

visa_coverage(yes)  :-
  j_visa_holder(yes) &
  j_visa_deductible_valid(yes)

j_visa_deductible_valid(yes) :-
  j_visa_deductible_workaround(yes)

j_visa_deductible_valid(yes) :-
  j_visa_deductible(N) &
  leq(N, 500)

visa_coverage(yes) :-
  j_visa_holder(no)

covered  :-
  international(no) &
  requirements(yes) 

requirements(yes)  :-
  academic_year_covered(yes) &
  sf_bay_care(yes) &
  annual_deductible_covered(yes) &
  oop_minimum_covered(yes) &
  emb_ppaca(yes) &
  pc_ppaca(yes) &
  pre_existing_conditions_coverage(yes) &
  prescriptions(yes) &
  double_care(yes) &
  aggregate_max_benefit(yes)

academic_year_covered(yes) :-
  start_date(SD) &
  end_date(ED) &
  % curr_date(CD) &
  sep_first(SEPF) &
  aug_end(AUGE) &
  evaluate(get_year(SD), SYR) &
  evaluate(get_year(ED), EYR) &
  % evaluate(get_year(CD), CYR) &
  ~leq(EYR, SYR) &
  leq(SD, SEPF) &
  leq(AUGE, ED)

academic_year_covered(yes) :-
  academic_year_workaround(yes)

sf_bay_care(yes)  :- 
  sf_bay_care_medical(yes) &
  sf_bay_care_mental(yes)

annual_deductible_covered(yes)  :-
  annual_deductible(yes)

annual_deductible_covered(yes)  :-
  annual_deductible(no) &
  annual_deductible_employer(yes)

oop_minimum_covered(yes)  :-
  oop_minimum(no) &
  oop_minimum_employer(yes)

oop_minimum_covered(yes)  :-
  oop_minimum(yes)

pre_existing_conditions_coverage(yes) :-
  excluded_conditions(no)
`;