import React from 'react';

const useRecordingChange = (state, setContext) => {
    React.useEffect(() => {
        if (state.isRecording) {
          setContext('data', []);
          setContext('selectedPair', []);
        }
      }, [state.isRecording, setContext]);
};

export default useRecordingChange;
