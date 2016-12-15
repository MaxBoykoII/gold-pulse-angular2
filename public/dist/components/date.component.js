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
var date_service_1 = require('../services/date.service');
var constants_1 = require('../constants');
var DateComponent = (function () {
    function DateComponent(dateService) {
        this.dateService = dateService;
        this.hpOptions = constants_1.hpOptions;
        this.jump = constants_1.jump;
        this.jumpOptions = constants_1.jumpOptions;
        this.gap = constants_1.gap;
        this.gapOptions = constants_1.gapOptions;
        this.validDates = [];
        this.inputDate = {
            'ymd': '',
            'valid': true
        };
        this.updateCurrentDate = new core_1.EventEmitter();
        this.updateHp = new core_1.EventEmitter();
    }
    DateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dateService.getValidDates().subscribe(function (dates) {
            _this.validDates = dates;
            var length = dates.length;
            if (length) {
                _this.min = dates[0];
                _this.max = dates[length - 1];
            }
        });
    };
    DateComponent.prototype.flag = function (event) {
        var invalid = isNaN(Date.parse(event));
        this.inputDate.valid = !invalid;
        this.inputDate.ymd = event;
    };
    DateComponent.prototype.updateYmd = function (ymd) {
        this.inputDate.ymd = ymd;
        this.updateCurrentDate.emit(this.inputDate.ymd);
        this.flag(ymd);
    };
    DateComponent.prototype.updateHoldingPeriod = function (hpOption) {
        this.updateHp.emit(hpOption);
    };
    DateComponent.prototype.submit = function () {
        var timeStamp = Date.parse(this.inputDate.ymd);
        if (!isNaN(timeStamp)) {
            var closest = this.validDates.filter(function (ymd) { return Date.parse(ymd) >= timeStamp; }).reduce(function (acc, curr) {
                var diff1 = Date.parse(curr) - timeStamp, diff2 = Date.parse(acc) - timeStamp;
                return (diff1 < diff2) ? curr : acc;
            });
            this.updateYmd(closest);
        }
        else {
            alert('Invalid date!');
        }
    };
    DateComponent.prototype.increment = function (change) {
        var index = this.validDates.indexOf(this.currentDate), indexLast = this.validDates.length - 1;
        if ((change === 'up' && (index + this.jump <= indexLast)) || (change === 'down' && (index - this.jump >= 0))) {
            var newIndex = (change === 'up') ? (index + this.jump) : (index - this.jump), newCurrentDate = this.validDates[newIndex];
            this.updateYmd(newCurrentDate);
        }
        else {
            var newCurrentDate = (change === 'up') ? this.validDates[indexLast] : this.validDates[0];
            this.updateYmd(newCurrentDate);
        }
    };
    DateComponent.prototype.ngOnChanges = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateComponent.prototype, "currentDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateComponent.prototype, "hp", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DateComponent.prototype, "updateCurrentDate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DateComponent.prototype, "updateHp", void 0);
    DateComponent = __decorate([
        core_1.Component({
            selector: 'date-component',
            templateUrl: './templates/date.component.html',
            styleUrls: ['./css/date.component.css']
        }), 
        __metadata('design:paramtypes', [date_service_1.DateService])
    ], DateComponent);
    return DateComponent;
}());
exports.DateComponent = DateComponent;
//# sourceMappingURL=date.component.js.map