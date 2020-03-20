import React from 'react';
const Diff = require('diff');

const useSelectedPairChange = (state, setContext) => {
    const { data, selectedPair } = state;
    const oldPairs = React.useRef(selectedPair);

    const getRequestBodyByRequestId = React.useCallback((requestId) => {
        return data.find((x) => x.requestId === requestId).requestBody;
    }, [data]);

    const buildDiff = React.useCallback(() => {
        const first = JSON.stringify(getRequestBodyByRequestId(selectedPair[0]), null, 4);
        const second = JSON.stringify(getRequestBodyByRequestId(selectedPair[1]), null, 4);
        const diffResult = Diff.diffLines(first, second);
        setContext('diffs', diffResult);
    }, [getRequestBodyByRequestId, selectedPair, setContext]);

    React.useEffect(() => {
        if (selectedPair.length === 2 && oldPairs.current.length !== 2) {
            buildDiff();
        } else if (selectedPair.length !== 2 && oldPairs.current.length === 2) {
            setContext('diffs', []);
        }
        oldPairs.current = selectedPair;
    }, [selectedPair, buildDiff, setContext]);
};

export default useSelectedPairChange;
