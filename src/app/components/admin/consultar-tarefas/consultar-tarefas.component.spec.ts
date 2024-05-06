import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarTarefasComponent } from './consultar-tarefas.component';

describe('ConsultarTarefasComponent', () => {
  let component: ConsultarTarefasComponent;
  let fixture: ComponentFixture<ConsultarTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarTarefasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
