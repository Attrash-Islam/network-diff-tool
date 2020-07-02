import React from 'react';
import { Provider } from 'react-wisteria';
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

const App = () => (
    <div className="network-diff-tool">
      <Header/>
      <Body/>
    </div>
);

export default Provider({
  Context: ToolContext,
  initialPropsMapper: () => INIT_STATE,
  effects: [
    useInitialDataFromStorage,
    useRecordingChange,
    useSelectedPairChange,
    useDiffsChange,
    useNetworkListener
  ]
})(App);
