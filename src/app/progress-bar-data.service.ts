import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { throwError } from 'rxjs';
import { ProgressBarModel } from './progress-bar-model';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarDataService {

	constructor( private client: HttpClient ) { }

  	private _url: string = 'http://pb-api.herokuapp.com/bars';

 	 getprogressBarData(): Observable<ProgressBarModel> {

  		return this.client.get<ProgressBarModel>(this._url)
  		.pipe(
	       catchError(this.handleError)
	     );
  	}

  	handleError(error) {
		  return throwError(error);
	}
}
