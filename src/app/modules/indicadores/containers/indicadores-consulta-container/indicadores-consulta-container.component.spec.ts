import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresConsultaContainerComponent } from './indicadores-consulta-container.component';

describe('IndicadoresConsultaContainerComponent', () => {
  let component: IndicadoresConsultaContainerComponent;
  let fixture: ComponentFixture<IndicadoresConsultaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadoresConsultaContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresConsultaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
