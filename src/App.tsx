import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mail, Video, Layers, MonitorPlay, PenTool, Sparkles, Megaphone, ArrowUp, Film, Palette, Radio, Phone, MapPin, Download, Camera, Wand2, ImagePlay, Tv2 } from 'lucide-react';

const skillCategories = [
  {
    title: 'Software & Tools',
    icon: <Film className="w-5 h-5 text-white" />,
    skills: ['Adobe Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator', 'Audition', 'OBS Studio', 'WordPress']
  },
  {
    title: 'AI & Generative',
    icon: <Sparkles className="w-5 h-5 text-white" />,
    skills: ['AI Video Production', 'Midjourney', 'Runway ML', 'ElevenLabs', 'Prompt Engineering', 'Kling AI']
  },
  {
    title: 'Design & Motion',
    icon: <Palette className="w-5 h-5 text-white" />,
    skills: ['Motion Graphics', 'UI/UX Design', 'Brand Identity', 'Social Media Design', 'Video Editing', 'Digital Marketing']
  },
  {
    title: 'Broadcast & Production',
    icon: <Radio className="w-5 h-5 text-white" />,
    skills: ['Live Broadcasting', 'Camera Operation', 'News Production', 'Social Media Mgmt', 'Content Strategy']
  }
];

type WorkItem = {
  type?: "video" | "image";
  id?: string;
  src?: string;
  thumbnail?: string;
  title: string;
  category: string;
  aspect?: "vertical" | "horizontal" | string;
};

const categories = ["All Work", "Video & Motion", "Graphics & Design"];

const allWorks: WorkItem[] = [
  // ── PINNED TO TOP ──
  { id:"_v_U-I4VKG4", title:"Dr. Paul – Video 3", category: "Video & Motion", aspect:"vertical" },
  { id:"O5E16Ke0hHo", title:"Udyam Project Edit", category: "Video & Motion", aspect:"aspect-square" },
  { id:"NyyMRQHWfcE", title:"Cinematic Ad", category: "Video & Motion", aspect:"horizontal" },
  { id:"aMfbbqBKJFk", title:"Cinematic 4K Showreel", category: "Video & Motion", aspect:"horizontal" },
  { id:"HygEDCPohh8", title:"Udyam Villa", category: "Video & Motion", aspect:"aspect-square" },

  // ── HORIZONTAL 16:9 ──
  { id:"cA9egZQVAbA", title:"New Reel 1", category: "Video & Motion", aspect:"horizontal" },
  { id:"GxrwZRI8sB0", title:"New Reel 2", category: "Video & Motion", aspect:"horizontal" },
  { id:"bBhplejUSho", title:"New Reel 3", category: "Video & Motion", aspect:"horizontal" },
  { id:"bGKxo6ZDig8", title:"New Reel 4", category: "Video & Motion", aspect:"horizontal" },
  { id:"Lw98VpMZTSM", title:"2K Udyam Independence Day", category: "Video & Motion", aspect:"horizontal" },
  { id:"iDjxRU1tiUw", title:"HCET Promo Video", category: "Video & Motion", aspect:"horizontal" },
  { id:"_zCEfwWNPM8", title:"Hitkarini Hills Live", category: "Video & Motion", aspect:"horizontal" },
  { id:"KK-4B8JKzBQ", title:"Krishnashray Senior Living", category: "Video & Motion", aspect:"horizontal" },
  { id:"uyGuZRLdQv0", title:"Winter Fest Horizontal", category: "Video & Motion", aspect:"horizontal" },
  { id:"rm0IcbX9hB8", title:"Sam Winter Fest", category: "Video & Motion", aspect:"horizontal" },
  { id:"RsJAUsjqyzw", title:"Dainik Bhaskar", category: "Video & Motion", aspect:"horizontal" },
  { id:"rv3MfaQdoi4", title:"Holi Wishes", category: "Video & Motion", aspect:"horizontal" },
  { id:"Z9yG_OIiaSk", title:"Vastraa Reel", category: "Video & Motion", aspect:"horizontal" },
  { id:"xknHIGn7GA4", title:"Sam Cricket World Cup", category: "Video & Motion", aspect:"horizontal" },
  { id:"ro2JpXOJzPQ", title:"Edit Reel", category: "Video & Motion", aspect:"horizontal" },
  { id:"_DlnFJjT_t8", title:"Urban Reel 4", category: "Video & Motion", aspect:"horizontal" },
  { id:"_YlMYR4D7eg", title:"Urban Reel 7", category: "Video & Motion", aspect:"horizontal" },
  { id:"69rV1I6IiCY", title:"Udyam Full Campaign", category: "Video & Motion", aspect:"horizontal" },
  { id:"6mPkhwaoV24", title:"Udyam Final", category: "Video & Motion", aspect:"horizontal" },

  // ── SQUARE 1:1 ──
  { id:"TDVAYyk_rWU", title:"Brain Discovery", category: "Video & Motion", aspect:"aspect-square" },
  { id:"7JL9dTbpINU", title:"Krishnashray Launch", category: "Video & Motion", aspect:"aspect-square" },
  { id:"hgdI993TCwE", title:"Motion Graphics Krishnashray", category: "Video & Motion", aspect:"aspect-square" },
  { id:"KzPUtmlQjes", title:"Sam Model Edit 1", category: "Video & Motion", aspect:"aspect-square" },
  { id:"w8nJf0LR-5Q", title:"Sam Model Edit 2", category: "Video & Motion", aspect:"aspect-square" },
  { id:"0vThMfrPVwM", title:"Sam Winter Fest Highlights", category: "Video & Motion", aspect:"aspect-square" },
  { id:"FoiJ86uQgzQ", title:"Sam Christmas Slideshow", category: "Video & Motion", aspect:"aspect-square" },
  { id:"QEoTWXXGAzU", title:"Silk N Salt", category: "Video & Motion", aspect:"aspect-square" },
  { id:"85ahifvJFXo", title:"UCB Brand Film", category: "Video & Motion", aspect:"aspect-square" },
  { id:"IXzlQO0_ww0", title:"Brand Reel", category: "Video & Motion", aspect:"aspect-square" },
  { id:"46g4s7ZzOBQ", title:"Short Edit", category: "Video & Motion", aspect:"aspect-square" },
  { id:"RW5gsFCVEfs", title:"Campaign Edit", category: "Video & Motion", aspect:"aspect-square" },
  { id:"ckqwp5DZ154", title:"Motion Book Animation", category: "Video & Motion", aspect:"aspect-square" },

  // ── VERTICAL 9:16 ──
  { id:"Qu91-liFdV8", title:"Short Reel A", category: "Video & Motion", aspect:"vertical" },
  { id:"xDehA46dOug", title:"Short Reel B", category: "Video & Motion", aspect:"vertical" },
  { id:"ETgKEIhlx-E", title:"Vertical Showreel", category: "Video & Motion", aspect:"vertical" },
  { id:"T_h8BcwrAOg", title:"Short Reel", category: "Video & Motion", aspect:"vertical" },
  { id:"vL0fgHDimh4", title:"Fashion Short", category: "Video & Motion", aspect:"vertical" },
  { id:"3BEkes3qNcA", title:"Promo Short", category: "Video & Motion", aspect:"vertical" },
  { id:"kBbZBMRtPso", title:"Dr. Paul – Video 2", category: "Video & Motion", aspect:"vertical" },
  { id:"hVsfZdActCg", title:"Echoes 2025", category: "Video & Motion", aspect:"vertical" },
  { id:"2OAiYrBsKQk", title:"HCET Informational", category: "Video & Motion", aspect:"vertical" },
  { id:"A-KAScovOn8", title:"Portrait Reel 1", category: "Video & Motion", aspect:"vertical" },
  { id:"YLXZkjmNlf8", title:"Portrait Reel 2", category: "Video & Motion", aspect:"vertical" },
  { id:"FbX0aa-MdnI", title:"IPAP Political Campaign", category: "Video & Motion", aspect:"vertical" },
  { id:"dPdbykLoPE0", title:"IPAP Political Video", category: "Video & Motion", aspect:"vertical" },
  { id:"K13KDs9V984", title:"Model Reel", category: "Video & Motion", aspect:"vertical" },
  { id:"lGdFXT4YXNE", title:"Nakshatra Phase 5 Launch", category: "Video & Motion", aspect:"vertical" },
  { id:"O8bv_UZ4jxs", title:"Nakshatra Phase 5 Campaign", category: "Video & Motion", aspect:"vertical" },
  { id:"TXQgzQLWmnE", title:"Udyam Navoday Shivratri", category: "Video & Motion", aspect:"vertical" },
  { id:"tIMEjJhyTnc", title:"Nakshatra 2BHK Campaign", category: "Video & Motion", aspect:"vertical" },
  { id:"6mxWapKWWow", title:"Udyam Independence Campaign", category: "Video & Motion", aspect:"vertical" },
  { id:"1MDgEuAOQQE", title:"Udyam Projectbase Edit", category: "Video & Motion", aspect:"vertical" },
  { id:"24xOFMYfsxA", title:"Social Reel", category: "Video & Motion", aspect:"vertical" },
  { id:"RSdyP_IEHRM", title:"HCET Full Video", category: "Video & Motion", aspect:"vertical" },
  { id:"Y0JH2Y3JiwU", title:"Inspire Video", category: "Video & Motion", aspect:"vertical" },
  { id:"I1lj4encED0", title:"WhatsApp Short 1", category: "Video & Motion", aspect:"vertical" },
  { id:"Tw0O3Ov6ywE", title:"WhatsApp Short 2", category: "Video & Motion", aspect:"vertical" },
  { id:"eU63DKeEDVw", title:"WhatsApp Short 3", category: "Video & Motion", aspect:"vertical" },
  { id:"J_KD81K1Xu0", title:"WhatsApp Short 4", category: "Video & Motion", aspect:"vertical" },
  { id:"62QyaFI7v28", title:"Sam Max", category: "Video & Motion", aspect:"vertical" },
  { id:"YLIZZ9sgv2k", title:"Sam Cricket Short", category: "Video & Motion", aspect:"vertical" },

  // ── GRAPHICS & DESIGN (Images) ──
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776607927/MAR26_JKLC056_IPL_CAMP_MKV2B_OOH_ADPT_1-1_gwj2xs.jpg", title: "JK Lakshmi Cement IPL Campaign", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355393/portfolio/social/file_1.webp", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355394/portfolio/social/file_2.webp", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355397/portfolio/social/IMG-20250820-WA0005.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355398/portfolio/social/IMG-20250820-WA0008.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355399/portfolio/social/IMG-20250820-WA0009.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355400/portfolio/social/IMG-20250820-WA0010.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355401/portfolio/social/IMG-20250820-WA0011.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355402/portfolio/social/IMG-20250820-WA0013.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355403/portfolio/social/IMG-20250820-WA0015.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355404/portfolio/social/IMG-20250820-WA0016.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355405/portfolio/social/IMG-20250820-WA0017.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355406/portfolio/social/IMG-20250820-WA0018.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355408/portfolio/social/IMG-20250820-WA0019.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355410/portfolio/social/IMG-20250820-WA0020.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355411/portfolio/social/IMG-20250820-WA0021.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355412/portfolio/social/IMG-20250820-WA0022.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355414/portfolio/social/IMG-20250820-WA0023.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355415/portfolio/social/IMG-20250820-WA0024.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355416/portfolio/social/IMG-20250820-WA0025.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355417/portfolio/social/IMG-20250820-WA0026.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355418/portfolio/social/IMG-20250820-WA0027.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355419/portfolio/social/IMG-20250820-WA0028.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355420/portfolio/social/IMG-20250820-WA0029.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355421/portfolio/social/IMG-20250820-WA0031.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355423/portfolio/social/IMG-20250820-WA0032.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355424/portfolio/social/IMG-20250820-WA0033.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355425/portfolio/social/IMG-20250820-WA0034.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355426/portfolio/social/IMG-20250820-WA0035.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355428/portfolio/social/IMG-20250820-WA0036.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355429/portfolio/social/IMG-20250820-WA0038.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355430/portfolio/social/IMG-20250820-WA0039.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355430/portfolio/social/IMG-20250820-WA0040.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355432/portfolio/social/IMG-20250820-WA0041.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355433/portfolio/social/IMG-20250820-WA0042.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355433/portfolio/social/IMG-20250820-WA0045.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355434/portfolio/social/IMG-20250820-WA0046.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355435/portfolio/social/IMG-20250820-WA0047.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355436/portfolio/social/Inspire.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355437/portfolio/social/new.webp", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355439/portfolio/social/vectus.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355440/portfolio/social/WhatsApp_Image_2025-08-18_at_15.09.31_a11f9345.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355441/portfolio/social/WhatsApp_Image_2025-08-18_at_15.09.33_2fc082d1.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355442/portfolio/social/WhatsApp_Image_2025-08-18_at_15.09.33_f920eefe.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355444/portfolio/social/WhatsApp_Image_2025-08-18_at_15.09.34_543ab71a.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355446/portfolio/social/WhatsApp_Image_2025-08-18_at_15.09.35_4835e8d0.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355447/portfolio/social/WhatsApp_Image_2025-08-18_at_15.09.35_90e2685d.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355449/portfolio/social/WhatsApp_Image_2025-08-18_at_15.09.36_d70930e4.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355450/portfolio/social/WhatsApp_Image_2025-08-18_at_15.09.37_0e51374d.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355451/portfolio/social/WhatsApp_Image_2025-08-18_at_15.09.38_eda59347.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355452/portfolio/social/WhatsApp_Image_2025-08-20_at_08.49.17_2198f960.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355453/portfolio/social/WhatsApp_Image_2025-08-20_at_08.49.18_0644ae57.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355454/portfolio/social/WhatsApp_Image_2025-08-20_at_08.50.16_4ba31d69.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355455/portfolio/social/WhatsApp_Image_2025-08-20_at_08.50.40_096f610b.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355456/portfolio/social/WhatsApp_Image_2025-08-20_at_08.51.10_2c0ed84d.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355457/portfolio/social/WhatsApp_Image_2025-08-20_at_08.51.12_6207ad33.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355458/portfolio/social/WhatsApp_Image_2025-08-20_at_08.51.13_054639a2.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355459/portfolio/social/WhatsApp_Image_2025-08-20_at_09.06.47_9f9648b4.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355460/portfolio/social/WhatsApp_Image_2025-08-21_at_14.11.01_b0fba0ff.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355461/portfolio/social/Why_go_through_the_stress_of_building_from_scratchUdyam_Villas_bring_you_the_best_of_both_worlds.jpg", title: "Creative Design", category: "Graphics & Design" },
  { type: "image", src: "https://res.cloudinary.com/dijteej5k/image/upload/v1776355462/portfolio/social/bbrxrcumu8ru7e0u9dw8.jpg", title: "Creative Design", category: "Graphics & Design" }
];

const services = [
  { icon: <Video className="w-6 h-6" />, title: 'Video Production & Editing', desc: 'Promotional Videos, Social Media, Live Broadcast, Corporate Videos, Event Coverage' },
  { icon: <Layers className="w-6 h-6" />, title: 'Motion Graphics Design', desc: 'Logo Animations, Explainer Videos, Title Sequences, Brand Motion Systems' },
  { icon: <MonitorPlay className="w-6 h-6" />, title: 'UI/UX Design', desc: 'Website Design, Mobile App UI, Wireframing, Prototyping' },
  { icon: <PenTool className="w-6 h-6" />, title: 'Graphic Design', desc: 'Social Media Graphics, Marketing Materials, Digital Banners, Infographics' },
  { icon: <Sparkles className="w-6 h-6" />, title: 'AI-Enhanced Creative Solutions', desc: 'AI Video Production, Automated Workflows, Content Generation, Prompt Engineering' },
  { icon: <Megaphone className="w-6 h-6" />, title: 'Digital Marketing Visuals', desc: 'Social Media Campaigns, Ad Creatives, Email Templates, Landing Page Design' }
];


const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* Purple ambient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none"
      />

      {/* Corner brackets */}
      {[
        "top-10 left-10 border-l border-t rounded-tl-lg",
        "top-10 right-10 border-r border-t rounded-tr-lg",
        "bottom-10 left-10 border-l border-b rounded-bl-lg",
        "bottom-10 right-10 border-r border-b rounded-br-lg",
      ].map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
          className={`absolute w-12 h-12 border-white/15 ${cls}`}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6">

        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.5)] ring-2 ring-purple-500/50"
        >
          <img src="https://res.cloudinary.com/dijteej5k/image/upload/q_auto/f_auto/v1776566296/image_copy_f4hwky.jpg" alt="Rahul Jain" className="w-full h-full object-cover" />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-white text-2xl font-bold tracking-tight">Rahul Jain</p>
          <p className="text-white/40 text-[10px] tracking-[0.28em] mt-1">Video Editor</p>
          <p className="text-white/30 text-[9px] tracking-[0.22em] mt-0.5">Graphics &amp; Motion Designer</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-2"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.55, duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
            className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400 rounded-full"
          />
        </motion.div>

        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-1.5"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1 h-1 rounded-full bg-white/30"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── RESUME SECTION LABEL ───
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3">
    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-purple-400/80 whitespace-nowrap">{children}</span>
    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
  </div>
);

// ─── RESUME MODAL ───
const ResumeModal = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const secVar = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.28 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const } })
  };

  const jobs = [
    {
      title: "Video Editor, Graphic & Motion Designer",
      company: "Business Culture, Jabalpur", period: "2023 – Present", current: true,
      points: [
        "Designed visual content for social media & digital marketing campaigns",
        "Produced promotional videos using Premiere Pro & After Effects",
        "Developed motion graphics for client presentations and online platforms",
        "Managed end-to-end production; directed live broadcasts & camera ops",
      ]
    },
    {
      title: "Production Manager",
      company: "CIN News Network, Jabalpur", period: "Nov 2020 – Aug 2023", current: false,
      points: [
        "Ensured quality & timely delivery of video production content",
        "Enhanced visual appeal of news segments with creative teams",
        "Directed live broadcasts and camera operations for TV & social media",
      ]
    },
    {
      title: "UI/UX & Graphic Designer",
      company: "Cubedots India, Indore", period: "Jan 2019 – Jun 2020", current: false,
      points: [
        "Designed user-centric interfaces for applications and websites",
        "Created graphics, banners & promotional materials for clients",
        "Delivered seamless UX using Sketch & Adobe XD",
      ]
    },
  ];

  const skills = [
    { name: "Adobe Premiere Pro", c: "purple" }, { name: "After Effects", c: "purple" },
    { name: "Photoshop", c: "blue" }, { name: "Illustrator", c: "orange" },
    { name: "Adobe XD", c: "pink" }, { name: "Sketch", c: "yellow" },
    { name: "OBS Studio", c: "def" }, { name: "WordPress", c: "blue" },
    { name: "AI Video Production", c: "cyan" }, { name: "Midjourney", c: "cyan" },
    { name: "Runway ML", c: "cyan" }, { name: "ElevenLabs", c: "cyan" },
    { name: "Kling AI", c: "cyan" }, { name: "Prompt Engineering", c: "purple" },
  ];

  const chipClass = (c: string) => c === "purple" ? "bg-purple-500/8 border-purple-500/20 text-purple-300/75"
    : c === "cyan" ? "bg-cyan-500/8 border-cyan-500/20 text-cyan-300/75"
    : c === "blue" ? "bg-blue-500/8 border-blue-500/20 text-blue-300/75"
    : c === "orange" ? "bg-orange-500/8 border-orange-500/20 text-orange-300/75"
    : c === "pink" ? "bg-pink-500/8 border-pink-500/20 text-pink-300/75"
    : c === "yellow" ? "bg-yellow-500/8 border-yellow-500/20 text-yellow-300/75"
    : "bg-white/[0.04] border-white/[0.08] text-white/40";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[300] bg-black/88 backdrop-blur-xl flex items-start sm:items-center justify-center overflow-y-auto p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 52, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-purple-500/25 via-fuchsia-500/8 to-cyan-500/18 pointer-events-none" />

        <div className="relative bg-[#05050d]/97 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/[0.07] shadow-[0_48px_120px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.04)]">

          {/* Top gradient bar */}
          <div className="relative h-[2.5px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-400 to-cyan-400" />
            <motion.div
              className="absolute inset-y-0 w-44 bg-gradient-to-r from-transparent via-white/65 to-transparent"
              animate={{ x: ["-130%", "520%"] }}
              transition={{ duration: 1.8, delay: 0.55, ease: "easeInOut" }}
            />
          </div>

          {/* Entry scan line */}
          <motion.div
            className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent z-20 pointer-events-none"
            initial={{ top: "3px", opacity: 1 }}
            animate={{ top: "100%", opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.12, ease: "easeOut" }}
          />

          {/* Corner brackets */}
          {(["top-3 left-3 border-l border-t rounded-tl-lg","top-3 right-12 border-r border-t rounded-tr-lg","bottom-3 left-3 border-l border-b rounded-bl-lg","bottom-3 right-3 border-r border-b rounded-br-lg"] as const).map((cls, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.3 }}
              className={`absolute w-5 h-5 border-purple-500/25 pointer-events-none ${cls}`} />
          ))}

          {/* Close */}
          <button onClick={onClose}
            aria-label="Close resume"
            className="absolute top-3.5 right-3.5 z-30 w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-black hover:bg-white/95 hover:scale-105 transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.35)]">
            <X size={18} strokeWidth={2.5} />
          </button>

          {/* ── HEADER ── */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative px-6 sm:px-9 pt-7 pb-6 border-b border-white/[0.05]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/18 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 right-1/3 w-48 h-20 bg-cyan-600/6 blur-[50px] pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-2xl overflow-hidden ring-1 ring-purple-500/45 shadow-[0_0_28px_rgba(168,85,247,0.3)]">
                  <img src="https://res.cloudinary.com/dijteej5k/image/upload/q_auto/f_auto/v1776566296/image_copy_f4hwky.jpg" alt="Rahul Jain" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#05050d] shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
              </div>
              {/* Info */}
              <div className="text-center sm:text-left">
                <h2 className="text-[24px] sm:text-[28px] font-bold text-white tracking-tight leading-none">Rahul Jain</h2>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mt-1.5 bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  Video Editor · Graphics &amp; Motion Designer
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 mt-3">
                  {([
                    { icon: <Phone size={11} />, label: "+91 99936 81478", href: "tel:+919993681478" },
                    { icon: <Mail size={11} />, label: "borntoflyrj@gmail.com", href: "mailto:borntoflyrj@gmail.com" },
                    { icon: <MapPin size={11} />, label: "Jabalpur, M.P", href: null },
                  ] as const).map((c, i) => c.href
                    ? <a key={i} href={c.href} className="flex items-center gap-1.5 text-white/40 text-[11px] hover:text-purple-300 transition-colors">{c.icon}<span>{c.label}</span></a>
                    : <span key={i} className="flex items-center gap-1.5 text-white/40 text-[11px]">{c.icon}<span>{c.label}</span></span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── SCROLLABLE BODY ── */}
          <div className="px-6 sm:px-9 py-7 space-y-7 max-h-[62vh] overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-purple-500/25 [&::-webkit-scrollbar-track]:bg-transparent">

            {/* About */}
            <motion.div custom={0} variants={secVar} initial="hidden" animate="show">
              <SectionLabel>About Me</SectionLabel>
              <p className="text-white/48 text-[12.5px] leading-[1.85] mt-3">
                Creative and detail-oriented Graphic Designer &amp; Video Editor with{" "}
                <span className="text-white/75 font-semibold">6+ years</span> of experience in Multimedia, Motion Graphics &amp; Creative Design. Skilled in crafting impactful digital content for Marketing, Advertising &amp; Social Media. Proficient in{" "}
                <span className="text-purple-300/90">AI-driven Video Production</span>, Generative Content Creation, and Prompt Engineering. Passionate about blending Design, Technology &amp; Strategy to deliver high-impact, future-ready visual experiences.
              </p>
            </motion.div>

            {/* Experience */}
            <motion.div custom={1} variants={secVar} initial="hidden" animate="show">
              <SectionLabel>Work Experience</SectionLabel>
              <div className="mt-4 relative">
                <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/15 to-transparent" />
                <div className="space-y-5 pl-5">
                  {jobs.map((job, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-5 top-[6px] w-[9px] h-[9px] rounded-full border ${job.current ? "bg-purple-400 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" : "bg-[#05050d] border-white/20"}`} />
                      <div className="flex flex-wrap items-start justify-between gap-1.5 mb-0.5">
                        <h4 className="text-white/85 text-[13px] font-semibold leading-snug pr-1">{job.title}</h4>
                        <span className={`text-[10px] font-semibold px-2 py-[2px] rounded-full whitespace-nowrap ${job.current ? "bg-purple-500/12 text-purple-300 border border-purple-500/22" : "bg-white/[0.04] text-white/28 border border-white/[0.07]"}`}>{job.period}</span>
                      </div>
                      <p className="text-purple-300/55 text-[11.5px] font-medium mb-2">{job.company}</p>
                      <ul className="space-y-1">
                        {job.points.map((p, j) => (
                          <li key={j} className="flex items-start gap-2 text-white/33 text-[11.5px] leading-relaxed">
                            <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-purple-400/40 flex-shrink-0" />{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div custom={2} variants={secVar} initial="hidden" animate="show">
              <SectionLabel>Skills &amp; Tools</SectionLabel>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span key={i} className={`px-2.5 py-[3px] rounded-full text-[11px] font-medium border ${chipClass(s.c)}`}>{s.name}</span>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div custom={3} variants={secVar} initial="hidden" animate="show">
              <SectionLabel>Education</SectionLabel>
              <div className="mt-3 space-y-0">
                {[
                  { degree: "Master of Commerce (M.Com)", institution: "G.S. College, Jabalpur", year: "2019–2021" },
                  { degree: "Advanced Program in Digital Media & Design (APDMD)", institution: "MAAC — Maya Academy of Advance Cinematics", year: "2016–2018" },
                  { degree: "Bachelor of Commerce (B.Com)", institution: "Cogent College of Higher Studies", year: "2016–2019" },
                ].map((edu, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                    <div>
                      <p className="text-white/68 text-[12.5px] font-medium leading-snug">{edu.degree}</p>
                      <p className="text-white/28 text-[11px] mt-0.5">{edu.institution}</p>
                    </div>
                    <span className="flex-shrink-0 text-[10px] text-white/25 mt-0.5 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06] whitespace-nowrap">{edu.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certification */}
            <motion.div custom={4} variants={secVar} initial="hidden" animate="show">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-purple-500/6 to-cyan-500/3 border border-purple-500/12">
                <div className="w-9 h-9 rounded-xl bg-purple-500/12 border border-purple-500/25 flex items-center justify-center text-lg flex-shrink-0">🏆</div>
                <div>
                  <p className="text-white/75 text-[13px] font-semibold">24 FPS Award — 2016</p>
                  <p className="text-white/33 text-[11.5px] mt-0.5 leading-snug">Recognized at the prestigious 24 FPS global animation competition organized by MAAC.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

const Header = ({ onOpenResume }: { onOpenResume: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sectionIds = ['about', 'services', 'creative-works', 'contact'];
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollMid = window.scrollY + window.innerHeight / 3;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMid) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About',     id: 'about' },
    { name: 'Work',      id: 'creative-works' },
    { name: 'Expertise', id: 'services' },
    { name: 'Contact',   id: 'contact' },
  ];

  const handleNav = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
      {/* Glass pill container */}
      <div className={`max-w-6xl mx-auto px-4 transition-all duration-500 ${scrolled ? 'px-4' : 'px-6'}`}>
        <div className={`flex items-center justify-between rounded-2xl transition-all duration-500 px-5 ${
          scrolled
            ? 'bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] py-3'
            : 'bg-transparent py-0'
        }`}>

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-purple-500/40 shadow-lg shadow-purple-500/30 group-hover:ring-purple-400/70 group-hover:shadow-purple-500/50 transition-all duration-300">
              <img src="https://res.cloudinary.com/dijteej5k/image/upload/q_auto/f_auto/v1776566296/image_copy_f4hwky.jpg" alt="Rahul Jain" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-white font-semibold text-[13px] sm:text-[15px] tracking-tight leading-none">Rahul Jain</span>
              <p className="hidden sm:block text-white/40 text-[10px] tracking-widest uppercase leading-none mt-0.5">Video &amp; Motion</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNav(link.id)}
                  className={`relative px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 group ${
                    isActive ? 'text-white bg-white/[0.07]' : 'text-white/55 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.name}
                  <motion.span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[1.5px] bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                    animate={{ width: isActive ? 20 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right side — Resume + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-[13px] font-semibold transition-all duration-300 shadow-lg shadow-purple-700/30 hover:shadow-purple-500/40 hover:-translate-y-0.5"
            >
              <Download size={13} strokeWidth={2.5} />
              Resume
            </button>
            <button
              className="md:hidden w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 w-full mt-2 px-4"
          >
            <nav className="bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl py-3 px-4 flex flex-col shadow-2xl">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  onClick={() => handleNav(link.id)}
                  className={`text-left text-[14px] font-medium py-3 px-3 rounded-xl transition-colors ${
                    activeSection === link.id ? 'text-white bg-white/[0.07]' : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
              <div className="border-t border-white/10 mt-2 pt-3">
                <button
                  onClick={() => { onOpenResume(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-[13px] font-semibold hover:from-purple-500 hover:to-fuchsia-500 transition-all duration-200"
                >
                  <Download size={14} /> Resume
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const tools = ["Premiere Pro", "After Effects", "Photoshop", "Illustrator", "OBS Studio", "Sketch"];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Dot grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      {/* Ambient gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_50%,rgba(168,85,247,0.2)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_55%,rgba(34,211,238,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,rgba(217,70,239,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Animated orbs — desktop only, blur-[100px] is GPU-heavy on mobile */}
      <motion.div
        className="hidden md:block absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full bg-purple-600/20 blur-[100px] pointer-events-none"
        animate={{ x: [0, 50, 0], y: [0, 25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hidden md:block absolute bottom-1/3 -right-32 w-[380px] h-[380px] rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none"
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      />

      {/* Decorative corner lines */}
      <div className="absolute top-24 left-4 sm:left-10 w-10 sm:w-16 h-10 sm:h-16 border-l border-t border-white/10 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-24 right-4 sm:right-10 w-10 sm:w-16 h-10 sm:h-16 border-r border-t border-white/10 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-20 left-4 sm:left-10 w-10 sm:w-16 h-10 sm:h-16 border-l border-b border-white/10 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-10 sm:w-16 h-10 sm:h-16 border-r border-b border-white/10 rounded-br-lg pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16 md:pt-36 md:pb-28 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 mb-7 sm:mb-12 rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-purple-500/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_24px_rgba(168,85,247,0.15)]"
        >
          <span className="font-medium tracking-[0.1em] sm:tracking-[0.18em] uppercase text-[10px] sm:text-[11px] text-white/70 text-center leading-[1.9]">
            Crafting Digital Content
            <span className="block sm:inline">
              {" "}<span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
                </span>
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent font-bold">
                  with AI Innovation
                </span>
              </span>
            </span>
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="mb-8">
          <h1 className="font-extrabold tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[clamp(2.8rem,10vw,6rem)] leading-[0.95] text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.12)]"
            >
              Video Editor
            </motion.span>

            {/* Separator — adds visual rhythm on mobile */}
            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-2 sm:gap-3 my-2 sm:my-3"
            >
              <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-purple-400/50" />
              <span className="text-[9px] sm:text-[10px] text-white/25 tracking-[0.35em] uppercase font-medium">&amp;</span>
              <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-cyan-400/50" />
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[clamp(1.3rem,5.5vw,3.2rem)] leading-[1.2] bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent"
            >
              Graphics &amp; Motion Designer
            </motion.span>
          </h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-[clamp(0.85rem,2vw,1.05rem)] text-white/50 mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed font-light px-2 sm:px-0"
        >
          Blending design, technology &amp; strategy to deliver
          high-impact visual experiences that captivate and engage.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14"
        >
          <a
            href="#creative-works"
            className="group w-full sm:w-auto min-h-[52px] px-10 py-3.5 rounded-2xl font-semibold text-black bg-white hover:bg-white/94 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:-translate-y-0.5"
          >
            View My Work
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto min-h-[52px] px-10 py-3.5 rounded-2xl font-semibold text-white/90 bg-white/[0.05] backdrop-blur-sm hover:bg-white/[0.09] transition-all duration-300 border border-white/[0.12] hover:border-white/25 flex items-center justify-center hover:-translate-y-0.5"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Floating tool badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {tools.map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 + i * 0.07 }}
              className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/40 text-[11px] font-medium tracking-wide backdrop-blur-sm hover:border-purple-500/30 hover:text-white/60 transition-colors duration-200 cursor-default"
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] text-white/25 uppercase tracking-[0.4em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
};

const experiences = [
  {
    title: "Video Editor & Motion Designer",
    company: "Business Culture, Jabalpur",
    duration: "2023 - Present",
    icon: "🎬",
    bgImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
  },
  {
    title: "Production Manager",
    company: "CIN News Network, Jabalpur",
    duration: "Nov 2020 - Aug 2023",
    icon: "📡",
    bgImage: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80",
  },
  {
    title: "UI/UX & Graphic Designer",
    company: "Cubedots India, Indore",
    duration: "Jan 2019 - Jun 2020",
    icon: "🎨",
    bgImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
  },
];

const About = () => {
  const playerRef = React.useRef<any>(null);
  const pauseTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  // Mobile gets the vertical short, desktop keeps the original
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const aboutVideoId = isMobile ? "X0a5TWVw5Ns" : "HLwZQqF1xYE";

  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current) return;
      const playerId = isMobile ? 'about-bg-player' : 'about-bg-player-desktop';
      playerRef.current = new (window as any).YT.Player(playerId, {
        videoId: aboutVideoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1, mute: 1, controls: 0, modestbranding: 1,
          rel: 0, showinfo: 0, playsinline: 1, disablekb: 1,
          iv_load_policy: 3, fs: 0,
        },
        events: {
          onStateChange: (e: any) => {
            if (e.data === 0) {
              pauseTimerRef.current = setTimeout(() => {
                playerRef.current?.playVideo();
              }, 20000);
            }
          },
        },
      });
    };

    if ((window as any).YT?.Player) {
      initPlayer();
    } else {
      const prev = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => { prev?.(); initPlayer(); };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement('script');
        s.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(s);
      }
    }

    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  return (
    <section id="about" className="relative py-16 md:py-32 px-4 overflow-hidden min-h-[600px] md:min-h-[780px] bg-black">
      {/* ── FULL-BLEED VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mobile: vertical short — centered fill */}
        <div className="md:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full" id="about-bg-player" />
        </div>
        {/* Desktop: wide video — lower-center position */}
        <div className="hidden md:block absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] pointer-events-none">
          <div id="about-bg-player-desktop" className="w-full h-full" />
        </div>
      </div>

      {/* ── READABILITY OVERLAYS ── */}
      <div className="absolute inset-0 bg-black/72 pointer-events-none" />
      {/* Top/bottom fade for smooth blend with neighbouring sections */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      {/* Subtle color wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/25 via-transparent to-cyan-900/15 mix-blend-overlay pointer-events-none" />

      {/* ── CONTENT — fully centered ── */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Who I Am badge */}
        <span className="inline-flex items-center gap-3 text-purple-400 text-[11px] font-semibold tracking-[0.3em] uppercase mb-5">
          <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-purple-500 inline-block" />
          Who I Am
          <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-purple-500 inline-block" />
        </span>

        {/* Heading */}
        <h2 className="text-[clamp(2rem,7vw,4.5rem)] font-bold text-white mb-5 md:mb-7 leading-[1.02] tracking-tight drop-shadow-lg">
          About{" "}
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
            Me
          </span>
        </h2>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-purple-500/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-500/60" />
        </div>

        {/* Paragraph */}
        <p className="text-gray-200 text-base md:text-[17px] leading-relaxed drop-shadow-md max-w-xl mx-auto mb-10 md:mb-14">
          With <span className="text-white font-semibold">6+ years</span> of experience in video production, motion graphics, and digital design, I create compelling visual content that tells powerful stories. Currently working at{" "}
          <span className="text-purple-300 font-medium">Business Culture, Jabalpur</span>, I combine traditional creativity with cutting-edge AI tools to deliver exceptional results.
        </p>

        {/* Experience label */}
        <span className="inline-flex items-center gap-3 text-purple-400 text-[11px] font-semibold tracking-[0.3em] uppercase mb-5">
          <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-purple-500 inline-block" />
          Experience
          <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-purple-500 inline-block" />
        </span>

        {/* Experience cards */}
        <div className="flex flex-col gap-3 text-left mt-1">
          {experiences.map((card, i) => (
            <div
              key={i}
              className={`relative group flex items-center gap-3 pr-3 sm:pr-5 py-3 sm:py-3.5 rounded-xl border bg-black/50 backdrop-blur-md hover:bg-black/65 transition-all duration-300 ${
                i === 0 ? "border-purple-500/40" : "border-white/10 hover:border-purple-500/40"
              }`}
            >
              <div className="flex-shrink-0 ml-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/25 to-blue-500/15 border border-purple-500/40 flex items-center justify-center text-base group-hover:scale-110 group-hover:border-purple-400/70 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300">
                  {card.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-[15px] leading-tight truncate">{card.title}</h3>
                <p className="text-[13px] mt-0.5 truncate bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent font-medium">{card.company}</p>
              </div>
              <span className="hidden sm:block flex-shrink-0 text-[10px] text-gray-400 font-medium tracking-wider uppercase whitespace-nowrap">{card.duration}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const ToolIcon = ({ label, glow, children }: { label: string; glow: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center gap-3 cursor-default"
  >
    <motion.div
      whileHover={{ scale: 1.07, y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="w-[56px] h-[56px] sm:w-[90px] sm:h-[90px] rounded-[14px] sm:rounded-[22px] overflow-hidden relative flex-shrink-0"
      style={{ boxShadow: `0 4px 20px rgba(0,0,0,0.5)` }}
      onHoverStart={e => (e.target as HTMLElement).style.boxShadow = `0 8px 28px ${glow}`}
      onHoverEnd={e => (e.target as HTMLElement).style.boxShadow = `0 4px 20px rgba(0,0,0,0.5)`}
    >
      {children}
    </motion.div>
    <span className="text-[10px] sm:text-[12px] text-white/40 font-medium hover:text-white/70 transition-colors duration-300 whitespace-nowrap">
      {label}
    </span>
  </motion.div>
);

const ToolsMarquee = () => {
  return (
    <section className="py-16 md:py-24 bg-black relative border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[10px] tracking-[0.35em] uppercase text-purple-400/70 font-medium mb-3">
            My Toolkit
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.08 }} className="text-2xl md:text-3xl font-bold text-white">
            Software &amp; Tools
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.14 }} className="text-white/35 text-sm mt-2">
            Industry-standard tools I use to bring ideas to life.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-6 sm:gap-10 md:gap-14 px-1 sm:px-0">

          {/* Premiere Pro */}
          <ToolIcon label="Premiere Pro" glow="rgba(153,120,255,0.35)">
            <svg viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="88" height="88" fill="#1b1464"/>
              <rect width="88" height="88" fill="url(#prGrad)"/>
              <defs><linearGradient id="prGrad" x1="0" y1="0" x2="88" y2="88" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2a1f8c"/><stop offset="100%" stopColor="#0d0d3b"/>
              </linearGradient></defs>
              <text x="44" y="58" textAnchor="middle" fill="#9999ff" fontSize="32" fontWeight="900" fontFamily="'Adobe Clean', Arial, sans-serif" letterSpacing="-1">Pr</text>
            </svg>
          </ToolIcon>

          {/* After Effects */}
          <ToolIcon label="After Effects" glow="rgba(120,100,255,0.35)">
            <svg viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="88" height="88" fill="url(#aeGrad)"/>
              <defs><linearGradient id="aeGrad" x1="0" y1="0" x2="88" y2="88" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1c1464"/><stop offset="100%" stopColor="#09093a"/>
              </linearGradient></defs>
              <text x="44" y="58" textAnchor="middle" fill="#8f8fff" fontSize="32" fontWeight="900" fontFamily="'Adobe Clean', Arial, sans-serif" letterSpacing="-1">Ae</text>
            </svg>
          </ToolIcon>

          {/* Photoshop */}
          <ToolIcon label="Photoshop" glow="rgba(49,168,255,0.3)">
            <svg viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="88" height="88" fill="url(#psGrad)"/>
              <defs><linearGradient id="psGrad" x1="0" y1="0" x2="88" y2="88" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#001e36"/><stop offset="100%" stopColor="#00111f"/>
              </linearGradient></defs>
              <text x="44" y="58" textAnchor="middle" fill="#31a8ff" fontSize="32" fontWeight="900" fontFamily="'Adobe Clean', Arial, sans-serif" letterSpacing="-1">Ps</text>
            </svg>
          </ToolIcon>

          {/* Illustrator */}
          <ToolIcon label="Illustrator" glow="rgba(255,154,0,0.3)">
            <svg viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="88" height="88" fill="url(#aiGrad)"/>
              <defs><linearGradient id="aiGrad" x1="0" y1="0" x2="88" y2="88" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2d1000"/><stop offset="100%" stopColor="#1a0800"/>
              </linearGradient></defs>
              <text x="44" y="58" textAnchor="middle" fill="#ff9a00" fontSize="32" fontWeight="900" fontFamily="'Adobe Clean', Arial, sans-serif" letterSpacing="-1">Ai</text>
            </svg>
          </ToolIcon>

          {/* OBS Studio — correct logo: camera/record circle design */}
          <ToolIcon label="OBS Studio" glow="rgba(100,100,180,0.3)">
            <svg viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="88" height="88" fill="#12121e"/>
              {/* Outer ring */}
              <circle cx="44" cy="44" r="28" stroke="white" strokeWidth="3.5" fill="none" opacity="0.9"/>
              {/* Middle ring */}
              <circle cx="44" cy="44" r="18" stroke="white" strokeWidth="2.5" fill="none" opacity="0.6"/>
              {/* Inner filled dot */}
              <circle cx="44" cy="44" r="9" fill="white" opacity="0.95"/>
              {/* Top-right small dot */}
              <circle cx="63" cy="25" r="4" fill="#cc4444"/>
            </svg>
          </ToolIcon>

          {/* Sketch — correct logo: diamond shape */}
          <ToolIcon label="Sketch (UI/UX)" glow="rgba(247,183,49,0.3)">
            <svg viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="88" height="88" fill="#1c1400"/>
              {/* Sketch diamond/gem shape */}
              <g transform="translate(44,44)">
                {/* Top triangle (lighter) */}
                <polygon points="0,-22 -18,-4 18,-4" fill="#ffd45e" opacity="0.95"/>
                {/* Bottom triangle (darker) */}
                <polygon points="-18,-4 18,-4 0,22" fill="#e8a000" opacity="0.95"/>
                {/* Left facet */}
                <polygon points="-18,-4 0,-22 0,22" fill="#f5bc1c" opacity="0.85"/>
                {/* Right facet */}
                <polygon points="18,-4 0,-22 0,22" fill="#fcc928" opacity="0.9"/>
              </g>
            </svg>
          </ToolIcon>

        </div>
      </div>
    </section>
  );
};


const aiToolsRow1 = ["Seedance", "KLing", "Veo", "Runway", "Nano Banana", "Seedream", "Midjourney", "ElevenLabs", "PixVerse", "Wan"];
const aiToolsRow2 = ["Recraft", "Flux", "Ideogram", "PixVerse", "Wan", "ElevenLabs", "Seedance", "KLing", "Veo", "Runway", "Nano Banana", "Seedream"];

const doubled1 = [...aiToolsRow1, ...aiToolsRow1];
const doubled2 = [...aiToolsRow2, ...aiToolsRow2];

const AiToolsSection = () => {

  return (
    <section className="py-16 md:py-24 bg-black relative border-t border-white/[0.05] overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(168,85,247,0.07)_0%,transparent_70%)] pointer-events-none" />

      {/* Side fades */}
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 md:mb-16 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.35em] uppercase text-purple-400/70 font-medium mb-3"
        >
          Generative AI
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Specialisation in{" "}
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
            AI Tools
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="text-white/40 text-sm max-w-xl mx-auto leading-relaxed"
        >
          Leveraging the power of cutting-edge generative AI models to create stunning visual content.
        </motion.p>
      </div>

      {/* Single row — left scroll (mr instead of gap for seamless loop) */}
      <div className="overflow-hidden">
        <div
          className="flex w-max"
          style={{ willChange: "transform", animation: "marquee 26s linear infinite" }}
        >
          {doubled1.map((tool, i) => (
            <div
              key={i}
              className="flex-shrink-0 mr-3 sm:mr-4 px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white/70 text-[13px] sm:text-[16px] font-medium whitespace-nowrap hover:bg-white/[0.09] hover:border-purple-500/30 hover:text-white transition-all duration-300 cursor-default"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const clientLogos = [
  { name: "Century Group",        src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608072/portfolio/social/Century_Group_logo_02.png" },
  { name: "CIN News Network",     src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608073/portfolio/social/cinn.png" },
  { name: "Cubedots",             src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608074/portfolio/social/cubedots.png" },
  { name: "Dainik Bhaskar",       src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608075/portfolio/social/dainik-bhaskar-seeklogo.png" },
  { name: "HCET",                 src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608083/portfolio/social/HCET_copy.png" },
  { name: "Hyundai",              src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608084/portfolio/social/Hyundai_Motor_Company_logo.svg.png" },
  { name: "Inspire",              src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608087/portfolio/social/Inspire_copy.png" },
  { name: "JK Lakshmi Cement",    src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608088/portfolio/social/jk_axmi_cement.png" },
  { name: "Krishnashray",         src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608089/portfolio/social/Krishnashray.png" },
  { name: "Dr. Paul",             src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608090/portfolio/social/logopaul.png" },
  { name: "Nirmal Glasstech",     src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608091/portfolio/social/Nirma_Glass.png" },
  { name: "South Avenue Mall",    src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608092/portfolio/social/Sam_Logo_1.png" },
  { name: "Silk N Salt",          src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608094/portfolio/social/Silk_N_Salt.png" },
  { name: "Udyam Realty",         src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608094/portfolio/social/Udyam_Realty_Logo.png" },
  { name: "Vectus",               src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608096/portfolio/social/Vectus-Logo.png" },
  { name: "West Central Railway", src: "https://res.cloudinary.com/dijteej5k/image/upload/q_auto,f_auto/v1776608098/portfolio/social/wcr_logo.png" },
];

// Split into 2 rows and double for seamless loop
const _clRow1 = clientLogos.slice(0, 8);
const _clRow2 = clientLogos.slice(8);
const _clDoubled1 = [..._clRow1, ..._clRow1];
const _clDoubled2 = [..._clRow2, ..._clRow2];

const ClientsSection = () => (
  <section className="py-16 md:py-20 bg-[#0b0b0b] relative border-t border-white/[0.05] overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(168,85,247,0.04)_0%,transparent_70%)] pointer-events-none" />

    {/* Header */}
    <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center mb-10 md:mb-14 relative z-10">
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[10px] tracking-[0.35em] uppercase text-purple-400/70 font-medium mb-3">
        Trusted By
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.08 }} className="text-2xl md:text-3xl font-bold text-white">
        Brands I've{" "}
        <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
          Worked With
        </span>
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.14 }} className="text-white/30 text-sm mt-2">
        Delivering visual excellence for brands across industries.
      </motion.p>
    </div>

    {/* Two-row marquee */}
    <div className="relative">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-[#0b0b0b] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-[#0b0b0b] to-transparent" />

      <div className="flex flex-col gap-4 sm:gap-5">

        {/* Row 1 — scrolls left — mr instead of gap for perfect seamless loop */}
        <div className="overflow-hidden">
          <div
            className="flex w-max"
            style={{ willChange: "transform", animation: "marquee 26s linear infinite" }}
          >
            {_clDoubled1.map((c, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-[140px] sm:w-[210px] h-[76px] sm:h-[110px] mr-3 sm:mr-5
                           bg-gradient-to-br from-white via-white to-gray-50/95
                           rounded-2xl px-4 sm:px-7 py-3 sm:py-5
                           ring-1 ring-black/[0.06]
                           shadow-[0_2px_14px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]
                           flex items-center justify-center
                           transition-all duration-300 ease-out
                           hover:scale-[1.05] hover:shadow-[0_10px_36px_rgba(0,0,0,0.45),0_0_0_1.5px_rgba(168,85,247,0.25)]
                           hover:z-20 cursor-default"
              >
                <img src={c.src} alt={c.name} className="max-w-full max-h-full object-contain" loading="lazy" draggable="false" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden">
          <div
            className="flex w-max"
            style={{ willChange: "transform", animation: "marquee-reverse 32s linear infinite" }}
          >
            {_clDoubled2.map((c, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-[140px] sm:w-[210px] h-[76px] sm:h-[110px] mr-3 sm:mr-5
                           bg-gradient-to-br from-white via-white to-gray-50/95
                           rounded-2xl px-4 sm:px-7 py-3 sm:py-5
                           ring-1 ring-black/[0.06]
                           shadow-[0_2px_14px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]
                           flex items-center justify-center
                           transition-all duration-300 ease-out
                           hover:scale-[1.05] hover:shadow-[0_10px_36px_rgba(0,0,0,0.45),0_0_0_1.5px_rgba(168,85,247,0.25)]
                           hover:z-20 cursor-default"
              >
                <img src={c.src} alt={c.name} className="max-w-full max-h-full object-contain" loading="lazy" draggable="false" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
);

const serviceCards = [
  {
    icon: <Film size={22} />,
    title: "Video Editing",
    tag: "Video Production",
    desc: "Raw footage transformed into compelling visual stories — precision cuts, color grading, and seamless pacing that keeps audiences hooked.",
    accent: "from-purple-500/20 to-purple-500/0",
    border: "hover:border-purple-500/40",
    iconBg: "bg-purple-500/10 text-purple-400",
  },
  {
    icon: <Layers size={22} />,
    title: "Motion Design & Animation",
    tag: "Motion Graphics",
    desc: "Dynamic animations, kinetic typography, and motion graphics that breathe life into brands and make ideas impossible to ignore.",
    accent: "from-fuchsia-500/20 to-fuchsia-500/0",
    border: "hover:border-fuchsia-500/40",
    iconBg: "bg-fuchsia-500/10 text-fuchsia-400",
  },
  {
    icon: <Palette size={22} />,
    title: "Graphics & Visual Design",
    tag: "Design",
    desc: "Bold identities, print collateral, and digital assets crafted to communicate brand values with clarity, purpose, and visual impact.",
    accent: "from-pink-500/20 to-pink-500/0",
    border: "hover:border-pink-500/40",
    iconBg: "bg-pink-500/10 text-pink-400",
  },
  {
    icon: <MonitorPlay size={22} />,
    title: "Social Media Ads & Management",
    tag: "Paid Media",
    desc: "High-converting ad creatives paired with consistent page management — building brand presence and turning scrollers into loyal customers.",
    accent: "from-yellow-500/20 to-yellow-500/0",
    border: "hover:border-yellow-500/40",
    iconBg: "bg-yellow-500/10 text-yellow-400",
  },
  {
    icon: <Tv2 size={22} />,
    title: "Live Media Broadcasting",
    tag: "Live Production",
    desc: "Professional live streaming and broadcast production for events, news segments, and online platforms — delivered with broadcast-grade quality.",
    accent: "from-red-500/20 to-red-500/0",
    border: "hover:border-red-500/40",
    iconBg: "bg-red-500/10 text-red-400",
  },
  {
    icon: <ImagePlay size={22} />,
    title: "AI Image Generation",
    tag: "Generative AI",
    desc: "Photorealistic visuals, concept art, and brand imagery generated using cutting-edge AI models — fast, scalable, and creatively limitless.",
    accent: "from-cyan-500/20 to-cyan-500/0",
    border: "hover:border-cyan-500/40",
    iconBg: "bg-cyan-500/10 text-cyan-400",
  },
  {
    icon: <Wand2 size={22} />,
    title: "AI Video Generation",
    tag: "Generative AI",
    desc: "Next-generation video content produced using tools like Runway, Kling, Veo, and Wan — pushing the creative boundaries of what's possible.",
    accent: "from-blue-500/20 to-blue-500/0",
    border: "hover:border-blue-500/40",
    iconBg: "bg-blue-500/10 text-blue-400",
  },
  {
    icon: <Camera size={22} />,
    title: "Camera Operation",
    tag: "Cinematography",
    desc: "Skilled camera handling for shoots, corporate events, and productions — bringing a cinematic eye and technical precision to every frame.",
    accent: "from-emerald-500/20 to-emerald-500/0",
    border: "hover:border-emerald-500/40",
    iconBg: "bg-emerald-500/10 text-emerald-400",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-14 md:py-20 bg-black relative border-t border-white/[0.05]">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(168,85,247,0.06)_0%,transparent_70%)] pointer-events-none" />

    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header — centered */}
      <div className="flex flex-col items-center text-center gap-3 mb-10">
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-[10px] tracking-[0.35em] uppercase text-purple-400/70 font-medium">
          What I Do
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.07 }} className="text-3xl md:text-4xl font-bold text-white">
          My{" "}
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">Expertise</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.12 }} className="text-white/30 text-sm max-w-sm leading-relaxed">
          From concept to final output — crafted with intention and a relentless eye for quality.
        </motion.p>
      </div>

      {/* 8 cards — 2 col mobile, 4 col md */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {serviceCards.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative bg-[#0d0d0d] rounded-xl md:rounded-2xl p-3.5 md:p-5 overflow-hidden cursor-default border border-white/[0.06] transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-1"
            style={{ transition: "transform 0.25s ease, border-color 0.3s ease, box-shadow 0.3s ease" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
          >
            {/* Top accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Icon */}
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center ${s.iconBg} mb-3 md:mb-5 group-hover:scale-105 transition-transform duration-300`}>
              <span className="scale-75 md:scale-100">{s.icon}</span>
            </div>

            {/* Tag — mobile only pill */}
            <span className="md:hidden text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1.5 block">{s.tag}</span>

            {/* Title */}
            <h3 className="text-[12px] md:text-[14px] font-bold text-white/80 group-hover:text-white leading-snug mb-1 md:mb-2 transition-colors duration-200">
              {s.title}
            </h3>

            {/* Desc — hidden on mobile */}
            <p className="hidden md:block text-[11.5px] text-white/30 leading-relaxed line-clamp-3 group-hover:text-white/45 transition-colors duration-300">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

function getItemTag(item: WorkItem): string {
  return item.type === "image" ? "Graphics" : "Video & Motion";
}

// ─── MODAL COMPONENT ───
function VideoModal({ item, onClose }: { item: WorkItem; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const isVertical = item.aspect === "vertical";

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-lg z-50 hover:bg-white/20 transition-all duration-200"
      >
        ✕
      </button>

      {/* VIDEO CONTAINER */}
      <div
        className={`relative ${isVertical ? "" : "w-full max-w-5xl aspect-video"}`}
        style={isVertical ? { width: "min(94vw, 440px)", aspectRatio: "9 / 16", maxHeight: "92vh" } : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading skeleton */}
        {!loaded && (
          <div className="absolute inset-0 rounded-xl bg-[#0d0d0d] flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-purple-400 animate-spin" />
            <p className="text-white/30 text-xs tracking-widest uppercase">Loading</p>
          </div>
        )}
        <iframe
          className={`w-full h-full rounded-xl shadow-2xl transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&controls=1&modestbranding=1&rel=0&playsinline=1&mute=0`}
          title={item.title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}

const VideoCard: React.FC<{
  item: WorkItem;
  onCardClick: (item: WorkItem) => void;
  eager?: boolean;
}> = ({ item, onCardClick, eager }) => {
  const isVertical = item.aspect === "vertical";
  const isSquare = item.aspect === "aspect-square";

  const fallbackThumbnail = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src.includes("maxresdefault")) img.src = `https://i.ytimg.com/vi/${item.id}/sddefault.jpg`;
    else if (img.src.includes("sddefault")) img.src = `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;
    else if (img.src.includes("hqdefault")) img.src = `https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`;
  };

  return (
    <div
      className="break-inside-avoid cursor-pointer group"
      onClick={() => onCardClick(item)}
    >
      <div className={`
        relative overflow-hidden rounded-xl md:rounded-2xl bg-[#080808]
        ${isVertical ? "aspect-[9/16]" : isSquare ? "aspect-square" : "aspect-video"}
        ring-1 ring-white/[0.05] transition-all duration-300
        group-hover:ring-white/[0.15] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.7)]
      `}>

        <img
          src={`https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`}
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth <= 120) fallbackThumbnail(e);
          }}
          onError={fallbackThumbnail}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${isVertical ? "scale-[1.4] origin-center" : ""} group-hover:scale-[1.04]`}
          alt={item.title || ""}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />

        {/* Subtle bottom-to-top gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

        {/* Tag badge */}
        <span className="absolute top-2 left-2 z-20 px-2 py-[3px] rounded-full bg-black/55 backdrop-blur-sm text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest text-white/60 border border-white/[0.1] pointer-events-none">
          {getItemTag(item)}
        </span>

        {/* Title — always faintly visible on mobile, fades in on desktop hover */}
        {item.title && (
          <div className="absolute bottom-0 left-0 right-0 z-10 p-3 md:p-4
                          bg-gradient-to-t from-black/90 via-black/40 to-transparent
                          opacity-100 md:opacity-0 md:group-hover:opacity-100
                          translate-y-0 md:translate-y-1 md:group-hover:translate-y-0
                          transition-all duration-300 ease-out">
            <p className="text-white text-[11px] md:text-[13px] font-semibold leading-snug drop-shadow-md line-clamp-2">{item.title}</p>
          </div>
        )}

        {/* Play button — always visible, scales on hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/55 backdrop-blur-md border border-white/30 flex items-center justify-center
                          shadow-[0_4px_24px_rgba(0,0,0,0.5)]
                          group-hover:bg-white/15 group-hover:scale-110 group-hover:border-white/50
                          transition-all duration-300">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white translate-x-[2px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN CREATIVE WORKS COMPONENT ───
const CreativeWorks = () => {
  const [activeCategory, setActiveCategory] = useState("All Work");
  const [modalItem, setModalItem] = useState<WorkItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filtered = useMemo(
    () => activeCategory === "All Work" ? allWorks : allWorks.filter(item => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <section id="creative-works" className="py-16 md:py-24 px-4 sm:px-6 bg-black border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">

          {/* Header — centered on all screens */}
          <div className="flex flex-col items-center text-center gap-5 mb-10 md:mb-12">
            <div>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-[10px] tracking-[0.35em] uppercase text-purple-400/70 font-medium mb-3">
                Portfolio
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.07 }}
                className="text-3xl md:text-4xl font-bold text-white">
                Creative{" "}
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">Works</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.13 }}
                className="text-white/35 text-sm mt-2 max-w-sm leading-relaxed mx-auto">
                Projects blending technology and creativity — where artistry meets innovation.
              </motion.p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 md:px-5 py-2 md:py-2 rounded-xl text-[12px] md:text-[13px] font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-white text-black shadow-lg"
                      : "bg-white/[0.05] text-white/50 border border-white/[0.08] hover:bg-white/[0.09] hover:text-white/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.025, 0.28) }}
                  key={item.id || item.src}
                  className="break-inside-avoid mb-3 md:mb-4"
                >
                  {item.type === "image" ? (
                    <div
                      className="relative overflow-hidden rounded-2xl cursor-pointer group"
                      onClick={() => setSelectedImage(item.src || null)}
                    >
                      <img
                        src={item.src}
                        className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        referrerPolicy="no-referrer"
                        loading={index < 4 ? "eager" : "lazy"}
                      />
                      {/* Tag */}
                      <span className="absolute top-2 left-2 z-20 px-2 py-[3px] rounded-full bg-black/55 backdrop-blur-sm text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest text-white/55 border border-white/[0.1] pointer-events-none">
                        {getItemTag(item)}
                      </span>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 ease-out" />
                      {item.title && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                          <p className="text-white text-[13px] font-semibold leading-snug drop-shadow-md">{item.title}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <VideoCard item={item} onCardClick={(item) => setModalItem(item)} eager={index < 4} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {modalItem && (
        <VideoModal
          item={modalItem}
          onClose={() => setModalItem(null)}
        />
      )}

      {/* Image Modal */}
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-3xl hover:opacity-70 transition-opacity z-[60]"
          >
            ✕
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={selectedImage}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
          />
        </motion.div>
      )}
    </>
  );
};


const Contact = () => {
  const contactCards = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      subtitle: "Let's get in touch.",
      value: 'borntoflyrj@gmail.com',
      href: 'mailto:borntoflyrj@gmail.com',
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      subtitle: 'Give me a call.',
      value: '+91 99936 81478',
      href: 'tel:+919993681478',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      subtitle: 'Where to find me.',
      value: 'Jabalpur, Madhya Pradesh',
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#050505]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Ready to bring your vision to life? Let's discuss your project and create something extraordinary together.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactCards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-3 sm:gap-4 hover:border-purple-500/40 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                {card.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{card.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{card.subtitle}</p>
                {card.href ? (
                  <a href={card.href} className="text-purple-400 hover:text-purple-300 font-medium transition-colors break-all">
                    {card.value}
                  </a>
                ) : (
                  <span className="text-white font-semibold">{card.value}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 border-t border-white/[0.07] bg-black">
    <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      <p className="text-white/25 text-[13px]">© {new Date().getFullYear()} Rahul Jain. All rights reserved.</p>
      <p className="text-white/15 text-[12px] tracking-wide">Video Editor &amp; Motion Designer · Jabalpur</p>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>

      <AnimatePresence>
        {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-black text-[#F0F0F0] font-sans selection:bg-white/30">
          {/* Cinematic overlays — grain + vignette */}
          <div className="film-grain" aria-hidden="true" />
          <div className="vignette" aria-hidden="true" />
          <Header onOpenResume={() => setShowResume(true)} />
          <main>
            <Hero />
            <About />
            <ToolsMarquee />
            <AiToolsSection />
            <ServicesSection />
            <ClientsSection />
            <CreativeWorks />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      )}
    </>
  );
}
