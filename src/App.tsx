import { Routes, Route } from "react-router-dom";

import { DashboardPage } from "./page/DashboardPage";
import { DetailPage } from "./page/DetailPage";
import { SchedulePage } from "./page/SchedulePage";
import { Providers } from "./providers";
import { LoginPage } from "./page/LoginPage";

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs/:id" element={<DetailPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </Providers>
  );
}

export default App;
