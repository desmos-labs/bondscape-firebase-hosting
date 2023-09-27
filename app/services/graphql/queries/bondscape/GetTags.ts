import { gql } from "@apollo/client";

const GetTags = gql`
  query GetTags @api(name: bondscape) {
    event_tags {
      tag
    }
  }
`;

export default GetTags;
