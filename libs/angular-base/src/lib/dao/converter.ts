export abstract class Converter<TI, TM> {
  abstract fromJson(response: TI): TM;
  abstract toJson(model: Partial<TM>): Partial<TI>;
}
