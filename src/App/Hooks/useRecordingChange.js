import React from 'react';

const useRecordingChange = (state, setContext) => {
    const { isRecording } = state;

    React.useEffect(() => {
        if (isRecording) {
          setContext('data', []);
          setContext('diffs', []);
          setContext('selectedPair', []);
        }
      }, [isRecording, setContext]);
};

export default useRecordingChange;
