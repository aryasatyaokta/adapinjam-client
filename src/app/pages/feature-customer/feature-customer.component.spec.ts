import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCustomerComponent } from './feature-customer.component';

describe('FeatureCustomerComponent', () => {
  let component: FeatureCustomerComponent;
  let fixture: ComponentFixture<FeatureCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
