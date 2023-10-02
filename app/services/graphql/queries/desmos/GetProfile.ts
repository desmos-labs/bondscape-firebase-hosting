import { gql } from "@apollo/client";
import PROFILE_FIELDS from "./fragments/ProfilesFields";

const GetProfile = gql`
  ${PROFILE_FIELDS}
  query GetProfile($search: String!) @api(name: desmos) {
    profiles: profile(
      where: {
        _or: [{ dtag: { _ilike: $search } }, { nickname: { _ilike: $search } }]
      }
    ) {
      ...ProfileFields
    }
  }
`;

export default GetProfile;
