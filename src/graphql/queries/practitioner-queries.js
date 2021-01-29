export const COMPLETE_PRACTITIONER_SETUP = `
mutation CompletePracticeSetup($userId: Int!, $sessionTime: String!, $sessionFee: String!, $mainFocus: String!, $affiliation: String!, $experience: String!, $biography: String!) {
    update_h3_practitioners(where: {user_id: {_eq: $userId}}, _set: {session_time: $sessionTime, session_fee: $sessionFee, main_focus: $mainFocus, affiliation: $affiliation, experience: $experience, biography: $biography, setup_complete: true}) {
      affected_rows
    }
  }  
`;
