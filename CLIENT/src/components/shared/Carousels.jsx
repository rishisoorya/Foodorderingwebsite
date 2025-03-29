<>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        @keyframes reveal {\n            from {\n                clip-path: inset(0 100% 0 0);\n            }\n            to {\n                clip-path: inset(0 0 0 0);\n            }\n        }\n\n        @keyframes textReveal {\n            from {\n                transform: translateY(100%);\n                opacity: 0;\n            }\n            to {\n                transform: translateY(0);\n                opacity: 1;\n            }\n        }\n\n        @keyframes float {\n            0%, 100% {\n                transform: translateY(0);\n            }\n            50% {\n                transform: translateY(-10px);\n            }\n        }\n\n        @keyframes shine {\n            from {\n                transform: translateX(-100%) rotate(45deg);\n            }\n            to {\n                transform: translateX(200%) rotate(45deg);\n            }\n        }\n\n        .shine-effect::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background: linear-gradient(\n                90deg,\n                transparent,\n                rgba(255, 255, 255, 0.2),\n                transparent\n            );\n            transform: translateX(-100%) rotate(45deg);\n        }\n\n        .shine-effect:hover::before {\n            animation: shine 1.5s;\n        }\n\n        .float-animation {\n            animation: float 6s ease-in-out infinite;\n        }\n\n        .split-reveal {\n            animation: reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1);\n        }\n\n        .text-reveal {\n            animation: textReveal 0.8s cubic-bezier(0.77, 0, 0.175, 1);\n        }\n\n        .scroll-container {\n            scroll-snap-type: y mandatory;\n            -webkit-overflow-scrolling: touch;\n        }\n\n        .scroll-section {\n            scroll-snap-align: start;\n            scroll-snap-stop: always;\n        }\n\n        .content-mask {\n            -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);\n            mask-image: linear-gradient(to bottom, black 80%, transparent 100%);\n        }\n    ",
    }}
  />
  {/* Main scroll container */}
  <div className="scroll-container h-screen overflow-y-auto overflow-x-hidden">
    {/* Section 1 */}
    <section className="scroll-section relative h-screen flex flex-col md:flex-row">
      {/* Left content */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group shine-effect">
        <img
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
          alt="Architectural detail"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 to-neutral-950/50 transition-opacity duration-500 group-hover:opacity-0" />
      </div>
      {/* Right content */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 bg-neutral-950">
        <div className="max-w-lg float-animation">
          <span className="text-neutral-400 tracking-wider text-sm font-mono">
            01 / VISION
          </span>
          <h2 className="mt-4 text-5xl md:text-7xl font-bold leading-none bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Modern Architecture
          </h2>
          <p className="mt-6 text-neutral-400 text-lg leading-relaxed">
            Exploring the intersection of form and function in contemporary
            design.
          </p>
          <button className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all duration-300 hover:tracking-wider">
            Explore More →
          </button>
        </div>
      </div>
    </section>
    {/* Section 2 */}
    <section className="scroll-section relative h-screen flex flex-col md:flex-row">
      {/* Right content */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 bg-neutral-900">
        <div className="max-w-lg float-animation">
          <span className="text-neutral-400 tracking-wider text-sm font-mono">
            02 / DESIGN
          </span>
          <h2 className="mt-4 text-5xl md:text-7xl font-bold leading-none bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Urban Spaces
          </h2>
          <p className="mt-6 text-neutral-400 text-lg leading-relaxed">
            Creating environments that inspire and transform daily life.
          </p>
          <button className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all duration-300 hover:tracking-wider">
            Learn More →
          </button>
        </div>
      </div>
      {/* Left content */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group shine-effect">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
          alt="Urban landscape"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-neutral-950/70 to-neutral-950/50 transition-opacity duration-500 group-hover:opacity-0" />
      </div>
    </section>
    {/* Section 3 */}
    <section className="scroll-section relative h-screen flex flex-col md:flex-row">
      {/* Left content */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group shine-effect">
        <img
          src="https://images.unsplash.com/photo-1682687220067-dced0a5865c5"
          alt="Minimalist interior"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 to-neutral-950/50 transition-opacity duration-500 group-hover:opacity-0" />
      </div>
      {/* Right content */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 bg-neutral-950">
        <div className="max-w-lg float-animation">
          <span className="text-neutral-400 tracking-wider text-sm font-mono">
            03 / SPACE
          </span>
          <h2 className="mt-4 text-5xl md:text-7xl font-bold leading-none bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Interior Flow
          </h2>
          <p className="mt-6 text-neutral-400 text-lg leading-relaxed">
            Harmonizing space and light to create immersive experiences.
          </p>
          <button className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all duration-300 hover:tracking-wider">
            Discover More →
          </button>
        </div>
      </div>
    </section>
    {/* Navigation dots */}
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
      <button
        onclick="scrollToSection(0)"
        className="w-3 h-3 rounded-full bg-white/20 hover:bg-white transition-colors hover:scale-150"
        title="Go to section 1"
      />
      <button
        onclick="scrollToSection(1)"
        className="w-3 h-3 rounded-full bg-white/20 hover:bg-white transition-colors hover:scale-150"
        title="Go to section 2"
      />
      <button
        onclick="scrollToSection(2)"
        className="w-3 h-3 rounded-full bg-white/20 hover:bg-white transition-colors hover:scale-150"
        title="Go to section 3"
      />
    </div>
  </div>
</>;
