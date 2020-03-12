import React from 'react';
import { without, concat, isNil } from 'lodash/fp';
import classnames from 'classnames';
import ToolContext from '../context';
import './style.scss';
const Diff = require('diff');

const Body = () => {
    const { context: { isRecording, data, selectedPair }, setContext } = React.useContext(ToolContext);
    const [diffs, setDiffs] = React.useState([]);
    const allDiffElementsRef = React.useRef([]);
    const currentNavigatedIndexRef = React.useRef();
    const oldPairs = React.useRef(selectedPair);
    let rendered;

    const toggleSelection = (requestId) => () => {
        if (selectedPair.includes(requestId)) {
            setContext('selectedPair', without(requestId));
        } else if(selectedPair.length === 2) {
            return;
        } else {
            setContext('selectedPair', concat(requestId));
        }
    };

    console.log('------------');
    console.log({ data });

    const getRequestBodyByRequestId = React.useCallback((requestId) => {
        return data.find((x) => x.requestId === requestId).requestBody;
    }, [data]);

    React.useEffect(() => {
        if (diffs.length === 0) {
            allDiffElementsRef.current = [];
        } else {
            allDiffElementsRef.current = [...document.querySelectorAll('.loc.highlighted')];
        }
    }, [diffs]);

    const buildDiff = React.useCallback(() => {
        const first = JSON.stringify(getRequestBodyByRequestId(selectedPair[0]), null, 4);
        const second = JSON.stringify(getRequestBodyByRequestId(selectedPair[1]), null, 4);
        const diff = Diff.diffLines(first, second);
        setDiffs(diff);
    }, [getRequestBodyByRequestId, selectedPair]);

    const onJumpNext = () => {
        if (isNil(currentNavigatedIndexRef.current)) {
            currentNavigatedIndexRef.current = 0;
        } else {
            currentNavigatedIndexRef.current = currentNavigatedIndexRef.current === allDiffElementsRef.current.length - 1 ?
                0 : currentNavigatedIndexRef.current + 1;
        }

        allDiffElementsRef.current[currentNavigatedIndexRef.current].scrollIntoView(true);
    };

    React.useEffect(() => {
        if (selectedPair.length === 2 && oldPairs.current.length !== 2) {
            buildDiff();
        } else if (selectedPair.length !== 2 && oldPairs.current.length === 2) {
            setDiffs([]);
        }
        oldPairs.current = selectedPair;
    }, [selectedPair, buildDiff]);

    if (isRecording) {
        rendered = (<span className="recording">Recording...</span>);
    } else {
        const list = (
            <ul>
                {data.map(({ requestId, url }) => (
                    <li key={requestId} onClick={toggleSelection(requestId)}>
                        {url}
                    </li>
                ))}
            </ul>
        );

        rendered = (
            <div>
                <h4>Select two to compare request diff</h4>
                <div className="diff-lists">
                    {list}
                    {list}
                </div>
                {selectedPair.length === 2 && (
                    <div className="diff-result">
                        {diffs.map(({ added, removed, value }, idx) => (
                            <div key={idx} className={classnames('loc', { added, removed, highlighted: added || removed })}>
                                {value}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="body">
            {rendered}
            <div className="jump-next" onClick={onJumpNext}>
                Jump To Next Diff
            </div>
        </div>
    );
};

export default Body;
