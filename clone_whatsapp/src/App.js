import React from "react";
import useLocalStorage from "./hooks/useLocalStorage";

import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import { ContextProvider } from "./context/ContextProvider";
import { ConversationProvider } from "./context/ConverationProvider";
import { SocketProvider } from "./context/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage("id");
  const dashboard = (
    <SocketProvider id={id}>
      <ContextProvider>
        <ConversationProvider id={id}>
          <DashBoard id={id} />
        </ConversationProvider>
      </ContextProvider>
    </SocketProvider>
  );
  return <div>{id ? dashboard : <Login onIdSubmit={setId} />}</div>;
}

export default App;
