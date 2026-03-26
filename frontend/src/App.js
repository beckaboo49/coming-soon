import "@/index.css";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import ProductPage from "@/pages/ProductPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import ResourcesPage from "@/pages/ResourcesPage";
import ComingSoonPage from "@/pages/ComingSoonPage";
import PortalPage from "@/pages/PortalPage";
import ToolkitLandingPage from "@/pages/ToolkitLandingPage";

function App() {
  return (
    <div className="App min-h-screen bg-[#060606]">
      <BrowserRouter>
        <Routes>
          {/* Pages without header/footer */}
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/toolkit" element={<ToolkitLandingPage />} />
          
          {/* Main pages with header/footer */}
          <Route path="/*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/depot" element={<ProductPage />} />
                  <Route path="/briefings" element={<BlogPage />} />
                  <Route path="/briefings/:slug" element={<BlogPostPage />} />
                  <Route path="/stack" element={<ResourcesPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
