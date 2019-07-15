import { MyStandard } from 'src/app/global/classes';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'credit'
})
export class CreditPipe implements PipeTransform {

  transform(standards: Array<MyStandard>, property: string): any {
    return standards.reduce((r, a) => r + +a[property], 0);
  }

}
