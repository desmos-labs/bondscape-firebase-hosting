import { gql } from "@apollo/client";
import EventsFields from "./fragments/EventsFields";

const GetMyUpcomingEvents = gql`
  ${EventsFields}
  query GetMyUpcomingEvents(
    $creatorAddress: String
    $currentDate: timestamptz!
    $offset: Int!
    $limit: Int!
  ) @api(name: bondscape) {
    events(
      offset: $offset
      limit: $limit
      order_by: { start_date: asc }
      where: {
        _and: [
          { organizers: { organizer_address: { _eq: $creatorAddress } } }
          { start_date: { _gt: $currentDate } }
          { status: { _eq: "published" } }
        ]
      }
    ) {
      ...EventsFields
    }
  }
`;

export default GetMyUpcomingEvents;
