import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordCustComponent } from './reset-password-cust.component';

describe('ResetPasswordCustComponent', () => {
  let component: ResetPasswordCustComponent;
  let fixture: ComponentFixture<ResetPasswordCustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordCustComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
