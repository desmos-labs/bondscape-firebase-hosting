import { gql } from "@apollo/client";
import EventsFields from "./fragments/EventsFields";
import ProfileFields from "../desmos/fragments/ProfilesFields";
import ImageHashFields from "./fragments/ImageHashFields";

const SearchEvents = gql`
  ${EventsFields}
  ${ProfileFields}
  ${ImageHashFields}
  query SearchEvents(
    $activeAddress: String
    $where: events_bool_exp
    $offset: Int!
    $limit: Int!
  ) @api(name: bondscape) {
    events(
      where: $where
      order_by: { start_date: asc }
      offset: $offset
      limit: $limit
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

export default SearchEvents;
