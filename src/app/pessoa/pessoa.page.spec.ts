import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PessoaPage } from './pessoa.page';

describe('PessoaPage', () => {
  let component: PessoaPage;
  let fixture: ComponentFixture<PessoaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
