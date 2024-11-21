import { Routes, Route } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AppLayout from "./routes/app-layout-route/AppLayout";
import AdminLayout from "./routes/admin-route/AdminLayout";
import { ThemeContext } from "./ThemeContext";
import Welcome from "./containers/WelcomePage/Welcome";

function App() {
  const [mode, setMode] = useState("white");
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#E2F1E7" : "#31363F",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Routes>
      <Route path="/" element={<Welcome />} />
        <Route
          path="/home/*"
          element={<AppLayout mode={mode} setMode={setMode} />}
        />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </div>
  );
}

export default App;
