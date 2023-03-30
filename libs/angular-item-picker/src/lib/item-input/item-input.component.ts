import { Component, Input, Output, EventEmitter, SecurityContext } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { PickableItem } from '../PickableItem';
import { ItemPickerFrameComponent } from '../item-picker-frame/item-picker-frame.component';
import { ItemPickerData } from '../ItemPickerData';

@Component({
  selector: 'lib-item-input',
  templateUrl: './item-input.component.html',
  styleUrls: ['./item-input.component.scss']
})
export class ItemInputComponent {
  @Input() itemThumbnailUrl: string;
  @Input() isEnabled: boolean;
  @Input() pickableItemList: PickableItem[];
  @Output() itemSelectedEvent = new EventEmitter<PickableItem>();

  constructor(private matDialog: MatDialog, private sanitizer: DomSanitizer) {}

  public selectNewMedia(): void {
    if (!this.isEnabled) {
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = new ItemPickerData(this.pickableItemList);
    dialogConfig.panelClass = 'full-width-dialog';
    this.matDialog
      .open(ItemPickerFrameComponent, dialogConfig)
      .afterClosed()
      .subscribe((data: PickableItem) => {
        if (data != null) {
          this.itemSelectedEvent.emit(data);
        } else {
          this.itemSelectedEvent.emit(null);
        }
      });
  }

  public cleanURL(oldURL): SafeUrl {
    return this.sanitizer.sanitize(SecurityContext.STYLE, 'url(' + oldURL + ')');
  }
}
