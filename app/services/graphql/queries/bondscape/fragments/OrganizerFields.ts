import { gql } from '@apollo/client';

const OrganizerFields = gql`
  fragment OrganizerFields on event_organizers {
    organizer {
      address
      bio
      dtag
      creation_time
      coverPicture: cover_pic
      nickname
      profilePicture: profile_pic
    }
  }
`;

export default OrganizerFields;
