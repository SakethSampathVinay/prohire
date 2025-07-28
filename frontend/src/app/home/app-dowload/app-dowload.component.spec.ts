import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDowloadComponent } from './app-dowload.component';

describe('AppDowloadComponent', () => {
  let component: AppDowloadComponent;
  let fixture: ComponentFixture<AppDowloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDowloadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDowloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
