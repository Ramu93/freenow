import { useMemo, useEffect } from "react";

type FunctionParam = () => void;

export const useComponentDidMount = (func: FunctionParam) =>
  useEffect(func, []);

export const useComponentDidUpdate = (func: FunctionParam) => useEffect(func);

export const useComponentWillUnmount = (func: FunctionParam) =>
  useEffect(() => {
    return func;
  }, []);
