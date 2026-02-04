import React, { useState, useEffect, useRef } from 'react';
import { 
  Edit2, Save, X, ExternalLink, PlayCircle, ArrowRight, Upload, Lock, 
  Image as ImageIcon, Trash2, Plus, ArrowUp, ArrowDown, Palette, Type, 
  Layout, Maximize2, Minimize2, Menu, Facebook, Twitter, Instagram, 
  Linkedin, Mail, Phone, Video, Move, CheckCircle, Shapes, Sparkles 
} from 'lucide-react';

// --- DAFTAR 30 FONT GOOGLE ---
const FONT_OPTIONS = [
  "Poppins", "Playfair Display", "Roboto", "Open Sans", "Lato", 
  "Montserrat", "Merriweather", "Nunito", "Raleway", "Oswald", 
  "Source Sans Pro", "Slabo 27px", "PT Sans", "Roboto Slab", "Work Sans", 
  "Lora", "Quicksand", "Barlow", "Inconsolata", "Allura", 
  "Dancing Script", "Pacifico", "Satisfy", "Great Vibes", "Courier Prime", 
  "Fira Code", "Inter", "DM Sans", "Manrope", "Crimson Text"
];

// --- DAFTAR ANIMASI CSS ---
const ANIMATION_OPTIONS = [
  { label: "None", value: "" },
  { label: "Fade In", value: "animate-fade-in" },
  { label: "Bounce", value: "animate-bounce" },
  { label: "Pulse", value: "animate-pulse" },
  { label: "Spin (Slow)", value: "animate-spin-slow" },
  { label: "Float", value: "animate-float" }
];

// --- STYLES & FONTS ---
const FontStyles = ({ fonts, colors }) => {
  // Generate Google Fonts URL dynamically
  const fontQuery = FONT_OPTIONS.map(f => f.replace(/ /g, '+')).join('|');
  
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=${fontQuery}&display=swap');
      
      :root {
        --color-primary: ${colors.primary};
        --color-secondary: ${colors.secondary};
        --color-accent: ${colors.accent};
        --color-bg: ${colors.bg};
        
        --font-title: '${fonts?.title}', serif;
        --font-body: '${fonts?.body}', sans-serif;
      }

      body { 
        font-family: var(--font-body); 
        background-color: var(--color-bg); 
        color: var(--color-primary); 
        overflow-x: hidden;
      }
      
      h1, h2, h3, h4, h5, h6 { font-family: var(--font-title); }
      
      .text-primary { color: var(--color-primary); }
      .text-secondary { color: var(--color-secondary); }
      .text-accent { color: var(--color-accent); }
      .bg-accent { background-color: var(--color-accent); }
      .border-accent { border-color: var(--color-accent); }

      /* Page Transition */
      @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .page-transition { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

      /* Edit Mode UI */
      .edit-active {
        border: 1px dashed var(--color-accent);
        background-color: rgba(72, 52, 212, 0.05);
        border-radius: 4px;
        padding: 2px; 
        min-width: 10px;
        display: inline-block;
      }
      .edit-active:hover {
        background-color: rgba(72, 52, 212, 0.1);
        border-color: var(--color-primary);
      }
      .edit-input {
        width: 100%; background: transparent; outline: none; border: none;
        font-family: inherit; font-size: inherit; font-weight: inherit; color: inherit; text-align: inherit;
      }

      /* Progress Bar */
      @keyframes fillBar { from { width: 0; } to { width: var(--w); } }
      .progress-fill { animation: fillBar 1s ease-out forwards; }

      /* Custom Animations */
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      .animate-float { animation: float 3s ease-in-out infinite; }
      .animate-spin-slow { animation: spin 8s linear infinite; }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

      /* Draggable Shape */
      .draggable-shape { cursor: move; position: absolute; z-index: 5; }
      .draggable-shape:active { cursor: grabbing; }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: var(--color-bg); }
      ::-webkit-scrollbar-thumb { background: var(--color-accent); border-radius: 4px; }
    `}</style>
  );
};

// --- HELPER COMPONENTS ---

const InlineText = ({ isEditing, value, onChange, className, multiline = false, tag: Tag = 'div', placeholder = "...", ...props }) => {
  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${className} edit-active edit-input min-h-[1.5em] resize-none overflow-hidden`}
          placeholder={placeholder}
          rows={3}
          {...props}
        />
      );
    }
    return (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} edit-active edit-input`}
        placeholder={placeholder}
        {...props}
      />
    );
  }
  return <Tag className={className} {...props} dangerouslySetInnerHTML={{ __html: value?.replace(/\n/g, '<br/>') }} />;
};

// Media Handler (Image & Video)
const InlineMedia = ({ isEditing, src, onUpload, className, containerClassName }) => {
  const isVideo = src?.startsWith('data:video') || src?.endsWith('.mp4');
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { // 50MB Limit
        alert("File terlalu besar! Maksimal 50MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => onUpload(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`relative group ${containerClassName}`}>
      {src ? (
        isVideo ? (
           <video src={src} className={className} controls autoPlay muted loop />
        ) : (
           <img src={src} alt="Content" className={className} />
        )
      ) : (
        <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}>
           <ImageIcon size={24} />
        </div>
      )}
      
      {isEditing && (
        <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-inherit border-2 border-white border-dashed">
          <Upload className="text-white w-8 h-8 mb-1" />
          <span className="text-white text-xs font-bold uppercase tracking-widest bg-black/50 px-2 py-1 rounded">
             {isVideo ? 'Ganti Video' : 'Ganti Media'}
          </span>
          <p className="text-[9px] text-white mt-1">Max 50MB (Img/Vid)</p>
          <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
};

// Section Wrapper
const SectionWrapper = ({ isEditing, children, onMoveUp, onMoveDown, onDelete, label, animation, onAnimationChange }) => {
  if (!isEditing) return <div className={`relative ${animation || ''}`}>{children}</div>;
  
  return (
    <div className="section-wrapper relative border border-dashed border-gray-300 hover:border-accent rounded-xl transition-all mb-8 p-2 group">
      <div className="section-controls absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-white shadow-xl border border-gray-100 rounded-full p-1.5 px-3 transform scale-95 hover:scale-100 transition-transform">
        <span className="text-[10px] font-bold text-accent mr-2 px-2 uppercase tracking-wider">{label}</span>
        
        <select 
          value={animation || ""} 
          onChange={(e) => onAnimationChange(e.target.value)}
          className="text-[10px] border rounded bg-gray-50 mr-2 max-w-[80px]"
        >
          {ANIMATION_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <button onClick={onMoveUp} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600"><ArrowUp size={12}/></button>
        <button onClick={onMoveDown} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600"><ArrowDown size={12}/></button>
        <div className="w-px h-3 bg-gray-300 mx-1"></div>
        <button onClick={onDelete} className="p-1.5 hover:bg-red-50 rounded-full text-red-500"><Trash2 size={12}/></button>
      </div>
      <div className={animation || ''}>
        {children}
      </div>
    </div>
  );
};

// Draggable Shape Component
const DraggableShape = ({ shape, isEditing, onUpdate, onDelete }) => {
  const [position, setPosition] = useState({ x: shape.x, y: shape.y });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => setPosition({ x: shape.x, y: shape.y }), [shape]);

  const handleMouseDown = (e) => {
    if (!isEditing) return;
    setIsDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y
    });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onUpdate(shape.id, { x: position.x, y: position.y });
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
       window.removeEventListener('mousemove', handleMouseMove);
       window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging]);

  return (
    <div 
      className={`draggable-shape ${shape.animation}`}
      style={{ 
        left: position.x, 
        top: position.y, 
        width: shape.size, 
        height: shape.size,
        borderRadius: shape.type === 'circle' ? '50%' : '10px',
        backgroundColor: shape.color,
        opacity: shape.opacity,
        cursor: isEditing ? 'move' : 'default',
        border: isEditing ? '1px dashed #ccc' : 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      {isEditing && (
        <button 
          onClick={() => onDelete(shape.id)} 
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-sm"
        >
          <X size={8} />
        </button>
      )}
    </div>
  );
};

// --- DATA DEFAULT ---
const DEFAULT_CONTENT = {
  theme: {
    primary: '#1a1a1a',
    secondary: '#666666',
    accent: '#4834d4',
    bg: '#ffffff',
    fonts: {
      title: "Playfair Display",
      body: "Poppins"
    }
  },
  socials: [
    { id: 1, type: 'instagram', url: 'https://instagram.com' },
    { id: 2, type: 'linkedin', url: 'https://linkedin.com' },
    { id: 3, type: 'email', url: 'mailto:me@mail.com' }
  ],
  decorations: [], // Array for draggable shapes
  nav: {
    logoText: "AW",
    logoImage: "", 
    useImageLogo: false,
    menu: [
      { id: 'HOME', text: "HOME" },
      { id: 'ABOUT', text: "ABOUT" },
      { id: 'OFFER', text: "SERVICES" },
      { id: 'PORTFOLIO', text: "WORKS" }
    ]
  },
  footer: {
    text: "© 2026 Abrar Wall - All Rights Reserved.",
    tagline: "Designed by Me"
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      page: 'HOME',
      animation: 'animate-fade-in',
      data: {
        greeting: "Hello !",
        name: "I am ABRAR WALL",
        tagline: "Think Deeply But Do Simple",
        scrollText: "Scroll ↓",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    },
    {
      id: 'about',
      type: 'about',
      page: 'ABOUT',
      animation: 'animate-fade-in',
      data: {
        title: "About Me",
        subtitle: "Introduce",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        quote: "Donec tincidunt arcu a interdum efficitur. Nullam egestas bibendum tristique.",
        signature: "Lili Dian",
        cvLink: "#",
        info: [
          { label: "Name", value: "Abrar Wall" },
          { label: "Age", value: "27 Years" },
          { label: "Email", value: "info.abrar@gmail.com" },
          { label: "Phone", value: "+62 123 4567 890" }
        ],
        skills: [
          { name: "Photoshop", percent: 99 },
          { name: "Web Dev", percent: 90 }
        ],
        btnText: "Download CV"
      }
    },
    {
      id: 'services',
      type: 'generic',
      page: 'OFFER',
      animation: 'animate-fade-in',
      data: {
        title: "What I Offer",
        text: "I offer high quality digital services for your business.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
      }
    },
    {
      id: 'works',
      type: 'portfolio',
      page: 'PORTFOLIO',
      animation: 'animate-fade-in',
      data: {
        title: "Selected Works",
        subtitle: "Portfolio",
        items: [
          { id: 1, title: "Mobile UI", category: "DESIGN", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80", hasPlay: false },
          { id: 2, title: "Web Platform", category: "WEB", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", hasPlay: false }
        ]
      }
    }
  ]
};

export default function App() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [activeTab, setActiveTab] = useState("HOME");
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // States
  const [editForm, setEditForm] = useState(DEFAULT_CONTENT);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  // Transition Logic
  const handlePageChange = (pageId) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(pageId);
      window.scrollTo(0,0);
      setIsAnimating(false);
    }, 300); // Wait for exit animation if we implemented one, or just instant switch with enter animation
  };

  // --- ACTIONS ---
  const data = isEditing ? editForm : content;

  const updateState = (updater) => {
    setEditForm(prev => {
      const newState = typeof updater === 'function' ? updater(prev) : updater;
      return { ...prev, ...newState };
    });
  };

  const updateSectionData = (id, field, value) => {
    updateState(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === id ? { ...s, data: { ...s.data, [field]: value } } : s)
    }));
  };

  const updateSectionDeep = (id, arrayName, idx, key, value) => {
    updateState(prev => ({
      ...prev,
      sections: prev.sections.map(s => {
        if (s.id !== id) return s;
        const newArray = [...s.data[arrayName]];
        newArray[idx] = { ...newArray[idx], [key]: value };
        return { ...s, data: { ...s.data, [arrayName]: newArray } };
      })
    }));
  };

  const handleSave = () => {
    setContent(editForm);
    setIsEditing(false);
    setShowSaveModal(true);
    setTimeout(() => setShowSaveModal(false), 2000);
  };

  // Decoration Logic
  const addDecoration = (type) => {
    const newDeco = {
      id: Date.now(),
      type: type, // 'circle' or 'rect'
      x: 100, y: 100,
      size: 100,
      color: data.theme.accent,
      opacity: 0.2,
      page: activeTab,
      animation: 'animate-float'
    };
    updateState(p => ({...p, decorations: [...p.decorations, newDeco]}));
  };

  const updateDecoration = (id, pos) => {
    updateState(p => ({
      ...p, 
      decorations: p.decorations.map(d => d.id === id ? {...d, x: pos.x, y: pos.y} : d)
    }));
  };

  const renderSocialIcon = (type, size=18) => {
    switch(type) {
      case 'facebook': return <Facebook size={size}/>;
      case 'twitter': return <Twitter size={size}/>;
      case 'instagram': return <Instagram size={size}/>;
      case 'linkedin': return <Linkedin size={size}/>;
      case 'email': return <Mail size={size}/>;
      case 'whatsapp': return <Phone size={size}/>;
      default: return <ExternalLink size={size}/>;
    }
  };

  // --- SECTION RENDERERS ---
  const renderSection = (section) => {
    const { id, type, data: sData, animation } = section;

    // HERO SECTION
    if (type === 'hero') {
      return (
        <SectionWrapper 
          key={id} isEditing={isEditing} label="Hero" animation={animation}
          onMoveUp={() => {}} onMoveDown={() => {}} onDelete={() => {}} 
          onAnimationChange={(v) => updateState(p => ({...p, sections: p.sections.map(s => s.id === id ? {...s, animation: v} : s)}))}
        >
          <div className="relative flex flex-col md:flex-row items-center justify-between min-h-[85vh] overflow-hidden pt-10">
            <div className="w-full md:w-1/2 z-10 px-6 md:px-0">
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-2">
                <InlineText isEditing={isEditing} value={sData.greeting} onChange={(v) => updateSectionData(id, 'greeting', v)} tag="span" />
              </h2>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-primary mb-6 font-serif leading-tight">
                <InlineText isEditing={isEditing} value={sData.name} onChange={(v) => updateSectionData(id, 'name', v)} tag="span" />
              </h1>
              <p className="text-sm text-secondary tracking-widest uppercase font-medium">
                <InlineText isEditing={isEditing} value={sData.tagline} onChange={(v) => updateSectionData(id, 'tagline', v)} tag="span" />
              </p>
              <div className="mt-16 text-sm font-bold flex items-center gap-2 animate-bounce">
                 <InlineText isEditing={isEditing} value={sData.scrollText} onChange={(v) => updateSectionData(id, 'scrollText', v)} tag="span" />
              </div>
            </div>

            <div className="w-full md:w-1/2 relative flex justify-center items-center mt-12 md:mt-0 z-10">
               <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]">
                  <div className="absolute inset-0 rounded-full bg-accent opacity-20 blur-3xl animate-pulse"></div>
                  <div className="absolute inset-4 rounded-full border-[20px] border-white/50 shadow-2xl overflow-hidden">
                    <InlineMedia 
                      isEditing={isEditing} src={sData.image} 
                      onUpload={(b64) => updateSectionData(id, 'image', b64)}
                      containerClassName="w-full h-full" className="w-full h-full object-cover"
                    />
                  </div>
               </div>
            </div>
          </div>
        </SectionWrapper>
      );
    }

    // ABOUT SECTION
    if (type === 'about') {
      return (
        <SectionWrapper 
          key={id} isEditing={isEditing} label="About" animation={animation}
          onMoveUp={() => {}} onMoveDown={() => {}} onDelete={() => {}} 
          onAnimationChange={(v) => updateState(p => ({...p, sections: p.sections.map(s => s.id === id ? {...s, animation: v} : s)}))}
        >
           <div className="text-center mb-16">
             <h2 className="text-4xl font-serif font-bold text-primary">
               <InlineText isEditing={isEditing} value={sData.title} onChange={(v) => updateSectionData(id, 'title', v)} tag="span" />
             </h2>
             <p className="text-accent font-serif italic">
               <InlineText isEditing={isEditing} value={sData.subtitle} onChange={(v) => updateSectionData(id, 'subtitle', v)} tag="span" />
             </p>
           </div>

           <div className="flex flex-col lg:flex-row gap-16 items-center">
             <div className="w-full lg:w-1/3 flex justify-center">
               <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-gray-50 shadow-inner">
                  <InlineMedia 
                    isEditing={isEditing} src={sData.image} 
                    onUpload={(b64) => updateSectionData(id, 'image', b64)}
                    containerClassName="w-full h-full" className="w-full h-full object-cover"
                  />
               </div>
             </div>

             <div className="w-full lg:w-2/3">
                <div className="mb-8">
                  <div className="text-6xl text-gray-200 font-serif -mb-4">“</div>
                  <div className="text-secondary italic leading-relaxed text-lg font-serif pl-4">
                    <InlineText isEditing={isEditing} value={sData.quote} onChange={(v) => updateSectionData(id, 'quote', v)} multiline={true} />
                  </div>
                  <div className="mt-4 font-handwriting text-2xl text-accent font-serif pl-4">
                     <InlineText isEditing={isEditing} value={sData.signature} onChange={(v) => updateSectionData(id, 'signature', v)} tag="span" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mt-8">
                   <div className="space-y-4">
                     {sData.info.map((item, idx) => (
                       <div key={idx} className="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 pb-2">
                         <span className="w-24 font-bold text-sm text-primary">
                           <InlineText isEditing={isEditing} value={item.label} onChange={(v) => updateSectionDeep(id, 'info', idx, 'label', v)} tag="span" /> :
                         </span>
                         <span className="text-sm text-secondary flex-1">
                           <InlineText isEditing={isEditing} value={item.value} onChange={(v) => updateSectionDeep(id, 'info', idx, 'value', v)} tag="span" />
                         </span>
                         {isEditing && <button onClick={() => {
                           const newInfo = sData.info.filter((_, i) => i !== idx);
                           updateSectionData(id, 'info', newInfo);
                         }} className="text-red-500"><Trash2 size={12}/></button>}
                       </div>
                     ))}
                     {isEditing && <button onClick={() => updateSectionData(id, 'info', [...sData.info, {label:"Label", value:"Value"}])} className="text-xs text-blue-500 font-bold">+ Info</button>}
                     
                     <div className="mt-6 flex gap-2 items-center">
                       {isEditing ? (
                         <div className="w-full">
                           <label className="text-xs text-gray-400">Link CV (Google Drive)</label>
                           <input type="text" className="w-full border p-2 text-xs rounded" value={sData.cvLink} onChange={(e) => updateSectionData(id, 'cvLink', e.target.value)} placeholder="https://drive.google.com/..." />
                           <InlineText isEditing={isEditing} value={sData.btnText} onChange={(v) => updateSectionData(id, 'btnText', v)} className="bg-accent text-white px-4 py-2 rounded-full text-center mt-2 w-max" />
                         </div>
                       ) : (
                         <a href={sData.cvLink} target="_blank" rel="noreferrer" className="bg-accent text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors font-bold text-sm">
                           {sData.btnText}
                         </a>
                       )}
                     </div>
                   </div>

                   <div className="space-y-6">
                      {sData.skills.map((skill, idx) => (
                        <div key={idx} className="relative group">
                           <div className="flex justify-between mb-1 text-sm font-bold text-primary">
                             <InlineText isEditing={isEditing} value={skill.name} onChange={(v) => updateSectionDeep(id, 'skills', idx, 'name', v)} tag="span" />
                             {isEditing ? (
                               <input type="number" value={skill.percent} onChange={(e) => updateSectionDeep(id, 'skills', idx, 'percent', parseInt(e.target.value))} className="w-12 border rounded px-1" />
                             ) : (
                               <span>{skill.percent}%</span>
                             )}
                           </div>
                           <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-accent progress-fill" style={{'--w': `${skill.percent}%`}}></div>
                           </div>
                           {isEditing && <button onClick={() => {
                             const newSkills = sData.skills.filter((_, i) => i !== idx);
                             updateSectionData(id, 'skills', newSkills);
                           }} className="absolute -right-6 top-0 text-red-500"><Trash2 size={12}/></button>}
                        </div>
                      ))}
                      {isEditing && <button onClick={() => updateSectionData(id, 'skills', [...sData.skills, { name: "New Skill", percent: 50 }])} className="text-xs text-blue-500 font-bold">+ Add Skill</button>}
                   </div>
                </div>
             </div>
           </div>
        </SectionWrapper>
      );
    }

    // GENERIC & PORTFOLIO
    if (type === 'portfolio' || type === 'generic') {
      return (
        <SectionWrapper 
          key={id} isEditing={isEditing} label={type} animation={animation}
          onMoveUp={() => {}} onMoveDown={() => {}} onDelete={() => {}} 
          onAnimationChange={(v) => updateState(p => ({...p, sections: p.sections.map(s => s.id === id ? {...s, animation: v} : s)}))}
        >
           {type === 'portfolio' && (
             <div className="text-center mb-16">
                <h2 className="text-3xl font-bold font-serif text-primary">
                   <InlineText isEditing={isEditing} value={sData.title} onChange={(v) => updateSectionData(id, 'title', v)} tag="span" />
                </h2>
                <p className="text-secondary italic font-serif">
                   <InlineText isEditing={isEditing} value={sData.subtitle} onChange={(v) => updateSectionData(id, 'subtitle', v)} tag="span" />
                </p>
             </div>
           )}

           {type === 'generic' && (
             <div className="flex flex-col md:flex-row gap-10 items-center">
               <div className="w-full md:w-1/2">
                 <h2 className="text-3xl font-bold font-serif mb-4 text-primary">
                   <InlineText isEditing={isEditing} value={sData.title} onChange={(v) => updateSectionData(id, 'title', v)} tag="span" />
                 </h2>
                 <div className="text-secondary leading-relaxed">
                   <InlineText isEditing={isEditing} value={sData.text} onChange={(v) => updateSectionData(id, 'text', v)} multiline={true} />
                 </div>
               </div>
               <div className="w-full md:w-1/2">
                 <InlineMedia isEditing={isEditing} src={sData.image} onUpload={(b64) => updateSectionData(id, 'image', b64)} containerClassName="rounded-xl overflow-hidden shadow-lg" className="w-full h-auto" />
               </div>
             </div>
           )}

           {type === 'portfolio' && (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {sData.items.map((item, idx) => (
                 <div key={item.id} className="group relative bg-white p-4 shadow-sm hover:shadow-xl transition-shadow border border-gray-100 rounded-xl">
                    <InlineMedia isEditing={isEditing} src={item.image} onUpload={(b64) => updateSectionDeep(id, 'items', idx, 'image', b64)} containerClassName="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4" className="w-full h-full object-cover" />
                    <h3 className="font-bold text-lg text-primary"><InlineText isEditing={isEditing} value={item.title} onChange={(v) => updateSectionDeep(id, 'items', idx, 'title', v)} tag="span" /></h3>
                    <p className="text-xs text-accent font-bold uppercase tracking-wider"><InlineText isEditing={isEditing} value={item.category} onChange={(v) => updateSectionDeep(id, 'items', idx, 'category', v)} tag="span" /></p>
                    {isEditing && <button onClick={() => {
                        const newItems = sData.items.filter(it => it.id !== item.id);
                        updateSectionData(id, 'items', newItems);
                    }} className="absolute top-2 right-2 p-1 bg-white text-red-500 rounded shadow"><Trash2 size={14}/></button>}
                 </div>
               ))}
               {isEditing && <button onClick={() => {
                 const newItems = [...sData.items, { id: Date.now(), title: "New Work", category: "WEB", image: "" }];
                 updateSectionData(id, 'items', newItems);
               }} className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:border-accent hover:text-accent p-8"><Plus size={32}/> Add Work</button>}
             </div>
           )}
        </SectionWrapper>
      );
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-[var(--color-bg)]">
      <FontStyles fonts={data.theme.fonts} colors={data.theme} />

      {/* LOADING STATE */}
      {/* Removed - using simple password login now */}

      {/* DRAGGABLE DECORATIONS */}
      {data.decorations?.filter(d => d.page === activeTab).map(deco => (
        <DraggableShape 
          key={deco.id} shape={deco} isEditing={isEditing} 
          onUpdate={updateDecoration} 
          onDelete={(id) => updateState(p => ({...p, decorations: p.decorations.filter(d => d.id !== id)}))} 
        />
      ))}

      {/* NAVBAR */}
      <nav className="py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b border-gray-50">
        <div className="w-12 h-12 bg-primary text-white flex items-center justify-center font-serif text-xl font-bold rounded bg-[var(--color-primary)]">
           {data.nav.useImageLogo ? (
             <img src={data.nav.logoImage} alt="Logo" className="w-full h-full object-cover rounded" />
           ) : (
             <InlineText isEditing={isEditing} value={data.nav.logoText} onChange={(v) => updateState(p => ({...p, nav: {...p.nav, logoText: v}}))} tag="span" className="text-white" />
           )}
        </div>
        
        {/* Social Icons (Editable) */}
        <div className="hidden md:flex gap-4 text-gray-400">
           {data.socials.map((soc) => (
             <div key={soc.id} className="relative group">
               <a href={soc.url} target="_blank" className="hover:text-[var(--color-accent)] transition-colors">{renderSocialIcon(soc.type)}</a>
               {isEditing && (
                 <div className="absolute top-6 left-0 bg-white shadow-xl p-2 border z-50 w-48 rounded text-xs">
                   <select value={soc.type} onChange={(e) => updateState(p => ({...p, socials: p.socials.map(s => s.id === soc.id ? {...s, type: e.target.value} : s)}))} className="w-full mb-1 border rounded">
                     {['facebook','twitter','instagram','linkedin','email','whatsapp'].map(t => <option key={t} value={t}>{t}</option>)}
                   </select>
                   <input type="text" value={soc.url} onChange={(e) => updateState(p => ({...p, socials: p.socials.map(s => s.id === soc.id ? {...s, url: e.target.value} : s)}))} className="w-full border rounded p-1 mb-1" />
                   <button onClick={() => updateState(p => ({...p, socials: p.socials.filter(s => s.id !== soc.id)}))} className="text-red-500 text-[10px] w-full text-left">Hapus</button>
                 </div>
               )}
             </div>
           ))}
           {isEditing && <button onClick={() => updateState(p => ({...p, socials: [...p.socials, {id: Date.now(), type: 'facebook', url: '#'}]}))} className="bg-gray-100 rounded-full p-1"><Plus size={14}/></button>}
        </div>

        {/* Menu */}
        <div className="flex gap-8 items-center">
           {data.nav.menu.map(item => (
             <button 
               key={item.id} 
               onClick={() => !isEditing && handlePageChange(item.id)}
               className={`text-xs font-bold uppercase tracking-widest hover:text-[var(--color-accent)] transition-colors ${activeTab === item.id ? 'text-[var(--color-accent)]' : 'text-gray-500'}`}
             >
               <InlineText isEditing={isEditing} value={item.text} onChange={(v) => {
                 const newMenu = data.nav.menu.map(m => m.id === item.id ? {...m, text: v} : m);
                 updateState(p => ({...p, nav: {...p.nav, menu: newMenu}}));
               }} tag="span" />
             </button>
           ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className={`max-w-7xl mx-auto px-6 md:px-12 min-h-screen pb-20 pt-4 ${isAnimating ? 'opacity-0' : 'opacity-100 page-transition'}`}>
         {data.sections.filter(s => s.page === activeTab).map(s => renderSection(s))}

         {isEditing && (
           <div className="mt-12 p-8 border-2 border-dashed border-gray-200 rounded-xl text-center">
              <p className="text-gray-400 text-xs font-bold uppercase mb-4">Add Section to {activeTab}</p>
              <button onClick={() => {
                const newId = `generic-${Date.now()}`;
                updateState(p => ({...p, sections: [...p.sections, { id: newId, type: 'generic', page: activeTab, animation: 'animate-fade-in', data: { title: "New", text: "Content", image: "" } }]}));
              }} className="bg-white border hover:border-accent text-gray-600 px-6 py-2 rounded-lg font-bold shadow-sm transition-all">+ Content Block</button>
           </div>
         )}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-50 py-12 text-center border-t border-gray-100">
         <h2 className="font-serif text-2xl font-bold mb-2">
            <InlineText isEditing={isEditing} value={data.footer.tagline} onChange={(v) => updateState(p => ({...p, footer: {...p.footer, tagline: v}}))} tag="span" />
         </h2>
         <p 
            onClick={() => { if(!isAdmin) { const n = clickCount+1; setClickCount(n); if(n===3) { setShowLogin(true); setClickCount(0); } } }}
            className="text-xs text-secondary uppercase tracking-widest cursor-pointer select-none"
         >
            <InlineText isEditing={isEditing} value={data.footer.text} onChange={(v) => updateState(p => ({...p, footer: {...p.footer, text: v}}))} tag="span" />
            {isAdmin && <span className="ml-2 text-green-500 font-bold">(ADMIN)</span>}
         </p>
      </footer>

      {/* ADMIN CONTROLS (Floating) */}
      {isEditing && (
        <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 animate-slide-in-right">
          <div className="bg-white p-4 rounded-xl shadow-2xl border w-64 max-h-[80vh] overflow-y-auto">
             <div className="flex justify-between border-b pb-2 mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Super Admin</span>
                <button onClick={() => setShowAdminPanel(!showAdminPanel)} className="text-gray-400">{showAdminPanel ? <Minimize2 size={14}/> : <Maximize2 size={14}/>}</button>
             </div>
             {showAdminPanel && (
               <div className="space-y-4 mb-4">
                 {/* Colors */}
                 <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-1"><Palette size={10}/> Theme Colors</label>
                   <div className="grid grid-cols-4 gap-2">
                      {['primary','secondary','accent','bg'].map(key => (
                        <div key={key}>
                          <input type="color" value={data.theme[key]} onChange={(e) => updateState(p => ({...p, theme: {...p.theme, [key]: e.target.value}}))} className="w-8 h-8 rounded cursor-pointer p-0 border-none" />
                          <span className="text-[8px] uppercase block">{key.substr(0,3)}</span>
                        </div>
                      ))}
                   </div>
                 </div>

                 {/* Fonts */}
                 <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-1"><Type size={10}/> Typography</label>
                   <div className="space-y-2">
                     <select className="w-full text-xs border rounded p-1" value={data.theme.fonts.title} onChange={(e) => updateState(p => ({...p, theme: {...p.theme, fonts: {...p.theme.fonts, title: e.target.value}}}))}>
                        <option disabled>-- Title Font --</option>
                        {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                     </select>
                     <select className="w-full text-xs border rounded p-1" value={data.theme.fonts.body} onChange={(e) => updateState(p => ({...p, theme: {...p.theme, fonts: {...p.theme.fonts, body: e.target.value}}}))}>
                        <option disabled>-- Body Font --</option>
                        {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                     </select>
                   </div>
                 </div>

                 {/* Shapes */}
                 <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-1"><Shapes size={10}/> Add Shape</label>
                   <div className="flex gap-2">
                      <button onClick={() => addDecoration('circle')} className="flex-1 bg-gray-100 hover:bg-gray-200 text-xs py-1 rounded">Circle</button>
                      <button onClick={() => addDecoration('rect')} className="flex-1 bg-gray-100 hover:bg-gray-200 text-xs py-1 rounded">Square</button>
                   </div>
                 </div>
               </div>
             )}
             <div className="flex gap-2 sticky bottom-0 bg-white pt-2">
                <button onClick={handleSave} className="flex-1 bg-accent text-white py-2 rounded text-xs font-bold hover:opacity-90 flex items-center justify-center gap-1"><Save size={14}/> SAVE</button>
                <button onClick={() => { setEditForm(content); setIsEditing(false); }} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded text-xs font-bold hover:bg-gray-200">EXIT</button>
             </div>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {/* Removed - using simple password modal instead */}
      {showSaveModal && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl z-[100] flex items-center gap-2 animate-bounce">
          <CheckCircle size={20} />
          <span className="font-bold">Perubahan Berhasil Disimpan!</span>
        </div>
      )}

      {/* ADMIN TOGGLE */}
      {isAdmin && !isEditing && (
        <button onClick={() => { setEditForm(content); setIsEditing(true); setShowAdminPanel(true); }} className="fixed bottom-6 right-6 z-50 bg-accent text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center gap-2">
          <Edit2 size={20} /> <span className="text-xs font-bold">EDIT</span>
        </button>
      )}

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm">
            <div className="flex justify-center mb-4 text-accent"><Lock size={32}/></div>
            <h3 className="text-xl font-bold text-center mb-6">Admin Access</h3>
            <input type="password" placeholder="******" className="w-full p-3 border rounded mb-4 text-center tracking-widest" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => { if(password==="17jan2003"){ setIsAdmin(true); setIsEditing(true); setEditForm(content); setShowLogin(false); setPassword(""); } else alert("Password Salah"); }} className="w-full bg-black text-white py-3 rounded font-bold">LOGIN</button>
            <button onClick={() => { setShowLogin(false); setPassword(""); }} className="w-full mt-2 text-gray-400 text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}