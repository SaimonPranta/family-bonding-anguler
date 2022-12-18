import {Component, OnInit} from '@angular/core';
import {Variation} from '../../interfaces/common/variation.interface';

interface TestProduct {
  name: string;
  hasVariations: boolean;
  variations: Variation[];
  variationsOptions: VariationsOptions[];
}

interface VariationsOptions {
  price: number;
  quantity: number;
  variationSlug?: string;
  variations: VariationX[];
}

interface VariationX {
  _id: string;
  name: string;
  value: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }


}
