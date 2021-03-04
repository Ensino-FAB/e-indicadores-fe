import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomadosListComponent } from './diplomados-list.component';

describe('DiplomadosListComponent', () => {
  let component: DiplomadosListComponent;
  let fixture: ComponentFixture<DiplomadosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomadosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
