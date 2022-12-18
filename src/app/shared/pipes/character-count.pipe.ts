import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterCount'
})
export class CharacterCountPipe implements PipeTransform {

  transform(value: string): number {
    if (value) {
      return value.length;
    } else {
      return 0;
    }
  }

}
