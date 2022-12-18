export interface Coupon {
  _id?: string;
  name?: string;
  couponCode?: string;
  bannerImage?: string;
  startDateTime?: Date;
  endDateTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
