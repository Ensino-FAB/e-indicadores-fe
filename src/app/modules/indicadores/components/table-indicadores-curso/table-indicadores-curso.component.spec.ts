import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIndicadoresCursoComponent } from './table-indicadores-curso.component';

describe('TableIndicadoresCursoComponent', () => {
  let component: TableIndicadoresCursoComponent;
  let fixture: ComponentFixture<TableIndicadoresCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableIndicadoresCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableIndicadoresCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
