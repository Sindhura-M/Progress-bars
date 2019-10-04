import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { of, throwError } from 'rxjs';
import { ProgressBarModel } from './progress-bar-model';
import { ProgressBarDataService } from './progress-bar-data.service';

describe('ProgressBarDataService', () => {
  beforeEach(async(() => TestBed.configureTestingModule({})));

  const mockdataSource = {
		limit: 180,
		buttons: [13, 33, -25, -56],
		bars: [57, 72, 56, 19]
	};

	const bars = jasmine.createSpyObj('bars', ['getprogressBarData']);
	const getprogressBarDataSpy = bars.getprogressBarData.and.returnValue( of(mockdataSource) );

	beforeEach(async(() => TestBed.configureTestingModule({
		imports: [ HttpClientModule ],
		providers: [{ provide: ProgressBarDataService,useValue: bars }]
	})));

  it('should be created', () => {
    const service: ProgressBarDataService = TestBed.get(ProgressBarDataService);
    expect(service).toBeTruthy();
  });

  it('should return bars data', async(() => {
		const service: ProgressBarDataService = TestBed.get(ProgressBarDataService);
		service.getprogressBarData().subscribe( (pBarData: ProgressBarModel) => {
			console.log('pBarData' + pBarData);
			expect(pBarData.limit).toBe(180);
			expect(pBarData.buttons.length).toBe(4);
			expect(pBarData.bars.length).toBe(4);
		});
	}));

});
