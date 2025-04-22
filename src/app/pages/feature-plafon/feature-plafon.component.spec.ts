import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePlafonComponent } from './feature-plafon.component';

describe('FeaturePlafonComponent', () => {
  let component: FeaturePlafonComponent;
  let fixture: ComponentFixture<FeaturePlafonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePlafonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturePlafonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
