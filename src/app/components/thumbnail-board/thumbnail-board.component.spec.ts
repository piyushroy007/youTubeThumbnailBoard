import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailBoardComponent } from './thumbnail-board.component';

describe('ThumbnailBoardComponent', () => {
  let component: ThumbnailBoardComponent;
  let fixture: ComponentFixture<ThumbnailBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThumbnailBoardComponent]
    });
    fixture = TestBed.createComponent(ThumbnailBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
