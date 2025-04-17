import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPengajuanMarketingComponent } from './history-pengajuan-marketing.component';

describe('HistoryPengajuanMarketingComponent', () => {
  let component: HistoryPengajuanMarketingComponent;
  let fixture: ComponentFixture<HistoryPengajuanMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryPengajuanMarketingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPengajuanMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
