import { Component, Input } from '@angular/core';


/* Service imports */
import { QuantileService } from '../services/quantile.service';
import { ColoringService } from '../services/coloring.service';

/* Configuration cosntant */

import { defaultSelection } from '../constants';

/* Class imports */
import { Stock } from '../classes/stock';

@Component({
    selector: 'stock-table',
    templateUrl: './templates/stock.table.html',
    styleUrls: ['./css/stock.table.css'],
})
export class StockTable {
    @Input() stocks;
    @Input() metaDefs;
    @Input() currentDate;
    @Input() futureDates;
    @Input() cpMetaDefs;
    @Input() benchmarks;
    @Input() limit;
    @Input() spread;
    @Input() thresholds;
    selection = defaultSelection;
    stockAverages = {};
    metricAverages = {};
    quartilesDates = {};
    quartilesStockAvg = [];
    quartilesMetricAvg = [];
    displayed: Stock[]; // keeps track of the subset of this.stocks currently displayed
    constructor(private _quantileService: QuantileService, private _coloringService: ColoringService) {}
    select(event, sid) {
            event.preventDefault();
            this.selection = sid;
        }
        
    onDisplay(sid:string): Stock[] {
        let stocks: Stock[] = this.stocks.slice();
        
        /*Reality check to ensure at least one stock has a value for the metric*/
        if (stocks.filter(stock => stock[sid] === undefined).length === stocks.length) {
            return null;
        }
        /* Apply ThresholdPipe */
        if (this.thresholds.length) {
            stocks = Stock.filter(stocks, this.thresholds);
        }
        /* Apply the sort and limit pipes */
        stocks = Stock.sort(stocks, sid, this.metaDefs);

        return stocks.slice(0, this.limit);
    }
    averageByMetric(metaDef) {
        const sid = metaDef.sid;
        let stocks = this.onDisplay(sid);
        let sum = 0;
        let count = 0;
        for (let stock of stocks) {
            const avg = this.stockAverages[stock.id];
            if (!isNaN(avg)) {
                sum += avg;
                count++;
            }
        }
        return sum / count;

    }

    colorDates(stock, ymd) {
        return this._coloringService.colorDates(stock, ymd, this.quartilesDates);
    }

    colorStockAvg(stock) {
        const id = stock.id,
            avg = this.stockAverages[id],
            quartiles = this.quartilesStockAvg;
        return this._coloringService.colorByQuartile(avg, quartiles);
    }
    colorMetricAvg(metaDef) {
        const sid = metaDef.sid,
            avg = this.metricAverages[sid],
            quartiles = this.quartilesMetricAvg;

        if (this.limit === this.stocks.length || this.displayed && this.displayed.length < this.limit || avg === null) {
            return null;
        }
        else {
            return this._coloringService.colorByQuartile(avg, quartiles);
        }
    }

    ngOnChanges(changes) {
        this.stockAverages = {};
        this.metricAverages = {};
        this.displayed = this.onDisplay(this.selection);
     
        for (let stock of this.stocks) {
            this.stockAverages[stock.id] = stock.meanReturn();
        }
        for (let metaDef of this.metaDefs) {
            this.metricAverages[metaDef.sid] = this.averageByMetric(metaDef);
        }
        this.quartilesDates = this._quantileService.quartilesDates(this.stocks, this.futureDates);
        this.quartilesStockAvg = this._quantileService.quartilesStockAvg(this.stockAverages);
        this.quartilesMetricAvg = this._quantileService.quartilesMetricAvg(this.metricAverages);

    }
}