import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IAPage } from './ia.page';

describe('IAPage', () => {
  let component: IAPage;
  let fixture: ComponentFixture<IAPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
