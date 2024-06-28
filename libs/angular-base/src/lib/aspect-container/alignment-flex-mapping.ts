import { HorizontalAlignment } from './horizontal-alignment';
import { VerticalAlignment } from './vertical-alignment';

type FlexAlignment = 'center' | 'flex-start' | 'flex-end';

export const alignmentFlexMapping = new Map<HorizontalAlignment | VerticalAlignment, FlexAlignment>([
  ['center', 'center'],
  ['left', 'flex-start'],
  ['right', 'flex-end'],
  ['right', 'flex-end'],
  ['top', 'flex-start'],
  ['bottom', 'flex-end'],
]);
