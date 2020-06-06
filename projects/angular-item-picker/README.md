# AngularItemPicker
A Angular-Material library with components to display and pick items from a PickableItem-list.

## Usage
- **npm install angular-item-picker**
- create a __PickableItem__
    - a) create a list of __PickableItemImpl__
    - b) or implement __PickableItem__ on your subject
- use the components
    - a) **ItemInput** is a input-field which opens the **ItemPickerFrame** and emits the new selected item
    - b) **ItemPickerFrame** is opend by a Dialog, it receives the ItemPickerData from the dialog-data and retuns the picked item to the dialog-close-event