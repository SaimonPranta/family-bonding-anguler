import {Category} from './category.interface';

export interface SubCategory {
  _id?: string;
  readOnly?: boolean;
  category?: string | Category;
  categoryInfo?: Category;
  name?: string;
  slug?: string;
  image?: string;
  priority?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
