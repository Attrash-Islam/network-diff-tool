import React from 'react';
import './style.scss';
import ToolContext from '../context';

const UrlRegexInput = () => {
    const { context: { urlRegex, isRecording }, setContext } = React.useContext(ToolContext);

    const onChange = ({ target: { value }}) => {
        setContext('urlRegex', value);
    };

    return (
        <input value={urlRegex} disabled={isRecording} onChange={onChange} placeholder="URL REGEX" className="url-regex-input"/>
    );
};

export default UrlRegexInput;
