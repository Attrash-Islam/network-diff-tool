import React from 'react';
import classnames from 'classnames';
import ToolContext from '../context';
import './style.scss';
import DiffResult from '../DiffResult';

const Body = () => {
    const { context: { isRecording, data, selectedPair }, setContext } = React.useContext(ToolContext);
    let rendered;

    const toggleSelection = (requestId, index) => () => {
        setContext(`selectedPair.${index}`, requestId);
    };

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

export default Body;
