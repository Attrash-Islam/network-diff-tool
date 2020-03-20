import React from 'react';
import classnames from 'classnames';
import './style.scss';

const JumpNextBtn = ({ className, ...restProps}) => {
    return (
        <div className={classnames('jump-next', className)} {...restProps}>
            Jump To Next Diff
        </div>
    );
};

export default JumpNextBtn;
