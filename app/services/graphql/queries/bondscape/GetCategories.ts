import { gql } from "@apollo/client";

const GetCategories = gql`
  query GetCategories @api(name: bondscape) {
    event_categories {
      category {
        id
        name
      }
    }
  }
`;

export default GetCategories;
