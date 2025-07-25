import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/home";
import Header from "./Components/Header/header";
import SideNavbar from "./Components/Sidenavbar/sidenavbar";
import ProtectedRoute from "./HOCs/ProtectedRoute/protectedRoute";
import LoginPage from "./Components/LoginPage/loginPage";
import ThemeProvider from "./HOCs/ThemeContext/themeContext";
import SavedVideosProvider from "./HOCs/SavedContext/savedContext";
import SavedVideos from "./Components/SavedVideos/savedVideos";
import Trending from "./Components/Trending/trending";
import Gaming from "./Components/Gaming/gaming";
import DetailedVideoCard from "./Components/DetailedVideoCard/detailedVideoCard";
import PageNotFound from "./Components/PageNotFound/pageNotFound";

function Layout({ children }) {
  const location = useLocation();
  const isLogin = location.pathname !== "/login";
  return (
    <>
      {isLogin && <Header />}
      <div className="main">
        {isLogin && <SideNavbar />}
        <div className="child">
          {children}
          </div>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SavedVideosProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trending"
              element={
                <ProtectedRoute>
                  <Trending />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gaming"
              element={
                <ProtectedRoute>
                  <Gaming />
                </ProtectedRoute>
              }
            />
            <Route
              path="/savedvideos"
              element={
                <ProtectedRoute>
                    <SavedVideos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/videos/:id"
              element={
                <ProtectedRoute>
                  
                    <DetailedVideoCard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  
                    <PageNotFound />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
      </SavedVideosProvider>
    </ThemeProvider>
  );
}

export default App;
