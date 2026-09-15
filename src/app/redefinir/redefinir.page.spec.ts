import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedefinirPage } from './redefinir.page';

describe('RedefinirPage', () => {
  let component: RedefinirPage;
  let fixture: ComponentFixture<RedefinirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RedefinirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
