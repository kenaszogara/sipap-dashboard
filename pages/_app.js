import Head from "next/head";
import React from "react";
import PropTypes from "prop-types";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";
import "../styles/globals.css";

function MyApp(props) {
  const { Component, pageProps } = props;
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.2.2/css/highcharts.min.css"
          integrity="sha512-hGGTPscQ5tEG/4LWx4oXiF2SWumn6Q3sA8MlZQYynN1Qs1Gvm/8rI4j+Cq8oTUsLcsf+ovh0Nuap5HzZjYv92Q=="
          crossorigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.2.2/highmaps.min.js"
          integrity="sha512-cHvujTbKVhurlO7/LNotR0zDEhYkbRiNhkg31AV5Mny7N+hLM95pn28zD39YWR6d0Kj3j+B6B+fGd+LY7DYLyg=="
          crossorigin="anonymous"
        ></script>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <Component {...pageProps} />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
