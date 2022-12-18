import {Country} from './country.interface';
import {Division} from './division.interface';
import {SubDistrict} from './sub-district.interface';
import {District} from './district.interface';

export interface Union {
  _id?: string;
  readOnly?: boolean;
  name?: string;
  country?: Country;
  continent?;Continent
  division?: Division;
  district?: District;
  subDistrict?: SubDistrict;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
