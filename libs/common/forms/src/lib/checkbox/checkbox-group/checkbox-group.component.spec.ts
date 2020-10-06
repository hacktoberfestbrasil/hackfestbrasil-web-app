import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackfestCheckboxGroupComponent } from './checkbox-group.component';

describe('HackfestCheckboxGroupComponent', () => {
  let component: HackfestCheckboxGroupComponent;
  let fixture: ComponentFixture<HackfestCheckboxGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HackfestCheckboxGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HackfestCheckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
