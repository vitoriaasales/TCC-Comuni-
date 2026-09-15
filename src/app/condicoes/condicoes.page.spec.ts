import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CondicoesPage } from './condicoes.page';

describe('CondicoesPage', () => {
  let component: CondicoesPage;
  let fixture: ComponentFixture<CondicoesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
