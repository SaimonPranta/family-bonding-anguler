import {Country} from './country.interface';
import {Division} from './division.interface';
import {District} from './district.interface';
import {Continent} from './continent.interface';

export interface SubDistrict {
  _id?: string;
  readOnly?: boolean;
  name?: string;
  country?: Country;
  continent?:Continent;
  division?: Division;
  district?: District;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
