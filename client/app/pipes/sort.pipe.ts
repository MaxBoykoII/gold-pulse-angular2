import { Pipe, PipeTransform } from '@angular/core';

import { Stock } from '../classes/stock';
@Pipe({
    name: 'sort',
    pure: false
})
export class SortPipe implements PipeTransform {
    transform(stocks, sid, metaDefs) {
      return Stock.sort(stocks, sid, metaDefs);
    }
}