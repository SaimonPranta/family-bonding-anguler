import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'textWrap',
  pure: true
})
export class TextWrapPipe implements PipeTransform {

  transform(text: string, maxLength: number): any {

    if (text.length > maxLength) {
      return text.substring(0, maxLength).concat('...');
    } else {
      return text;
    }

  }

}
