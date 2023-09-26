import { gql } from "@apollo/client";
import EventsFields from "./fragments/EventsFields";
import ProfileFields from "../desmos/fragments/ProfilesFields";
import ImageHashFields from "./fragments/ImageHashFields";

const GetMyDraftEvents = gql`
  ${EventsFields}
  ${ProfileFields}
  ${ImageHashFields}
  query GetMyDraftEvents($creatorAddress: String, $offset: Int!, $limit: Int!)
  @api(name: bondscape) {
    events(
      offset: $offset
      limit: $limit
      order_by: { start_date: asc }
      where: {
        _and: [
          { organizers: { organizer_address: { _eq: $creatorAddress } } }
          { status: { _eq: "draft" } }
        ]
      }
    ) {
      ...EventsFields
    }
  }
`;

export default GetMyDraftEvents;
