const POLICY_ID_INPUT_ID = "policy_id_input";
const CLAIM_ID_INPUT_ID = "claim_id_input";
const INSUREE_ID_INPUT_ID = "policy_insuree_input";
const INJURED_PERSON_ID_INPUT_ID = "claim_injured_person_id_input";

const INPUT_FIELD_IDS_TO_FACT_TEMPLATES = {
  "policy_startdate_input" : "policy.startdate($POLICY$, $VALUE$)",
  "policy_enddate_input" : "policy.enddate($POLICY$, $VALUE$)",
  "policy_territory_input" : "policy.policy_territory($POLICY$, $VALUE$)",
  "policy_hot_works_exclusion_endorsement_input" : "policy.hot_work_exclusion_endorsement($POLICY$, $VALUE$)",
  "policy_hot_works_precaution_amendment_endorsement_input" : "policy.hot_work_precautions_amendment_endorsement($POLICY$, $VALUE$)",
  "claim_startdate_input": "claim.startdate($CLAIM$, $VALUE$)",
  "claim_enddate_input": "claim.enddate($CLAIM$, $VALUE$)",
  "claim_cleanup_costs_input": "claim.for_clean_up_costs($CLAIM$, $VALUE$)",
  "claim_damages_purpose_input": "claim.damages_purpose($CLAIM$, $VALUE$)",
  "claim_bodily_injury_damages_input": "claim.damages_in_respect_of($CLAIM$, bodily_injury, $VALUE$)",
  "claim_personal_injury_damages_input": "claim.damages_in_respect_of($CLAIM$, personal_injury, $VALUE$)",
  "claim_property_damages_input": "claim.damages_in_respect_of($CLAIM$, property_damage, $VALUE$)",
  "claim_nuisance_damages_input": "claim.damages_in_respect_of($CLAIM$, nuisance, $VALUE$)",
  "claim_trespass_damages_input": "claim.damages_in_respect_of($CLAIM$, trespass, $VALUE$)",
  "claim_other_damages_text_input": "claim.damages_in_respect_of($CLAIM$, $VALUE$, yes)",
  "claim_damages_event_type_input": "event.type($DAMAGE_CAUSE_EVENT$, $VALUE$)",
  "claim_pollutant_location_type_input": "location.general_type($POLLUTANT_LOCATION$, $VALUE$)",
  "claim_pollutant_incident_was_sudden_input": "claim.cause_of_damages_is_sudden($CLAIM$, $DAMAGE_CAUSE_EVENT$, $VALUE$)",
  "claim_pollutant_incident_damages_happened_at_time_of_sudden_incident_input": "claim.all_property_damage_nuisance_or_trespass_considered_as_having_occurred_at_the_time_of_sudden_incident($CLAIM$, $DAMAGE_CAUSE_EVENT$, $VALUE$)",
  "claim_sudden_incident_date_input": "event.date($DAMAGE_CAUSE_EVENT$, $VALUE$)",
  "claim_sudden_incident_time_input": "event.time($DAMAGE_CAUSE_EVENT$, $VALUE$)",
  "claim_knowingly_deviated_from_regulation_input": "claim.insuree_knowingly_deviated_from_regulatory_notice_order_or_ruling($CLAIM$, $VALUE$)",
  "claim_omitted_to_maintain_input": "claim.insuree_knowingly_omitted_to_inspect_plant_or_machinery_for_which_insuree_is_responsible($CLAIM$, $VALUE$)",
  "claim_omitted_to_inspect_input": "claim.insuree_knowingly_omitted_to_maintain_plant_or_machinery_for_which_insuree_is_responsible($CLAIM$, $VALUE$)",
  "claim_omitted_to_repair_input": "claim.insuree_knowingly_omitted_to_perform_necessary_repairs_to_plant_or_machinery_for_which_insuree_is_responsible($CLAIM$, $VALUE$)",
  "claim_deliberate_act_input": "claim.damage_caused_by_deliberate_act($CLAIM$, $ACT$, $VALUE$)", // NOTE: These "acts" are all the same right now. Ultimately, this shouldn't be the case.
  "claim_deliberate_error_input": "claim.damage_caused_by_deliberate_error($CLAIM$, $ACT$, $VALUE$)",
  "claim_deliberate_omission_input": "claim.damage_caused_by_deliberate_omission($CLAIM$, $ACT$, $VALUE$)",
  "claim_deliberate_act_results_intended_input": "claim.insuree_intended_results_of_act_error_or_omission($CLAIM$, $ACT$, $VALUE$)",
  "claim_deliberate_act_results_expected_input": "claim.insuree_expected_results_of_act_error_or_omission($CLAIM$, $ACT$, $VALUE$)",
  "claim_deliberate_act_results_reasonably_foreseeable_input": "claim.results_of_act_error_or_omission_reasonably_foreseeable_by_insuree($CLAIM$, $ACT$, $VALUE$)",
  "claim_deliberate_act_person_id_input": "claim.person_who_made_deliberate_act_error_or_omission($CLAIM$, $ACT$, $VALUE$)",
  "claim_injury_employment_input": "claim.person_injury_sustained_in_course_of_and_arose_out_of_employment_with_insuree($CLAIM$, $INJURED_PERSON$, $VALUE$)",
  "claim_hot_work_location_input": "claim.location_of_hot_work($CLAIM$, $VALUE$)",
  "claim_work_area_cleared_of_combustibles_input": "claim.work_area_cleared_of_combustibles($CLAIM$, $VALUE$)",
  "claim_num_fire_extinguishers_input": "claim.num_fire_extinguishers_suitable_for_work_or_task_adjacent_to_work_or_task_which_are_ready_for_immediate_use($CLAIM$, $VALUE$)",
  "claim_heat_producing_equipment_out_of_view_input": "claim.heat_producing_equipment_left_out_of_view_of_operator_or_firewatcher_while_lighted_powered_or_hot($CLAIM$, $VALUE$)",
  "claim_combustible_floors_protection_input": "claim.combustible_floors_within_6_meters_of_work_area_where_welding_cutting_or_grinding_equipment_is_used_are_protected_by_noncombustible_material($CLAIM$, $VALUE$)",
  "claim_combustible_property_protection_input": "claim.immovable_combustible_property_within_6_meters_of_work_area_where_welding_cutting_or_grinding_equipment_is_used_is_protected_by_noncombustible_material($CLAIM$, $VALUE$)",
  "claim_direct_ignition_danger_input": "claim.danger_of_ignition_directly_through_partitions_or_walls($CLAIM$, $VALUE$)",
  "claim_direct_ignition_inspected_area_input": "claim.area_on_other_side_of_partitions_or_walls_with_direct_danger_of_ignition_inspected($CLAIM$, $VALUE$)",
  "claim_direct_ignition_removed_combustible_materials_input": "claim.area_on_other_side_of_partitions_or_walls_with_direct_danger_of_ignition_combustible_materials_removed($CLAIM$, $VALUE$)",
  "claim_conduction_ignition_danger_input": "claim.danger_of_ignition_by_conduction_of_heat_through_partitions_or_walls($CLAIM$, $VALUE$)",
  "claim_conduction_ignition_inspected_area_input": "claim.area_on_other_side_of_partitions_or_walls_with_danger_of_ignition_through_conduction_inspected($CLAIM$, $VALUE$)",
  "claim_conduction_ignition_removed_combustible_materials_input": "claim.area_on_other_side_of_partitions_or_walls_with_danger_of_ignition_through_conduction_combustible_materials_removed($CLAIM$, $VALUE$)",
  "claim_safety_check_minutes_input": "work_period.num_minutes_thorough_safety_check_for_signs_of_fire_or_combustion_around_above_or_below_the_work_area_made_at_regular_intervals_after_completion_of_work_period($PERIOD$, $VALUE$)",
  "claim_insuree_operates_own_hot_work_permit_system_input": "claim.insuree_operates_own_hot_work_permit_system_detailing_methods_and_precautions_to_be_followed_prior_to_during_and_subsequent_to_hot_work($CLAIM$, $VALUE$)",
  "claim_insuree_operated_own_hot_work_permit_system_copy_sent_input": "claim.copy_of_insurees_own_hot_work_permit_system_provided_to_insuring_company_in_writing($CLAIM$, $VALUE$)",
  "claim_insuree_operated_own_hot_work_permit_system_accepted_in_writing_input": "claim.insurees_own_hot_work_permit_system_provided_to_insuring_company_accepted_in_writing($CLAIM$, $VALUE$)",
  "claim_took_reasonable_steps_to_obtain_subcontractor_ppl_info_boolean_input": "claim.insuree_took_reasonable_steps_to_obtain_information_from_subcontractor_prior_to_starting_work_that_they_have_ppl_insurance_in_force_during_their_period_of_involvement($CLAIM$, $SUBCONTRACTOR$, $VALUE$)"
};

const INPUT_FIELD_IDS = [POLICY_ID_INPUT_ID, CLAIM_ID_INPUT_ID, INSUREE_ID_INPUT_ID, INJURED_PERSON_ID_INPUT_ID, ...Object.keys(INPUT_FIELD_IDS_TO_FACT_TEMPLATES)];


window.onload = function() {
  load_common_data();

  build_claims_processing_table();

  init_coverage_indicator();

  add_event_listeners();
};

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

function get_data_from_input_fields() {
  // Need a policy, claim, insuree, and damage cause event ID
  const POLICY_ID_VALUE = document.getElementById(POLICY_ID_INPUT_ID).value;
  const CLAIM_ID_VALUE = document.getElementById(CLAIM_ID_INPUT_ID).value;
  const INSUREE_ID_VALUE = document.getElementById(INSUREE_ID_INPUT_ID).value;
  const INJURED_PERSON_ID_VALUE = document.getElementById(INJURED_PERSON_ID_INPUT_ID).value;
  const DAMAGE_CAUSE_ID_VALUE = "damage_cause_event1";
  const POLLUTANT_LOCATION_ID_VALUE = document.getElementById("policy_territory_input").value;
  const ACT_ID_VALUE = "act_1";
  const PERIOD_OF_WORK_ID_VALUE = "period_of_work_1";
  const SUBCONTRACTOR_ID_VALUE = "subcontractor1";
  if (
    POLICY_ID_VALUE === '' || 
    CLAIM_ID_VALUE === '' || 
    INSUREE_ID_VALUE === '' || 
    DAMAGE_CAUSE_ID_VALUE === '' ||
    POLLUTANT_LOCATION_ID_VALUE === ''||
    ACT_ID_VALUE === '' ||
    PERIOD_OF_WORK_ID_VALUE === '' ||
    SUBCONTRACTOR_ID_VALUE === ''
    ) {
    return [];
  }
  
  let facts_to_add = "claim.policy(" + CLAIM_ID_VALUE + ", " + POLICY_ID_VALUE + ") ";
  facts_to_add += "policy.type(" + POLICY_ID_VALUE + ", axa_ppl_hot_works) ";
  facts_to_add += "policy.insuree(" + POLICY_ID_VALUE + ", " + INSUREE_ID_VALUE + ") ";
  facts_to_add += "claim.person_injured(" + CLAIM_ID_VALUE + ", " + INJURED_PERSON_ID_VALUE + ") ";
  facts_to_add += "claim.cause_of_damages(" + CLAIM_ID_VALUE + ", " + DAMAGE_CAUSE_ID_VALUE + ") ";
  facts_to_add += "event.pollutants_escape_or_release_location(" + DAMAGE_CAUSE_ID_VALUE + ", " + POLLUTANT_LOCATION_ID_VALUE + ") ";
  facts_to_add += "claim.period_of_work(" + CLAIM_ID_VALUE + ", " + PERIOD_OF_WORK_ID_VALUE + ") ";
  facts_to_add += "claim.subcontractor_appointed_to_carry_out_services_at_premises_or_site_of_customer(" + CLAIM_ID_VALUE + ", " + SUBCONTRACTOR_ID_VALUE + ") ";


  // Get input data and fill the corresponding template
  for (const [INPUT_FIELD_ID, FACT_TEMPLATE] of Object.entries(INPUT_FIELD_IDS_TO_FACT_TEMPLATES)) {
    let inputWidget = document.getElementById(INPUT_FIELD_ID);

    if (inputWidget.classList.contains("ignore-input-field")) {
      continue;
    }

    // Get the input type
    let inputType = null;
    if (inputWidget.tagName === "select-one") {
      inputType == "select";
    }
    else {
      inputType = inputWidget.type;
    }

    // Set the value based on the type
    let inputValue = null;
    if (inputType === "checkbox") {
      inputValue = inputWidget.checked ? "yes" : "no";
    }
    else if (inputType === "date") {
      inputValue = inputWidget.value.replace(/-/g, '_');
      
      let splitDate = inputValue.split("_");

      let timeStamp = maketimestamp(splitDate[0], splitDate[1], splitDate[2], "00", "00", "00");

      let dateFact = "datetotimestamp(" + inputValue + ", " + timeStamp + ") \n";

      facts_to_add += dateFact;
    }
    else if (inputType === "time") {
      inputValue = inputWidget.value.replace(/:/g, '_') + "_00";
    }
    else {
      inputValue = inputWidget.value;
    }

    if (inputValue === "") {
      continue;
    }

    // Fill the template
    let filledTemplate = FACT_TEMPLATE;
    filledTemplate = filledTemplate.replace(/\$POLICY\$/g, POLICY_ID_VALUE);
    filledTemplate = filledTemplate.replace(/\$CLAIM\$/g, CLAIM_ID_VALUE);
    filledTemplate = filledTemplate.replace(/\$INSUREE\$/g, INSUREE_ID_VALUE);
    filledTemplate = filledTemplate.replace(/\$INJURED_PERSON\$/g, INJURED_PERSON_ID_VALUE);
    filledTemplate = filledTemplate.replace(/\$DAMAGE_CAUSE_EVENT\$/g, DAMAGE_CAUSE_ID_VALUE);
    filledTemplate = filledTemplate.replace(/\$POLLUTANT_LOCATION\$/g, POLLUTANT_LOCATION_ID_VALUE);
    filledTemplate = filledTemplate.replace(/\$ACT\$/g, ACT_ID_VALUE);
    filledTemplate = filledTemplate.replace(/\$PERIOD\$/g, PERIOD_OF_WORK_ID_VALUE);
    filledTemplate = filledTemplate.replace(/\$SUBCONTRACTOR\$/g, SUBCONTRACTOR_ID_VALUE);
    filledTemplate = filledTemplate.replace(/\$VALUE\$/g, inputValue);

    //console.log(filledTemplate);

    facts_to_add += filledTemplate + " ";
  }

  // Compute datetimetotimestamps

  facts_to_add += compute_date_time_to_time_stamps();

  
  let output = definemorefacts([], readdata(facts_to_add));

  // Calling grindem on an epilog.js dataset or ruleset makes it palatable to read as a human
  //console.log(grindem(output));

  return output;
}

function compute_date_time_to_time_stamps() {
  let datetimetotimestamp_facts = "";

  let eventDateWidget = document.getElementById("claim_sudden_incident_date_input");
  let eventTimeWidget = document.getElementById("claim_sudden_incident_time_input");

  let formattedDate = eventDateWidget.value.replace(/-/g, '_');
  let formattedTime = eventTimeWidget.value.replace(/:/g, '_') + "_00";

  let splitDate = formattedDate.split("_");
  let splitTime = formattedTime.split("_");

  let timeStamp = maketimestamp(splitDate[0], splitDate[1], splitDate[2], splitTime[0], splitTime[1], splitTime[2]);

  datetimetotimestamp_facts += "datetimetotimestamp(" + formattedDate + ", " + formattedTime + ", " + timeStamp + ") "
  
  return datetimetotimestamp_facts;
}

/*********************** BUILDING THE CLAIMS FORM ***********************/
function build_claim_info_section() {
  let rows = [];
  
  rows.push(newHeadingRow("Claim Information", "claim-info-heading", ["claims-processing-section-heading"]));
  
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "text", "claim1", "Claim ID: ", "claim_id_input")]));
  
  rows.push(newClaimsFormInputRow([
    newClaimsFormInputCell(1, "date", "2024-02-01", "Start Date of Claim: ", "claim_startdate_input"),
    newClaimsFormInputCell(1, "date", "2024-02-02", "End Date of Claim: ", "claim_enddate_input")
  ]));
  
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "Is the claim for cleanup costs?", "claim_cleanup_costs_input")]));
  
  rows.push(newClaimsFormInputRow([newClaimsFormSelectCell(2, "other", "What will the damages pay for? ", "claim_damages_purpose_input", 
  [
    ["other", "Other"],
    ["none", ""],
    ["rectify_defective_or_unsuitable_products_or_services", "Rectify defective or unsuitable products or services"],
    ["remedy_defective_or_unsuitable_products_or_services", "Remedy defective or unsuitable products or services"],
    ["repair_defective_or_unsuitable_products_or_services", "Repair defective or unsuitable products or services"],
    ["replace_defective_or_unsuitable_products_or_services", "Replace defective or unsuitable products or services"],
    ["reapply_defective_or_unsuitable_products_or_services", "Reapply defective or unsuitable products or services"],
    ["modify_defective_or_unsuitable_products_or_services", "Modify defective or unsuitable products or services"],
    ["investigate_defective_or_unsuitable_products_or_services", "Investigate defective or unsuitable products or services"],
    ["access_defective_or_unsuitable_products_or_services", "Access defective or unsuitable products or services"],
    ["remove_defective_or_unsuitable_products_or_services", "Remove defective or unsuitable products or services"],
    ["refund", "Refund"]
  ]
  )]));

  return rows;
}

function build_damages_info_section() {
  let rows = [];
  
  rows.push(newHeadingRow("Damages Information", "damages-info-subheading", ["claims-processing-section-subheading"]));
  
  // Types of Damages subsubheading
  rows.push(newHeadingRow("Types of Damages", "types-of-damages-info-subsubheading", ["claims-processing-section-subsubheading"]));
  
  rows.push(newClaimsFormInputRow([
    newClaimsFormInputCell(1, "checkbox", false, "Bodily Injury: ", "claim_bodily_injury_damages_input"),
    newClaimsFormInputCell(1, "checkbox", false, "Personal Injury: ", "claim_personal_injury_damages_input")
  ]));

  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "Property Damage: ", "claim_property_damages_input")]));

  rows.push(newClaimsFormInputRow([
    newClaimsFormInputCell(1, "checkbox", true, "Nuisance: ", "claim_nuisance_damages_input"),
    newClaimsFormInputCell(1, "checkbox", false, "Trespass: ", "claim_trespass_damages_input")
  ]));

  let customElement = document.createElement("template");
  customElement.innerHTML = `
  <tr class="info-row claim-info-row">
    <td colspan="2"><input type="checkbox" id="claim_other_damages_checkbox_input">Other type of damages: <input disabled type="text" id="claim_other_damages_text_input" value=""></td></td>
  </tr>`;
  rows.push(customElement.content.children[0]);
  
  // Cause of Damages subsubheading
  rows.push(newHeadingRow("Cause of Damages Information", "cause-of-damages-info-subsubheading", ["claims-processing-section-subsubheading"]));

  rows.push(newClaimsFormInputRow([newClaimsFormSelectCell(2, "", "What type of event caused the damages? ", "claim_damages_event_type_input", 
  [
    ["escape_of_pollutants", "Escape of pollutants"],
    ["other", "Other"],
    ["none", ""],
    ["release_of_pollutants", "Release of pollutants"]
  ]
  )]));

  // Pollutant Damages subsubheading
  rows.push(newHeadingRow("Pollutant Damages Information", "pollutant-damages-info-subsubheading", ["claims-processing-section-subsubheading"]));

  rows.push(newClaimsFormInputRow([newClaimsFormSelectCell(2, "", "Where did the escape or release of pollutants occur? ", "claim_pollutant_location_type_input", 
  [
    ["atmosphere", "Into the atmosphere"],
    ["none", ""],
    ["land", "Onto land"],
    ["water", "Onto water"],
    ["building_or_structure", "Onto building(s) or any structure(s)"],
    ["other", "Other"]
  ]
  )]));

  rows.push(newClaimsFormInputRow([
    newClaimsFormInputCell(1, "checkbox", true, "The incident in which the escape or release of pollutants occurred was sudden: ", "claim_pollutant_incident_was_sudden_input"),
    newClaimsFormInputCell(1, "checkbox", true, "All damages are considered as happening at the time of the sudden incident: ", "claim_pollutant_incident_damages_happened_at_time_of_sudden_incident_input")
  ]));

  rows.push(newClaimsFormInputRow([
    newClaimsFormInputCell(1, "date", "2024-02-01", "Date of Sudden Incident:  ", "claim_sudden_incident_date_input"),
    newClaimsFormInputCell(1, "time", "13:30", "Time of Sudden Incident: ", "claim_sudden_incident_time_input")
  ]));

  return rows;
  }

function build_behavior_info_section() {
  let rows = [];
  
  rows.push(newHeadingRow("Behavior Information", "behavior-info-subheading", ["claims-processing-section-subheading"]));
  
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "Did the insuree knowingly deviate from a regulatory notice, order, or ruling?", "claim_knowingly_deviated_from_regulation_input")]));
  
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "Did the insuree knowingly omit to maintain plant or machinery for which they are responsible?", "claim_omitted_to_maintain_input")]));
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "...to inspect?", "claim_omitted_to_inspect_input")]));
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "...to repair?", "claim_omitted_to_repair_input")]));
  
  return rows;
}

function build_deliberate_act_info_section() {
  let rows = [];
  
  rows.push(newHeadingRow("Deliberate Act, Error, or Omission Information", "deliberate-act-info-subsubheading", ["claims-processing-section-subsubheading"]));

  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "Was damage caused by a deliberate act?", "claim_deliberate_act_input")]));
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "...a deliberate error?", "claim_deliberate_error_input")]));
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "...a deliberate omission?", "claim_deliberate_omission_input")]));
 
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "Were the results of the deliberate act, error, or omission intended by the insuree?", "claim_deliberate_act_results_intended_input")]));
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "...expected by the insuree?", "claim_deliberate_act_results_expected_input")]));
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "...could they have been reasonably foreseen by the insuree?", "claim_deliberate_act_results_reasonably_foreseeable_input")]));
  
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "text", "", "Person who made the deliberate act, error, or omission:", "claim_deliberate_act_person_id_input")]));

  return rows;
}

function build_injury_info_section() {
  let rows = [];
  
  rows.push(newHeadingRow("Injury Information", "injury-info-subheading", ["claims-processing-section-subheading"]));

  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "text", "injured_person1", "Person injured: ", "claim_injured_person_id_input")]));
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "Was the injury sustained in the course of or arose out of employment with the insuree?", "claim_injury_employment_input")]));

  return rows;
}

function build_hot_work_exclusion_endorsement_section() {
  let rows = [];
  
  rows.push(newHeadingRow("Hot Work Exclusion Endorsement Information", "hot-work-exclusion-endorsement-info-subheading", ["claims-processing-section-subheading"]));

  rows.push(newClaimsFormInputRow([newClaimsFormSelectCell(2, "", "Location where the hot work took place [Placeholder]: ", "claim_hot_work_location_input", 
  [
    ["california", "California"],
    ["none", ""],
    ["washington", "Washington"]
  ]
  )]));
  
  return rows;
}

function build_precautions_taken_info_section() {
  let rows = [];

  rows.push(newHeadingRow("Precautions Taken Information", "precautions-taken-subheading", ["claims-processing-section-subheading"]));

  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", true, "Was the work area cleared of combustibles?", "claim_work_area_cleared_of_combustibles_input")]));
  
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "number", 1, "How many fire extinguishers suitable for the hot work/task were kept adjacent to the work/task and ready for immediate use?", "claim_num_fire_extinguishers_input")]));

  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "Was heat-producing equipment left out of view of its operator or firewatcher while ignited, powered, or hot?", "claim_heat_producing_equipment_out_of_view_input")]));

  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", true, "Are combustible floors protected by non-combustible materials within 6 meters from and beneath each work area where welding, cutting, or grinding equipment is being used?", "claim_combustible_floors_protection_input")]));

  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", true, "Is combustible immovable property protected by non-combustible materials within 6 meters from and beneath the work area where welding, cutting, or grinding equipment is being used?", "claim_combustible_property_protection_input")]));

  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "Is there danger of ignition directly through partitions or walls?", "claim_direct_ignition_danger_input")]));

  rows.push(newClaimsFormInputRow([
    newClaimsFormInputCell(1, "checkbox", false, "Was the area on the other side of partitions or walls inspected?", "claim_direct_ignition_inspected_area_input"),
    newClaimsFormInputCell(1, "checkbox", false, "Were combustible materials removed from the area on the other side of partitions or walls?", "claim_direct_ignition_removed_combustible_materials_input")
  ]));

  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", false, "Is there danger of ignition through partitions or walls via conduction of heat?", "claim_conduction_ignition_danger_input")]));

  rows.push(newClaimsFormInputRow([
    newClaimsFormInputCell(1, "checkbox", false, "Was the area on the other side of partitions or walls inspected?", "claim_conduction_ignition_inspected_area_input"),
    newClaimsFormInputCell(1, "checkbox", false, "Were combustible materials removed from the area on the other side of partitions or walls?", "claim_conduction_ignition_removed_combustible_materials_input")
  ]));

  rows.push(newClaimsFormInputRow([
    newClaimsFormInputCell(1, "text", "autofilled_id", "Periods of work:", "claim_periods_of_work_input", { disabled: true }),
    newClaimsFormInputCell(1, "number", 31, "For each, number of minutes after its completion that a thorough safety check was conducted at regular intervals above, around, and below for signs of fire or combustion:", "claim_safety_check_minutes_input", { min: 0 })
  ]));

  return rows;
}

function build_hot_works_precautions_amendment_info_section() {
  let rows = [];

  rows.push(newHeadingRow("Hot Work Precautions Amendment Information", "hot-work-precautions-amendment-info-subheading", ["claims-processing-section-subheading"]));
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", true, "Does the insuree operate their own hot work permit system detailing the methods and precautions to be followed prior to, during, and subsequent to hot work?", "claim_insuree_operates_own_hot_work_permit_system_input")]));

  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", true, "Has a copy of it been provided to the insuring company in writing?", "claim_insuree_operated_own_hot_work_permit_system_copy_sent_input")]));

  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", true, "Has the copy been accepted by the insuring company in writing?", "claim_insuree_operated_own_hot_work_permit_system_accepted_in_writing_input")]));

  return rows;

}

function build_subcontractor_info_section() {
  let rows = [];

  rows.push(newHeadingRow("Subcontractor Information", "subcontractor-info-subheading", ["claims-processing-section-subheading"]));

  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "text", "", "Subcontractor ID: ", "claim_subcontractor_id_input")]));
  rows.push(newClaimsFormInputRow([newClaimsFormInputCell(2, "checkbox", true, "Did the insuree take reasonable steps to obtain information from the subcontractor, prior to starting work, that the subcontractor has Public liability insurance in force throughout the period of involvement? ", "claim_took_reasonable_steps_to_obtain_subcontractor_ppl_info_boolean_input")]));

  return rows;
}

function build_claims_processing_table() {
  let rowList = [...[],
  
  ...build_claim_info_section(),
  ...build_damages_info_section(),
  ...build_behavior_info_section(),
  ...build_deliberate_act_info_section(),
  ...build_injury_info_section(),
  ...build_hot_work_exclusion_endorsement_section(),
  ...build_precautions_taken_info_section(),
  ...build_hot_works_precautions_amendment_info_section(),
  ...build_subcontractor_info_section(),
  ...[]];

  addRowsToTable("claims-processing-table", rowList);

  let inputAndSelectElements = document.querySelectorAll('input, select');


  /*let outputStr = "";

  // Loop through the elements and print their IDs
  inputAndSelectElements.forEach(function(element) {
    outputStr += "\"" + element.id + "\": \"\",\n";
  });

  //console.log(outputStr);
  */
}

// Your policy rules go here
let policy_rules = `
% - Assumption: only covered if *all* damages are covered

% - Limit of liability is in the schedule
% - The excess is in the schedule

%  1 Complete (except for checking that claim and accidents occur during the policy period)
%  2 Complete (implicit)
%  3 Complete
%  4 Complete
%  5 Complete
%  6 Complete
%  7 Specific to damages amount, so ignored for now
%  8 Complete
%  9 Complete
% 10 Complete


covers(P,C) :- 
	policy.type(P, axa_ppl_hot_works) &
	policy_in_effect(P,C) &
	only_has_covered_damages_types(C) &
  precaution_condition_met(C) &
  subcontractors_condition_met(C) &
	~exclusion_applies(C)

policy_in_effect(P,C) :-
  policy.startdate(P, PSD) &
  policy.enddate(P, PED) &
  claim.startdate(C, CSD) &
  claim.enddate(C, CED) &
  datetotimestamp(PSD, PSS) &
  datetotimestamp(PED, PES) &
  datetotimestamp(CSD, CSS) &
  datetotimestamp(CED, CES) &
  leq(PSS, CSS) &
  leq(CES, PES)

claim.insuree(C, I) :-
  claim.policy(C, P) &
  policy.insuree(P, I)

claim.premises_of_insuree(C, L) :-
  claim.policy(C, P) &
  policy.policy_territory(P, L)

% I: Insuring (operative) clause
only_has_covered_damages_types(C) :-
	has_covered_type_of_damages(C) &
	~has_uncovered_type_of_damages(C)

has_covered_type_of_damages(C) :-
	claim.damages_in_respect_of(C, T, yes) &
  member(T, [bodily_injury, personal_injury, property_damage, nuisance, trespass])

has_uncovered_type_of_damages(C) :-
	claim.damages_in_respect_of(C, T, yes) &
	~member(T, [bodily_injury, personal_injury, property_damage, nuisance, trespass])

% Non-sudden release of pollutants exclusion
  % Excluded if it is in respect of property damage, nuisance, or trespass, 
  % and it was caused by escape or release of pollutants into a listed type of location,
  % and it didn't occur during a sudden incident during which all damages are deemed to have occurred
exclusion_applies(C) :-
  claim.damages_in_respect_of(C, T, yes) &
	member(T, [property_damage, nuisance, trespass]) &
	claim.cause_of_damages(C, Cause) &
  event.type(Cause, CauseType) &
	member(CauseType, [escape_of_pollutants, release_of_pollutants]) &
	event.pollutants_escape_or_release_location(Cause, Location) &
  location.general_type(Location, LocationType) &
	member(LocationType, [atmosphere, land, water, building_or_structure]) &
  ~covered_pollutants_damages(C)

covered_pollutants_damages(C) :-
	claim.damages_in_respect_of(C, T, yes) &
	member(T, [property_damage, nuisance, trespass]) &
	claim.cause_of_damages(C, Cause) &
  event.type(Cause, CauseType) &
	member(CauseType, [escape_of_pollutants, release_of_pollutants]) &
	event.pollutants_escape_or_release_location(Cause, Location) &
  location.general_type(Location, LocationType) &
	member(LocationType, [atmosphere, land, water, building_or_structure]) &
  claim.cause_of_damages_is_sudden(C, Cause, yes) &
  claim.all_property_damage_nuisance_or_trespass_considered_as_having_occurred_at_the_time_of_sudden_incident(C, Cause, yes) &
  claim.policy(C, P) &
  policy.policy_territory(P, Location) & % sudden incident which happens at a specific time and place during the period of insurance within the policy territories
  policy.startdate(P, PSD) &
  policy.enddate(P, PED) &
  event.date(Cause, CD) &
  event.time(Cause, CT) &
  datetotimestamp(PSD, PSS) & 
  datetotimestamp(PED, PES) & 
  datetimetotimestamp(CD, CT, CS) &
  leq(PSS, CS) &
  leq(CS, PES)

% III: Deliberate act exclusion
% III.1
deliberate_act_caused_damages(C, A) :-
	claim.damage_caused_by_deliberate_act(C, A, yes)
deliberate_act_caused_damages(C, A) :-
	claim.damage_caused_by_deliberate_error(C, A, yes)
deliberate_act_caused_damages(C, A) :-
	claim.damage_caused_by_deliberate_omission(C, A, yes)

insuree_knew_what_deliberate_act_would_do(C, A) :-
  claim.insuree_intended_results_of_act_error_or_omission(C, A, yes)

insuree_knew_what_deliberate_act_would_do(C, A) :-
  claim.insuree_expected_results_of_act_error_or_omission(C, A, yes)

insuree_knew_what_deliberate_act_would_do(C, A) :-
  claim.results_of_act_error_or_omission_reasonably_foreseeable_by_insuree(C, A, yes)

% III.1a
exclusion_applies(C) :-
	deliberate_act_caused_damages(C, A) &
	insuree_knew_what_deliberate_act_would_do(C, A)

% III.1b
exclusion_applies(C) :-
	deliberate_act_caused_damages(C, A) &
	claim.insuree(C, I) &
	claim.person_who_made_deliberate_act_error_or_omission(C, A, Person2) &
	distinct(I, Person2)

%%%%%%%%%%%%%%%%%%%%%% From here %%%%%%%%%%%%%%%%%%%%%%
% III.2a 
exclusion_applies(C) :-
	claim.for_clean_up_costs(C, yes) &
	claim.insuree_knowingly_deviated_from_regulatory_notice_order_or_ruling(C, yes)

% III.2b
exclusion_applies(C) :-
	claim.for_clean_up_costs(C, yes) &
	knowingly_omitted_necessary_preventative_restorative_care_for_plant_or_machinery(C)

knowingly_omitted_necessary_preventative_restorative_care_for_plant_or_machinery(C) :-
	claim.insuree_knowingly_omitted_to_inspect_plant_or_machinery_for_which_insuree_is_responsible(C, yes)

knowingly_omitted_necessary_preventative_restorative_care_for_plant_or_machinery(C) :-
	claim.insuree_knowingly_omitted_to_maintain_plant_or_machinery_for_which_insuree_is_responsible(C, yes)

knowingly_omitted_necessary_preventative_restorative_care_for_plant_or_machinery(C) :- 
	claim.insuree_knowingly_omitted_to_perform_necessary_repairs_to_plant_or_machinery_for_which_insuree_is_responsible(C, yes)

% IV: Employee injuree exclusion
exclusion_applies(C) :-
	claim.damages_in_respect_of(C, bodily_injury, yes) &
	claim.person_injured(C, Person) &
	claim.person_injury_sustained_in_course_of_and_arose_out_of_employment_with_insuree(C, Person, yes) 

% V: Rectification of defects exclusion
exclusion_applies(C) :-
	claim.damages_purpose(C, P) &
	member(P, [
		rectify_defective_or_unsuitable_products_or_services,
		remedy_defective_or_unsuitable_products_or_services,
		repair_defective_or_unsuitable_products_or_services,
		replace_defective_or_unsuitable_products_or_services,
		reapply_defective_or_unsuitable_products_or_services,
		modify_defective_or_unsuitable_products_or_services,
		investigate_defective_or_unsuitable_products_or_services,
		access_defective_or_unsuitable_products_or_services,
		remove_defective_or_unsuitable_products_or_services,
		refund
		])

% VI: Hot work exclusion endorsement
exclusion_applies(C) :-
  claim.policy(C, P) &
  policy.hot_work_exclusion_endorsement(P, yes) &
	claim.location_of_hot_work(C, L) &
	~claim.premises_of_insuree(C, L)

% VIII: Hot work precaution condition
precaution_condition_met(C) :-
    claim.work_area_cleared_of_combustibles(C, yes) & % 1
    immovable_combustible_property_protected(C) &
    inspection_and_removal_of_danger_of_ignition_through_partitions_or_walls(C) &
    claim.num_fire_extinguishers_suitable_for_work_or_task_adjacent_to_work_or_task_which_are_ready_for_immediate_use(C, NumExtinguishers) & % 4
    leq(1, NumExtinguishers) &
    claim.heat_producing_equipment_left_out_of_view_of_operator_or_firewatcher_while_lighted_powered_or_hot(C, no) & % 5
    thorough_safety_check_at_regular_intervals(C)

% VIII.2 
    % Note: not faithfully translated, as it is under-specified
immovable_combustible_property_protected(C) :-
    claim.combustible_floors_within_6_meters_of_work_area_where_welding_cutting_or_grinding_equipment_is_used_are_protected_by_noncombustible_material(C, yes) &
    claim.immovable_combustible_property_within_6_meters_of_work_area_where_welding_cutting_or_grinding_equipment_is_used_is_protected_by_noncombustible_material(C, yes)

% VIII.3
inspection_and_removal_of_danger_of_ignition_through_partitions_or_walls(C) :-
    inspection_and_removal_of_direct_danger_of_ignition(C) &
    inspection_and_removal_of_indirect_danger_of_ignition(C)

inspection_and_removal_of_direct_danger_of_ignition(C) :-
    claim.danger_of_ignition_directly_through_partitions_or_walls(C, no)

inspection_and_removal_of_direct_danger_of_ignition(C) :-
    claim.danger_of_ignition_directly_through_partitions_or_walls(C, yes) &
    claim.area_on_other_side_of_partitions_or_walls_with_direct_danger_of_ignition_inspected(C, yes) &
    claim.area_on_other_side_of_partitions_or_walls_with_direct_danger_of_ignition_combustible_materials_removed(C, yes)

inspection_and_removal_of_indirect_danger_of_ignition(C) :-
    claim.danger_of_ignition_by_conduction_of_heat_through_partitions_or_walls(C, no)

inspection_and_removal_of_indirect_danger_of_ignition(C) :-
    claim.danger_of_ignition_by_conduction_of_heat_through_partitions_or_walls(C, yes) &
    claim.area_on_other_side_of_partitions_or_walls_with_danger_of_ignition_through_conduction_inspected(C, yes) &
    claim.area_on_other_side_of_partitions_or_walls_with_danger_of_ignition_through_conduction_combustible_materials_removed(C, yes)

% VIII.6
thorough_safety_check_at_regular_intervals(C) :-
    evaluate(countofall(Period, claim.period_of_work(C, Period) & work_period.num_minutes_thorough_safety_check_for_signs_of_fire_or_combustion_around_above_or_below_the_work_area_made_at_regular_intervals_after_completion_of_work_period(Period, Minutes) & ~leq(30, Minutes)), 0)

% IX: Hot work precautions amendment endorsement
precaution_condition_met(C) :-
    claim.policy(C, P) &
    policy.hot_work_precautions_amendment_endorsement(P, yes) &
    hot_work_precautions_amendment_endorsement_met(C)

hot_work_precautions_amendment_endorsement_met(C) :-
    claim.insuree_operates_own_hot_work_permit_system_detailing_methods_and_precautions_to_be_followed_prior_to_during_and_subsequent_to_hot_work(C, yes) &
    claim.copy_of_insurees_own_hot_work_permit_system_provided_to_insuring_company_in_writing(C, yes) &
    claim.insurees_own_hot_work_permit_system_provided_to_insuring_company_accepted_in_writing(C, yes)

% X: Sub-contractors (services) condition
subcontractors_condition_met(C) :-
    evaluate(countofall(Subcontractor, claim.subcontractor_appointed_to_carry_out_services_at_premises_or_site_of_customer(C, Subcontractor) & claim.insuree_took_reasonable_steps_to_obtain_information_from_subcontractor_prior_to_starting_work_that_they_have_ppl_insurance_in_force_during_their_period_of_involvement(C, Subcontractor, no)), 0)
`;
