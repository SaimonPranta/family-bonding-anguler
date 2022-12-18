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
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.scss']
})
export class NewsLetterComponent implements OnInit {

 // Selected variations
 selectedVariationsSlug: string = null;

 selectedVariants: any[] = [
   '1-S',
   '2-Red',
 ];

 varCombination = {};
 selectVariationProduct: any = null;



 // Test
 product: TestProduct = {
   name: 'A Test Product',
   hasVariations: true,
   variations: [
     {
       _id: '1',
       name: 'Size',
       values: ['S', 'M'],
     },
     {
       _id: '2',
       name: 'Color',
       values: ['Red', 'Green'],
     },
     {
       _id: '3',
       name: 'Brand',
       values: ['Tariqul', 'Sazib'],
     },

   ],
   variationsOptions: [
     {
       price: 100,
       quantity: 5,
       variations: [
         {
           _id: '1',
           name: 'Size',
           value: 'S'
         },
         {
           _id: '2',
           name: 'Color',
           value: 'Red'
         }
       ]
     },
     {
       price: 110,
       quantity: 1,
       variations: [
         {
           _id: '1',
           name: 'Size',
           value: 'M'
         },
         {
           _id: '2',
           name: 'Color',
           value: 'Red'
         }
       ]
     },
     {
       price: 110,
       quantity: 1,
       variations: [
         {
           _id: '1',
           name: 'Size',
           value: 'M'
         },
         {
           _id: '2',
           name: 'Color',
           value: 'Green'
         }
       ]
     }
   ]
 }


 constructor() {
 }

 ngOnInit(): void {
 }

 onSelectVariation(data: Variation, v: string) {
   // console.log('data', data);
   // console.log('v', v);
   this.varCombination[data.name] = v;
   console.log('this.varCombination', this.varCombination)

   const com = {
     Size: 'M',
     Color: 'Red'
   }
   const g = [
     {
       _id: '1',
       name: 'Size',
       value: 'M'
     },
     {
       _id: '2',
       name: 'Color',
       value: 'Red'
     }
   ]

   this.product.variationsOptions.forEach((data, i) => {
     let count = 0;
     data.variations.forEach((variation , j) => {
       if (variation.value === this.varCombination[variation.name] ) {
         count++;
       }
     })
     if (count === data.variations.length) {
       this.selectVariationProduct = data;
       console.log('data', this.selectVariationProduct);
     }
   })
 }

 openLink(){
   window.open("https://www.google.com")
 }

 onSelectVariants(_id: string, value: string) {

   const slug = _id + '-' + value;
   if (!this.selectedVariants.includes(slug)) {
     this.selectedVariants.push(slug);
   } else {
     console.log('Remove')
   }



   // this.selectedBtn = {parentIndex: parentIndex, childIndex: childIndex};
   // console.log('i', i)
   // console.log('v', v)
   // if (!this.selectedVariationsSlug) {
   //   this.selectedVariationsSlug = v;
   // } else {
   //   this.selectedVariationsSlug = this.selectedVariationsSlug + '_' + v;
   // }
   //
   // const res = this.product.variationsOptions.find(f => f.variationSlug === this.selectedVariationsSlug)
   //
   // console.log('this.selectedVariationsSlug', this.selectedVariationsSlug);
   // console.log('res', res)

   // console.log('data', data);
   // console.log('v', v);
 }

 getSomeClass(_id: string, value: string){
   const data = _id + '-' + value;
   const f = this.selectedVariants.includes(data);
   if (f) {
     return {'active-btn': true}
   }
 }


}
