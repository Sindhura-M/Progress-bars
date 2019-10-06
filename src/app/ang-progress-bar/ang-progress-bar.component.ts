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

	//initial value setting
    title: String = 'Angular progress bars demo';
    dataSource: ProgressBarModel;
    selectedBar: number = 0;
    bars: number[];
    error: String[];
	
//fetching data from end point onInit
  ngOnInit() {
    this.progressBarData.getprogressBarData().subscribe( (data: ProgressBarModel) => {
      this.dataSource=data;
      this.bars=data.bars;
    },
      error => {
        this.error = error;
    });
  }
 
 //Getting the selected progressBar 
 @ViewChild('selected', {static: false}) selected: ElementRef;

    ngAfterViewInit() {
        return this.selected.nativeElement.value;
    }

	//Updates new value to selected progress bar
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

