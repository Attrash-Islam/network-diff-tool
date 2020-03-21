import React from 'react';

const useDiffsChange = (state, setContext) => {
    const { diffs } = state;

    React.useEffect(() => {
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
