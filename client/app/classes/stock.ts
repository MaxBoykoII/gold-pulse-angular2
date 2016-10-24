import * as _ from 'lodash';

import { ApiDate } from '../interfaces/api-date';

export class Stock {
    closes: Array < any > ;
    id: string;
    c: number;
    constructor(oids: any) {
        _.assign(this, oids);
    }
    setCloses(futureDates: string[], dates: ApiDate[], currentDate: string): void {
        /* 
         * Method to assign a closing price and a percentage change
         * relative to stock.close for each future date
         */
        let closes = [];
        for (let ymd of futureDates) {
            const id = this.id;
            const close = this.c;
            const oid = dates.find(date => date.ymd === ymd).oids.find(oid => oid.id === id);
            let f = 1; //Rollback factor; stays 1 if there are no rollbacks.
            
            //Check for rollbacks
            if(oid && oid.rb){
                const timestampRef = Date.parse(currentDate); //timestamp for currentDate
                const rollbacks = oid.rb;
                for(let rollback of rollbacks) {
                    //If rollback occurred strictly after ref date and strictly before ymd, adjust f
                    if(Date.parse(rollback.d) > timestampRef && Date.parse(rollback.d) < Date.parse(ymd)){
                        f = f * rollback.f;
                    }
                }
            
            }
            const futureClose = oid ? oid.c : 'NA';
            const change = (!isNaN(close) && close !== 0 && !isNaN(futureClose)) ?
                `${(((futureClose - (close*f))/(close*f))*100).toFixed(1)}%` :
                'NA';

            closes.push({
                ymd,
                close: futureClose,
                f,
                change
            });
        }
        this.closes = closes;
    }
    modifySpread(futureDates: string[], spread: number): void {
        /*
         * Method to adjust the spread 
         */
        const dollarSpread = spread / 100;
        const close = this.c;
        const oldCloses = this.closes;

        let newCloses = [];
        for (let ymd of futureDates) {
            let date = oldCloses.find(date => date.ymd === ymd);
            if (!isNaN(date.close) && !isNaN(close) && (close + dollarSpread) > 0) {
                const modifiedClose = (close + dollarSpread)*date.f;
                const modifiedFutureClose = Math.max(date.close - dollarSpread, 0);
                const change = `${(((modifiedFutureClose - modifiedClose)/modifiedClose)*100).toFixed(1)}%`;
                date.change = change;
            }
            newCloses.push(date);
        }
        this.closes = newCloses;
    }
    meanReturn() {
        /* 
         * Method to calculate the mean return of a stock over this.returns array 
         */
        
        let sum = 0,
            count = 0;
        for (let day of this.closes) {
            const change = parseFloat(day.change)
            if (!isNaN(change)) {
                sum += change;
                count++;
            }
        }
        return sum / count;

    }
    static sort(stocks: Stock[], sid: string, metaDefs: Array < any > ) {
        if (sid) {
            const metaDef = metaDefs.find(mdef => mdef.sid === sid);
            const reverse = metaDef.is_rev_sort;
            const alpha = (sid === 'n' || sid === 't' || sid === 'id' || reverse) ? 1 : -1;

            /*
             * If sid refers to name or ticker or a metric with reverse sorting order, sort in descending order; 
             * otherwise, sort in ascending order.
             * Hence the need for alpha.
             */

            if (stocks && stocks.length && sid) {
                stocks.sort((s1, s2) => {
                    const a = s1[sid],
                        b = s2[sid];

                    if (a < b) {
                        return -1 * alpha;
                    }
                    else if (a > b) {
                        return 1 * alpha;
                    }
                    else {
                        return 0;
                    }
                });
            }
        }
        return stocks;
    }
    static filter(stocks, thresholds) {
        let copy = stocks.slice();

        for (let threshold of thresholds) {
            const sid = threshold.sid;
            const val = threshold.val;
            const sign = threshold.sign;
            switch (sign) {
                case 'gt':
                    _.remove(copy, stock => stock[sid] < val);
                    break;
                case 'lt':
                    _.remove(copy, stock => stock[sid] > val);
                    break;
                case 'eq':
                    _.remove(copy, stock => stock[sid] !== val);
            }
        }

        return copy;
    }
}