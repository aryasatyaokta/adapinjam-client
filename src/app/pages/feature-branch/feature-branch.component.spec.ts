import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureBranchComponent } from './feature-branch.component';

describe('FeatureBranchComponent', () => {
  let component: FeatureBranchComponent;
  let fixture: ComponentFixture<FeatureBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureBranchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
