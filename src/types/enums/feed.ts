import { TFeedCategory } from "./feedCategory.enum";

export type TFeed = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category: TFeedCategory;
  cta_title?: string;
  cta_url?: string;
};

export type TDashboardFeed = {
  dashboardFeed: TFeed[];
};

export type TDashboardFeedPayload = {
  feedCategory: string;
  feed: TDashboardFeed;
};
