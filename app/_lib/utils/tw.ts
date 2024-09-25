export const tw = <T>(strings: TemplateStringsArray, ...values: T[]) =>
  String.raw({ raw: strings }, ...values)
