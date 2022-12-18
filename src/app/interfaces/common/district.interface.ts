import {Country} from './country.interface';
import {Division} from './division.interface';
import {Continent} from './continent.interface';

export interface District {
  _id?: string;
  readOnly?: boolean;
  name?: string;
  country?: Country;
  division?: Division;
  continent?:Continent;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
