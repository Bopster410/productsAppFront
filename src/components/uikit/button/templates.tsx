import { FunctionComponent } from 'react';
import { Button, ButtonProps } from './component';
import { motion, SVGMotionProps } from 'framer-motion';

export const PlusButton: FunctionComponent<ButtonProps> = (props) => {
    return (
        <Button {...props}>
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
        <Button {...props}>
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

export const MenuButton: FunctionComponent<ButtonProps> = (props) => {
    return (
        <Button {...props}>
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
