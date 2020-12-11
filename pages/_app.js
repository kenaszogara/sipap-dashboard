import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
          src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.2.2/highcharts.js"
          integrity="sha512-PpL09bLaSaj5IzGNx6hsnjiIeLm9bL7Q9BB4pkhEvQSbmI0og5Sr/s7Ns/Ax4/jDrggGLdHfa9IbsvpnmoZYFA=="
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.2.2/highmaps.min.js"
          integrity="sha512-cHvujTbKVhurlO7/LNotR0zDEhYkbRiNhkg31AV5Mny7N+hLM95pn28zD39YWR6d0Kj3j+B6B+fGd+LY7DYLyg=="
          crossorigin="anonymous"
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
