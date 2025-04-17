import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBmComponent } from './layout-bm.component';

describe('LayoutBmComponent', () => {
  let component: LayoutBmComponent;
  let fixture: ComponentFixture<LayoutBmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutBmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
