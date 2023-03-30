export interface PickableItem {
  getId(): string;
  getName(): string;
  getKeywords(): string[];
  getThumbnailUrl(): string;
}
