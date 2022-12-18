import {Tag} from './tag.interface';
import {Variation, VariationOption} from './variation.interface';

export interface Product {
  _id?: string;
  name: string;
  slug?: string;
  description?: string;
  costPrice?: number;
  salePrice: number;
  hasTax?: boolean;
  tax?: number;
  sku: string;
  emiMonth?: number[];
  discountType?: number;
  discountAmount?: number;
  images?: string[];
  trackQuantity?: boolean;
  quantity?: number;
  category?: CatalogInfo;
  subCategory?: CatalogInfo;
  brand?: CatalogInfo;
  tags?: string[] | Tag[];
  specifications?: ProductSpecification[];
  hasVariations?: boolean;
  variations?: Variation[];
  variationsOptions?: VariationOption[];
  status?: string;
  videoUrl?: string;
  unit?: string;
  // Seo
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  // Point
  earnPoint?: boolean;
  pointType?: number;
  pointValue?: number;
  redeemPoint?: boolean;
  redeemType?: number;
  redeemValue?: number;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
  selectedQty?: number;
  // For Create Order
  orderVariationOption?: VariationOption;
  orderVariation?: string;

  // For Offer
  offerDiscountAmount?: number;
  offerDiscountType?: number;
  resetDiscount?: boolean;
}

interface CatalogInfo {
  _id: string;
  name: string;
  slug: string;
}

export interface ProductSpecification {
  name?: string;
  value?: string;
}
