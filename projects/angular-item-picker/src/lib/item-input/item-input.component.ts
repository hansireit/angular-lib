import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SecurityContext
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { PickableItem } from '../PickableItem';
import { ItemPickerFrameComponent } from '../item-picker-frame/item-picker-frame.component';
import { ItemPickerData } from '../ItemPickerData';

@Component({
  selector: 'app-item-input',
  templateUrl: './item-input.component.html',
  styleUrls: ['./item-input.component.sass']
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

  @Input()
  public isEnabled: boolean;

  constructor(private matDialog: MatDialog, private sanitizer: DomSanitizer) {}

  ngOnInit() {}

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
    return this.sanitizer.sanitize(
      SecurityContext.STYLE,
      'url(' + oldURL + ')'
    );
  }
}
