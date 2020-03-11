import React from 'react';
import ToolContext from '../context';
import './style.scss';

const MethodSelect = () => {
    const { context: { method, isRecording }, setContext } = React.useContext(ToolContext);

    const onChange = ({ target: { value } }) => {
        setContext('method', value);
    };

    return (
        <select onChange={onChange} disabled={isRecording} value={method} className="method-select">
            <option value="POST">POST</option>
        </select>
    );
}

export default MethodSelect;
