import React from 'react';

const useInitialDataFromStorage = (_state, setContext) => {
    React.useEffect(() => {
        // eslint-disable-next-line no-undef
        chrome.storage.local.get(['networkDiffUrlRegex'], ({ networkDiffUrlRegex = '' }) => {
          setContext('urlRegex', networkDiffUrlRegex);
        });
      }, [setContext]);
};

export default useInitialDataFromStorage;
