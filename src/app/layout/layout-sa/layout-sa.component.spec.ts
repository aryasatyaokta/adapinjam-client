import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSaComponent } from './layout-sa.component';

describe('LayoutSaComponent', () => {
  let component: LayoutSaComponent;
  let fixture: ComponentFixture<LayoutSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
