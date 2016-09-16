import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'format'
})

export class FormatPipe implements PipeTransform {
    transform(value, ordinal, sid) {
        if (sid === 'c') {
            return value.toFixed(3);
        }
        if (!isNaN(value) && !ordinal) {
            return value.toFixed(2);
        }
        return value;
    }
}