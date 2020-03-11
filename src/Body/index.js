import React from 'react';
import './style.scss';
import ToolContext from '../context';

const Body = () => {
    const { context: { isRecording } } = React.useContext(ToolContext);
    let rendered;

    if (isRecording) {
        rendered = (<span className="recording">Recording...</span>);
    } else {
        rendered = null;
    }

    return (
        <div className="body">
            {rendered}
        </div>
    );
};

export default Body;
