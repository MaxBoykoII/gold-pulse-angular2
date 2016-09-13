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
var _ = require('lodash');
var constants_1 = require('../constants');
var data_service_1 = require('../services/data.service');
var ExplorationViewer = (function () {
    function ExplorationViewer(_dataService) {
        this._dataService = _dataService;
        this.currentDate = constants_1.start;
        this.hp = constants_1.hp;
        this.stocks = [];
        this.metaDefs = [];
        this.futureDates = [];
        this.cpMetaDefs = [];
        this.benchmarks = {};
        this.thresholds = [];
        this.activeThresholds = [];
        this.limit = constants_1.limit;
        this.limitOptions = constants_1.limitOptions;
        this.spread = constants_1.spread;
        this.spreadOptions = constants_1.spreadOptions;
    }
    ExplorationViewer.prototype.update = function (event) {
        var _this = this;
        if (isNaN(event)) {
            this.currentDate = event;
        }
        else {
            this.hp = event;
        }
        this._dataService.getData(this.currentDate, this.hp).subscribe(function (processedData) {
            _this.stocks = processedData[0], _this.metaDefs = processedData[1], _this.futureDates = processedData[2], _this.cpMetaDefs = processedData[3], _this.benchmarks = processedData[4];
            if (_this.limit > _this.stocks.length || _this.limitOptions.indexOf(_this.limit) === -1) {
                _this.limit = _this.stocks.length;
            }
            if (_this.spread !== 0) {
                _this.modifySpread(_this.spread);
            }
        });
    };
    ExplorationViewer.prototype.modifySpread = function (event) {
        this.spread = event;
        this.stocks = this._dataService.modifySpread(this.stocks, this.futureDates, this.spread);
    };
    ExplorationViewer.prototype.updateActiveThresholds = function () {
        var copy = this.activeThresholds.slice();
        this.activeThresholds = copy;
    };
    ExplorationViewer.prototype.activateThreshold = function (sid, sign, val) {
        var current = this.activeThresholds.find(function (threshold) { return threshold.sid === sid; });
        if (current) {
            current.sign = sign;
            current.val = val;
        }
        else {
            this.activeThresholds.push({
                sid: sid,
                sign: sign,
                val: val
            });
        }
        this.updateActiveThresholds();
    };
    ExplorationViewer.prototype.deactivateThreshold = function (sid) {
        _.remove(this.activeThresholds, function (threshold) { return threshold.sid === sid; });
        this.updateActiveThresholds();
    };
    ExplorationViewer.prototype.displayThreshold = function (sid) {
        var active = this.activeThresholds.find(function (threshold) { return threshold.sid === sid; });
        if (active) {
            var sign = void 0;
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
            return sign + " " + active.val;
        }
        return 'none';
    };
    ExplorationViewer.prototype.ngOnInit = function () {
        var _this = this;
        this._dataService.config().subscribe(function (configObj) {
            _this.thresholds = configObj.thresholds ? configObj.thresholds : [];
        });
        this._dataService.getData(this.currentDate).subscribe(function (processedData) {
            _this.stocks = processedData[0], _this.metaDefs = processedData[1], _this.futureDates = processedData[2], _this.cpMetaDefs = processedData[3], _this.benchmarks = processedData[4];
            if (_this.spread !== 0) {
                _this.modifySpread(_this.spread);
            }
        });
    };
    ExplorationViewer = __decorate([
        core_1.Component({
            selector: 'exploration-viewer',
            templateUrl: './templates/exploration.viewer.html',
            styleUrls: ['./css/exploration.viewer.css']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], ExplorationViewer);
    return ExplorationViewer;
}());
exports.ExplorationViewer = ExplorationViewer;
//# sourceMappingURL=exploration.viewer.js.map