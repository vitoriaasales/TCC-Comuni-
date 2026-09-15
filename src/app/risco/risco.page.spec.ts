import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiscoPage } from './risco.page';

describe('RiscoPage', () => {
  let component: RiscoPage;
  let fixture: ComponentFixture<RiscoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RiscoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
