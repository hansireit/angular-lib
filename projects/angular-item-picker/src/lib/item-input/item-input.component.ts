import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SecurityContext
} from "@angular/core";
import { MediaType } from "src/app/enum/MediaType";
import { Media } from "src/app/model/Media";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ConstUtil } from "src/app/Util/ConstUtil";
import { MediaDaoService } from "src/app/services/media-dao.service";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { DetailMode } from "src/app/enum/DetailMode";
import { ItemPickerFrameComponent } from "src/app/item-picker/item-picker-frame/item-picker-frame.component";
import { ItemPickerData } from "src/app/item-picker/ItemPickerData";
import { PickableItem } from "../PickableItem";

@Component({
  selector: "app-item-input",
  templateUrl: "./item-input.component.html",
  styleUrls: ["./item-input.component.sass"]
})
export class ItemInputComponent implements OnInit {
  @Output()
  private itemSelectedEvent: EventEmitter<PickableItem> = new EventEmitter<
    PickableItem
  >();

  @Input()
  public itemThumbnailUrl: string;

  @Input()
  public pickableItemList: PickableItem[];

  // @Input()
  // public set currentMediaId(currentMediaId: string) {
  //   this._currentMediaId = currentMediaId;
  //   this.loadMediaThumbnail();
  // }

  @Input()
  public isEnabled: boolean;

  // private _currentMediaId: string;

  constructor(private matDialog: MatDialog, private sanitizer: DomSanitizer) {
    console.log(this.itemThumbnailUrl);
  }

  ngOnInit() {
    console.log(this.itemThumbnailUrl);
  }

  public selectNewMedia(): void {
    if (!this.isEnabled) {
      return;
    }

    // // load and filter the media-items
    // this.mediaDao.list((newList: Media[]) => {
    //   let mediaList = newList.filter((value: Media) => {
    //     return value.mediaType === this.mediaType;
    //   });
    //});

    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = new ItemPickerData(this.pickableItemList);
    dialogConfig.panelClass = "full-width-dialog";
    this.matDialog
      .open(ItemPickerFrameComponent, dialogConfig)
      .afterClosed()
      .subscribe((data: Media) => {
        if (data != null) {
          // this.currentPickableItem = data;
          // this.mediaThumbnailUrl = data.getThumbnailUrl();
          this.itemSelectedEvent.emit(data);
        } else {
          // this.currentPickableItem = data;
          // this.mediaThumbnailUrl = ConstUtil.gamePlaceholder;
          this.itemSelectedEvent.emit(null);
        }
      });
  }

  public cleanURL(oldURL): SafeUrl {
    return this.sanitizer.sanitize(
      SecurityContext.STYLE,
      "url(" + oldURL + ")"
    );
  }

  // private loadMediaThumbnail(): void {
  //   if (this._currentMediaId != null) {
  //     this.mediaDao.list().then((mediaList: Media[]) => {
  //       const foundMedia = mediaList.find(
  //         pred => pred._id === this._currentMediaId
  //       );
  //       if (foundMedia != null) {
  //         this.mediaThumbnailUrl = foundMedia.getThumbnailUrl();
  //       } else {
  //         this.mediaThumbnailUrl = ConstUtil.gamePlaceholder;
  //       }
  //     });
  //   } else {
  //     this.mediaThumbnailUrl = ConstUtil.gamePlaceholder;
  //   }
  // }
}
