import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureRolefeatureComponent } from './feature-rolefeature.component';

describe('FeatureRolefeatureComponent', () => {
  let component: FeatureRolefeatureComponent;
  let fixture: ComponentFixture<FeatureRolefeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureRolefeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureRolefeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
