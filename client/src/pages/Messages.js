import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MessageSelect from "./MessageSelect";
import ChatRoom from "./Chatroom";

function Messages() {
  return (
    <Router>
      <Switch>
        <Route exact path="/messages" component={MessageSelect} />
        <Route exact path="/messages/:roomId" component={ChatRoom} />
      </Switch>
    </Router>
  );
}
export default Messages