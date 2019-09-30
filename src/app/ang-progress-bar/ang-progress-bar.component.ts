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

    title: String = 'Angular progress bar';
    dataSource: ProgressBarModel[];
    bars: number[];

 	ngOnInit() {

    this.progressBarData.getprogressBarData().subscribe( data => {
      this.dataSource=data;
      //this.bars = data.bars;
    });
  }

  @ViewChild('barSelect') barSelect: ElementRef;

    ngAfterViewInit() {
        console.log(this.barSelect.nativeElement.value);
        return this.barSelect.nativeElement.value;
    }

  selectedBar: any;

  btnClick(e, buttonValue: any) {
    this.selectedBar = this.ngAfterViewInit();
    console.log(this.selectedBar + 'this.selectedBar');

    let progress = this.dataSource.bars[this.selectedBar] + buttonValue;

    if (progress > 0) {
      this.barData.bars[this.selectedBar] = progress/10;
    } else {
      this.barData.bars[this.selectedBar] = 0;
    }
  }
}
