export type HandleLongRequestConfig<Return> = {
    handleAfter?: number;
    handleFor?: number;
    thenFunc?: (args?: Return) => void;
    catchFunc?: (args?: Return) => void;
};
