import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModPasseComponent } from './mod-passe.component';

describe('ModPasseComponent', () => {
  let component: ModPasseComponent;
  let fixture: ComponentFixture<ModPasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModPasseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModPasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
