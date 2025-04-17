import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkunMarketingComponent } from './akun-marketing.component';

describe('AkunMarketingComponent', () => {
  let component: AkunMarketingComponent;
  let fixture: ComponentFixture<AkunMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AkunMarketingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AkunMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
