import { Component, OnInit, Inject, SecurityContext } from "@angular/core";
import { Media } from "src/app/model/Media";
import { MediaDaoService } from "src/app/services/media-dao.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MediaType } from "src/app/enum/MediaType";
import { Util } from "src/app/Util/util";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-media-picker",
  templateUrl: "./media-picker.component.html",
  styleUrls: ["./media-picker.component.sass"]
})
export class MediaPickerComponent implements OnInit {
  public mediaType: MediaType;
  public filteredMediaList: Media[] = [];
  private mediaList: Media[] = [];

  constructor(
    private mediaDao: MediaDaoService,
    private dialogRef: MatDialogRef<MediaPickerComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public mediaPickerData: any
  ) {
    this.mediaType = mediaPickerData.mediaType;
  }

  ngOnInit() {
    this.mediaDao.list((newList: Media[]) => {
      this.mediaList = newList.filter((value: Media) => {
        return value.mediaType === this.mediaType;
      });

      this.filteredMediaList.push(...this.mediaList);
    });
  }

  public choseMedia(media: Media): void {
    this.dialogRef.close(media);
  }

  public removeMedia(): void {
    this.dialogRef.close(null);
  }

  public cleanURL(oldURL): SafeUrl {
    return this.sanitizer.sanitize(
      SecurityContext.STYLE,
      "url(" + oldURL + ")"
    );
  }

  public applyFilter(event: string): void {
    if (event !== "") {
      this.filteredMediaList = this.mediaList.filter((media: Media) => {
        if (media.name.toLowerCase().includes(event.toLowerCase())) {
          return true;
        }

        if (
          media.description != null &&
          media.description.toLowerCase().includes(event.toLowerCase())
        ) {
          return true;
        }

        return false;
      });
    } else {
      this.filteredMediaList = [];
      this.filteredMediaList.push(...this.mediaList);
    }
  }

  // getters
  get mediaTypeString(): string {
    return Util.getMediaStringByMediaType(this.mediaType);
  }
}
