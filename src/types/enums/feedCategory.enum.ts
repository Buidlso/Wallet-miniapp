export enum FeedCategoryEnum {
  All,
  Program,
  RTCs,
  Credits,
  Mentors,
  Announcements,
  Product,
  Updates,
}

export const FeedCategory = [
  "All",
  "Program",
  "RTCs",
  "Credits",
  "Mentors",
  "Announcements",
  "Product",
  "Updates",
] as const;



export type TFeedCategory = (typeof FeedCategory)[number]