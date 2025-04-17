import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBoComponent } from './layout-bo.component';

describe('LayoutBoComponent', () => {
  let component: LayoutBoComponent;
  let fixture: ComponentFixture<LayoutBoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutBoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
