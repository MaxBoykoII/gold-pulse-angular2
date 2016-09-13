import { Pipe, PipeTransform } from '@angular/core';

import { Stock } from '../classes/stock';

@Pipe({
    name: 'threshold',
    pure: false
})

export class ThresholdPipe implements PipeTransform {
    transform(stocks, thresholds) {
        return Stock.filter(stocks, thresholds);
    }
}