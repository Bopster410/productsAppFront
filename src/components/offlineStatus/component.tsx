import styles from './style.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { ColoredBorder } from '@/uikit/coloredBorder/component';

export const OfflineStatus = () => {
    const isOnline = useOnlineStatus();

    return (
        <div className={styles['status-container']}>
            <ColoredBorder
                duration={2}
                color={
                    isOnline
                        ? 'var(--color-main-success-rgb)'
                        : 'var(--color-main-red-rgb)'
                }
            >
                <AnimatePresence>
                    {!isOnline && (
                        <motion.div
                            title='Возникли проблемы с сетью'
                            className={classNames(
                                styles['status-icon'],
                                styles['status-icon_bottom-right'],
                                styles['status-icon_red']
                            )}
                            exit={{
                                backgroundColor: [
                                    'var(--color-main-success)',
                                    'var(--color-main-success)',
                                ],
                                opacity: [1, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                times: [0.4, 1],
                                ease: 'easeOut',
                            }}
                        >
                            <svg
                                width='22'
                                height='22'
                                viewBox='0 0 28 29'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M26.4151 8.18868C27.4717 9.24528 27.4717 10.9623 26.4151 11.8868L22.717 15.5849L12.4151 5.28302L16.1132 1.58491C17.1698 0.528302 18.8868 0.528302 19.8113 1.58491L22.1887 3.96226L26.1509 0L28 1.84906L24.0377 5.81132L26.4151 8.18868ZM18.7547 15.8491L16.9057 14L13.2075 17.6981L10.434 14.9245L14.1321 11.2264L12.283 9.37736L8.58491 13.0755L6.60377 11.2264L2.90566 14.9245C1.84906 15.9811 1.84906 17.6981 2.90566 18.6226L5.28302 21L0 26.283L1.84906 28.1321L7.13208 22.8491L9.50943 25.2264C10.566 26.283 12.283 26.283 13.2075 25.2264L16.9057 21.5283L15.0566 19.6792L18.7547 15.8491Z'
                                    fill='currentColor'
                                />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </ColoredBorder>
        </div>
    );
};
