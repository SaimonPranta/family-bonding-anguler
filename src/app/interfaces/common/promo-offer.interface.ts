import { Product } from './product.interface';

export interface PromoOffer {
  _id?: string;
  title?: string;
  slug?: string;
  description?: string;
  bannerImage?: string;
  startDateTime?: Date;
  endDateTime?: Date;
  products?: PromoOfferProduct[];
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}

interface PromoOfferProduct {
  product: string | Product;
  offerDiscountAmount?: number;
  offerDiscountType?: number;
  resetDiscount?: boolean;
}
