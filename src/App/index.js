import React from 'react';
import { Provider } from 'react-wisteria';
import ToolContext from '../context';
import Header from '../Header';
import Body from '../Body';
import useRecordingChange from './effects/useRecordingChange';
import useSelectedPairChange from './effects/useSelectedPairChange';
import useDiffsChange from './effects/useDiffsChange';
import useInitialDataFromStorage from './effects/useInitialDataFromStorage';
import useNetworkListener from './effects/useNetworkListener';
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
