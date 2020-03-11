import React from 'react';
import './style.scss';
import RecordDot from '../RecordDot';
import MethodSelect from '../MethodSelect';
import UrlRegexInput from '../UrlRegexInput';

const Header = () => {
    return (
        <div className="header">
            <RecordDot/>
            <MethodSelect/>
            <UrlRegexInput/>
        </div>
    );
};

export default Header;
