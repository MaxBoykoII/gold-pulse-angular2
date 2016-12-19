import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

/* import constants */
import {
  hp,
  limit,
  limitOptions,
  start,
  spread,
  spreadOptions,
  title,
  subtitle
}
from '../constants';


//import services
import {
  DataService
}
from '../services/data.service';
import {
  DateService
}
from '../services/date.service';
import {
  QuantileService
}
from '../services/quantile.service';

//import pipes
import {
  ShortenPipe
}
from '../pipes/shorten.pipe';

@Component({
  selector: 'exploration-viewer',
  templateUrl: './templates/exploration.viewer.html',
  styleUrls: ['./css/exploration.viewer.css']
})
export class ExplorationViewer implements OnInit {
  constructor(private _dataService: DataService) {}
  currentDate = start
  hp = hp
  stocks = []
  metaDefs = []
  futureDates = []
  cpMetaDefs = []
  benchmarks = {}
  thresholds = []
  thresholdTooltips: string[]
  activeThresholds = []
  limit = limit
  limitText
  limitTooltip
  limitOptions = limitOptions
  spread = spread
  spreadTootlip
  spreadText
  spreadOptions = spreadOptions
  title = title
  subtitle = subtitle
  update(event) {
    /* The event is either an update to the current date or an update to the holding period. */
    if (isNaN(event)) {
      this.currentDate = event;
    }
    else {
      this.hp = event;
    }
    this._dataService.getData(this.currentDate, this.hp).subscribe((processedData) => {
      [this.stocks, this.metaDefs, this.futureDates, this.cpMetaDefs, this.benchmarks] = processedData;
      if (this.limit > this.stocks.length || this.limitOptions.indexOf(this.limit) === -1) {
        this.limit = this.stocks.length;
      }

      if (this.spread !== 0) {
        this.modifySpread(this.spread);
      }
    });
  }
  modifySpread(event) {
    this.spread = event;
    this.stocks = this._dataService.modifySpread(this.stocks, this.futureDates, this.spread);

  }
  updateActiveThresholds() {
    /* Utility to create a new version of activeThresholds
     * This artifice ensures that ngChanges fires in StockTable
     */
    const copy = this.activeThresholds.slice();
    this.activeThresholds = copy;
  }
  activateThreshold(sid, sign, val) {
    let current = this.activeThresholds.find(threshold => threshold.sid === sid);
    /* If there is already a threshold set for metric with sid, update it. */
    if (current) {
      current.sign = sign;
      current.val = val;
    }
    /* Otherwise, create one. */
    else {
      this.activeThresholds.push({
        sid,
        sign,
        val
      });
    }
    this.updateActiveThresholds();
  }
  deactivateThreshold(sid) {
    /* If metric with sid had an active threshold, remove it. */
    _.remove(this.activeThresholds, threshold => threshold.sid === sid);
    this.updateActiveThresholds();
  }
  displayThreshold(sid) {
    /* If there is an active threshold for metric with sid, return threshold; else 'none'. */
    const active = this.activeThresholds.find(threshold => threshold.sid === sid);

    if (active) {
      let sign;
      switch (active.sign) {
        case 'gt':
          sign = '>';
          break;
        case 'lt':
          sign = '<';
          break;
        case 'eq':
          sign = '=';
      }
      return `${sign} ${active.val}`;
    }

    return 'none';
  }
  ngOnInit() {
    this._dataService.config().subscribe(config => {
      this.thresholds = config.thresholds ? config.thresholds : [];
      console.log("The config obj:", config);
      if (config.title && config.subtitle){
        this.title = config.title;
        this.subtitle = config.subtitle;
      }
      if (config.limit){
        this.limit = config.limit.default;
        this.limitOptions = config.limit.values;
        this.limitTooltip = config.limit.tooltip;
        this.limitText = config.limit.title;
      }
      if (config.spread){
        this.spread = config.spread.default;
        this.spreadOptions = config.spread.values;
        this.spreadTootlip = config.spread.tooltip;
        this.spreadText = config.spread.title;
      }
    });

    this._dataService.getData(this.currentDate).subscribe((processedData) => {
      [this.stocks, this.metaDefs, this.futureDates, this.cpMetaDefs, this.benchmarks] = processedData;
      if (this.spread !== 0) {
        this.modifySpread(this.spread);
      }
    });
  }
}