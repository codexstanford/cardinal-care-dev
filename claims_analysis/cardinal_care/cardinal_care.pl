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
  hospitalization.reason(H,R) &
  eligible_service(C,P,R) &
  valid_hospital(Hosp, R) &
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

eligible_service(C,P,routine_physical):-
  claim.claimant(C,Cl) &
  person.dob(Cl,DOB) &
  claim.time(C,C_D,C_T) &
  evaluate(parsedate(C_D),[D,M,Y]) &
  evaluate(parsedate(DOB),[D2,M2,Y2]) &
  evaluate(minus(Y,Y2),Age) &
  physical_visit_limit(Age,Limit) &
  evaluate(plus(countofall(X,physical_visit_current_year(C,X)),1),Count) &
  leq(Count,Limit).

eligible_service(C,P,preventive_care):-
  claim.claimant(C,Cl) &
  person.dob(Cl,DOB) &
  claim.time(C,C_D,C_T) &
  evaluate(parsedate(C_D),[D,M,Y]) &
  evaluate(parsedate(DOB),[D2,M2,Y2]) &
  evaluate(minus(Y,Y2),Age) &
  claim.hospitalization(C,H) &
  hospitalization.vaccine(H,V) &
  preventive_care_limit(V,Age,Limit,MinAge,MaxAge) &
  evaluate(plus(countofall(X,preventive_care_visit(C,X)),1),Count) &
  leq(Count,Limit).

eligible_service(C,P,female_contraceptives) :-
  claim.claimant(C,Cl) &
  person.sex(Cl, female) &
  claim.hospitalization(C,H) &
  hospitalization.contraceptive_service(H,Service) &
  fda_approved(Service).

eligible_service(C,P,physician_consultation).
eligible_service(C,P,allergy).

preventive_care_limit(Vaccine,Age,Limit,MinAge,MaxAge):-
  preventive_care_limit(Vaccine,MinAge,MaxAge,Limit) &
  evaluate(minus(MaxAge,1),MaxAgeMinus) &
  leq(Age,MaxAgeMinus) &
  leq(MinAge,Age).

physical_visit_limit(Age,Limit):-
  physical_visit_limit(MinAge,MaxAge,Limit) &
  evaluate(minus(MaxAge,1),MaxAgeMinus) &
  leq(Age,MaxAgeMinus) &
  leq(MinAge,Age).

physical_visit_current_year(Claim1,Claim2):-
  claim.claimant(Claim1,Person) &
  claim.claimant(Claim2,Person) &
  claim.policy(Claim1,Policy) &
  claim.policy(Claim2,Policy) &
  claim.hospitalization(Claim2,Hosp2) &
  claim.hospitalization(Claim1,Hosp1) &
  hospitalization.reason(Hosp1,routine_physical) &
  hospitalization.reason(Hosp2,routine_physical) &
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

preventive_care_visit(Claim1,Claim2):-
  claim.claimant(Claim1,Person) &
  claim.claimant(Claim2,Person) &
  claim.policy(Claim1,Policy) &
  claim.policy(Claim2,Policy) &
  claim.hospitalization(Claim2,Hosp2) &
  claim.hospitalization(Claim1,Hosp1) &
  hospitalization.reason(Hosp1,preventive_care) &
  hospitalization.reason(Hosp2,preventive_care) &
  hospitalization.vaccine(Hosp1,Vaccine) &
  hospitalization.vaccine(Hosp2,Vaccine) &
  claim.time(Claim1,C1_D,C1_T) &
  claim.time(Claim2,C2_D,C2_T) &
  person.dob(Person,DOB) &
  evaluate(parsedate(C1_D),[D1,M1,Y1]) &
  evaluate(parsedate(C2_D),[D2,M2,Y2]) &
  evaluate(parsedate(DOB),[D_dob,M_dob,Y_dob]) &
  evaluate(minus(Y1,Y_dob),Age) &
  evaluate(minus(Y2,Y_dob),Age2) &
  preventive_care_limit(Vaccine,Age1,Limit,MinAge,MaxAge) &
  evaluate(minus(MaxAge,1),MaxAgeMinus) &
  leq(Age2,MaxAgeMinus) &
  leq(MinAge,Age2) &
  get_timestamp_from_datetime(C1_D,C1_T,C1_TS) &
  get_timestamp_from_datetime(C2_D,C2_T,C2_TS) &
  lt(C2_TS,C1_TS) &
  covered(Claim2)
  

policy_year_startdate(01_08_2023).

valid_hospital(Hosp, R):-
  valid_hospital(Hosp).

valid_hospital(telemedicine, physician_consultation).
valid_hospital(allergy_specialist, allergy).

valid_hospital(stanford_medical_center).
valid_hospital(menlo_medical_clinic).
valid_hospital(sutter_health).
physical_visit_limit(0,22,0).
physical_visit_limit(22,200,1)

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