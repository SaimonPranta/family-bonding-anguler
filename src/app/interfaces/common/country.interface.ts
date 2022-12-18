import {Continent} from './continent.interface';
export interface Country {

  _id?: string;
  readOnly?: boolean;
  name?: string;

  continent?:Continent;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
