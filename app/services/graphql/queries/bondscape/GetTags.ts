import { gql } from "@apollo/client";

const GetTags = gql`
  query GetTags($tag: String) @api(name: bondscape) {
    event_tags(where: { tag: { _like: $tag } }) {
      tag
    }
  }
`;

export default GetTags;
