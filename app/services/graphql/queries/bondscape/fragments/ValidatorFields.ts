import { gql } from "@apollo/client";

const ValidatorFields = gql`
  fragment ValidatorFields on event_ticket_category_validators {
    validator {
      address
      bio
      dTag: dtag
      creation_time
      coverPicture: cover_pic
      nickname
      profilePicture: profile_pic
    }
    validatorAddress: validator_address
  }
`;

export default ValidatorFields;
