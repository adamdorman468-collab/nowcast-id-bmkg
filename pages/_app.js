// pages/_app.js
import '../styles/globals.css';
import 'leaflet/dist/leaflet.css';
import { ThemeProvider } from '../context/ThemeContext';
import Layout from '../components/Layout'; // <-- Impor Layout

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout> {/* <-- Bungkus seluruh komponen dengan Layout */}
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;