import { DesmosProfile } from "@/types/desmos";

export interface Organizer {
  /**
   * Organizer Desmos profile.
   */
  organizer?: DesmosProfile;
  /**
   * Organizer address.
   */
  organizerAddress: string;
}

export interface Event {
  /**
   * Event id.
   */
  id: string;
  /**
   * Event name.
   */
  name: string;
  /**
   * Event description.
   */
  description: string;
  /**
   * Event cover picture.
   */
  coverPic: string;
  /**
   * Event cover picture hash.
   */
  coverPicHash: {
    hash: string;
  };
  /**
   * Event start date.
   */
  startDate: string;
  /**
   * Event end date.
   */
  endDate: string;
  /**
   * Event location.
   */
  googlePlaceId: string;
  /**
   * Event organizers
   */
  organizers: Organizer[];
  /**
   * Event join code.
   */
  joinCode: string;
  /**
   * Event website.
   */
  website: string;
  /**
   * Event tags.
   */
  tags: string[];
}

export interface GQLEventsResult {
  events: Event[];
}

export interface GQLEventResult {
  event: Event;
}

export interface EventCategory {
  id: number;
  name: string;
}

export interface GQLEventCategoriesResult {
  events_categories: EventCategory[];
}

export interface GQLEventTagsResult {
  event_tags: {
    tag: string;
  }[];
}
