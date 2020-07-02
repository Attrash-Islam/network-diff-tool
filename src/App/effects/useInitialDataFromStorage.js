import { useEffect } from 'react';

const useInitialDataFromStorage = ({ setContext }) => {
    useEffect(() => {
        // eslint-disable-next-line no-undef
        chrome.storage.local.get(['networkDiffUrlRegex'], ({ networkDiffUrlRegex = '' }) => {
          setContext('urlRegex', networkDiffUrlRegex);
        });
      }, [setContext]);
};

export default useInitialDataFromStorage;
