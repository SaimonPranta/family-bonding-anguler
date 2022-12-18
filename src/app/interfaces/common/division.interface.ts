import {Country} from './country.interface';
import {Continent} from './continent.interface';

export interface Division {
  _id?: string;
  readOnly?: boolean;
  name?: string;
  country?: Country;
  continent?:Continent;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
