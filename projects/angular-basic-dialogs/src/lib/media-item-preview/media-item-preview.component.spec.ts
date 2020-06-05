import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemPreviewComponent } from './media-item-preview.component';

describe('MediaItemPreviewComponent', () => {
  let component: MediaItemPreviewComponent;
  let fixture: ComponentFixture<MediaItemPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
