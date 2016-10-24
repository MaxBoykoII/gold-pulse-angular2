import * as _ from 'lodash';

import { ApiDate } from '../interfaces/api-date';

import { Stock } from '../classes/stock';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class DataService {
    constructor(private http: Http) {}
    config() {
        /* Calls out to an internal API for configuring the app */
        return this.http.get('../config.php')
            .map(response => response.json())
    }
    _buildBenchmarks(cpMetaDefs, futureDates, dates) {
        //helper function for building average returns for each benchmark

        //start building benchmarks with prices on current date
        let benchmarks = dates[0].cp;
        for (let cpMetaDef of cpMetaDefs) {
            const close = benchmarks[cpMetaDef.sid];

            //Only compute average returns if price on current date is available
            if (!isNaN(close) && close > 0) {

                //An array to store the future closes
                let futureCloses = [];
                for (let ymd of futureDates) {
                    const cp = dates.find(date => date.ymd === ymd).cp,
                        futureClose = cp[cpMetaDef.sid];

                    if (!isNaN(futureClose)) {
                        futureCloses.push(futureClose);
                    }
                }
                //Future Returns from Future closes
                const futureReturns = futureCloses.map(fclose => (fclose - close) / close),
                    avg = futureReturns.reduce((sum, cur) => sum + cur, 0) / futureReturns.length,
                    formattedAvg = (avg * 100).toFixed(1);
                benchmarks[cpMetaDef.sid] = isNaN(parseFloat(formattedAvg)) ? null : `${formattedAvg}%`;
            }
        }

        return benchmarks;
    }
    _processData(raw_data) {
        const dates: ApiDate[] = raw_data.dates;
        const metaDefs = raw_data.meta_definitions;
        const cpMetaDefs = raw_data.cp_meta_definitions;
        const currentDate = dates[0].ymd;
        let stocks = _.head(dates).oids.map(oid => new Stock(oid)),
            futureDates = dates.map((date) => date.ymd);
        futureDates.splice(0, 1); //remove current date from future_dates
        //metaDefs.splice(0, 1); //remove id from metaDefs


        //add closing prices for the future dates;
        for (let stock of stocks) {
            stock.setCloses(futureDates, dates, currentDate);
        }

        //Build benchmark averages from cp data;
        let benchmarks = this._buildBenchmarks(cpMetaDefs, futureDates, dates);


        return [stocks, metaDefs, futureDates, cpMetaDefs, benchmarks];
    }

    getData(ymd = '', hp = 63) {
        return this.http.get(`../edp-api-v3a.php?m=${ymd}&hp=${hp}`)
            .map(response => response.json())
            .map(data => this._processData(data));
    }
    modifySpread(stocks, futureDates, spread) {
        _.forEach(stocks, stock => stock.modifySpread(futureDates, spread));

        return stocks;
    }
}
