import { Component, OnInit, Inject, SecurityContext } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ItemPickerData } from '../ItemPickerData';
import { PickableItem } from '../PickableItem';

@Component({
  selector: 'lib-item-picker-frame',
  templateUrl: './item-picker-frame.component.html',
  styleUrls: ['./item-picker-frame.component.scss']
})
export class ItemPickerFrameComponent implements OnInit {
  filteredPickableItems: PickableItem[] = [];

  constructor(
    private dialogRef: MatDialogRef<ItemPickerFrameComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public itemPickerData: ItemPickerData
  ) {
    if (itemPickerData == null || itemPickerData.pickerItems == null) {
      dialogRef.close();
      throw 'Item Picker Data is undefined, please add MAT_DIALOG_DATA';
    }
  }

  ngOnInit(): void {
    this.filteredPickableItems.push(...this.itemPickerData.pickerItems);
  }

  public pickItem(item: PickableItem): void {
    this.dialogRef.close(item);
  }

  public removeItem(): void {
    this.dialogRef.close(null);
  }

  public cleanURL(oldURL: string): SafeUrl | null{
    return this.sanitizer.sanitize(SecurityContext.STYLE, 'url(' + oldURL + ')');
  }

  public applyFilter(event: string): void {
    if (event !== '') {
      this.filteredPickableItems = this.itemPickerData.pickerItems.filter((item: PickableItem) => {
        let matched = false;

        if (item.getName().toLowerCase().includes(event.toLowerCase())) {
          matched = true;
        } else {
          item.getKeywords().forEach((keyword: string) => {
            if (keyword.toLowerCase().includes(event.toLowerCase())) {
              matched = true;
            }
          });
        }

        return matched;
      });
    } else {
      this.filteredPickableItems = [];
      this.filteredPickableItems.push(...this.itemPickerData.pickerItems);
    }
  }
}
