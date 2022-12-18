import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'bnDate'
})
export class BnDatePipe implements PipeTransform {

  constructor() {}

  transform(value: any, pattern: string = 'mediumDate'): any {

    const datePipe = new DatePipe('bn');
    return datePipe.transform(value, pattern);
  }

}
