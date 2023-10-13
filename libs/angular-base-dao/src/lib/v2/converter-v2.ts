export abstract class ConverterV2<TI, TM> {
  abstract fromJson(response: TI): TM;
  abstract toJson(model: Partial<TM>): object;
}
