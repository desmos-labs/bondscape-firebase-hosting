import { gql } from "@apollo/client";
import EventsFields from "./fragments/EventsFields";
import ProfileFields from "../desmos/fragments/ProfilesFields";
import ImageHashFields from "./fragments/ImageHashFields";

const GetEvents = gql`
  ${EventsFields}
  ${ProfileFields}
  ${ImageHashFields}
  query GetEvents($offset: Int!, $limit: Int!) @api(name: bondscape) {
    events(offset: $offset, limit: $limit, order_by: { start_date: asc }) {
      ...EventsFields
    }
  }
`;

export default GetEvents;
