import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackfestCheckboxItemComponent } from './checkbox-item.component';

describe('HackfestCheckboxItemComponent', () => {
  let component: HackfestCheckboxItemComponent;
  let fixture: ComponentFixture<HackfestCheckboxItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HackfestCheckboxItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HackfestCheckboxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
