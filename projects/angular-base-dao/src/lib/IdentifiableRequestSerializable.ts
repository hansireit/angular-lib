import { Identifiable } from './Identifiable';
import { RequestSerializable } from './RequestSerializable';

export interface IdentifiableRequestSerializable extends Identifiable, RequestSerializable { }