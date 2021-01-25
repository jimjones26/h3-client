export const COMPLETE_USER_PROFILE = `
mutation CompleteUserProfile($id: Int!, $genderPreference: String!, $appointmentPreference: String!) {
    update_h3_users(where: {id: {_eq: $id}}, _set: {gender_pref: $genderPreference, apoint_pref: $appointmentPreference, first_visit: false}) {
      returning {
        id
      }
    }
  }  
`;

export const COMPLETE_PRACTITIONER_PROFILE = `
mutation UpdatePractitionerProfile($id: Int!, $firstName: String!, $lastName: String!, $phoneNumber: String!) {
  update_h3_users(where: {id: {_eq: $id}}, _set: {first_name: $firstName, last_name: $lastName, phone_number: $phoneNumber, first_visit: false}) {
    returning {
      id
    }
  }
}
`;

export const COMPLETE_EXTENDED_PRACTITIONER_PROFILE = `

`;
