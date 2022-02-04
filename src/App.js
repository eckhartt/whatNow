/** @jsxImportSource theme-ui */
import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";
// import theme from '@hackclub/theme'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";

import AuthContextProvider from "./components/Auth/AuthContextProvider";

export default function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
