import { gql } from "@apollo/client";
import EventsFields from "./fragments/EventsFields";

const GetEvents = gql`
  ${EventsFields}
  query GetEvents($offset: Int!, $limit: Int!) @api(name: bondscape) {
    events(offset: $offset, limit: $limit, order_by: { start_date: asc }) {
      ...EventsFields
    }
  }
`;

export default GetEvents;
