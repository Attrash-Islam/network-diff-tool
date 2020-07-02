import React, { useCallback } from 'react';
import classnames from 'classnames';
import { connect } from 'react-wisteria';
import './style.scss';

const NOT_RECORDING_COLOR = '#C7C7C7';
const RECORDING_COLOR = '#FF0000';

const RecordDot = ({ isRecording, method, urlRegex, toggleRecording }) => {
    const disabled = [method, urlRegex].some((x) => !x);

    const onClick = () => {
        if (disabled) { return; }

        toggleRecording();
    };

    const title = disabled ? 'You can\'t record unless you enter a URL Regex' : 'Start Recording!';

    return ( 
        <div title={title} className={classnames('record-dot', { disabled })}>
            <svg onClick={onClick}
                width="22" height="22" viewBox="0 0 22 22"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="11" cy="11" rx="11" ry="11" fill={isRecording ? RECORDING_COLOR : NOT_RECORDING_COLOR}/>
            </svg>
        </div>
    );
}

const useStateToProps = ({ context, setContext }) => {
    const { isRecording, method, urlRegex } = context;

    const toggleRecording = useCallback(() => {
        setContext('isRecording', (x) => !x);
    }, [setContext]);

    return {
        isRecording,
        method,
        urlRegex,
        toggleRecording
    };
};

export default connect(useStateToProps)(RecordDot);
