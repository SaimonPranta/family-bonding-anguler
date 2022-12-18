import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'arrayString'
})
export class ArrayStringPipe implements PipeTransform {

  transform(array: any[], length?: number): string {
    if (length) {
      const mString = array.join();
      return mString.substring(0, length);
    } else {
      return  array.join();
    }

  }

}
