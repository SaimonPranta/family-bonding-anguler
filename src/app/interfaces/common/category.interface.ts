export interface Category {
  _id?: string;
  readOnly?: boolean;
  name?: string;
  slug?: string;
  image?: string;
  description?: string;
  serial?: number;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  select?: boolean;
}
