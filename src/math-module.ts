export type CalculationResult = {
  input: number;
  operation: string;
  output: number;
};

export const calculateSquare = (number: number): CalculationResult => {
  return {
    input: number,
    operation: "square",
    output: number * number,
  };
};
