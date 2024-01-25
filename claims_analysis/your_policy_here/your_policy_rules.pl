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

definition(parsedate(DATE),map(readstring,tail(matches(stringify(DATE),"(..)_(..)_(....)"))))
definition(parsetime(TIME),map(readstring,tail(matches(stringify(TIME),"(..)_(..)"))))
definition(tail(X!L),L)

exception(C,P):-
  person.occupation(armed_forces) &
  claim.consequence_of_occupation(C,yes).

eligible_service(C,P,routine_physical).
eligible_service(C,P,preventive_care).
valid_hospital(stanford_medical_center).
valid_hospital(menlo_medical_clinic).
valid_hospital(sutter_health).

# age_greater_than(P,Y,C):-
#   person.birthdate(P,BIRTHDATE) &
#   get_timestamp(BIRTHDATE,BIRTHTIMESTAMP) &
#   claim.hospitalization(C,H) &
#   hospitalization.end_time(H,ENDDATE,ENDTIME) &
#   get_timestamp(ENDDATE,ENDTIME,ENDTIMESTAMP) &
#   evaluate(times(31536000000,Y),YEARTIMESTAMP) &
#   plus(BIRTHTIMESTAMP,YEARTIMESTAMP,MINTIMESTAMP) &
#   leq(MINTIMESTAMP,ENDTIMESTAMP).

# age_lesser_than(P,Y,C):-
#   person.birthdate(P,BIRTHDATE) &
#   get_timestamp(BIRTHDATE,BIRTHTIMESTAMP) &
#   claim.hospitalization(C,H) &
#   hospitalization.start_time(H,STARTDATE,STARTTIME) &
#   get_timestamp(STARTDATE,STARTTIME,STARTTIMESTAMP) &
#   evaluate(times(31536000000,Y),YEARTIMESTAMP) &
#   plus(BIRTHTIMESTAMP,YEARTIMESTAMP,MAXTIMESTAMP) &
#   leq(STARTTIMESTAMP,MAXTIMESTAMP).

# eligible_service(C,P,routine_physical):-
#   claim.claimant(C,Cl) &
#   age_greater_than(Cl,22,C) &
#   no_previous_visit_in_policy_year(C,P).

# no_previous_visit_in_policy_year(C,P):-
#   person.hospitalization(P,H) &
#   hospitalization.





