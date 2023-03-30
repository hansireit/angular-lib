export interface IConverter<TI, TM> {
  fromJson(response: TI): TM;
  toJson(model: TM): unknown;
}
