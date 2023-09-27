import { gql } from "@apollo/client";
import PROFILE_FIELDS from "./fragments/ProfilesFields";

const GetProfileForDtagAndNickname = gql`
  ${PROFILE_FIELDS}
  query GetProfileForDtagAndNickname($input: String!) @api(name: desmos) {
    profiles: profile(
      where: {
        _or: [{ dtag: { _ilike: $input } }, { nickname: { _ilike: $input } }]
      }
    ) {
      ...ProfileFields
    }
  }
`;

export default GetProfileForDtagAndNickname;
