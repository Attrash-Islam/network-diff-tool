import React, { useCallback } from 'react';
import { connect } from 'react-wisteria';
import './style.scss';

const UrlRegexInput = ({ urlRegex, isRecording, onChange }) => (
    <input value={urlRegex} disabled={isRecording} onChange={onChange} placeholder="URL REGEX" className="url-regex-input"/>
);

const useStateToProps = ({ context, setContext }) => {
    const { urlRegex, isRecording } = context;

    const onChange = useCallback(({ target: { value }}) => {
        setContext('urlRegex', value);
    }, [setContext]);

    return {
        urlRegex,
        isRecording,
        onChange
    };
};

export default connect(useStateToProps)(UrlRegexInput);
