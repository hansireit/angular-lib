import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Media } from 'src/app/model/Media';
import { MediaType } from 'src/app/enum/MediaType';

@Component({
  selector: 'app-media-item-preview',
  templateUrl: './media-item-preview.component.html',
  styleUrls: ['./media-item-preview.component.sass']
})
export class MediaItemPreviewComponent implements OnInit {
  public MediaType = MediaType; // for template use only
  public media: Media;

  constructor(
    private dialogRef: MatDialogRef<MediaItemPreviewComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public mediaItemPreviewData: any
  ) {
    this.media = mediaItemPreviewData.media;
  }

  ngOnInit(): void {

  }

}
