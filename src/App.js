import './App.css';
import Bar from "./components/bar/Bar";
import Chat from "./components/chat/Chat"
import {Fragment} from "react";

function App() {
  return (
      <Fragment>
        <Bar />
        <Chat />
      </Fragment>
    );
}

export default App;
