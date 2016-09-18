"use strict";
var _ = require('lodash');
var Stock = (function () {
    function Stock(oids) {
        _.assign(this, oids);
    }
    Stock.prototype.setCloses = function (futureDates, dates, currentDate) {
        var closes = [];
        var _loop_1 = function(ymd) {
            var id = this_1.id;
            var close_1 = this_1.c;
            var oid = dates.find(function (date) { return date.ymd === ymd; }).oids.find(function (oid) { return oid.id === id; });
            var f = 1;
            if (oid && oid.rb) {
                var timestampRef = Date.parse(currentDate);
                var rollbacks = oid.rb;
                for (var _i = 0, rollbacks_1 = rollbacks; _i < rollbacks_1.length; _i++) {
                    var rollback = rollbacks_1[_i];
                    if (Date.parse(rollback.d) > timestampRef) {
                        f = f * rollback.f;
                    }
                }
            }
            var futureClose = oid ? oid.c : 'NA';
            var change = (!isNaN(close_1) && close_1 !== 0 && !isNaN(futureClose)) ?
                (((futureClose - (close_1 * f)) / (close_1 * f)) * 100).toFixed(1) + "%" :
                'NA';
            closes.push({
                ymd: ymd,
                close: futureClose,
                f: f,
                change: change
            });
        };
        var this_1 = this;
        for (var _a = 0, futureDates_1 = futureDates; _a < futureDates_1.length; _a++) {
            var ymd = futureDates_1[_a];
            _loop_1(ymd);
        }
        this.closes = closes;
    };
    Stock.prototype.modifySpread = function (futureDates, spread) {
        var dollarSpread = spread / 100;
        var close = this.c;
        var oldCloses = this.closes;
        var newCloses = [];
        var _loop_2 = function(ymd) {
            var date = oldCloses.find(function (date) { return date.ymd === ymd; });
            if (!isNaN(date.close) && !isNaN(close) && (close + dollarSpread) > 0) {
                var modifiedClose = (close + dollarSpread) * date.f;
                var modifiedFutureClose = Math.max(date.close - dollarSpread, 0);
                var change = (((modifiedFutureClose - modifiedClose) / modifiedClose) * 100).toFixed(1) + "%";
                date.change = change;
            }
            newCloses.push(date);
        };
        for (var _i = 0, futureDates_2 = futureDates; _i < futureDates_2.length; _i++) {
            var ymd = futureDates_2[_i];
            _loop_2(ymd);
        }
        this.closes = newCloses;
    };
    Stock.prototype.meanReturn = function () {
        var sum = 0, count = 0;
        for (var _i = 0, _a = this.closes; _i < _a.length; _i++) {
            var day = _a[_i];
            var change = parseFloat(day.change);
            if (!isNaN(change)) {
                sum += change;
                count++;
            }
        }
        return sum / count;
    };
    Stock.sort = function (stocks, sid, metaDefs) {
        if (sid) {
            var metaDef = metaDefs.find(function (mdef) { return mdef.sid === sid; });
            var reverse = metaDef.is_rev_sort;
            var alpha_1 = (sid === 'n' || sid === 't' || reverse) ? 1 : -1;
            if (stocks && stocks.length && sid) {
                stocks.sort(function (s1, s2) {
                    var a = s1[sid], b = s2[sid];
                    if (a < b) {
                        return -1 * alpha_1;
                    }
                    else if (a > b) {
                        return 1 * alpha_1;
                    }
                    else {
                        return 0;
                    }
                });
            }
        }
        return stocks;
    };
    Stock.filter = function (stocks, thresholds) {
        var copy = stocks.slice();
        var _loop_3 = function(threshold) {
            var sid = threshold.sid;
            var val = threshold.val;
            var sign = threshold.sign;
            switch (sign) {
                case 'gt':
                    _.remove(copy, function (stock) { return stock[sid] < val; });
                    break;
                case 'lt':
                    _.remove(copy, function (stock) { return stock[sid] > val; });
                    break;
                case 'eq':
                    _.remove(copy, function (stock) { return stock[sid] !== val; });
            }
        };
        for (var _i = 0, thresholds_1 = thresholds; _i < thresholds_1.length; _i++) {
            var threshold = thresholds_1[_i];
            _loop_3(threshold);
        }
        return copy;
    };
    return Stock;
}());
exports.Stock = Stock;
//# sourceMappingURL=stock.js.map