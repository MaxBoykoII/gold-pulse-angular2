import { Injectable } from '@angular/core';

@Injectable()

export class ColoringService {
    colorByQuartile(el: any, quartiles: Number[]) {
        if (isNaN(el)) {
            return null;
        }
        else if (el <= quartiles[1]) {
            return 'red';
        }
        else if (el <= quartiles[2]) {
            return 'yellow';
        }
        else if (el <= quartiles[3]) {
            return 'blue';
        }
        else {
            return 'green';
        }
    }
    colorDates(stock, ymd, quartilesByDate) {
        let change = stock.closes.find((date) => date.ymd === ymd).change;
        const quartiles = quartilesByDate[ymd];
        change = (change === 'NA') ? change : parseFloat(change);
        return this.colorByQuartile(change, quartiles);
    }
}