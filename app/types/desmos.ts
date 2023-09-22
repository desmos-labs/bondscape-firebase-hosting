/**
 * On-chain parameters related to the profiles' module.
 * These data should be considered when creating or updating a profile.
 */
export interface ProfileParams {
  readonly bio: {
    readonly maxLength: number;
  };
  readonly dTag: {
    readonly regEx: string;
    readonly maxLength: number;
    readonly minLength: number;
  };
  readonly nickname: {
    readonly maxLength: number;
    readonly minLength: number;
  };
}

export interface DesmosProfile {
  /**
   * The user's address
   */
  readonly address: string;
  /**
   * User DTag
   */
  readonly dTag?: string;
  /**
   * The user nickname
   */
  readonly nickname?: string;
  /**
   * The user bio
   */
  readonly bio?: string;
  /**
   * Url to the user profile picture
   */
  readonly profilePicture?: string;
  /**
   * Url to the user cover picture
   */
  readonly coverPicture?: string;
  /**
   * Date in which the profile was created.
   */
  readonly creationTime: string;
}

export interface GQLProfileResult {
  readonly profiles: DesmosProfile[];
}

export interface DesmosProfileComposite extends DesmosProfile {
  type: string;
}
