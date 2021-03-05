import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIndicadoresOmComponent } from './table-indicadores-om.component';

describe('TableIndicadoresOmComponent', () => {
  let component: TableIndicadoresOmComponent;
  let fixture: ComponentFixture<TableIndicadoresOmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableIndicadoresOmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableIndicadoresOmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
