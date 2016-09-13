"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var date_component_1 = require('../components/date.component');
var exploration_viewer_1 = require('../components/exploration.viewer');
var stock_table_1 = require('../components/stock.table');
var data_service_1 = require('../services/data.service');
var date_service_1 = require('../services/date.service');
var quantile_service_1 = require('../services/quantile.service');
var coloring_service_1 = require('../services/coloring.service');
var shorten_pipe_1 = require('../pipes/shorten.pipe');
var match_pipe_1 = require('../pipes/match.pipe');
var sort_pipe_1 = require('../pipes/sort.pipe');
var custom_percent_pipe_1 = require('../pipes/custom-percent.pipe');
var metric_pipe_1 = require('../pipes/metric.pipe');
var threshold_pipe_1 = require('../pipes/threshold.pipe');
var format_pipe_1 = require('../pipes/format.pipe');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            declarations: [exploration_viewer_1.ExplorationViewer,
                date_component_1.DateComponent,
                stock_table_1.StockTable,
                shorten_pipe_1.ShortenPipe,
                match_pipe_1.MatchPipe,
                sort_pipe_1.SortPipe,
                custom_percent_pipe_1.CustomPercentPipe,
                metric_pipe_1.MetricPipe,
                threshold_pipe_1.ThresholdPipe,
                format_pipe_1.FormatPipe
            ],
            providers: [
                data_service_1.DataService,
                date_service_1.DateService,
                quantile_service_1.QuantileService,
                coloring_service_1.ColoringService
            ],
            bootstrap: [exploration_viewer_1.ExplorationViewer]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map