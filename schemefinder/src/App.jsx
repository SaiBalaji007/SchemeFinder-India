import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { EligibilityProvider } from "./context/EligibilityContext";

import HomePage from "./pages/HomePage";
import EligibilityPage from "./pages/EligibilityPage";
import ExplorePage from "./pages/ExplorePage";
import SchemeDetailsPage from "./pages/SchemeDetailsPage";
import CategoriesPage from "./pages/CategoriesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <EligibilityProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/eligibility" element={<EligibilityPage />} />
            <Route path="/results" element={<ExplorePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/schemes/:id" element={<SchemeDetailsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EligibilityProvider>
  );
}

export default App;
