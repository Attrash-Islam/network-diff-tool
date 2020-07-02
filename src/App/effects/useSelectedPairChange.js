import { useCallback, useEffect } from 'react';
const Diff = require('diff');

const useSelectedPairChange = ({ context, setContext }) => {
    const { data, selectedPair } = context;

    const getRequestBodyByRequestId = useCallback((requestId) => {
        return data.find((x) => x.requestId === requestId).requestBody;
    }, [data]);

    const buildDiff = useCallback(() => {
        const first = JSON.stringify(getRequestBodyByRequestId(selectedPair[0]), null, 4);
        const second = JSON.stringify(getRequestBodyByRequestId(selectedPair[1]), null, 4);
        const diffResult = Diff.diffLines(first, second);
        setContext('diffs', diffResult);
    }, [getRequestBodyByRequestId, selectedPair, setContext]);

    useEffect(() => {
        if (selectedPair.length === 2) {
            buildDiff();
        } else {
            setContext('diffs', []);
        }
    }, [selectedPair, buildDiff, setContext]);
};

export default useSelectedPairChange;
