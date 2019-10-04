import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ProgressBarDataService } from '../progress-bar-data.service';
import { ProgressBarModel } from '../progress-bar-model';

@Component({
  selector: 'app-ang-progress-bar',
  templateUrl: './ang-progress-bar.component.html',
  styleUrls: ['./ang-progress-bar.component.scss']
})
export class AngProgressBarComponent implements OnInit, AfterViewInit {

    constructor( private progressBarData: ProgressBarDataService) { }

    title: String = 'Angular progress bars demo';
    dataSource: ProgressBarModel;
    selectedBar: number = 1;
    bars: number[];
    error: String[];

  ngOnInit() {
    this.progressBarData.getprogressBarData().subscribe( (data: ProgressBarModel) => {
      this.dataSource=data;
      this.bars=data.bars;
    },
      error => {
        this.error = error;
    });
  }

  @ViewChild('barSelect', {static: false}) barSelect: ElementRef;

    ngAfterViewInit() {
        return this.barSelect.nativeElement.value;
    }

  btnClick(buttonValue: any) {
    this.selectedBar = this.ngAfterViewInit();
    let progress = this.bars[this.selectedBar] + buttonValue;

    if (progress > 0) {
      this.bars[this.selectedBar] = progress;
    } else {
      this.bars[this.selectedBar] = 0;
    }
  }
}

