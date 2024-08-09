import { DEFAULT_HANDLE_AFTER, DEFAULT_HANDLE_FOR } from './index.constants';
import { HandleLongRequestConfig } from './index.types';

export function throttle<Args>(func: (args?: Args) => void, delay: number) {
    let timeFlag: NodeJS.Timeout | null = null;
    let lastCall: Args | undefined = undefined;
    let debounce = false;
    // let prevLastCall: Args = null;

    return (args?: Args) => {
        const withTimeFlag = timeFlag !== null;

        if (!withTimeFlag) {
            debounce = false;
            timeFlag = setTimeout(() => {
                timeFlag = null;

                if (debounce) {
                    debounce = false;
                    func(lastCall);
                }
            }, delay);

            func(args);
        }

        if (withTimeFlag) {
            debounce = true;
            lastCall = args;
        }
    };
}

export function handleLongRequest<Args, Return>(
    request: (args?: Args) => Promise<Return>,
    handleLongFunc: () => void,
    stopHandleFunc: () => void,
    {
        handleAfter,
        handleFor,
        thenFunc,
        catchFunc,
    }: HandleLongRequestConfig<Return> = {}
) {
    let timeFlag: NodeJS.Timeout | null = null;
    let isRequestCompleted = false;

    return (args?: Args) => {
        if (timeFlag === null) {
            timeFlag = setTimeout(() => {
                timeFlag = null;
                if (!isRequestCompleted) {
                    handleLongFunc();
                }
            }, handleAfter ?? DEFAULT_HANDLE_AFTER);

            request(args)
                .then((response: Return) => {
                    isRequestCompleted = true;

                    // if animation started
                    if (timeFlag === null) {
                        setTimeout(() => {
                            stopHandleFunc();
                            if (thenFunc) {
                                thenFunc(response);
                            }
                        }, handleFor ?? DEFAULT_HANDLE_FOR);
                    }

                    if (timeFlag !== null) {
                        stopHandleFunc();
                        if (thenFunc) thenFunc(response);
                    }
                })
                .catch((response: Return) => {
                    stopHandleFunc();
                    if (catchFunc) catchFunc(response);
                });
        }
    };
}
