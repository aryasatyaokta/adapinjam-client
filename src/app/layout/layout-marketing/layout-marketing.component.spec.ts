import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMarketingComponent } from './layout-marketing.component';

describe('LayoutMarketingComponent', () => {
  let component: LayoutMarketingComponent;
  let fixture: ComponentFixture<LayoutMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutMarketingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
