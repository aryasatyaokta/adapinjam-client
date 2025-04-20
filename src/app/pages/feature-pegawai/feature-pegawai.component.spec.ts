import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePegawaiComponent } from './feature-pegawai.component';

describe('FeaturePegawaiComponent', () => {
  let component: FeaturePegawaiComponent;
  let fixture: ComponentFixture<FeaturePegawaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePegawaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturePegawaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
