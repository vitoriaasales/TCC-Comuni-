import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OcorrenciasPage } from './ocorrencias.page';

describe('OcorrenciasPage', () => {
  let component: OcorrenciasPage;
  let fixture: ComponentFixture<OcorrenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OcorrenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
