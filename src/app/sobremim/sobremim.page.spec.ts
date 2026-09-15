import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SobremimPage } from './sobremim.page';

describe('SobremimPage', () => {
  let component: SobremimPage;
  let fixture: ComponentFixture<SobremimPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SobremimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
