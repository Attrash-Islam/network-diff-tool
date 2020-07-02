import { useEffect } from 'react';

const useDiffsChange = ({ context, setContext }) => {
    const { diffs } = context;

    useEffect(() => {
        if (diffs.length === 0) {
            setContext('isPerfectMatch', false);
        } else {
            const isPerfectMatch = diffs.every(({ removed, added }) => {
                return !removed && !added;
            });
            setContext('isPerfectMatch', isPerfectMatch);
        }
    }, [diffs, setContext]);
};

export default useDiffsChange;
