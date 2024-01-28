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
  valid_hospital(Hosp) &
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

eligible_service(C,P,routine_physical):-
  claim.claimant(C,Cl)
  person.age(Cl,Age) &
  physical_visit_limit(Age,Limit) &
  evaluate(countofall(X,previous_physical_visit(C,X),Count)) &
  evaluate(minus(Limit,1),LimitMinus) &
  leq(Count,LimitMinus).

physical_visit_limit(Age,Limit):-
  physical_visit_limit(MinAge,MaxAge,Limit) &
  evaluate(minus(MaxAge,1),MaxAgeMinus) &
  leq(Age,MaxAgeMinus) &
  leq(MinAge,Age).

previous_physical_visit(Claim1,Claim2):-
  claim.claimant(Claim1,Person) &
  claim.claimant(Claim2,Person) &
  claim.hospitalization(Claim2,Hosp2) &
  hospitalization.reason(Hosp2,routine_physical) &
  hospitalization.start_time(Hosp2,Hosp2_StartDate,Hosp2_StartTime) &
  policy_year_startdate(Policy_StartDate) &
  get_timestamp_from_datetime(Hosp2_StartDate,Hosp2_StartTime,Hosp2_Timestamp) &
  get_timestamp_from_date(Policy_StartDate,Policy_Timestamp) &
  leq(Policy_Timestamp,Hosp2_Timestamp)



eligible_service(C,P,preventive_care).
valid_hospital(stanford_medical_center).
valid_hospital(menlo_medical_clinic).
valid_hospital(sutter_health).
physical_visit_limit(0,22,0).
physical_visit_limit(22,200,1)





