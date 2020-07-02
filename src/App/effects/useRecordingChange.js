import { useEffect } from 'react';

const useRecordingChange = ({ context, setContext }) => {
    const { isRecording, urlRegex } = context;

    useEffect(() => {
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
