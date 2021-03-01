import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresCadastroContainerComponent } from './indicadores-cadastro-container.component';

describe('IndicadoresCadastroContainerComponent', () => {
  let component: IndicadoresCadastroContainerComponent;
  let fixture: ComponentFixture<IndicadoresCadastroContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadoresCadastroContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresCadastroContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
