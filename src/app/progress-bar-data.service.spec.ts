import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { throwError } from 'rxjs';
import { ProgressBarModel } from './progress-bar-model';
import { ProgressBarDataService } from './progress-bar-data.service';

describe('ProgressBarDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  const mockdataSource = {
		limit: 180,
		buttons: [13, 33, -25, -56],
		bars: [57, 72, 56, 19]
	};

	const bars = jasmine.createSpyObj('bars', ['getprogressBarData']);
	const getprogressBarDataSpy = bars.getprogressBarData.and.returnValue( of(mockdataSource) );

	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			HttpClientModule
		],
		providers: [
			{
				provide: ProgressBarDataService,
				useValue: bars
			}
		]
	}));

  it('should be created', () => {
    const service: ProgressBarDataService = TestBed.get(ProgressBarDataService);
    expect(service).toBeTruthy();
  });

  it('should return bars data', async(() => {
		const service: ProgressBarDataService = TestBed.get(ProgressBarDataService);
		service.getprogressBarData().subscribe((data: ProgressBarModel) => {
			expect(data.limit).toBe(180);
			expect(data.buttons.length).toBe(4);
			expect(data.bars.length).toBe(4);
		});
	}));

});
