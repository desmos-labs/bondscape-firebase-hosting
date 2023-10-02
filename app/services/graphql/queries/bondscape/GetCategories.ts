import { gql } from "@apollo/client";

const GetCategories = gql`
  query GetCategories @api(name: bondscape) {
    events_categories {
      id
      name
    }
  }
`;

export default GetCategories;
