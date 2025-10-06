import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "smarthr-ui";
import { initializeDB } from "./lib/db";
import { DashboardPage } from "./pages/DashboardPage";
import { DetailPage } from "./pages/DetailPage";

const theme = createTheme();

function App() {
  useEffect(() => {
    // アプリ起動時にIndexedDBを初期化
    initializeDB();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/jobs/:id" element={<DetailPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
