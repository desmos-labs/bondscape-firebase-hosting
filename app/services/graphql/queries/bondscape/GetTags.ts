import { gql } from "@apollo/client";

const GetTags = gql`
  query GetTags($tag: String) @api(name: bondscape) {
    event_tags(where: { tag: { _ilike: $tag } }) {
      tag
    }
  }
`;

export default GetTags;
