export class ProgressBarModel {
  	bars: number[];
	buttons: number[];
  	limit: number;
  	constructor(bars:number[], buttons:number[], limit:number){
	  	this.bars= bars;
	  	this.buttons= buttons;
	  	this.limit= limit;
	}
}
