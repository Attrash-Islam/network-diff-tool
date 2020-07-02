import React, { useCallback } from 'react';
import { connect } from 'react-wisteria';
import './style.scss';

const MethodSelect = ({ method, isRecording, onChange }) => (
    <select onChange={onChange} disabled={isRecording} value={method} className="method-select">
        <option value="POST">POST</option>
    </select>
);

const useStateToProps = ({ context, setContext }) => {
    const { method, isRecording } = context;

    const onChange = useCallback(({ target: { value } }) => {
        setContext('method', value);
    }, [setContext]);

    return {
        method,
        isRecording,
        onChange
    }
};

export default connect(useStateToProps)(MethodSelect);
