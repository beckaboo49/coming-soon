import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Search } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const tags = ["STRATEGY", "AUTOMATION", "MONETIZATION"];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/posts`);
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    let result = posts;
    
    if (activeTag) {
      result = result.filter((post) => post.tag === activeTag);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(result);
  }, [activeTag, searchQuery, posts]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReadTime = (content) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} MIN READ`;
  };

  return (
    <div data-testid="blog-page" className="min-h-screen pt-16 bg-[#060606]">
      {/* Header Section */}
      <section className="py-16 px-6 md:px-12 border-b border-[#262626]">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-xs tracking-[0.2em] text-[#00E5FF]/70 uppercase">
            // SIGNAL_ARCHIVE
          </span>
          <h1 
            data-testid="blog-headline"
            className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F3F4F6] uppercase mt-4"
          >
            BRIEFINGS
          </h1>
          <p className="text-base text-[#9CA3AF] mt-4 max-w-2xl">
            Strategic insights, automation blueprints, and monetization frameworks for systematic content architects.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-6 md:px-12 border-b border-[#262626] bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTag(null)}
                data-testid="filter-all"
                className={`px-4 py-2 font-mono text-xs tracking-[0.1em] uppercase border transition-all ${
                  !activeTag
                    ? "border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/10"
                    : "border-[#262626] text-[#9CA3AF] hover:border-[#00E5FF]/50"
                }`}
              >
                [ALL]
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  data-testid={`filter-${tag.toLowerCase()}`}
                  className={`px-4 py-2 font-mono text-xs tracking-[0.1em] uppercase border transition-all ${
                    activeTag === tag
                      ? "border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/10"
                      : "border-[#262626] text-[#9CA3AF] hover:border-[#00E5FF]/50"
                  }`}
                >
                  [{tag}]
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" strokeWidth={1.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH_ARCHIVE..."
                data-testid="blog-search-input"
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-[#060606] border border-[#262626] font-mono text-xs text-[#F3F4F6] placeholder:text-[#9CA3AF]/50 outline-none focus:border-[#00E5FF]/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="text-center py-16">
              <span className="font-mono text-sm text-[#9CA3AF]">LOADING_BRIEFINGS...</span>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <span className="font-mono text-sm text-[#9CA3AF]">NO_BRIEFINGS_FOUND</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredPosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/briefings/${post.slug}`}
                  data-testid={`blog-post-card-${index}`}
                  className="group block border border-[#262626] bg-[#0F0F0F] transition-all hover:border-[#00E5FF]/30 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]"
                >
                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="inline-block border border-[#262626] bg-[#060606] px-3 py-1 text-xs font-mono text-[#00E5FF] uppercase tracking-wider">
                        [{post.tag}]
                      </span>
                      <span className="flex items-center gap-2 font-mono text-xs text-[#9CA3AF]">
                        <Clock className="w-3 h-3" strokeWidth={1.5} />
                        {getReadTime(post.content)}
                      </span>
                      <span className="font-mono text-xs text-[#9CA3AF]">
                        {formatDate(post.created_at)}
                      </span>
                    </div>

                    <h2 className="font-mono text-xl font-semibold text-[#F3F4F6] uppercase mb-3 group-hover:text-[#00E5FF] transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF] uppercase tracking-wider group-hover:gap-4 transition-all">
                      READ_BRIEFING
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sticky Sidebar CTA (for desktop) */}
      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 w-64 z-40">
        <div className="border border-[#262626] bg-[#0F0F0F]/95 backdrop-blur-sm p-6">
          <span className="font-mono text-xs tracking-[0.15em] text-[#00E5FF] uppercase">
            // FLAGSHIP_PRODUCT
          </span>
          <h3 className="font-mono text-sm font-semibold text-[#F3F4F6] uppercase mt-3 mb-2">
            AI-PROOF BLOG TOOLKIT
          </h3>
          <p className="text-xs text-[#9CA3AF] mb-4">
            The complete blueprint for systematic content architecture.
          </p>
          <Link
            to="/depot"
            data-testid="sidebar-depot-link"
            className="block w-full py-2 text-center border border-[#00E5FF] text-[#00E5FF] font-mono text-xs uppercase transition-all hover:bg-[#00E5FF]/10"
          >
            ACCESS_NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
