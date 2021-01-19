export const COMPLETE_USER_PROFILE = `
mutation CompleteUserProfile($id: Int!, $genderPreference: String!, $appointmentPreference: String!) {
    update_h3_users(where: {id: {_eq: $id}}, _set: {gender_pref: $genderPreference, apoint_pref: $appointmentPreference, first_visit: false}) {
      returning {
        id
      }
    }
  }  
`;
