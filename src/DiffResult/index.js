import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-wisteria';
import { isNil } from 'lodash/fp';
import JumpNextBtn from '../JumpNextBtn';
import './style.scss';

const DiffResult = ({ diffs }) => {
    const allDiffElementsRef = React.useRef([]);
    const currentNavigatedIndexRef = React.useRef();

    React.useEffect(() => {
        if (diffs.length === 0) {
            allDiffElementsRef.current = [];
        } else {
            allDiffElementsRef.current = [...document.querySelectorAll('.loc.highlighted')];
        }
    }, [diffs]);

    const onJumpNext = () => {
        if (isNil(currentNavigatedIndexRef.current)) {
            currentNavigatedIndexRef.current = 0;
        } else {
            currentNavigatedIndexRef.current = currentNavigatedIndexRef.current === allDiffElementsRef.current.length - 1 ?
                0 : currentNavigatedIndexRef.current + 1;
        }

        allDiffElementsRef.current[currentNavigatedIndexRef.current].scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className="diff-result">
            {diffs.map(({ added, removed, value }, idx) => (
                <div key={idx} className={classnames('loc', { added, removed, highlighted: added || removed })}>
                    {value}
                </div>
            ))}
            <JumpNextBtn onClick={onJumpNext}/>
        </div>
    );
};

const useStateToProps = ({ context }) => {
    const { diffs } = context;

    return { diffs };
};

export default connect(useStateToProps)(DiffResult);
