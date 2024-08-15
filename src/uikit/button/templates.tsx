import { FunctionComponent } from 'react';
import { Button, ButtonProps } from './component';
import { motion, SVGMotionProps } from 'framer-motion';

export const PlusButton: FunctionComponent<ButtonProps> = (props) => {
    return (
        <Button
            square
            {...props}
        >
            <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M6 1V11M1 6H11'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </Button>
    );
};

export const MinusButton: FunctionComponent<ButtonProps> = (props) => {
    return (
        <Button
            square
            {...props}
        >
            <svg
                width='12'
                height='2'
                viewBox='0 0 12 2'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M1 1H11'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </Button>
    );
};

const AnimatedMenuSvg: FunctionComponent<SVGMotionProps<SVGPathElement>> = (
    props
) => {
    return (
        <motion.path
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
            stroke='currentColor'
            {...props}
        />
    );
};

interface MenuButtonProps extends ButtonProps {
    isShown: boolean;
}

export const MenuButton: FunctionComponent<MenuButtonProps> = ({
    isShown,
    ...props
}) => {
    return (
        <Button
            initial={false}
            animate={isShown ? 'opened' : 'closed'}
            {...props}
        >
            <svg
                width='28'
                height='28'
                viewBox='0 0 22 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <AnimatedMenuSvg
                    variants={{
                        closed: { d: 'M 2 2.5 L 20 2.5' },
                        opened: { d: 'M 3 16.5 L 17 2.5' },
                    }}
                />
                <AnimatedMenuSvg
                    d='M 2 9.423 L 20 9.423'
                    variants={{
                        closed: { opacity: 1 },
                        opened: { opacity: 0 },
                    }}
                    transition={{ duration: 0.1 }}
                />
                <AnimatedMenuSvg
                    variants={{
                        closed: { d: 'M 2 16.346 L 20 16.346' },
                        opened: { d: 'M 3 2.5 L 17 16.346' },
                    }}
                />
            </svg>
        </Button>
    );
};

interface EyeButtonProps extends ButtonProps {
    isOpened: boolean;
}

export const EyeButton: FunctionComponent<EyeButtonProps> = ({
    isOpened,
    type,
    ...props
}) => {
    return (
        <Button
            {...props}
            type='button'
        >
            {isOpened ? (
                <svg
                    width='22'
                    height='16'
                    viewBox='0 0 22 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M21.913 7.58148C21.8812 7.51188 21.1284 5.84039 19.4655 4.1775C17.2406 1.95602 14.4364 0.78125 11.3427 0.78125C8.24893 0.78125 5.44479 1.95602 3.22245 4.1775C1.55956 5.84039 0.806746 7.51188 0.772371 7.58148C0.714151 7.71348 0.684082 7.85616 0.684082 8.00043C0.684082 8.1447 0.714151 8.28738 0.772371 8.41938C0.804168 8.48984 1.55698 10.1605 3.22073 11.8234C5.44479 14.0448 8.24893 15.2188 11.3427 15.2188C14.4364 15.2188 17.2406 14.0448 19.4621 11.8234C21.1258 10.1605 21.8786 8.48984 21.9104 8.41938C21.969 8.28756 21.9996 8.14497 22 8.0007C22.0004 7.85644 21.9708 7.71366 21.913 7.58148ZM17.9547 10.4174C16.1096 12.2341 13.8856 13.1562 11.3427 13.1562C8.79979 13.1562 6.57573 12.2341 4.73323 10.4166C4.00825 9.69915 3.3846 8.88612 2.87956 8C3.38475 7.11424 4.00839 6.30151 4.73323 5.5843C6.57659 3.76586 8.79979 2.84375 11.3427 2.84375C13.8856 2.84375 16.1088 3.76586 17.9521 5.5843C18.6771 6.30144 19.3007 7.11418 19.8058 8C19.3007 8.88606 18.677 9.69908 17.9521 10.4166L17.9547 10.4174ZM11.3427 4.21875C10.5948 4.21875 9.86376 4.44052 9.24193 4.85601C8.62011 5.27149 8.13546 5.86204 7.84926 6.55298C7.56307 7.24391 7.48819 8.00419 7.63409 8.73768C7.77999 9.47118 8.14012 10.1449 8.66894 10.6737C9.19775 11.2026 9.87151 11.5627 10.605 11.7086C11.3385 11.8545 12.0988 11.7796 12.7897 11.4934C13.4806 11.2072 14.0712 10.7226 14.4867 10.1007C14.9022 9.47893 15.1239 8.74786 15.1239 8C15.1228 6.9975 14.7241 6.03638 14.0152 5.32751C13.3063 4.61863 12.3452 4.21989 11.3427 4.21875ZM11.3427 9.71875C11.0027 9.71875 10.6704 9.61795 10.3878 9.42909C10.1052 9.24023 9.88485 8.9718 9.75477 8.65774C9.62468 8.34368 9.59064 7.99809 9.65696 7.66469C9.72328 7.33128 9.88697 7.02503 10.1273 6.78466C10.3677 6.54429 10.674 6.38059 11.0074 6.31428C11.3408 6.24796 11.6864 6.28199 12.0004 6.41208C12.3145 6.54217 12.5829 6.76247 12.7718 7.04511C12.9606 7.32776 13.0614 7.66006 13.0614 8C13.0614 8.45584 12.8804 8.89301 12.558 9.21534C12.2357 9.53767 11.7985 9.71875 11.3427 9.71875Z'
                        fill='currentColor'
                    />
                </svg>
            ) : (
                <svg
                    width='19'
                    height='10'
                    viewBox='0 0 19 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M18.4288 6.20049C18.4965 6.31809 18.5404 6.44787 18.5579 6.58242C18.5755 6.71698 18.5664 6.85367 18.5311 6.98471C18.4958 7.11574 18.4351 7.23854 18.3524 7.3461C18.2696 7.45366 18.1665 7.54387 18.0489 7.61159C17.9313 7.6793 17.8016 7.72319 17.667 7.74074C17.5324 7.7583 17.3958 7.74918 17.2647 7.71391C17.1337 7.67864 17.0109 7.6179 16.9033 7.53517C16.7958 7.45244 16.7056 7.34934 16.6378 7.23174L15.1889 4.69659C14.3804 5.20519 13.5088 5.60563 12.5962 5.88768L13.0508 8.60674C13.0955 8.87648 13.0313 9.15293 12.8722 9.37532C12.7132 9.59771 12.4723 9.74783 12.2026 9.79268C12.1459 9.80278 12.0884 9.80767 12.0307 9.80729C11.7872 9.80704 11.5516 9.72062 11.3657 9.56333C11.1798 9.40604 11.0555 9.18803 11.015 8.94791L10.5724 6.30104C9.71391 6.39614 8.84756 6.39614 7.98909 6.30104L7.55081 8.95049C7.51017 9.1909 7.38567 9.40914 7.1994 9.56646C7.01312 9.72379 6.77713 9.81003 6.53331 9.80987C6.47569 9.81024 6.41816 9.80536 6.36144 9.79526C6.22786 9.77276 6.10003 9.72417 5.98524 9.65227C5.87045 9.58036 5.77095 9.48654 5.69242 9.37617C5.61389 9.26581 5.55788 9.14105 5.52757 9.00903C5.49727 8.87701 5.49327 8.74031 5.51581 8.60674L5.97042 5.8808C5.05785 5.59875 4.18618 5.19831 3.37769 4.68971L1.92878 7.23174C1.86107 7.34934 1.77086 7.45244 1.6633 7.53517C1.55574 7.6179 1.43293 7.67864 1.3019 7.71391C1.17087 7.74918 1.03417 7.7583 0.899618 7.74074C0.765062 7.72319 0.635282 7.6793 0.517687 7.61159C0.400092 7.54387 0.296986 7.45366 0.214256 7.3461C0.131525 7.23854 0.0707898 7.11574 0.035518 6.98471C0.000246266 6.85367 -0.0088715 6.71698 0.0086855 6.58242C0.0262425 6.44787 0.0701303 6.31809 0.137843 6.20049L1.72081 3.4376C1.18436 2.95302 0.686958 2.42688 0.233234 1.86409C0.0730825 1.65048 0.00200842 1.3831 0.0349609 1.11817C0.0679133 0.853239 0.202324 0.611412 0.409922 0.443553C0.61752 0.275693 0.882126 0.194883 1.14808 0.21812C1.41404 0.241357 1.66063 0.36683 1.83597 0.568148C3.21441 2.27487 5.62581 4.30987 9.28331 4.30987C12.9408 4.30987 15.3522 2.27487 16.7307 0.568148C16.9032 0.357415 17.152 0.223473 17.4229 0.195554C17.6938 0.167635 17.9648 0.248005 18.1766 0.419126C18.3885 0.590247 18.524 0.838223 18.5537 1.10893C18.5834 1.37964 18.5048 1.65111 18.3351 1.86409C17.8808 2.42695 17.3829 2.95308 16.8458 3.4376L18.4288 6.20049Z'
                        fill='currentColor'
                    />
                </svg>
            )}
        </Button>
    );
};

export const OptionsButton: FunctionComponent<ButtonProps> = (props) => {
    return (
        <Button {...props}>
            <svg
                width='14'
                height='11'
                viewBox='0 0 14 11'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M1 2.72217H7.54545M10.4545 2.72217H12.6364M6.09091 8.94439H12.6364M1 8.94439H3.18182'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                />
                <path
                    d='M4.63637 10.5C5.43969 10.5 6.09091 9.80358 6.09091 8.94447C6.09091 8.08536 5.43969 7.38892 4.63637 7.38892C3.83305 7.38892 3.18182 8.08536 3.18182 8.94447C3.18182 9.80358 3.83305 10.5 4.63637 10.5Z'
                    stroke='currentColor'
                />
                <path
                    d='M9.00002 4.27774C9.80334 4.27774 10.4546 3.58129 10.4546 2.72218C10.4546 1.86307 9.80334 1.16663 9.00002 1.16663C8.19669 1.16663 7.54547 1.86307 7.54547 2.72218C7.54547 3.58129 8.19669 4.27774 9.00002 4.27774Z'
                    stroke='currentColor'
                />
            </svg>
        </Button>
    );
};