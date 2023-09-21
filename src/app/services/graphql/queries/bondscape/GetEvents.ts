import { gql } from "@apollo/client";
import EventsFields from "@/services/graphql/queries/bondscape/fragments/EventsFields";
import ProfileFields from "@/services/graphql/queries/desmos/fragments/ProfilesFields";
import ImageHashFields from "@/services/graphql/queries/bondscape/fragments/ImageHashFields";

const GetEvents = gql`
  ${EventsFields}
  ${ProfileFields}
  ${ImageHashFields}
  query GetEvents(
    $activeAddress: String
    $currentDate: timestamptz!
    $offset: Int!
    $limit: Int!
  ) @api(name: bondscape) {
    events(
      offset: $offset
      limit: $limit
      order_by: { start_date: asc }
      where: { end_date: { _gt: $currentDate } }
    ) {
      ...EventsFields
      userLikesAggregate: likes_aggregate(
        where: { liker_address: { _eq: $activeAddress } }
      ) {
        aggregate {
          count
        }
      }
      memories(limit: 4, order_by: { creation_time: desc }) {
        id
        eventId: event_id
        creator {
          ...ProfileFields
        }
        imageHash: image_hash {
          ...ImageHashFields
        }
        creationTime: creation_time
        likesCount: likes_count
        detailsLink: details_link
      }
    }
  }
`;

export default GetEvents;
