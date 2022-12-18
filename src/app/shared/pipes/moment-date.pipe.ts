import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentDate',
  pure: true
})
export class MomentDatePipe implements PipeTransform {

  transform(date: Date | string, type?: string): any {

    if (date) {
      return moment(date).startOf('hour').fromNow();
    } else {
      return 'N/A';
    }

  }

}
