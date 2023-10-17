import ValidatorFields from "@/services/graphql/queries/bondscape/fragments/ValidatorFields";
import { gql } from "@apollo/client";
import ProfileFields from "../../desmos/fragments/ProfilesFields";
import ImageHashFields from "./ImageHashFields";
import OrganizerFields from "./OrganizerFields";

const EventsFields = gql`
  ${OrganizerFields}
  ${ProfileFields}
  ${ValidatorFields}
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
    website
    tags
    ticketsCategories: tickets_categories {
      id
      name
      description
      coverPicUrl: tickets_image_url
      startDate: start_date
      endDate: end_date
      ticketsSold: tickets_aggregate {
        aggregate {
          count
        }
      }
      ticketsPerUser: tickets_per_user
      totalTicketsAvailable: total_tickets_available
      validators {
        ...ValidatorFields
      }
    }
  }
`;

export default EventsFields;
