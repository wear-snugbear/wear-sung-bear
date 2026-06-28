import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleScrollToStory = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      localStorage.setItem("scrollTo", "founder-story");
    } else {
      document.getElementById("founder-story")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#FFF9F6] pt-12 pb-6 px-4 sm:px-6 lg:px-8 font-sans text-[#6D442C]">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* --- TOP SECTION: COMMUNITY CARD --- */}
        <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFF0F0] to-[#FFEAE8] border border-[#FF8580]/10 p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
    <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
      <div className="flex justify-center lg:justify-start items-center gap-2">
        <span className="text-2xl animate-bounce duration-1000">📸</span>
        <h2 className="font-serif text-2xl font-extrabold sm:text-3xl tracking-tight text-[#4D3A2A]">
          Your vibe, your style, your <span className="text-[#FF8580]">SnugBear</span> story.
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-[#7A6B5C] font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
        Every snap, every tag, and every review helps someone find their new favorite fit. Join our cozy circle!
      </p>
      <div className="pt-2">
        {/* UPDATED BUTTON BELOW */}
        <button 
          onClick={() => navigate("/community")} 
          className="group inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#FF8580] px-6 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:bg-[#E5746F] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Join The Community</span>
          <span className="transition-transform duration-300 group-hover:scale-125">♥</span>
        </button>
      </div>
    </div>

            <div className="lg:col-span-5 bg-white/70 backdrop-blur-xs rounded-2xl p-5 border border-white/60 grid grid-cols-3 gap-2 text-center shadow-xs">
              <div className="space-y-1 p-1">
                <span className="text-lg block text-[#FF8580]">⭐</span>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#4D3A2A]">Get Featured</h4>
                <p className="text-[10px] text-[#7A6B5C] leading-tight">Show off your custom style</p>
              </div>
              <div className="space-y-1 p-1 border-x border-[#6D442C]/10">
                <span className="text-lg block text-[#FF8580]">🎁</span>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#4D3A2A]">Earn Rewards</h4>
                <p className="text-[10px] text-[#7A6B5C] leading-tight">Win coupons & gifts</p>
              </div>
              <div className="space-y-1 p-1">
                <span className="text-lg block text-[#FF8580]">📖</span>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#4D3A2A]">Inspire Others</h4>
                <p className="text-[10px] text-[#7A6B5C] leading-tight">Help friends style fits</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- MIDDLE SECTION: SOCIAL BAR --- */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white border border-[#6D442C]/5 px-6 py-3.5 text-xs font-bold text-[#7A6B5C] shadow-xs">
          <a href="https://instagram.com/snugbearofficial" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#FF8580] transition-colors group">
            <span className="text-sm transition-transform group-hover:rotate-12">📸</span>
            <span>Follow us <span className="text-[#FF8580]">@snugbearofficial</span></span>
          </a>
          <div className="font-serif text-base font-extrabold text-[#4D3A2A] tracking-wide flex items-center gap-1.5 transition-transform hover:scale-105">
            <span className="text-[#FF8580]/50 text-xs">♥</span>
            <span>#WearSnugBear</span>
            <span className="text-[#FF8580]/50 text-xs">♥</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#7A6B5C]/70">
            <span>Be cute. Be cozy. Be you.</span>
            <span className="text-[#FF8580]">♥</span>
          </div>
        </div>

        {/* --- BOTTOM SECTION: DIRECTORY LINKS & NEWSLETTER --- */}
        <div className="grid gap-8 pt-6 border-t border-[#6D442C]/10 sm:grid-cols-2 md:grid-cols-12">
          <div className="md:col-span-4 space-y-4 text-center sm:text-left">
    <div className="flex items-center justify-center sm:justify-start">
      {/* UPDATED IMAGE PATH */}
      <img 
        src="/images/snugbear.png" 
        alt="SnugBear Logo" 
        className="h-12 w-auto object-contain transition-transform hover:scale-[1.02]" 
      />
    </div>
    <p className="text-xs font-medium text-[#7A6B5C] leading-relaxed max-w-xs mx-auto sm:mx-0">
      Cute oversized croptops and comfort pieces made for every version of you. 
    </p>
            
            {/* Social Indicators */}
            <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-[#6D442C]">
              <a href="https://www.instagram.com/snugbearofficial" target="_blank" rel="noreferrer" className="hover:text-[#FF8580] transition-all duration-200 hover:scale-110" aria-label="Instagram">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/company/snugbear-co/" target="_blank" rel="noreferrer" className="hover:text-[#FF8580] transition-all duration-200 hover:scale-110" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="mailto:snugbearofficial@gmail.com" className="hover:text-[#FF8580] transition-all duration-200 hover:scale-110" aria-label="Email">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
              <a href="https://wa.me/9310103159" target="_blank" rel="noreferrer" className="hover:text-[#FF8580] transition-all duration-200 hover:scale-110" aria-label="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.313 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.64-1.03-5.122-2.906-6.998-1.875-1.875-4.375-2.905-7.017-2.906-5.45 0-9.886 4.434-9.889 9.885-.001 2.128.577 4.204 1.67 6.013l-.985 3.598 3.73-.978zm11.233-7.595c-.3-.15-1.774-.875-2.049-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.488-.891-.795-1.492-1.776-1.667-2.076-.175-.3-.019-.463.13-.612.134-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.52l-.575-.01c-.2 0-.525.075-.8 1.05-.275.425-1.05 2.225-1.05 2.425 0 .2.15.375.45.525.045.023 2.17 3.31 5.258 4.643.734.317 1.309.507 1.754.648.738.234 1.41.201 1.942.122.593-.088 1.774-.725 2.024-1.425.25-.7 2.5-1.125 2.5-1.375 0-.025-.05-.15-.2-.225z"/></svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:col-span-5 text-left">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4D3A2A]">Shop</h3>
              <ul className="space-y-2 text-[11px] font-medium text-[#7A6B5C]">
                <li><Link to="/collections" className="hover:text-[#FF8580] transition-colors">Best Sellers</Link></li>
                <li><Link to="/collections" className="hover:text-[#FF8580] transition-colors">Collections</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
  <h3 className="text-xs font-bold uppercase tracking-wider text-[#4D3A2A]">Help</h3>
  <ul className="space-y-2 text-[11px] font-medium text-[#7A6B5C]">
    {/* Changed from Link to a button with navigate() */}
    <li>
      <button 
        onClick={() => {
          navigate("/faq");
          window.scrollTo(0, 0); // Ensures the user starts at the top of the FAQ page
        }} 
        className="hover:text-[#FF8580] transition-colors text-left w-full"
      >
        FAQs
      </button>
    </li>
    <li>
      <Link to="/track-order" className="hover:text-[#FF8580] transition-colors">
        Shipping
      </Link>
    </li>
  </ul>
</div>
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4D3A2A]">About</h3>
              <ul className="space-y-2 text-[11px] font-medium text-[#7A6B5C]">
                <li><button onClick={handleScrollToStory} className="hover:text-[#FF8580] transition-colors text-left w-full">Our Story</button></li>
                <li><Link to="/contact" className="hover:text-[#FF8580] transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 text-center sm:text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4D3A2A] flex items-center justify-center sm:justify-start gap-1">
              <span>Join The Snug Club</span>
              <span className="text-[#FF8580]">♥</span>
            </h3>            
          </div>
        </div>

        <div className="pt-6 border-t border-[#6D442C]/5 text-center text-[10px] font-semibold tracking-wider text-[#7A6B5C]/60 uppercase">
          &copy; {new Date().getFullYear()} SnugBear.co. All rights reserved.
        </div>
      </div>
    </footer>
  );
}