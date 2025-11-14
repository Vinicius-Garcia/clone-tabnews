import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

function Home() {
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "Software Engineer",
      name: "Vinicius Garcia",
      hero: "👨‍💻 Software Engineer at EFI Bank | 💙 React, JavaScript, Python, Node.js & PostgreSQL",
      viewSkills: "View My Skills",
      about: "About Me",
      aboutText1:
        "👨‍💻 Software Engineer at EFI Bank passionate about building scalable applications and exploring new technologies. With expertise in React, JavaScript, Python, Node.js, and PostgreSQL, I love crafting efficient and elegant solutions.",
      aboutText2: "",
      navAbout: "About",
      navSkills: "Skills",
      navContact: "Contact",
      skillsTitle: "Skills",
      skillsDesc: "Technologies and tools I work with",
      connectTitle: "Let's Connect",
      connectDesc: "Feel free to reach out!",
    },
    pt: {
      title: "Engenheiro de Software",
      name: "Vinicius Garcia",
      hero: "👨‍💻 Engenheiro de Software na EFI Bank | 💙 React, JavaScript, Python, Node.js e PostgreSQL",
      viewSkills: "Veja Minhas Skills",
      about: "Sobre Mim",
      aboutText1:
        "Engenheiro de Software na EFI Bank apaixonado por construir aplicações escaláveis e explorar novas tecnologias. Com experiência em React, JavaScript, Python, Node.js e PostgreSQL, adoro criar soluções eficientes e elegantes.",
      aboutText2: "",
      navAbout: "Sobre",
      navSkills: "Skills",
      navContact: "Contato",
      skillsTitle: "Habilidades",
      skillsDesc: "Tecnologias e ferramentas com as quais trabalho",
      connectTitle: "Vamos Conectar",
      connectDesc: "Fique à vontade para entrar em contato!",
    },
  };

  const txt = content[language];

  useEffect(() => {
    // Wait for external libraries to be loaded
    const checkLibraries = setInterval(() => {
      if (typeof Lenis !== "undefined" && typeof THREE !== "undefined") {
        clearInterval(checkLibraries);
        initializeAnimations();
      }
    }, 50);

    return () => clearInterval(checkLibraries);
  }, []);

  const initializeAnimations = () => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutCubic
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute("href"));
      });
    });

    let scene, camera, renderer, torusKnot;

    function initThreeJS() {
      const canvas = document.getElementById("bg-canvas");
      if (!canvas) {
        console.error("Canvas element not found!");
        return;
      }

      // 1. Scene
      scene = new THREE.Scene();

      // 2. Camera
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 2.5;

      // 3. Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true, // Transparent background
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 4. Geometry & Material
      const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
      const material = new THREE.MeshStandardMaterial({
        color: 0x58a6ff, // Accent color
        wireframe: true,
      });

      // 5. Mesh
      torusKnot = new THREE.Mesh(geometry, material);
      scene.add(torusKnot);

      // 6. Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(2, 3, 4);
      scene.add(pointLight);

      // Handle window resize
      window.addEventListener("resize", onWindowResize, false);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    const parallaxElements = document.querySelectorAll("[data-parallax-speed]");
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      },
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });

    // === MAIN ANIMATION LOOP ===
    // We combine Lenis, Three.js, and Parallax into one loop
    function raf(time) {
      // 1. Run Lenis
      lenis.raf(time);

      // 2. Animate Three.js model
      if (torusKnot) {
        torusKnot.rotation.x += 0.001;
        torusKnot.rotation.y += 0.002;
        renderer.render(scene, camera);
      }

      // 3. Handle Parallax
      const scrollY = lenis.animatedScroll;
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed) || 0.5;
        el.style.transform = `translateY(${scrollY * speed * -0.2}px)`;
      });

      // 4. Request next frame
      requestAnimationFrame(raf);
    }

    // Start everything
    try {
      initThreeJS();
      requestAnimationFrame(raf);
    } catch (error) {
      console.error("Failed to initialize animations:", error);
      // Fallback for non-JS or failed init
      document.body.style.overflow = "auto";
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {txt.name} - {txt.title}
        </title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                  },
                  colors: {
                    'primary': '#0D1117',
                    'secondary': '#161B22',
                    'accent': '#58A6FF',
                    'light': '#C9D1D9',
                    'medium': '#8B949E',
                  },
                  animation: {
                    'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                  },
                  keyframes: {
                    fadeInUp: {
                      '0%': { opacity: '0', transform: 'translateY(30px)' },
                      '100%': { opacity: '1', transform: 'translateY(0)' },
                    },
                  },
                },
              },
            };
          `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body {
              background-color: #0D1117;
              color: #C9D1D9;
              font-family: 'Inter', sans-serif;
              overflow: hidden;
            }

            html.lenis {
              height: auto;
            }
            .lenis.lenis-smooth {
              scroll-behavior: auto !important;
            }
            .lenis.lenis-stopped {
              overflow: hidden;
            }
            
            #bg-canvas {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100vh;
              z-index: -1;
              opacity: 0.25;
            }

            .section-border {
              border-bottom: 1px solid #21262D;
            }
            
            .card-blur {
              background: rgba(22, 27, 34, 0.6);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              border: 1px solid rgba(56, 62, 70, 0.3);
              border-radius: 16px;
              transition: all 0.3s ease;
            }
            .card-blur:hover {
              border: 1px solid rgba(88, 166, 255, 0.5);
              transform: translateY(-5px);
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }

            .reveal {
              opacity: 0;
              transform: translateY(30px);
              transition: opacity 0.8s ease-out, transform 0.8s ease-out;
            }
            .reveal.visible {
              opacity: 1;
              transform: translateY(0);
            }
          `,
          }}
        />
      </Head>
      <Script src="https://cdn.tailwindcss.com" strategy="afterInteractive" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"
        strategy="afterInteractive"
      />

      <div className="bg-primary text-light font-sans">
        <canvas id="bg-canvas"></canvas>

        <div className="lenis-wrapper">
          <div className="lenis-content">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <header className="py-6 flex justify-between items-center text-light">
                <div className="text-2xl font-bold text-accent">VG.</div>
                <nav className="hidden md:flex space-x-8 font-medium items-center">
                  <a
                    href="#about"
                    className="hover:text-accent transition-colors"
                  >
                    {language === "en" ? "About" : "Sobre"}
                  </a>
                  <a
                    href="#skills"
                    className="hover:text-accent transition-colors"
                  >
                    Skills
                  </a>
                  <a
                    href="#contact"
                    className="hover:text-accent transition-colors"
                  >
                    {language === "en" ? "Contact" : "Contato"}
                  </a>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setLanguage("en")}
                      className={`text-xl hover:opacity-80 transition ${
                        language === "en" ? "opacity-100" : "opacity-50"
                      }`}
                      title="English"
                    >
                      🇺🇸
                    </button>
                    <button
                      onClick={() => setLanguage("pt")}
                      className={`text-xl hover:opacity-80 transition ${
                        language === "pt" ? "opacity-100" : "opacity-50"
                      }`}
                      title="Português"
                    >
                      🇧🇷
                    </button>
                  </div>
                </nav>
                <button className="md:hidden text-accent">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </button>
              </header>

              {/* Hero Section */}
              <section
                id="hero"
                className="h-screen min-h-[700px] flex items-center justify-center text-center relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div data-parallax-speed="0.4">
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter">
                      {txt.title}
                    </h1>
                    <p className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-light text-accent tracking-tight">
                      {txt.name}
                    </p>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-medium">
                      {txt.hero}
                    </p>
                  </div>
                  <a
                    href="#skills"
                    className="mt-12 inline-block bg-accent text-primary font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-accent/30 hover:bg-white hover:text-accent transition-all duration-300 transform hover:scale-105"
                    data-parallax-speed="0.1"
                  >
                    {txt.viewSkills}
                  </a>
                </div>
              </section>

              {/* About Section */}
              <section id="about" className="py-20 lg:py-32 section-border">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="reveal">
                    <div className="rounded-2xl bg-secondary w-full h-80 lg:h-96 flex items-center justify-center text-medium">
                      <img
                        src="https://placehold.co/600x400/161B22/8B949E?text=Vinicius+Garcia"
                        alt="Portrait of Vinicius Garcia"
                        className="w-full h-full object-cover rounded-2xl shadow-xl"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                  <div className="reveal" style={{ transitionDelay: "200ms" }}>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
                      {txt.about}
                    </h2>
                    <p className="text-lg text-medium mb-4">{txt.aboutText1}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="bg-secondary text-accent text-sm font-medium px-4 py-2 rounded-full">
                        JavaScript
                      </span>
                      <span className="bg-secondary text-accent text-sm font-medium px-4 py-2 rounded-full">
                        React
                      </span>
                      <span className="bg-secondary text-accent text-sm font-medium px-4 py-2 rounded-full">
                        Node.js
                      </span>
                      <span className="bg-secondary text-accent text-sm font-medium px-4 py-2 rounded-full">
                        Python
                      </span>
                      <span className="bg-secondary text-accent text-sm font-medium px-4 py-2 rounded-full">
                        PostgreSQL
                      </span>
                      <span className="bg-secondary text-accent text-sm font-medium px-4 py-2 rounded-full">
                        Git
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Skills Section */}
              <section id="skills" className="py-20 lg:py-32 section-border">
                <div className="text-center mb-16 reveal">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                    {txt.skillsTitle}
                  </h2>
                  <p className="text-lg text-medium max-w-2xl mx-auto">
                    {txt.skillsDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                  {[
                    { name: "JavaScript", icon: "javascript-original" },
                    { name: "HTML5", icon: "html5-original" },
                    { name: "CSS3", icon: "css3-original" },
                    { name: "React", icon: "react-original" },
                    { name: "Node.js", icon: "nodejs-original" },
                    { name: "Python", icon: "python-original" },
                    { name: "PostgreSQL", icon: "postgresql-original" },
                    { name: "MongoDB", icon: "mongodb-original" },
                    { name: "Git", icon: "git-original" },
                  ].map((skill, index) => (
                    <div
                      key={index}
                      className="card-blur reveal flex flex-col items-center justify-center p-8"
                      data-parallax-speed="0.1"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="w-24 h-24 mb-4 flex items-center justify-center">
                        <img
                          src={`https://raw.githubusercontent.com/devicons/devicon/master/icons/${skill.icon.split("-")[0]}/${skill.icon}.svg`}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/96?text=" +
                              skill.name;
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white text-center">
                        {skill.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-20 lg:py-32">
                <div className="card-blur max-w-3xl mx-auto p-8 sm:p-12 lg:p-16 reveal">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                      {txt.connectTitle}
                    </h2>
                    <p className="text-lg text-medium">{txt.connectDesc}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
                    <a
                      href="https://github.com/Vinicius-Garcia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-accent hover:bg-white text-primary font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                    <a
                      href="mailto:viniciusgarcia1300@gmail.com"
                      className="inline-flex items-center justify-center bg-accent hover:bg-white text-primary font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      Email
                    </a>
                    <a
                      href="https://www.linkedin.com/in/vinicius-da-silva-garcia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-accent hover:bg-white text-primary font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.006 1.422-.103.249-.129.597-.129.946v5.437h-3.554s.047-8.81 0-9.716h3.554v1.375c.427-.66 1.191-1.599 2.897-1.599 2.117 0 3.704 1.385 3.704 4.362v5.578zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.707 0-.954.771-1.708 1.96-1.708 1.188 0 1.914.754 1.939 1.708 0 .949-.751 1.707-1.984 1.707zm1.667 11.019H3.67V9.736h3.333v10.716zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="text-center py-10 border-t border-secondary mt-20">
                <p className="text-medium">
                  © 2025 Vinicius Garcia. Built with code and passion.
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
