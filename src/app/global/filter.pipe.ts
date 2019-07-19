import { MyStandard } from './classes';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(standards: Array<MyStandard>, property: string, query: string): any {
    if (query === 'null') {
      return standards;
    } else if (query === 'attained') {
      return standards.filter(obj => obj.result ===  'Achieved' ||
        obj.result === 'Achieved with Merit' || obj.result === 'Achieved with Excellence');
    } else {
      return standards.filter(obj => obj[property] === query);
    }
  }
}
