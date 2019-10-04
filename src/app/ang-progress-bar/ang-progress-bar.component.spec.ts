import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/observable/of';
import { of, throwError } from 'rxjs';

import { AngProgressBarComponent } from './ang-progress-bar.component';
import { ProgressBarDataService } from '../progress-bar-data.service';
import { ProgressBarModel } from '../progress-bar-model';

describe('AngProgressBarComponent', () => {
  let component: AngProgressBarComponent;
  let fixture: ComponentFixture<AngProgressBarComponent>;

  beforeEach(async(() => {

    const progressBarDataService = jasmine.createSpyObj('progressBarDataService', ['getprogressBarData']);
    const getProgressBarSpy = progressBarDataService.getprogressBarData.and.returnValue(throwError('Error in fetching data'));

    TestBed.configureTestingModule({
      imports: [ HttpClientModule, FormsModule ],
      declarations: [ AngProgressBarComponent ],
      providers:    [ {provide: ProgressBarDataService, useValue: progressBarDataService } ]
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

    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;
      //expect(component.error).toBe('Error in fetching data');
      expect(compiled.querySelector('#error').textContent).toContain('Error in fetching data');
    });
  }));

});

describe('AngProgressBarComponent', () => {
  let component: AngProgressBarComponent;
  let fixture: ComponentFixture<AngProgressBarComponent>;

  beforeEach(async(() => {

    const mockdataSource = {
      limit: 180, buttons: [13, 33, -25, -56], bars: [57, 72, 56, 19]
    };

    const progressBarDataService = jasmine.createSpyObj('progressBarDataService', ['getprogressBarData']);
    const getProgressBarSpy = progressBarDataService.getprogressBarData.and.returnValue( of(mockdataSource) );

    TestBed.configureTestingModule({
      imports: [ HttpClientModule, FormsModule ],
      declarations: [ AngProgressBarComponent ],
      providers:    [ {provide: ProgressBarDataService, useValue: progressBarDataService } ]
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

  it('should render title in h1 tag', async(() => {
    const fixture = TestBed.createComponent(AngProgressBarComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Angular progress bars demo');
  }));

  it('should render 4 progress bars and 5 controls', async(() => {
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;

      expect(component.dataSource).toBeTruthy();
      expect(compiled.querySelectorAll('div.container .first').length).toEqual(4);
      expect(compiled.querySelectorAll('div.container select').length).toEqual(1);
      expect(compiled.querySelectorAll('div.container button').length).toEqual(4);
    });
  }));

  it('should change progressbar 1 with value 57 to 70 when button(13) is clicked', async(() => {
    //const fixture = TestBed.createComponent(BarsComponent);
    //const app = fixture.debugElement.componentInstance;

    component.selectedBar = 1;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;

      const bar = compiled.querySelector('div.container .second #progressBar1');
      const button = compiled.querySelectorAll('div.container .button');

      expect(compiled.querySelector('div.container select').value).toEqual('Progress Bar1');
      expect(bar.getAttribute('aria-valueNow')).toEqual('57');
      expect(button[1].getAttribute('id')).toEqual('13');

      button[1].click();
      fixture.detectChanges();

      expect(compiled.querySelector('div.container .second #progressBar1').getAttribute('aria-valueNow')).toEqual('70');
      expect(bar.classList.contains('barOverflow')).toBe(false);
    });
  }));

  it('should change progressbar 2 with value 72 to 47 when button(-25) is clicked', async(() => {
    //const fixture = TestBed.createComponent(BarsComponent);
    //const app = fixture.debugElement.componentInstance;

    component.selectedBar = 2;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;

      const bar = compiled.querySelector('div.container .second #progressBar2');
      const button = compiled.querySelectorAll('div.container .button');

      expect(compiled.querySelector('div.container select').value).toEqual('Progress Bar2');
      expect(bar.getAttribute('aria-valueNow')).toEqual('72');
      expect(button[3].getAttribute('id')).toEqual('-25');

      button[3].click();
      fixture.detectChanges();

      expect(compiled.querySelector('div.container .second #progressBar2').getAttribute('aria-valueNow')).toEqual('47');
      expect(bar.classList.contains('barOverflow')).toBe(false);
    });
  }));

  it('should show progress value 0 when value goes below 0', async(() => {
    //const fixture = TestBed.createComponent(BarsComponent);
    //const app = fixture.debugElement.componentInstance;

    component.selectedBar = 4;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;

      const bar = compiled.querySelector('div.container .second #progressBar4');
      const button = compiled.querySelectorAll('div.container .button');

      expect(compiled.querySelector('div.container select').value).toEqual('Progress Bar4');
      expect(bar.getAttribute('aria-valueNow')).toEqual('19');
      expect(button[4].getAttribute('id')).toEqual('-56');

      button[4].click();
      fixture.detectChanges();

      expect(compiled.querySelector('div.container .second #progressBar4').getAttribute('aria-valueNow')).toEqual('0');
      expect(bar.classList.contains('barOverflow')).toBe(false);
    });
  }));

  it('should show progressbar 2 color in red value goes above limit', async(() => {
    //const fixture = TestBed.createComponent(BarsComponent);
    //const app = fixture.debugElement.componentInstance;

    component.selectedBar = 2;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;

      const bar = compiled.querySelector('div.container .second #progressBar2');
      const button = compiled.querySelectorAll('div.container .button');

      expect(compiled.querySelector('div.container select').value).toEqual('Progress Bar2');
      expect(bar.getAttribute('aria-valueNow')).toEqual('72');
      expect(button[2].getAttribute('id')).toEqual('33');

      button[2].click();
      fixture.detectChanges();

      expect(compiled.querySelector('div.container .second #progressBar2').getAttribute('aria-valueNow')).toEqual('0');
      expect(bar.classList.contains('barOverflow')).toBe(true);
    });
  }));
});

