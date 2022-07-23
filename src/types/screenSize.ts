
export type BreakPointNames = "xs" | "sm" | "md" | "lg" | "xl";

export type BreakPointsType = {
  [Key in BreakPointNames] : number;
}
