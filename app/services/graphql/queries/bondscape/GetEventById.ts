import { gql } from "@apollo/client";
import EventsFields from "./fragments/EventsFields";

const GetEventById = gql`
  ${EventsFields}
  query GetEventById($eventId: String) @api(name: bondscape) {
    events(where: { id: { _eq: $eventId } }) {
      ...EventsFields
    }
  }
`;

export default GetEventById;
