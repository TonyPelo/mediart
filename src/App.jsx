import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Globe, 
  Share2, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  HeartHandshake, 
  Send, 
  Menu, 
  X, 
  ExternalLink,
  Code,
  Palette,
  Megaphone,
  ShieldCheck,
  Mail,
  MapPin,
  Images,
  ZoomIn,
  Play,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  const formRef = useRef();

  // Fonction pour un défilement fluide (Smooth Scroll) vers les ancres
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Données du Portfolio (5 vrais projets)
  const projects = [
    {
      id: 1,
      title: "Sana-Terra",
      category: "Sites Web",
      description: "Conception et intégration d'un site web moderne sous WordPress, pensé pour offrir une navigation fluide et valoriser l'identité du projet.",
      tags: ["WordPress", "Webdesign", "Responsive"],
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      link: "https://sana-terra.netlify.app/"
    },
    {
      id: 2,
      title: "Affiches — L'Opticienne de Romainville",
      category: "Réseaux Sociaux & Graphisme",
      description: "Création d'une série de 4 affiches promotionnelles pour mettre en avant les collections de lunettes et les offres en boutique.",
      tags: ["Figma", "Affiches Promo", "Communication Visuelle"],
      image: "/affiche1.png",
      gallery: [
        "/affiche1.png",
        "/affiche2.png",
        "/affiche3.png",
        "/affiche4.png"
      ]
    },
    {
      id: 3,
      title: "Projet International LinkUp",
      category: "Sites Web",
      description: "Développement complet d'une plateforme web dédiée à la mise en relation et au mentorat, hébergée et déployée dans le cadre d'un projet international à l'IUT de Bobigny.",
      tags: ["Développement Web", "PHP / Intégration", "UI/UX Design"],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      link: "https://international.iut-bobigny.univ-paris13.fr/~linkup/index.php"
    },
    {
      id: 4,
      title: "ATLAS — Votre chemin, sans compromis",
      category: "Audiovisuel & Vidéo",
      description: "Réalisation d'un film publicitaire et d'un site sous Jimdo pour ATLAS, une solution technologique inclusive proposant des itinéraires réellement accessibles (fauteuil roulant, poussette, béquilles).",
      tags: ["Film Publicitaire", "CMS Jimdo", "Accessibilité", "Communication"],
      image: "https://img.youtube.com/vi/AOg6j_JCvuY/maxresdefault.jpg",
      link: "https://atlas-52.jimdosite.com/",
      videoLink: "https://www.youtube.com/watch?v=AOg6j_JCvuY"
    },
    {
      id: 5,
      title: "Interview : Jess Anderson",
      category: "Audiovisuel & Vidéo",
      description: "Scénarisation, tournage en studio (caméra, lumière, son) et post-production complète d'une interview promotionnelle fictive (1m30) avec habillage en Motion Design 2D.",
      tags: ["DaVinci Resolve", "Fusion", "Illustrator", "Storytelling", "Tournage"],
      image: "https://img.youtube.com/vi/qDnH75GaW-8/maxresdefault.jpg",
      videoLink: "https://www.youtube.com/watch?v=qDnH75GaW-8"
    }
  ];

  const categories = ['Tous', 'Sites Web', 'Audiovisuel & Vidéo', 'Réseaux Sociaux & Graphisme'];

  const filteredProjects = activeFilter === 'Tous' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleProjectClick = (project) => {
    if (project.gallery) {
      setSelectedGallery(project);
    } else if (project.link && !project.videoLink) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    } else if (project.videoLink && !project.link) {
      window.open(project.videoLink, '_blank', 'noopener,noreferrer');
    } else if (project.link && project.videoLink) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  // Envoi du formulaire via EmailJS avec les variables d'environnement (.env)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendError(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(serviceId, templateId, formRef.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setIsSending(false);
          setFormSubmitted(true);
          formRef.current.reset();
        },
        (error) => {
          console.error('Erreur EmailJS :', error);
          setIsSending(false);
          setSendError("Une erreur est survenue lors de l'envoi. Veuillez vérifier votre connexion ou nous écrire directement par email.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-red-600 selection:text-white">
      
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => handleSmoothScroll(e, '#')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-neutral-950 text-white flex items-center justify-center font-black text-xl tracking-tighter group-hover:bg-red-600 transition-colors">
                M<span className="text-red-600 group-hover:text-white">.</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tight">
                Médi<span className="text-red-600">art</span>
              </span>
            </a>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="#services" 
                onClick={(e) => handleSmoothScroll(e, '#services')}
                className="text-sm font-semibold text-neutral-600 hover:text-red-600 transition-colors"
              >
                Nos Services
              </a>
              <a 
                href="#realisations" 
                onClick={(e) => handleSmoothScroll(e, '#realisations')}
                className="text-sm font-semibold text-neutral-600 hover:text-red-600 transition-colors"
              >
                Réalisations
              </a>
              <a 
                href="#collectif" 
                onClick={(e) => handleSmoothScroll(e, '#collectif')}
                className="text-sm font-semibold text-neutral-600 hover:text-red-600 transition-colors"
              >
                Le Collectif
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="bg-red-600 hover:bg-neutral-950 text-white px-5 py-2.5 text-sm font-bold transition-colors duration-200 flex items-center gap-2"
              >
                Proposer un projet
                <ArrowRight className="w-4 h-4" />
              </a>
            </nav>

            {/* Bouton Menu Mobile */}
            <button 
              className="md:hidden p-2 text-neutral-950"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-6 space-y-4">
            <a 
              href="#services" 
              onClick={(e) => handleSmoothScroll(e, '#services')}
              className="block py-2 text-base font-bold text-neutral-950 hover:text-red-600"
            >
              Nos Services
            </a>
            <a 
              href="#realisations" 
              onClick={(e) => handleSmoothScroll(e, '#realisations')}
              className="block py-2 text-base font-bold text-neutral-950 hover:text-red-600"
            >
              Réalisations
            </a>
            <a 
              href="#collectif" 
              onClick={(e) => handleSmoothScroll(e, '#collectif')}
              className="block py-2 text-base font-bold text-neutral-950 hover:text-red-600"
            >
              Le Collectif
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="block w-full text-center bg-red-600 text-white py-3 font-bold"
            >
              Proposer un projet
            </a>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-24 lg:pt-28 lg:pb-32 overflow-hidden border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-300 px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-950">
                Mécénat de compétences • Projet de fin d'études BUT MMI
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-8">
              Amplifiez l'impact de votre association grâce au <span className="text-red-600 underline decoration-4 underline-offset-8">numérique.</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed mb-10 max-w-2xl font-normal">
              Nous sommes <strong className="text-neutral-950 font-semibold">Médiart</strong>, une équipe d'étudiants en dernière année de BUT Métiers du Multimédia et de l'Internet. Nous concevons votre site web et gérons vos réseaux sociaux <strong className="text-neutral-950 font-semibold">100 % gratuitement</strong> pour soutenir votre cause.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="bg-red-600 hover:bg-neutral-950 text-white px-8 py-4 text-base font-bold transition-all duration-200 flex items-center justify-center gap-3 group"
              >
                Confier mon projet gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#realisations" 
                onClick={(e) => handleSmoothScroll(e, '#realisations')}
                className="bg-white hover:bg-neutral-100 text-neutral-950 border-2 border-neutral-950 px-8 py-4 text-base font-bold transition-colors flex items-center justify-center"
              >
                Voir nos réalisations
              </a>
            </div>

            <div className="mt-14 pt-8 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-sm font-semibold text-neutral-700">Prestation 100 % gratuite</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-sm font-semibold text-neutral-700">Encadré par nos professeurs</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-sm font-semibold text-neutral-700">Livraison clé en main</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/4 select-none pointer-events-none opacity-5">
          <span className="text-[28rem] font-black leading-none text-neutral-950">M.</span>
        </div>
      </section>

      {/* 3. SECTION NOS SERVICES */}
      <section id="services" className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-red-600 font-bold text-sm uppercase tracking-widest block mb-3">
              Nos pôles d'expertise
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950">
              Deux leviers essentiels pour développer votre visibilité.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Carte 1 : Site Web */}
            <div className="bg-white border-2 border-neutral-950 p-8 sm:p-12 flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(10,10,10,1)] hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
              <div>
                <div className="w-14 h-14 bg-red-600 text-white flex items-center justify-center mb-8">
                  <Globe className="w-7 h-7" />
                </div>
                <div className="inline-block bg-neutral-100 text-neutral-950 text-xs font-bold uppercase px-3 py-1 mb-4">
                  Pôle Développement & UX/UI
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4">
                  Création & Refonte de Site Web
                </h3>
                <p className="text-neutral-600 mb-8 leading-relaxed">
                  Un site internet moderne, rapide et pensé pour convertir vos visiteurs en donateurs, adhérents ou bénévoles. Nous créons une plateforme facile à administrer pour vos équipes.
                </p>

                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-red-600 mt-2.5 shrink-0"></span>
                    <span className="text-neutral-800 font-medium"><strong>Design UX/UI sur-mesure :</strong> Maquettage complet sur Figma adapté à votre charte et accessible à tous.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-red-600 mt-2.5 shrink-0"></span>
                    <span className="text-neutral-800 font-medium"><strong>Développement clé en main :</strong> Intégration sous WordPress (Elementor), CMS ou développement sur-mesure.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-red-600 mt-2.5 shrink-0"></span>
                    <span className="text-neutral-800 font-medium"><strong>Objectifs associatifs :</strong> Mise en valeur de vos actions, intégration de formulaires de dons (HelloAsso) et prise de contact simplifiée.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-red-600 mt-2.5 shrink-0"></span>
                    <span className="text-neutral-800 font-medium"><strong>100 % Responsive & SEO :</strong> Parfaitement adapté aux mobiles et optimisé pour être trouvé sur Google.</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#contact" 
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="inline-flex items-center gap-2 font-bold text-neutral-950 group-hover:text-red-600 transition-colors pt-4 border-t border-neutral-200"
              >
                Demander une création ou refonte de site
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Carte 2 : Réseaux Sociaux */}
            <div className="bg-white border-2 border-neutral-950 p-8 sm:p-12 flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(10,10,10,1)] hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
              <div>
                <div className="w-14 h-14 bg-neutral-950 text-white flex items-center justify-center mb-8 group-hover:bg-red-600 transition-colors">
                  <Share2 className="w-7 h-7" />
                </div>
                <div className="inline-block bg-neutral-100 text-neutral-950 text-xs font-bold uppercase px-3 py-1 mb-4">
                  Pôle Communication, Vidéo & Création
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4">
                  Gestion des Réseaux Sociaux
                </h3>
                <p className="text-neutral-600 mb-8 leading-relaxed">
                  Faites rayonner vos combats et vos événements sur Instagram, LinkedIn, YouTube ou TikTok. Nous produisons des contenus visuels et vidéos percutants qui engagent votre communauté.
                </p>

                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-red-600 mt-2.5 shrink-0"></span>
                    <span className="text-neutral-800 font-medium"><strong>Stratégie éditoriale :</strong> Définition de votre ligne éditoriale, du calendrier de publication et des thématiques porteuses.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-red-600 mt-2.5 shrink-0"></span>
                    <span className="text-neutral-800 font-medium"><strong>Création graphique & Motion :</strong> Conception d'affiches, carrousels pédagogiques, stories et habillages animés (Illustrator, Figma, Fusion).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-red-600 mt-2.5 shrink-0"></span>
                    <span className="text-neutral-800 font-medium"><strong>Production vidéo & Interviews :</strong> Tournage, montage (DaVinci Resolve) et capsules vidéos pour mettre en valeur vos actions et bénévoles.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-red-600 mt-2.5 shrink-0"></span>
                    <span className="text-neutral-800 font-medium"><strong>Kit d'autonomie :</strong> Nous vous livrons des modèles prêts à l'emploi pour que vous puissiez continuer facilement après notre intervention.</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#contact" 
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="inline-flex items-center gap-2 font-bold text-neutral-950 group-hover:text-red-600 transition-colors pt-4 border-t border-neutral-200"
              >
                Confier mes réseaux sociaux
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION NOS RÉALISATIONS (PORTFOLIO) */}
      <section id="realisations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-red-600 font-bold text-sm uppercase tracking-widest block mb-3">
                Portfolio & Preuves
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950">
                Nos réalisations récentes.
              </h2>
            </div>
            <p className="text-neutral-600 max-w-md">
              Cliquez sur nos projets pour visiter les sites en ligne, visionner nos productions vidéos ou découvrir nos affiches.
            </p>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-neutral-200 pb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2.5 text-sm font-bold transition-all ${
                  activeFilter === category
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-950 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grille de projets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const isInteractive = Boolean(project.link || project.videoLink || project.gallery);
              return (
                <div 
                  key={project.id} 
                  onClick={() => handleProjectClick(project)}
                  className={`group border border-neutral-200 bg-white flex flex-col justify-between hover:border-neutral-950 transition-all ${
                    isInteractive ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]' : ''
                  }`}
                >
                  <div>
                    {/* Image container */}
                    <div className="relative h-60 overflow-hidden bg-neutral-950">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute top-4 left-4 bg-neutral-950 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                        {project.category}
                      </div>

                      {/* Badges d'action en haut à droite */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        {project.videoLink && (
                          <div className="bg-red-600 text-white px-2.5 py-1.5 text-xs font-bold flex items-center gap-1 shadow-md">
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Vidéo</span>
                          </div>
                        )}
                        {project.link && (
                          <div className="bg-neutral-950 text-white p-2 shadow-md group-hover:bg-red-600 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        )}
                        {project.gallery && (
                          <div className="bg-red-600 text-white px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 shadow-md">
                            <Images className="w-4 h-4" />
                            <span>Voir les 4 affiches</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      <h3 className="text-xl font-black mb-2 group-hover:text-red-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>

                      {/* Liens d'action multiples (Site Web / Vidéo YouTube / Galerie) */}
                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 hover:text-red-600 uppercase tracking-wider border-b-2 border-neutral-950 hover:border-red-600 pb-0.5 transition-colors"
                          >
                            Visiter le site <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.videoLink && (
                          <a
                            href={project.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-neutral-950 uppercase tracking-wider border-b-2 border-red-600 hover:border-neutral-950 pb-0.5 transition-colors"
                          >
                            Voir la vidéo <Play className="w-3.5 h-3.5 fill-current" />
                          </a>
                        )}
                        {project.gallery && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider border-b-2 border-red-600 pb-0.5">
                            Ouvrir la galerie (4 images) <Images className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer de la carte (Tags) */}
                  <div className="px-6 pb-6 pt-4 border-t border-neutral-100 flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs font-semibold bg-neutral-100 text-neutral-800 px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FENÊTRE MODALE POUR LES 4 AFFICHES (L'Opticienne de Romainville) */}
      {selectedGallery && (
        <div 
          className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedGallery(null)}
        >
          <div 
            className="bg-white border-2 border-neutral-950 max-w-5xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-4 mb-6 pb-4 border-b border-neutral-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-600 block mb-1">
                  Galerie de créations • Cliquez sur une affiche pour l'agrandir
                </span>
                <h3 className="text-2xl font-black text-neutral-950">
                  {selectedGallery.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedGallery(null)}
                className="bg-neutral-950 hover:bg-red-600 text-white p-2 transition-colors"
                aria-label="Fermer la galerie"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {selectedGallery.gallery.map((imgUrl, index) => (
                <div 
                  key={index} 
                  onClick={() => setZoomedImage({ url: imgUrl, index: index + 1 })}
                  className="border border-neutral-200 bg-neutral-100 overflow-hidden group cursor-pointer relative hover:border-red-600 transition-colors"
                >
                  <div className="bg-neutral-950 text-white text-xs font-bold px-3 py-2 flex justify-between items-center">
                    <span>Affiche promotionnelle #{index + 1}</span>
                    <span className="text-red-500 flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" /> Agrandir
                    </span>
                  </div>
                  <div className="relative overflow-hidden">
                    <img 
                      src={imgUrl} 
                      alt={`Affiche ${index + 1} - ${selectedGallery.title}`} 
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/40 transition-colors flex items-center justify-center">
                      <div className="bg-red-600 text-white px-4 py-2 font-bold text-xs uppercase tracking-wider flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <ZoomIn className="w-4 h-4" />
                        Voir en grand
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VISIONNEUSE PLEIN ÉCRAN LORSQU'ON CLIQUE SUR UNE AFFICHE */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setZoomedImage(null)}
        >
          <div className="w-full max-w-5xl flex justify-between items-center mb-4 text-white">
            <span className="text-sm font-bold uppercase tracking-wider">
              Affiche promotionnelle #{zoomedImage.index} — <span className="text-red-500">L'Opticienne de Romainville</span>
            </span>
            <button 
              onClick={() => setZoomedImage(null)}
              className="bg-red-600 hover:bg-white hover:text-neutral-950 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              Fermer <X className="w-4 h-4" />
            </button>
          </div>

          <img 
            src={zoomedImage.url} 
            alt={`Affiche plein écran ${zoomedImage.index}`} 
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[82vh] object-contain border-2 border-neutral-800 shadow-2xl bg-neutral-900"
          />
        </div>
      )}

      {/* 5. SECTION LE COLLECTIF MÉDIART */}
      <section id="collectif" className="py-24 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <span className="text-red-500 font-bold text-sm uppercase tracking-widest block mb-3">
                Le Collectif Médiart
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6 leading-tight">
                L'énergie étudiante, l'exigence professionnelle.
              </h2>
              <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                Nous sommes une équipe pluridisciplinaire en <strong className="text-white">3ème année de BUT Métiers du Multimédia et de l'Internet (MMI)</strong> en Île-de-France. Après deux ans et demi de formation intensive, de stages et d'alternances, nous mettons nos compétences au service d'une cause qui a du sens.
              </p>
              <p className="text-neutral-400 leading-relaxed mb-8">
                Pourquoi est-ce gratuit ? Ce projet s'inscrit dans le cadre officiel de notre projet de fin d'études. Notre rémunération, c'est la réussite de votre projet et la validation de notre diplôme.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-800">
                <div className="p-4 bg-neutral-900 border-l-2 border-red-600">
                  <Palette className="w-6 h-6 text-red-500 mb-2" />
                  <h4 className="font-bold text-sm mb-1">Pôle UX/UI & Graphisme</h4>
                  <p className="text-xs text-neutral-400">Interfaces intuitives, chartes graphiques, affiches & maquettes Figma.</p>
                </div>
                <div className="p-4 bg-neutral-900 border-l-2 border-red-600">
                  <Code className="w-6 h-6 text-red-500 mb-2" />
                  <h4 className="font-bold text-sm mb-1">Pôle Développement</h4>
                  <p className="text-xs text-neutral-400">Intégration WordPress, Elementor, CMS & développement sur-mesure.</p>
                </div>
                <div className="p-4 bg-neutral-900 border-l-2 border-red-600">
                  <Megaphone className="w-6 h-6 text-red-500 mb-2" />
                  <h4 className="font-bold text-sm mb-1">Pôle Réseaux & Vidéo</h4>
                  <p className="text-xs text-neutral-400">Stratégie social media, tournage, montage & motion design.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 p-8 hover:border-red-600 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 text-red-500 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Un cadre universitaire strict et sérieux</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Notre travail est évalué et supervisé par nos enseignants et professionnels du numérique. Nous avons une obligation de résultat, de respect des délais et de qualité professionnelle.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-8 hover:border-red-600 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 text-red-500 flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Zéro frais de prestation</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      La conception, le design, le développement et la création de contenus sont intégralement gratuits. Vous économisez plusieurs milliers d'euros de frais d'agence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-8 hover:border-red-600 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 text-red-500 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Autonomie garantie à la livraison</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Nous ne vous laissons pas dans le flou : à la fin du projet, nous vous formons à l'utilisation de votre nouveau site et vous remettons tous les accès et modèles graphiques.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SECTION CONTACT & FOOTER */}
      <footer id="contact" className="bg-neutral-950 text-white pt-20 pb-16 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-neutral-800">
            
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-red-600 text-white flex items-center justify-center font-black text-lg">
                  M.
                </div>
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  Médi<span className="text-red-600">art</span>
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">
                Discutons de votre association.
              </h2>
              <p className="text-neutral-400 mb-8 leading-relaxed">
                Vous avez besoin d'un nouveau site internet, d'une refonte ou d'un coup de boost sur vos réseaux sociaux ? Remplissez ce formulaire ou contactez-nous directement pour organiser un court échange de 10 minutes.
              </p>

              <div className="space-y-4 text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-600" />
                  <a href="mailto:azad.oztopal.pro@gmail.com" className="hover:text-red-500 transition-colors font-medium">
                    azad.oztopal.pro@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span>IUT de Bobigny / Île-de-France (Échanges en visio ou sur place)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form ref={formRef} onSubmit={handleFormSubmit} className="bg-neutral-900 border border-neutral-800 p-8 sm:p-10 space-y-6">
                {formSubmitted ? (
                  <div className="bg-red-600/10 border border-red-600 text-white p-6 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-red-500 mx-auto" />
                    <h3 className="text-xl font-bold">Message envoyé avec succès !</h3>
                    <p className="text-sm text-neutral-300">
                      Merci pour votre intérêt. L'équipe Médiart vous recontactera sous 24h à 48h.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="mt-2 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-white underline"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <>
                    {sendError && (
                      <div className="bg-red-950/60 border border-red-600 p-4 flex items-start gap-3 text-sm text-red-200">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <span>{sendError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                          Nom de l'association *
                        </label>
                        <input 
                          type="text" 
                          name="association_name"
                          required
                          placeholder="Ex: Association Solidaire"
                          className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                          Votre Email *
                        </label>
                        <input 
                          type="email" 
                          name="user_email"
                          required
                          placeholder="contact@association.org"
                          className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                          Téléphone
                        </label>
                        <input 
                          type="tel" 
                          name="user_phone"
                          placeholder="06 00 00 00 00"
                          className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                          Votre besoin principal *
                        </label>
                        <select 
                          name="project_need"
                          required
                          className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                        >
                          <option value="Pack Complet (Site Web + Réseaux Sociaux)">Pack Complet (Site Web + Réseaux Sociaux)</option>
                          <option value="Refonte d'un site existant">Refonte d'un site existant</option>
                          <option value="Création d'un nouveau site web">Création d'un nouveau site web</option>
                          <option value="Gestion des réseaux sociaux uniquement">Gestion des réseaux sociaux uniquement</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                        Parlez-nous brièvement de votre structure et de vos attentes *
                      </label>
                      <textarea 
                        rows="4" 
                        name="message"
                        required
                        placeholder="Bonjour, nous cherchons à moderniser notre site internet et à dynamiser notre page Instagram..."
                        className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition-colors"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="w-full bg-red-600 hover:bg-white hover:text-neutral-950 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-4 px-8 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSending ? (
                        <>
                          Envoi en cours...
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Envoyer notre demande
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </>
                )}
              </form>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
            <p>© 2026 Collectif Médiart — Projet Universitaire BUT MMI (3ème année).</p>
            <p>Conçu et développé avec passion en Île-de-France.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}