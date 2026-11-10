import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressoPage } from './progresso.page';

describe('ProgressoPage', () => {
  let component: ProgressoPage;
  let fixture: ComponentFixture<ProgressoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
