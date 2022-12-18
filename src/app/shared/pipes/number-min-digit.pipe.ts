import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numMinDigit',
  pure: true
})
export class NumberMinDigitPipe implements PipeTransform {

  transform(n: number, options?: any): string {
    if (n < 10) {
      return '0' + n;
    } else if (n < 100) {
      return '' + n;
    } else {
      return '99+';
    }
  }

}
