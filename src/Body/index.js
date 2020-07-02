import React, { useCallback } from 'react';
import { connect } from 'react-wisteria';
import classnames from 'classnames';
import DiffResult from '../DiffResult';
import PerfectMatch from '../PerfectMatch';
import './style.scss';

const Body = ({ isRecording, data, selectedPair, isPerfectMatch, toggleSelection }) => {
    let rendered;

    if (isRecording) {
        rendered = (<span className="recording">Recording...</span>);
    } else {
        const list = (index) => (
            <ul>
                {data.map(({ requestId, url }) => (
                    <li key={requestId}
                        className={classnames('diff-option', { selected: selectedPair[index] === requestId })}
                        onClick={toggleSelection(requestId, index)}>
                        {url}
                    </li>
                ))}
            </ul>
        );

        rendered = (
            <div>
                <h4>Select two to compare request diff</h4>
                <div className="diff-lists">
                    {list(0)}
                    {list(1)}
                </div>
                {isPerfectMatch && <PerfectMatch/>}
                <DiffResult/>
            </div>
        );
    }

    return (
        <div className="body">
            {rendered}
        </div>
    );
};

const useStateToProps = ({ context, setContext }) => {
    const { isRecording, data, selectedPair, isPerfectMatch } = context;

    const toggleSelection = useCallback((requestId, index) => () => {
        setContext(`selectedPair.${index}`, requestId);
    }, [setContext]);

    return {
        isRecording,
        data,
        selectedPair,
        isPerfectMatch,
        toggleSelection
    }
}

export default connect(useStateToProps)(Body);
