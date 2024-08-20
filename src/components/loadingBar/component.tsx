import { useNavigation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const progress = {
    idle: 100,
    submitting: 40,
    loading: 90,
};

export const LoadingBarGlobal = () => {
    const { state } = useNavigation();

    return (
        <LoadingBar
            waitingTime={200}
            color='var(--color-main-normal)'
            height={4}
            progress={progress[state]}
        />
    );
};
