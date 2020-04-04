import React from 'react';

const useNetworkListener = (state, setContext) => {
    const networkListener = React.useCallback(({ method: reqMethod, initiator, requestId, requestBody, url }) => {
        const { isRecording, data, method, urlRegex } = state;
        if (!isRecording) { return; }
        if (method !== reqMethod) { return; }
        if (!new RegExp(urlRegex).test(url)) { return; }

        const reqData = { initiator, requestId, requestBody, url };
        const index = data.findIndex((x) => x.requestId === requestId);
        if (index !== -1) {
          setContext(`data.${index}`, reqData);
        } else {
          // Hack to overcome the duplicate requests
          // that onBeforeRequest event sends with the same ID
          setContext('data', (data) => data.concat(reqData));
        }
    }, [state, setContext]);

    React.useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.webRequest.onBeforeRequest.addListener(
        networkListener,
        { urls: ["<all_urls>"] },
        ['requestBody']
    );

    return () => {
        // eslint-disable-next-line no-undef
        chrome.webRequest.onBeforeRequest.removeListener(networkListener);
    }
    }, [networkListener]);
};

export default useNetworkListener;
