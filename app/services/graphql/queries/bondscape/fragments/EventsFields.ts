import { gql } from "@apollo/client";
import OrganizerFields from "./OrganizerFields";
import ProfileFields from "../../desmos/fragments/ProfilesFields";
import ImageHashFields from "./ImageHashFields";

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
    categories {
      category {
        id
        name
      }
    }
    detailsLink: details_link
    joinLink: join_link
    website
    tags
    ticketsCategories: tickets_categories {
      id
      name
      startDate: start_date
      endDate: end_date
      ticketsCount: tickets_aggregate {
        aggregate {
          count
        }
      }
      totalTicketsAvailable: total_tickets_available
    }
  }
`;

export default EventsFields;
