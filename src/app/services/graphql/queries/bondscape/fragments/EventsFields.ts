import { gql } from "@apollo/client";
import OrganizerFields from "./OrganizerFields";
import ProfileFields from "@/services/graphql/queries/desmos/fragments/ProfilesFields";
import ImageHashFields from "@/services/graphql/queries/bondscape/fragments/ImageHashFields";

const EventsFields = gql`
  ${OrganizerFields}
  ${ProfileFields}
  ${ImageHashFields}
  fragment EventsFields on events {
    id
    name
    description
    coverPic: cover_picture_url
    coverPicHash: cover_picture_hash {
      hash
    }
    startDate: start_date
    endDate: end_date
    googlePlaceId: google_place_id
    organizers {
      ...OrganizerFields
      organizerAddress: organizer_address
    }
    website
    tags
    memoriesCount: memories_aggregate {
      aggregate {
        count
      }
    }
    likesCount: likes_count
    detailsLink: details_link
    eventParticipants: participants_count
    eventUserParticipations: participations_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export default EventsFields;
