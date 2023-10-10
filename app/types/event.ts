import { DesmosProfile } from "@/types/desmos";
import { BondscapePreviewImage } from "@/types/image";

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

export interface EventTicketCategory {
  /**
   * Ticket id.
   */
  id: string;
  /**
   * Ticket name.
   */
  name: string;
  startDate: string;
  endDate: string;
  ticketsCount: {
    aggregate: {
      count: number;
    };
  };
  totalTicketsAvailable: number;
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
  /**
   * Event categories.
   */
  categories: {
    category_id: number;
    category: {
      id: number;
      name: string;
    };
  }[];
  /**
   * Event status
   */
  status?: "published" | "draft";
  /**
   * Link to share this event.
   */
  detailsLink: string;
  /**
   * Event tickets categories.
   */
  ticketsCategories: EventTicketCategory[];
}

export interface CreateEventValues {
  /**
   * Event status.
   */
  status: "published" | "draft";
  /**
   * Event cover picture.
   */
  coverPic?: BondscapePreviewImage;
  coverPicUrl?: string;
  /**
   * Event name.
   */
  eventName: string;
  /**
   * Event details.
   */
  eventDetails: string;
  /**
   * Event start date.
   */
  startDate?: string;
  /**
   * Event end date.
   */
  endDate?: string;
  /**
   * Event categories.
   */
  categories?: EventCategory[];
  /**
   * Event website.
   */
  website?: string;
  /**
   * Event place id (Google Maps).
   */
  placeId?: string;
  /**
   * Event organizers, creator + co-hosts.
   */
  organizers: Organizer[];
  /**
   * Event tags.
   */
  tags?: string[];
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

export interface EventRequestParams {
  status: string;
  eventName: string;
  eventDetails: string;
  coverPicUrl?: string;
  startDate?: string;
  endDate?: string;
  categoriesIds?: number[];
  website?: string;
  placeId?: string;
  organizersAddresses: string[];
  tags?: string[];
}
