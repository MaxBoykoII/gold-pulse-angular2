/* Angular imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';

/* Component imports */
import { DateComponent } from '../components/date.component';
import { ExplorationViewer } from '../components/exploration.viewer';
import { StockTable } from '../components/stock.table';

/* Service imports */
import { DataService } from '../services/data.service';
import { DateService } from '../services/date.service';
import { QuantileService } from '../services/quantile.service';

/* Pipe imports */
import { ShortenPipe } from '../pipes/shorten.pipe';
import { MatchPipe } from '../pipes/match.pipe';
import { SortPipe } from '../pipes/sort.pipe';
import { CustomPercentPipe } from '../pipes/custom-percent.pipe';
import { MetricPipe } from '../pipes/metric.pipe';
import { ThresholdPipe } from '../pipes/threshold.pipe';
import { FormatPipe } from '../pipes/format.pipe';

@NgModule({
    imports: [BrowserModule, 
              FormsModule],
    declarations: [ExplorationViewer, 
                   DateComponent, 
                   StockTable, 
                   ShortenPipe, 
                   MatchPipe, 
                   SortPipe,
                   CustomPercentPipe, 
                   MetricPipe, 
                   ThresholdPipe, 
                   FormatPipe],
    providers: [HTTP_PROVIDERS, 
                DataService, 
                DateService, 
                QuantileService],
    bootstrap: [ExplorationViewer]
})

export class AppModule {}

