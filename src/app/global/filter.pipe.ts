import { MyStandard } from './classes';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(standards: Array<MyStandard>, property: string, query: string): any {
    return standards.filter(obj => obj[property] === query);
  }

}
