import { gql } from "@apollo/client";

const OrganizerFields = gql`
  fragment OrganizerFields on event_organizers {
    organizer {
      address
      bio
      dTag: dtag
      creation_time
      coverPicture: cover_pic
      nickname
      profilePicture: profile_pic
    }
    organizerAddress: organizer_address
  }
`;

export default OrganizerFields;
