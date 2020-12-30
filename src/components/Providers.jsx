import { ApolloClient, ApolloProvider, split } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { configureStore } from "@reduxjs/toolkit";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import reducer from "../state";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:9000/graphql",
  options: {
    reconnect: true,
  },
});

const httpLink = createUploadLink({
  uri: "http://localhost:9000",
  credentials: "same-origin",
});

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === "OperationDefinition" && def.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

const Providers = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ReduxProvider>
    </ApolloProvider>
  );
};

export default Providers;
