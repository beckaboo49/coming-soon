import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [suggestedPosts, setSuggestedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API}/posts/${slug}`);
        setPost(response.data);

        // Fetch all posts for suggestions
        const allPosts = await axios.get(`${API}/posts`);
        const suggestions = allPosts.data.filter(
          (p) => p.slug !== slug && response.data.suggested_posts?.includes(p.slug)
        );
        setSuggestedPosts(suggestions.length > 0 ? suggestions : allPosts.data.filter(p => p.slug !== slug).slice(0, 2));
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadTime = (content) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} MIN READ`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-[#060606] flex items-center justify-center">
        <span className="font-mono text-sm text-[#9CA3AF]">LOADING_BRIEFING...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-16 bg-[#060606] flex items-center justify-center">
        <div className="text-center">
          <span className="font-mono text-sm text-[#9CA3AF]">BRIEFING_NOT_FOUND</span>
          <Link 
            to="/briefings"
            className="block mt-4 font-mono text-xs text-[#00E5FF] hover:underline"
          >
            ← RETURN_TO_ARCHIVE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="blog-post-page" className="min-h-screen pt-16 bg-[#060606]">
      {/* Header */}
      <section className="py-16 px-6 md:px-12 border-b border-[#262626] blueprint-grid">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link 
            to="/briefings"
            data-testid="back-to-blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#9CA3AF] hover:text-[#00E5FF] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            RETURN_TO_ARCHIVE
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-block border border-[#262626] bg-[#060606] px-3 py-1 text-xs font-mono text-[#00E5FF] uppercase tracking-wider">
              [{post.tag}]
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-[#9CA3AF]">
              <Calendar className="w-3 h-3" strokeWidth={1.5} />
              {formatDate(post.created_at)}
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-[#9CA3AF]">
              <Clock className="w-3 h-3" strokeWidth={1.5} />
              {getReadTime(post.content)}
            </span>
          </div>

          {/* Title */}
          <h1 
            data-testid="post-title"
            className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F3F4F6] uppercase"
          >
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <article className="flex-1">
              <div 
                data-testid="post-content"
                className="prose prose-invert max-w-none
                  [&>p]:text-[#9CA3AF] [&>p]:leading-relaxed [&>p]:mb-6
                  [&>h2]:font-mono [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-[#F3F4F6] [&>h2]:uppercase [&>h2]:mt-12 [&>h2]:mb-6
                  [&>h3]:font-mono [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-[#F3F4F6] [&>h3]:uppercase [&>h3]:mt-8 [&>h3]:mb-4
                  [&>strong]:text-[#F3F4F6]
                  [&>.systemic-note]:border-l-2 [&>.systemic-note]:border-[#00E5FF] [&>.systemic-note]:bg-[#00E5FF]/5 [&>.systemic-note]:p-6 [&>.systemic-note]:my-8 [&>.systemic-note]:font-mono [&>.systemic-note]:text-sm [&>.systemic-note]:text-[#F3F4F6]
                  [&>ul]:list-none [&>ul]:space-y-2 [&>ul>li]:text-[#9CA3AF] [&>ul>li]:before:content-['→_'] [&>ul>li]:before:text-[#00E5FF]
                  [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:space-y-2 [&>ol>li]:text-[#9CA3AF] [&>ol>li]:marker:text-[#00E5FF] [&>ol>li]:marker:font-mono
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* CTA Box */}
              <div className="mt-16 p-8 border border-[#262626] bg-[#0F0F0F]">
                <span className="font-mono text-xs tracking-[0.15em] text-[#00E5FF] uppercase">
                  // NEXT_ACTION
                </span>
                <h3 className="font-mono text-lg font-semibold text-[#F3F4F6] uppercase mt-3 mb-4">
                  BUILD YOUR SYSTEMIC INFRASTRUCTURE
                </h3>
                <p className="text-sm text-[#9CA3AF] mb-6">
                  Get the complete AI-Proof Blog Architecture Toolkit and implement these strategies systematically.
                </p>
                <Link
                  to="/depot"
                  data-testid="post-cta-link"
                  className="inline-flex items-center gap-3 px-6 py-3 border border-[#00E5FF] text-[#00E5FF] font-mono text-xs uppercase transition-all hover:bg-[#00E5FF]/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                >
                  ACCESS_TOOLKIT
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Product CTA */}
                <div className="border border-[#262626] bg-[#0F0F0F] p-6">
                  <span className="font-mono text-xs tracking-[0.15em] text-[#00E5FF] uppercase">
                    // FLAGSHIP_PRODUCT
                  </span>
                  <h3 className="font-mono text-sm font-semibold text-[#F3F4F6] uppercase mt-3 mb-2">
                    AI-PROOF TOOLKIT
                  </h3>
                  <p className="text-xs text-[#9CA3AF] mb-4">
                    The complete blueprint for systematic content architecture.
                  </p>
                  <Link
                    to="/depot"
                    data-testid="sidebar-product-link"
                    className="block w-full py-2 text-center border border-[#00E5FF] text-[#00E5FF] font-mono text-xs uppercase transition-all hover:bg-[#00E5FF]/10"
                  >
                    ACCESS_NOW
                  </Link>
                </div>

                {/* Share */}
                <div className="border border-[#262626] bg-[#0F0F0F] p-6">
                  <span className="font-mono text-xs tracking-[0.15em] text-[#9CA3AF] uppercase">
                    // SHARE_BRIEFING
                  </span>
                  <div className="flex items-center gap-3 mt-4">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-[#262626] text-[#9CA3AF] hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-[#262626] text-[#9CA3AF] hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Suggested Infrastructure */}
      {suggestedPosts.length > 0 && (
        <section className="py-16 px-6 md:px-12 border-t border-[#262626] bg-[#0F0F0F]">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-xs tracking-[0.15em] text-[#00E5FF] uppercase">
              // SUGGESTED_INFRASTRUCTURE
            </span>
            <h3 className="font-mono text-xl font-semibold text-[#F3F4F6] uppercase mt-4 mb-8">
              CONTINUE BUILDING
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestedPosts.map((suggestedPost, index) => (
                <Link
                  key={suggestedPost.id}
                  to={`/briefings/${suggestedPost.slug}`}
                  data-testid={`suggested-post-${index}`}
                  className="group block border border-[#262626] bg-[#060606] p-6 transition-all hover:border-[#00E5FF]/30"
                >
                  <span className="inline-block border border-[#262626] px-2 py-0.5 text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-3">
                    [{suggestedPost.tag}]
                  </span>
                  <h4 className="font-mono text-sm font-semibold text-[#F3F4F6] uppercase mb-2 group-hover:text-[#00E5FF] transition-colors">
                    {suggestedPost.title}
                  </h4>
                  <p className="text-xs text-[#9CA3AF] line-clamp-2">
                    {suggestedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostPage;
