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
var ColoringService = (function () {
    function ColoringService() {
    }
    ColoringService.prototype.colorByQuartile = function (el, quartiles) {
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
    };
    ColoringService.prototype.colorDates = function (stock, ymd, quartilesByDate) {
        var change = stock.closes.find(function (date) { return date.ymd === ymd; }).change;
        var quartiles = quartilesByDate[ymd];
        change = (change === 'NA') ? change : parseFloat(change);
        return this.colorByQuartile(change, quartiles);
    };
    ColoringService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ColoringService);
    return ColoringService;
}());
exports.ColoringService = ColoringService;
//# sourceMappingURL=coloring.service.js.map