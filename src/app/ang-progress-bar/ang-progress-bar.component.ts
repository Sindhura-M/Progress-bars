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
    dataSource: ProgressBarModel[];
    selectedBar: number = 1;

  ngOnInit() {
    this.progressBarData.getprogressBarData().subscribe( data => {
      this.dataSource=data;
    });
  }

  @ViewChild('barSelect', {static: false}) barSelect: ElementRef;

    ngAfterViewInit() {
        return this.barSelect.nativeElement.value;
    }

  btnClick(buttonValue: any) {
    this.selectedBar = this.ngAfterViewInit();
    let progress = this.dataSource.bars[this.selectedBar] + buttonValue;

    if (progress > 0) {
      this.dataSource.bars[this.selectedBar] = progress;
      let x = this.dataSource.limit;
    } else {
      this.dataSource.bars[this.selectedBar] = 0;
    }
  }
}

