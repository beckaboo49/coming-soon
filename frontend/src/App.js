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

function App() {
  return (
    <div className="App min-h-screen bg-[#060606]">
      <BrowserRouter>
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
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
