import {
    FunctionComponent,
    PropsWithChildren,
    useEffect,
    useReducer,
    useRef,
} from 'react';
import styles from './style.module.scss';
import { Button } from '../button/component';
import classNames from 'classnames';
import { motion } from 'framer-motion';

const PADDING_BOTTOM = 24;

type State = {
    isShown: boolean;
};

enum ActionTypes {
    HIDE = 'HIDE',
    SHOW = 'SHOW',
    TOGGLE = 'TOGGLE',
}

type Action = {
    type: ActionTypes;
    payload: {
        maxHeight: number;
        height: number;
    };
};

function reducer(state: State, action: Action) {
    const {
        type,
        payload: { height, maxHeight },
    } = action;
    switch (type) {
        case ActionTypes.TOGGLE:
            return { isShown: !state.isShown && height > maxHeight };
        case ActionTypes.HIDE:
            return { isShown: height > maxHeight };
        case ActionTypes.SHOW:
            return { isShown: true };
        default:
            return state;
    }
}

type Props = {
    maxHeight: number;
};

export const ShortenContent: FunctionComponent<PropsWithChildren<Props>> = ({
    children,
    maxHeight,
}) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const togglerRef = useRef<HTMLButtonElement>(null);
    const [{ isShown }, dispatch] = useReducer(reducer, {
        isShown: false,
    });

    useEffect(() => {
        const height = mainRef.current?.clientHeight;
        if (!height) return;

        const toggleListener = () =>
            dispatch({
                type: ActionTypes.TOGGLE,
                payload: { height, maxHeight },
            });

        togglerRef.current?.addEventListener('click', toggleListener);

        return () =>
            togglerRef.current?.removeEventListener('click', toggleListener);
    }, [mainRef, dispatch, togglerRef]);

    return (
        <motion.div
            initial={false}
            animate={
                isShown
                    ? { height: 'max-content' }
                    : { height: `${maxHeight - PADDING_BOTTOM}px` }
            }
            layout
            className={classNames(styles['shortener'])}
        >
            <div
                ref={mainRef}
                className={classNames(
                    isShown
                        ? styles['shortener_shown']
                        : styles['shortener_hidden']
                )}
            >
                {children}
            </div>

            <Button
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    left: '50%',
                    translate: '-50%',
                    bottom: 0,
                }}
                ref={togglerRef}
                size='sm'
                color='primary'
            >
                <span style={{ marginRight: '4px' }}>
                    {isShown ? 'скрыть' : 'показать'}
                </span>
                <motion.svg
                    initial={false}
                    animate={isShown ? { rotate: '180deg' } : { rotate: '0' }}
                    width='12'
                    height='8'
                    viewBox='0 0 12 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M5.33344 7.19525L0 1.86181L1.33312 0.528687L6 5.19556L10.6669 0.528687L12 1.86181L6.66656 7.19525C6.48976 7.372 6.25 7.47129 6 7.47129C5.75 7.47129 5.51024 7.372 5.33344 7.19525Z'
                        fill='currentColor'
                    />
                </motion.svg>
            </Button>
        </motion.div>
    );
};
