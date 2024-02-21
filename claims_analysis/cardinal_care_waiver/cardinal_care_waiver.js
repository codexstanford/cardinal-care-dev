// Caridinal Care Waiver
const INTERNATIONAL_INPUT_ID = "international_input";
const EVAC_COVERAGE_INPUT_ID="evac_coverage_input";
const EVAC_COVERAGE_WORKAROUND_INPUT_ID = "evac_coverage_workaround_input";
const REPATRIATION_COVERAGE_INPUT_ID ="repatriation_coverage_input";
const REPATRIATION_COVERAGE_WORKAROUND_INPUT_ID = "repatriation_coverage_workaround_input";
const J_VISA_HOLDER_INPUT_ID = "j_visa_holder_input";
const J_VISA_DEDUCTIBLE_INPUT_ID ="j_visa_deductible_input";
const J_VISA_DEDUCTIBLE_WORKAROUND_INPUT_ID = "j_visa_deductible_workaround_input";
const VISA_COPY_INPUT_ID = "visa_copy_input";
const INTERNATIONAL_TRANSLATED_INPUT_ID = "international_translated_input";
const START_DATE_INPUT_ID = "start_date_input";
const END_DATE_INPUT_ID = "end_date_input";
const ACADEMIC_YEAR_WORKAROUND_INPUT_ID = "academic_year_workaround_input";
const SF_BAY_CARE_MEDICAL_INPUT_ID = "sf_bay_care_medical_input" ;
const SF_BAY_CARE_MENTAL_INPUT_ID = "sf_bay_care_mental_input" ;
const ANNUAL_DEDUCTIBLE_INPUT_ID = "annual_deductible_input";
const ANNUAL_DEDUCTIBLE_EMPLOYER_INPUT_ID = "annual_deductible_employer_input";
const OOP_MAX_INPUT_ID = "oop_max_input";
const OOP_EMPLOYER_INPUT_ID = "oop_employer_input";
const PPACA_EMB_INPUT_ID = "ppaca_emb_input";
const PPACA_PC_INPUT_ID = "ppaca_pc_input";
const PRE_EXISTING_CONDITIONS_INPUT_ID = "pre_existing_conditions_input";
const PRESCRIPTIONS_INPUT_ID = "prescriptions_input";
const DOUBLE_CARE_INPUT_ID = "double_care_input";
const AGGREGATE_MAX_BENEFIT_INPUT_ID = "aggregate_max_benefit_input";

const INPUT_FIELD_IDS = [
  INTERNATIONAL_INPUT_ID,
  EVAC_COVERAGE_INPUT_ID,
  EVAC_COVERAGE_WORKAROUND_INPUT_ID,
  REPATRIATION_COVERAGE_INPUT_ID,
  REPATRIATION_COVERAGE_WORKAROUND_INPUT_ID,
  J_VISA_HOLDER_INPUT_ID,
  J_VISA_DEDUCTIBLE_INPUT_ID,
  J_VISA_DEDUCTIBLE_WORKAROUND_INPUT_ID,
  VISA_COPY_INPUT_ID,
  INTERNATIONAL_TRANSLATED_INPUT_ID,
  START_DATE_INPUT_ID,
  END_DATE_INPUT_ID,
  ACADEMIC_YEAR_WORKAROUND_INPUT_ID,
  SF_BAY_CARE_MEDICAL_INPUT_ID,
  SF_BAY_CARE_MENTAL_INPUT_ID,
  ANNUAL_DEDUCTIBLE_INPUT_ID,
  ANNUAL_DEDUCTIBLE_EMPLOYER_INPUT_ID,
  OOP_MAX_INPUT_ID,
  OOP_EMPLOYER_INPUT_ID,
  PPACA_EMB_INPUT_ID,
  PPACA_PC_INPUT_ID,
  PRE_EXISTING_CONDITIONS_INPUT_ID, //
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
      const name = input_field.id.replace(/_input?$/, '').toUpperCase(); // assumed _INPUT_ID is the ending
      let value;
      if (input_field.type === 'checkbox') {
        value = (input_field.checked ? 'yes' : 'no');
      } else if (input_field.type === 'date') {
        let times = [1, 1, 1, 1, 1, 1];
        let in_values = input_field.value;
        if (in_values.length > 0) { // If no date entered, this will be false.
          in_values = in_values.split('-');
          for (let i = 0; i < in_values.length; i++) {
            times[i] = parseInt(in_values[i]);
          }
        }
        value = maketimestamp(times[0], times[1], times[2], times[3], times[4], times[5])
      } else {
        value = input_field.value; 
        console.log("here,", typeof(value));
      }
      INPUT_FIELD_VALUES[name] = value;
      }
    }

  let facts_to_add = "";
  let year = getyear(timestamp())
  let fut_year = (parseInt(year) + 1).toString();
  
  facts_to_add += "international(" + INPUT_FIELD_VALUES['INTERNATIONAL'] + ") ";
  facts_to_add += "evac_coverage(" + INPUT_FIELD_VALUES['EVAC_COVERAGE'] + ") ";
  facts_to_add += "evac_coverage_workaround(" + INPUT_FIELD_VALUES['EVAC_COVERAGE_WORKAROUND'] + ") ";
  facts_to_add += "repatriation_coverage(" + INPUT_FIELD_VALUES['REPATRIATION_COVERAGE'] + ") ";
  facts_to_add += "repatriation_coverage_workaround(" + INPUT_FIELD_VALUES['REPATRIATION_COVERAGE_WORKAROUND'] + ") ";
  facts_to_add += "j_visa_holder(" + INPUT_FIELD_VALUES['J_VISA_HOLDER'] + ") ";
  facts_to_add += "j_visa_deductible(" + INPUT_FIELD_VALUES['J_VISA_DEDUCTIBLE'] + ") ";
  facts_to_add += "j_visa_deductible(" + INPUT_FIELD_VALUES['J_VISA_DEDUCTIBLE_WORKAROUND'] + ") ";
  facts_to_add += "visa_copy(" + INPUT_FIELD_VALUES['VISA_COPY'] + ") ";
  facts_to_add += "international_translated(" + INPUT_FIELD_VALUES['INTERNATIONAL_TRANSLATED'] + ") ";
  
  facts_to_add += "start_date(" + INPUT_FIELD_VALUES['START_DATE'] + ") ";
  facts_to_add += "curr_date(" + timestamp() + ") ";
  facts_to_add += "sep_first(" + maketimestamp(year, 9, 1, 1, 1, 1) + ") ";
  facts_to_add += "aug_end(" + maketimestamp(fut_year, 8, 1, 1, 1, 1) + ") ";
  facts_to_add += "end_date(" + INPUT_FIELD_VALUES['END_DATE'] + ") ";
  facts_to_add += "academic_year_workaround(" + INPUT_FIELD_VALUES['ACADEMIC_YEAR_WORKAROUND'] + ") ";
  
  facts_to_add += "sf_bay_care_medical(" + INPUT_FIELD_VALUES['SF_BAY_CARE_MEDICAL'] + ") ";
  facts_to_add += "sf_bay_care_mental(" + INPUT_FIELD_VALUES['SF_BAY_CARE_MENTAL'] + ") ";
  facts_to_add += "annual_deductible(" + INPUT_FIELD_VALUES['ANNUAL_DEDUCTIBLE'] + ") ";
  facts_to_add += "annual_deductible_employer(" + INPUT_FIELD_VALUES['ANNUAL_DEDUCTIBLE_EMPLOYER'] + ") ";
  facts_to_add += "oop_max(" + INPUT_FIELD_VALUES['OOP_MAX'] + ") ";
  facts_to_add += "oop_max_employer(" + INPUT_FIELD_VALUES['OOP_EMPLOYER'] + ") ";
  facts_to_add += "ppaca_emb(" + INPUT_FIELD_VALUES['PPACA_EMB'] + ") ";
  facts_to_add += "ppaca_pc(" + INPUT_FIELD_VALUES['PPACA_PC'] + ") ";
  facts_to_add += "excluded_conditions(" + INPUT_FIELD_VALUES['PRE_EXISTING_CONDITIONS'] + ") ";
  facts_to_add += "prescriptions(" + INPUT_FIELD_VALUES['PRESCRIPTIONS'] + ") ";
  facts_to_add += "double_care(" + INPUT_FIELD_VALUES['DOUBLE_CARE'] + ") ";
  facts_to_add += "aggregate_max_benefit(" + INPUT_FIELD_VALUES['AGGREGATE_MAX_BENEFIT'] + ") ";
  
  let output = definemorefacts([], readdata(facts_to_add));
  return output;
}

function update_coverage_indicator() {
  let covered = check_coverage();
  let coverage_indicator = document.getElementById("coverage-indicator");
  let international = check_international();
  let international_section = document.getElementById("international_removable");
  let j_visa = check_j_visa();
  let j_visa_section = document.getElementsByClassName("j-visa-removeable");

  //Just do display: none changes for conditional inputs
  if (international) {
    international_section.classList.remove("no-international-additional-qs");
    international_section.classList.add("international-additional-qs");
  } else {
    international_section.classList.remove("international-additional-qs");
    international_section.classList.add("no-international-additional-qs");
  }

  if (j_visa) {
    for (visa_q of j_visa_section) {
      visa_q.classList.remove("non-j-visa-holder");
      visa_q.classList.add("j-visa-holder");
    }
  } else {
    for (visa_q of j_visa_section) {
      visa_q.classList.remove("j-visa-holder");
      visa_q.classList.add("non-j-visa-holder");
    }
  }

  if (!covered) {
    coverage_indicator.innerHTML = "<td colspan=\"2\">Cannot Waive</td>";
    coverage_indicator.classList.add("covered-false");
    coverage_indicator.classList.remove("covered-true");
  } else {
    coverage_indicator.innerHTML = "<td colspan=\"2\">Can Waive</td>";
    coverage_indicator.classList.add("covered-true");
    coverage_indicator.classList.remove("covered-false");
  }

  
}

function check_international() {
  return INPUT_FIELD_VALUES['INTERNATIONAL'] === 'yes';
}

function check_j_visa() {
  return INPUT_FIELD_VALUES['J_VISA_HOLDER'] === 'yes';
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
  oop_max_covered(yes) &
  ppaca_emb(yes) &
  ppaca_pc(yes) &
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
  evaluate(getyear(SD), SYR) &
  evaluate(getyear(ED), EYR) &
  % evaluate(getyear(CD), CYR) &
  ~leq(EYR, SYR) &
  leq(SD, SEPF) &
  leq(AUGE, ED)

academic_year_covered(yes) :-
  academic_year_workaround(yes)

sf_bay_care(yes)  :- 
  sf_bay_care_in_medical(SFINMED) &
  ~leq((SFINMED, -1) &
  sf_bay_care_out_medical(SFOUTMED) &
  ~leq((SFOUTMED, -1) &
  sf_bay_care_in_mental(SFINMNEN) &
  ~leq(SFINMEN, -1) &
  sf_bay_care_out_mental(SFOUTMNEN) &
  ~leq((SFOUTMEN, -1) &

annual_deductible_covered(yes)  :-
  annual_deductible(AD) &
  leq(AD, 1000)

annual_deductible_covered(yes)  :-
  annual_deductible(AD) &
  annual_deductible_employer(yes) &

oop_max_covered(yes)  :-
  oop_max(no) &
  oop_max_employer(yes)

oop_max_covered(yes)  :-
  oop_max(OOP) &
  leq(OOP, 9100)

pre_existing_conditions_coverage(yes) :-
  excluded_conditions(no)

double_care(yes) :-
  emergency_care(yes) %&
  %nonemergency_care(yes) % Confused on best way to form this one. %

emergency_care(yes) :-
  emergency_room_cost(N) &
  gt(N, -1) &
  %emergency_transport_cost(TC) &
  %gt(TC, -1)


aggregate_max_benefit(yes) :-
  aggregate_max_benefit_num(N) &
  geq(N, 2000000)

aggregate_max_benefit(yes) :-
  max_benefit_per_condition_num(N) &
  geq(N, 500000)

aggregate_max_benefit(yes) :-
  aggregate_max_benefit_num(N) &
  same(N, -1)

lt(X,Y):-
  leq(X,Y) &
  ~same(X,Y).

gt(X,Y) :-
  ~leq(X,Y)

gte(X,Y):-
  ~lt(X, Y)
`;