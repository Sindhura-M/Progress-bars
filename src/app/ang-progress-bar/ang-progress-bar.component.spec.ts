import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/observable/of';
import { of, throwError } from 'rxjs';

import { AngProgressBarComponent } from './ang-progress-bar.component';
import { ProgressBarDataService } from '../progress-bar-data.service';
import { ProgressBarModel } from '../progress-bar-model';

//Test case scenarios for progress bar component

//Test for component fail to load data scenario
describe('AngProgressBarComponent', () => {
  let component: AngProgressBarComponent;
  let fixture: ComponentFixture<AngProgressBarComponent>;

  beforeEach(async(() => {

    const progressBarDataService = jasmine.createSpyObj('progressBarDataService', ['getprogressBarData']);
    const getProgressBarSpy = progressBarDataService.getprogressBarData.and.returnValue(throwError('Error in fetching data'));

    TestBed.configureTestingModule({
      imports: [ HttpClientModule, FormsModule ],
      declarations: [ AngProgressBarComponent ],
      providers:    [ {provide: ProgressBarDataService, useValue: progressBarDataService } ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error - Error in fetching data', async(() => {

    const fixture = TestBed.createComponent(AngProgressBarComponent);
	const compiled = fixture.nativeElement;

	fixture.detectChanges();
	fixture.whenStable().then(() => {
		expect(fixture.debugElement.componentInstance.error).toBe('Error in fetching data');
		expect(compiled.querySelector('.error span').textContent).toContain('Error in fetching data');
	});
  }));

});


//To test component created and functioning scenario
describe('AngProgressBarComponent', () => {
  let component: AngProgressBarComponent;
  let fixture: ComponentFixture<AngProgressBarComponent>;

  
  //creates mock data 
  beforeEach(async(() => {

    const mockdataSource = {
      limit: 130, buttons: [13, 43, -25, -56], bars: [57, 72, 89, 19]
    };

    const progressBarDataService = jasmine.createSpyObj('progressBarDataService', ['getprogressBarData']);
    const getProgressBarSpy = progressBarDataService.getprogressBarData.and.returnValue( of(mockdataSource) );

    TestBed.configureTestingModule({
      imports: [ HttpClientModule, FormsModule ],
      declarations: [ AngProgressBarComponent ],
      providers:    [ {provide: ProgressBarDataService, useValue: progressBarDataService } ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  
  //Emulates the component 
  beforeEach(() => {
    fixture = TestBed.createComponent(AngProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h1 tag', async(() => {
    const fixture = TestBed.createComponent(AngProgressBarComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Angular progress bars demo');
  }));

  it('should render 4 progress bars and 5 controls', async(() => {
	  const fixture = TestBed.createComponent(AngProgressBarComponent);

	  fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;

      expect(component.dataSource).toBeTruthy();
      expect(compiled.querySelectorAll('div.container .first').length).toEqual(4);
      expect(compiled.querySelectorAll('div.container select').length).toEqual(1);
      expect(compiled.querySelectorAll('div.container button').length).toEqual(4);
    });
  }));

  it('should change progressbar 1 with value 57 to 70 when button(13) is clicked', async(() => {
    const fixture = TestBed.createComponent(AngProgressBarComponent);

		fixture.debugElement.componentInstance.selectedBar = '0';
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			const compiled = fixture.nativeElement;
			const button = compiled.querySelectorAll('div.container button');
			const bar = compiled.querySelectorAll('div.container .second');
			
			expect(compiled.querySelector('div.container select').value).toEqual('0');
			
			expect(bar[0].getAttribute('aria-valueNow')).toEqual('57');
			expect(button[0].getAttribute('id')).toEqual('13');

			button[0].click();
			fixture.detectChanges();

			expect(compiled.querySelector('div.container .bar0').getAttribute('aria-valuenow')).toEqual('70');
			expect(bar[0].classList.contains('limit-exceeded')).toBe(false);
		});
  }));
  
  it('should change progressbar 2 with value 72 to 47 when button(-25) is clicked', async(() => {
    const fixture = TestBed.createComponent(AngProgressBarComponent);

		fixture.debugElement.componentInstance.selectedBar = '1';
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			const compiled = fixture.nativeElement;
			const button = compiled.querySelectorAll('div.container button');
			const bar = compiled.querySelectorAll('div.container .second');
			
			expect(compiled.querySelector('div.container select').value).toEqual('1');
			
			expect(bar[1].getAttribute('aria-valueNow')).toEqual('72');
			expect(button[2].getAttribute('id')).toEqual('-25');

			button[2].click();
			fixture.detectChanges();

			expect(compiled.querySelector('div.container .bar1').getAttribute('aria-valuenow')).toEqual('47');
			expect(bar[1].classList.contains('limit-exceeded')).toBe(false);
		});
  }));

  it('should show progress value 0 when value goes below 0', async(() => {
    const fixture = TestBed.createComponent(AngProgressBarComponent);

		fixture.debugElement.componentInstance.selectedBar = '3';
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			const compiled = fixture.nativeElement;
			const button = compiled.querySelectorAll('div.container button');
			const bar = compiled.querySelectorAll('div.container .second');
			
			expect(compiled.querySelector('div.container select').value).toEqual('3');
			
			expect(bar[3].getAttribute('aria-valueNow')).toEqual('19');
			expect(button[3].getAttribute('id')).toEqual('-56');

			button[3].click();
			fixture.detectChanges();

			expect(compiled.querySelector('div.container .bar3').getAttribute('aria-valuemin')).toEqual('0');
			expect(bar[3].classList.contains('limit-exceeded')).toBe(false);
		});
  }));
  
  it('should show progressbar color in red when value goes above limit', async(() => {
    const fixture = TestBed.createComponent(AngProgressBarComponent);

		fixture.debugElement.componentInstance.selectedBar = '2';
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			const compiled = fixture.nativeElement;
			const button = compiled.querySelectorAll('div.container button');
			const bar = compiled.querySelectorAll('div.container .second');
			
			expect(compiled.querySelector('div.container select').value).toEqual('2');
			
			expect(bar[2].getAttribute('aria-valueNow')).toEqual('89');
			expect(button[1].getAttribute('id')).toEqual('43');

			button[1].click();
			fixture.detectChanges();

			expect(compiled.querySelector('div.container .bar2').getAttribute('aria-valuenow')).toEqual('132');
			expect(compiled.querySelector('div.container .bar2').classList.contains('barOverflow')).toBe(true);
		});
	}));

});

