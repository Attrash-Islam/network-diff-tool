import React from 'react';
import { set, update, isFunction } from 'lodash/fp';
import ToolContext from '../context';
import Header from '../Header';
import Body from '../Body';
import useRecordingChange from './Hooks/useRecordingChange';
import useSelectedPairChange from './Hooks/useSelectedPairChange';
import useDiffsChange from './Hooks/useDiffsChange';
import useInitialDataFromStorage from './Hooks/useInitialDataFromStorage';
import './style.scss';

// eslint-disable-next-line no-undef
chrome.devtools.panels.create("Network Diff",
    "logo192.png",
    "index.html"
);

const INIT_STATE = {
    isRecording: false,
    urlRegex: '',
    method: 'POST',
    selectedPair: [],
    data: [],
    diffs: [],
    isPerfectMatch: false
};

const HOOKS = [
  useInitialDataFromStorage,
  useRecordingChange,
  useSelectedPairChange,
  useDiffsChange
];

function App() {
  const [state, setState] = React.useState(INIT_STATE);

  const setContext = React.useCallback((path, value, cb) => {
    const updateFunction = isFunction(value) ? update : set;
    setState((state) => updateFunction(path, value, state), cb);
  }, []);

  // Hooks execution
  HOOKS.forEach((h) => h(state, setContext));

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

  return (
    <ToolContext.Provider value={{ context: state, setContext }}>
      <div className="network-diff-tool">
        <Header/>
        <Body/>
      </div>
    </ToolContext.Provider>
  );
}

export default App;
