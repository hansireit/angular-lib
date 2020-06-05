import { PickableItem } from "./PickableItem";

export class PickableItemImpl implements PickableItem {
  constructor(
    private _id: string,
    private name: string,
    private keywords: string[],
    private thumbnailUrl: string
  ) {}

  getId(): string {
    return this._id;
  }
  getName(): string {
    return this.name;
  }
  getKeywords(): string[] {
    return this.keywords;
  }
  getThumbnailUrl(): string {
    return this.thumbnailUrl;
  }
}