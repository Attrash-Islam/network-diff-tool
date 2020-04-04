import React from 'react';
import { set, update, isFunction } from 'lodash/fp';
import ToolContext from '../context';
import Header from '../Header';
import Body from '../Body';
import useRecordingChange from './Hooks/useRecordingChange';
import useSelectedPairChange from './Hooks/useSelectedPairChange';
import useDiffsChange from './Hooks/useDiffsChange';
import useInitialDataFromStorage from './Hooks/useInitialDataFromStorage';
import useNetworkListener from './Hooks/useNetworkListener';
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
  useDiffsChange,
  useNetworkListener
];

function App() {
  const [state, setState] = React.useState(INIT_STATE);

  const setContext = React.useCallback((path, value, cb) => {
    const updateFunction = isFunction(value) ? update : set;
    setState((state) => updateFunction(path, value, state), cb);
  }, []);

  // Hooks execution
  HOOKS.forEach((h) => h(state, setContext));

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
