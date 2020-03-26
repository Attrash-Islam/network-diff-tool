import React from 'react';

const useRecordingChange = (state, setContext) => {
    const { isRecording, urlRegex } = state;

    React.useEffect(() => {
        if (isRecording) {
          setContext('data', []);
          setContext('diffs', []);
          setContext('selectedPair', []);

          // eslint-disable-next-line no-undef
          chrome.storage.local.set({ networkDiffUrlRegex: urlRegex });
        }
      }, [isRecording, setContext, urlRegex]);
};

export default useRecordingChange;
