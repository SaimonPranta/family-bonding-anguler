export interface Blog {
  _id?: string;
  readOnly?: boolean;
  name?: string;
  slug?: string;
  image?: string;
  serial?: number;
  description?: string;
  shortDesc?: string;
  isHtml?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
