import { useMemo, useEffect } from "react";

type FunctionParam = () => void;

export const useComponentDidMount = (func: FunctionParam) =>
  useEffect(func, []);


