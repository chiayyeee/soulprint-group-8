/**
 * SOULPRINT — Data Store
 * Group A-8 | 11533175 陳菲菲 & 11533178 郭蓮嘉
 * Course: Natural Science and Artificial Intelligence
 */

export const INITIAL_ARCHETYPES = {
  daydreamer: {
    id: "daydreamer",
    name: "The Daydreamer",
    subtitle: "白日夢想家",
    tagline: "Lost in wonder, found in infinite possibilities.",
    headline: "Imaginative, curious, and full of ideas.",
    description: "You perceive the world not just as it is, but as it could be in a thousand parallel reveries. Your mind is an enchanted observatory where passing thoughts blossom into constellations. You see magic in ordinary moments, weaving whimsy, empathy, and poetic wonder into the rhythm of daily life.",
    characteristics: [
      "Perpetual Wonderer: Always discovering new curiosities in mundane scenes",
      "Divergent Thinker: Connects two completely unrelated ideas into brilliant concepts",
      "Empathic Intuition: Feels stories, moods, and unspoken emotions with tenderness",
      "Unbounded Mindscapes: Builds cozy mental kingdoms while waiting for the kettle to boil"
    ],
    strengths: [
      "Inexhaustible creative spark that inspires those around you",
      "Effortless ability to reframe problems through fresh, original metaphors",
      "Gentle empathy that makes others feel deeply understood and safe"
    ],
    quirks: [
      "Pauses mid-stride on the sidewalk because a cloud looked like an ancient mythical beast",
      "Has 83 unfinished story ideas, random poetry snippets, and odd musings in their Notes app",
      "Stares into coffee foam for 3 minutes imagining what life on Jupiter would sound like"
    ],
    palette: [
      { name: "Cloud Lavender", hex: "#C7D2FE" },
      { name: "Butter Sunshine", hex: "#FEF08A" },
      { name: "Dreamer Cobalt", hex: "#2563EB" },
      { name: "Blush Mist", hex: "#FECDD3" }
    ],
    accentColor: "#2563EB",
    bgTint: "#EEF2FF",
    badge: "☁️ ✨ 💭",
    compatibleWith: ["creator", "collector"]
  },

  observer: {
    id: "observer",
    name: "The Observer",
    subtitle: "細膩微光者",
    tagline: "Noticing the quiet whispers the world forgets to hear.",
    headline: "Thoughtful, attentive, and detail-oriented.",
    description: "While the world rushes by in frantic blur, you are the calm anchor who notices the trembling leaf, the barista's hidden smile, and the subtle shift in a room's atmosphere. You find profound beauty in quiet nuances, listening deeply before speaking with surgical clarity and soulful warmth.",
    characteristics: [
      "Razor-Sharp Perception: Catches subtle changes that everyone else missed",
      "Quiet Wisdom: Listens twice as much as speaking, offering rare clarity",
      "Pattern Decoder: Finds hidden rhythm and symmetry in everyday human behavior",
      "Mindful Grounding: Brings calm presence and stillness wherever they go"
    ],
    strengths: [
      "Incredible attention to craft, nuance, and unspoken emotional cues",
      "Thoughtful problem-solving that addresses root causes rather than noise",
      "The rarest friend who truly remembers the small things that matter to you"
    ],
    quirks: [
      "Remembers the exact coffee order you mentioned once in passing nine months ago",
      "Loves the quiet corner seat in a cafe for optimal, discreet people-watching",
      "Can tell someone's mood simply by the cadence of their footsteps entering the room"
    ],
    palette: [
      { name: "Sage Sanctuary", hex: "#A7F3D0" },
      { name: "Deep Ink Cobalt", hex: "#1E3A8A" },
      { name: "Morning Cream", hex: "#FEFCE8" },
      { name: "Pebble Grey", hex: "#CBD5E1" }
    ],
    accentColor: "#059669",
    bgTint: "#ECFDF5",
    badge: "🔍 🌿 👁️",
    compatibleWith: ["collector", "daydreamer"]
  },

  collector: {
    id: "collector",
    name: "The Collector",
    subtitle: "記憶收藏家",
    tagline: "Treasuring fragments of time, warm tea, and sacred memories.",
    headline: "Sentimental, nostalgic, and appreciative of little things.",
    description: "You believe that every cinema ticket, dried flower petal, and handwritten envelope holds a quiet piece of eternity. You are the archivist of human warmth, cherishing nostalgia and the gentle patina of passed time. In your hands, ordinary artifacts transform into sacred emotional milestones.",
    characteristics: [
      "Memory Archivist: Preserves feelings, dates, and milestones like golden amber",
      "Sensory Connoisseur: Finds joy in the texture of paper, scent of rain, and warmth of ceramic",
      "Emotional Generosity: Genuinely celebrates traditions, birthdays, and old stories",
      "Curator of Charm: Surrounds themselves with meaningful tokens rather than sterile clutter"
    ],
    strengths: [
      "Creates an exceptionally warm, inviting, and nostalgic haven for loved ones",
      "Deep emotional loyalty and appreciation for enduring human bonds",
      "Turns simple gifts into unforgettable, deeply personalized treasures"
    ],
    quirks: [
      "Has a tin box filled with museum ticket stubs, quirky bottle caps, and concert ribbons",
      "Buys vintage illustrated postcards with zero intention of ever mailing them",
      "Gets emotional over a worn-out bookstore receipt from five autumns ago"
    ],
    palette: [
      { name: "Warm Honey", hex: "#FDE047" },
      { name: "Vintage Coral", hex: "#FB7185" },
      { name: "Terracotta Glow", hex: "#F97316" },
      { name: "Parchment Cream", hex: "#FFFBEB" }
    ],
    accentColor: "#EA580C",
    bgTint: "#FFF7ED",
    badge: "🏷️ 🍂 💌",
    compatibleWith: ["observer", "creator"]
  },

  explorer: {
    id: "explorer",
    name: "The Explorer",
    subtitle: "曠野探索者",
    tagline: "Every winding alleyway holds an unwritten chapter.",
    headline: "Adventurous, spontaneous, and curious about the world.",
    description: "You are propelled by an electric restlessness and an insatiable hunger for the horizon. It's not about adrenaline; it's about seeing what lies around that mysterious next corner. You embrace serendipity, welcoming detours as the true destination, carrying an infectious zest for life's vast sandbox.",
    characteristics: [
      "Spontaneous Spirit: Ready to pivot plans at a second's notice for an impromptu journey",
      "Resilient Curiosity: Treats unexpected mishaps as thrilling plot twists",
      "Unbounded Horizon: Thrives in unfamiliar environments and cross-cultural discovery",
      "Boundary Pusher: Bored by identical routines, constantly inventing fresh pathways"
    ],
    strengths: [
      "Fearless adaptability in uncharted or rapidly changing situations",
      "Radiant optimism that dissolves collective anxiety into adventure",
      "Incredible ability to forge genuine connections with strangers in far-off places"
    ],
    quirks: [
      "Intentionally takes the wrong bus just to see where the terminal line leads",
      "Packs a weekend backpack in under 4 minutes with zero stress",
      "Has 14 different foreign subway cards in their wallet right now"
    ],
    palette: [
      { name: "Ocean Cobalt", hex: "#1D4ED8" },
      { name: "Sunrise Tangerine", hex: "#F97316" },
      { name: "Wild Mint", hex: "#34D399" },
      { name: "Sunlit Sand", hex: "#FEF3C7" }
    ],
    accentColor: "#1D4ED8",
    bgTint: "#EFF6FF",
    badge: "🧭 🗺️ 🎒",
    compatibleWith: ["dreamchaser", "creator"]
  },

  creator: {
    id: "creator",
    name: "The Creator",
    subtitle: "靈感造物者",
    tagline: "Turning sparks of feeling into tangible wonders.",
    headline: "Expressive, imaginative, and enjoys making things.",
    description: "You don't merely experience the world — you are compelled to respond to it with your own hands, voice, and craft. Whether sculpting clay, baking wild recipes, designing layouts, or arranging colors, you translate invisible feelings into tangible beauty that touches the human soul.",
    characteristics: [
      "Hands-On Alchemist: Craves the tactile sensation of bringing ideas into physical existence",
      "Aesthetic Sensibility: Obsesses over harmonious color palettes, typography, and mood",
      "Playful Experimenter: Welcomes happy accidents as the truest wellsprings of innovation",
      "Authentic Expression: Speaks most honestly through their creations and projects"
    ],
    strengths: [
      "Exceptional capacity to materialize abstract ideas into moving experiences",
      "Relentless enthusiasm for continuous craft improvement and artistic exploration",
      "Inspires others to shed self-doubt and embrace their inner expressive spark"
    ],
    quirks: [
      "Fingers or sleeves are perpetually marked with watercolor, ink, or ceramic dust",
      "Cannot look at an empty cardboard box without mentally designing a miniature diorama",
      "Rearranges home furniture or desk setup at 1:30 AM because 'the energy needed flow'"
    ],
    palette: [
      { name: "Electric Coral", hex: "#F43F5E" },
      { name: "Warm Apricot", hex: "#FB923C" },
      { name: "Butter Lemon", hex: "#FDE047" },
      { name: "Artisan Cobalt", hex: "#3B82F6" }
    ],
    accentColor: "#F43F5E",
    bgTint: "#FFF1F2",
    badge: "🎨 ✨ ✂️",
    compatibleWith: ["daydreamer", "collector"]
  },

  dreamchaser: {
    id: "dreamchaser",
    name: "The Dream Chaser",
    subtitle: "逐光築夢者",
    tagline: "Mapping tomorrow with unwavering grit and starlight.",
    headline: "Ambitious, determined, and future-oriented.",
    description: "You possess the vision to look at an empty horizon and see a thriving future city. Where others see insurmountable obstacles, you see chess moves and milestones. Fuelled by unyielding resolve and clear strategic clarity, you build bridges from the impossible to the inevitable.",
    characteristics: [
      "Strategic Visionary: Foresees three steps ahead and plots actionable trajectories",
      "Resilient Grit: Bounces back from setbacks with doubled determination and wisdom",
      "Catalytic Energy: Galvanizes teams and projects from static inertia into momentum",
      "Purposeful Focus: Protects time and passion for milestones that truly move the needle"
    ],
    strengths: [
      "Remarkable execution ability that transforms lofty ambitions into reality",
      "Inspiring leadership that instills contagious self-belief in companions",
      "Unshakable poise and decision-making clarity when the pressure rises"
    ],
    quirks: [
      "Gets genuinely thrilled by unwrapping a brand-new blank weekly planner",
      "Color-codes digital calendars with dedicated blocks for personal mastery",
      "Listens to high-tempo orchestral anthems or film scores while tackling spreadsheets"
    ],
    palette: [
      { name: "Regal Cobalt", hex: "#1E3A8A" },
      { name: "Solar Gold", hex: "#F59E0B" },
      { name: "Energetic Coral", hex: "#EA580C" },
      { name: "Starlight Cream", hex: "#FFFBEB" }
    ],
    accentColor: "#F59E0B",
    bgTint: "#FEFCE8",
    badge: "🚀 🌟 ⚡",
    compatibleWith: ["explorer", "creator"]
  }
};

export const INITIAL_QUESTIONS = [
  {
    id: 1,
    category: "Morning Awakening",
    categoryZh: "晨間喚醒",
    title: "The sun spills gentle gold across your bedroom floor on a free weekend. What is your very first impulse?",
    titleZh: "週末清晨，陽光灑進房間。你的第一個念頭是？",
    options: [
      {
        id: "A",
        text: "Lie in cozy sheets, letting thoughts drift into fictional universes and daydreaming.",
        textZh: "窩在被窩裡發呆，任由腦袋漫遊到平行時空與奇思妙想中。",
        scores: { daydreamer: 3, creator: 1 }
      },
      {
        id: "B",
        text: "Brew a cup of fragrant tea, sit by the window, and quietly watch the morning city awaken.",
        textZh: "泡一杯熱茶坐在窗邊，靜靜端詳街道甦醒的微小細節。",
        scores: { observer: 3, collector: 1 }
      },
      {
        id: "C",
        text: "Lace up sneakers and step outside without an itinerary to find an unfamiliar cafe or alley.",
        textZh: "穿上球鞋直接出門，不設目的地去探索未曾走過的小巷與未知小店。",
        scores: { explorer: 3, dreamchaser: 1 }
      },
      {
        id: "D",
        text: "Review your exciting personal side-project goals and eagerly start building or creating.",
        textZh: "迫不及待打開待辦清單，為今天設定有成就感的目標並著手動工。",
        scores: { dreamchaser: 2, creator: 2 }
      }
    ]
  },
  {
    id: 2,
    category: "Flea Market Wander",
    categoryZh: "市集巡禮",
    title: "You stumble across a lively indie craft & flea market. Where do your feet instinctively steer you first?",
    titleZh: "漫步在文創市集時，你的腳步會最先走向哪個攤位？",
    options: [
      {
        id: "A",
        text: "The vintage paper stall with yellowed postcards, antique brass keys, and handwritten letters.",
        textZh: "擺滿泛黃舊明信片、老式黃銅鑰匙與手寫信件的古物雜貨攤。",
        scores: { collector: 3, observer: 1 }
      },
      {
        id: "B",
        text: "The handmade ceramics and art print booth, wondering how the artist mixed those colors.",
        textZh: "手作陶藝與原創插畫攤位，腦中忍不住琢磨作品的製作細節與色彩搭配。",
        scores: { creator: 3, daydreamer: 1 }
      },
      {
        id: "C",
        text: "The eccentric explorer booth with world globes, hand-drawn navigation maps, and foreign coins.",
        textZh: "展示著舊世界地圖、異國錢幣與探險家指南針的神秘選物攤。",
        scores: { explorer: 3, collector: 1 }
      },
      {
        id: "D",
        text: "The intricate mechanical clockwork and optical lenses, marveling at their precision and logic.",
        textZh: "陳列著精密齒輪鐘錶與古董透鏡的攤位，細細研究結構與運作原理。",
        scores: { observer: 2, dreamchaser: 2 }
      }
    ]
  },
  {
    id: 3,
    category: "Rainy Afternoon Retreat",
    categoryZh: "雨後避難所",
    title: "A sudden afternoon thunderstorm traps you inside for three uninterrupted hours. How do you spend it?",
    titleZh: "午後突如其來的暴雨取消了戶外行程，你會如何享受這段意外時光？",
    options: [
      {
        id: "A",
        text: "Gazing at raindrops racing on the glass, letting ambient lo-fi music guide your boundless reverie.",
        textZh: "看著雨滴在玻璃窗上賽跑，聽著環境音樂讓思緒飄向遙遠的夢境。",
        scores: { daydreamer: 3, observer: 1 }
      },
      {
        id: "B",
        text: "Curating your favorite photographs, reorganizing your souvenir box, or writing in a keepsake journal.",
        textZh: "整理近期的拍立得照片、翻閱旅行紀念品盒子，在日記裡記下溫暖的心情。",
        scores: { collector: 3, creator: 1 }
      },
      {
        id: "C",
        text: "Spreading out paints, collage papers, or cooking utensils to invent a brand new original creation.",
        textZh: "鋪開畫紙、剪貼手帳或鑽進廚房，動手做出一道或一件前所未有的原創作品。",
        scores: { creator: 3, explorer: 1 }
      },
      {
        id: "D",
        text: "Using the quiet stillness to deep-dive into an insightful book, plan future milestones, and strategize.",
        textZh: "把握難得不受打擾的專注時刻，研讀專業書籍並梳理接下來的遠大目標與藍圖。",
        scores: { dreamchaser: 3, observer: 1 }
      }
    ]
  },
  {
    id: 4,
    category: "The Travel Bag",
    categoryZh: "行囊必備物",
    title: "You are packing a lightweight carry-on for a spontaneous weekend trip. What item must not be left behind?",
    titleZh: "收拾週末輕裝小旅行的背包，哪一樣物品是你的絕對必備？",
    options: [
      {
        id: "A",
        text: "A pocket sketchbook or journal filled with doodles, dream logs, and whimsical character sketches.",
        textZh: "隨身塗鴉本與鋼筆，隨時捕捉一閃而過的故事靈感與奇思狂想。",
        scores: { daydreamer: 2, creator: 2 }
      },
      {
        id: "B",
        text: "A discreet camera with an analog lens to frame candid smiles and forgotten architectural textures.",
        textZh: "一台定焦輕巧相機，用獨特視角捕捉街頭光影、微小紋理與路人不經意的神態。",
        scores: { observer: 3, collector: 1 }
      },
      {
        id: "C",
        text: "A vintage tin or pouch for storing train tickets, fallen maple leaves, and local cafe stamps.",
        textZh: "一個專門收藏車票根、壓花葉片與咖啡杯套紀念印章的布質收納袋。",
        scores: { collector: 3, observer: 1 }
      },
      {
        id: "D",
        text: "A reliable all-terrain pair of sneakers and an open mindset ready to hike any unmarked trail.",
        textZh: "一雙舒適耐走、隨時準備跨越泥濘與未知山徑的全地形運動鞋。",
        scores: { explorer: 3, dreamchaser: 1 }
      }
    ]
  },
  {
    id: 5,
    category: "The Blank Canvas",
    categoryZh: "靈魂充電法",
    title: "You are granted an entire evening where all responsibilities vanish. What activity replenishes your spirit?",
    titleZh: "若能擁有一整個沒有任何義務與打擾的夜晚，哪件事最能讓你精神煥發？",
    options: [
      {
        id: "A",
        text: "Stargazing or listening to an imaginative audio drama, letting your mind wander across constellations.",
        textZh: "仰望夜空星辰或聆聽天馬行空的廣播劇，沉浸在宏大而浪漫的想像世界中。",
        scores: { daydreamer: 3, collector: 1 }
      },
      {
        id: "B",
        text: "Immersing yourself in a hands-on craft session — pottery, graphic design, sewing, or crafting zines.",
        textZh: "沉浸在手作工作坊中——無論是做陶、排版小誌、木工或編織，直到深夜。",
        scores: { creator: 3, dreamchaser: 1 }
      },
      {
        id: "C",
        text: "Scouting a hidden scenic spot outside the city, taking the night train to watch the sunrise from a cliff.",
        textZh: "搭上一班深夜區間車，抵達一座陌生的海邊小鎮等待破曉的第一道曙光。",
        scores: { explorer: 3, dreamchaser: 1 }
      },
      {
        id: "D",
        text: "Mapping out a comprehensive vision board, breaking your 5-year dreams into quarterly sprints.",
        textZh: "在牆面貼上願景板與甘特圖，把未來幾年的壯志一步步拆解成清晰可行的進程。",
        scores: { dreamchaser: 3, creator: 1 }
      }
    ]
  },
  {
    id: 6,
    category: "Indie Cafe Atmosphere",
    categoryZh: "街角咖啡館",
    title: "You sit in a bustling boutique cafe with jazz humming. What automatically catches your attention?",
    titleZh: "坐在飄散著烘豆香與爵士樂的街角咖啡館裡，最吸引你注意的細節是？",
    options: [
      {
        id: "A",
        text: "The subtle expressions and unspoken micro-narratives exchanged between people across tables.",
        textZh: "鄰桌客人間細微的眼神交會、肢體語言與空氣中未說出口的微型故事。",
        scores: { observer: 3, daydreamer: 1 }
      },
      {
        id: "B",
        text: "The unique embossed stamp on the napkins, the handwritten menu typography, and handmade mugs.",
        textZh: "手寫菜單的字體美感、杯墊上的特殊燙金印花，以及每只杯子獨特的拉胚紋路。",
        scores: { collector: 2, creator: 2 }
      },
      {
        id: "C",
        text: "The passersby outside the large glass window, imagining where each stranger is traveling to.",
        textZh: "大片落地窗外步履匆匆的路人，想像著他們正啟程前往何方、各自經歷何種人生。",
        scores: { daydreamer: 2, explorer: 2 }
      },
      {
        id: "D",
        text: "The barista's streamlined workflow and the cafe's innovative business model and branding vision.",
        textZh: "吧台俐落流暢的出餐動線、選豆邏輯，以及這家店如何將小巧品牌經營得聲名遠播。",
        scores: { dreamchaser: 3, observer: 1 }
      }
    ]
  },
  {
    id: 7,
    category: "The Soul Sticker",
    categoryZh: "靈魂標籤",
    title: "If you had to print a die-cut sticker for your laptop that represents your life philosophy, which speaks to you?",
    titleZh: "如果為你的筆電印製一張代表人生座右銘的風格貼紙，你會選擇哪一句？",
    options: [
      {
        id: "A",
        text: "'Reality is only the canvas; imagination is the color.' (現實只是畫布，想像才是色彩)",
        textZh: "「現實只是畫布，想像才是色彩。」",
        scores: { daydreamer: 3, creator: 1 }
      },
      {
        id: "B",
        text: "'Look closer: the quietest details hold the deepest wonders.' (細看人間，微光成炬)",
        textZh: "「細看人間，最安靜的角落藏著最深的奇蹟。」",
        scores: { observer: 3, collector: 1 }
      },
      {
        id: "C",
        text: "'Every small keepsake preserves a sacred fragment of love.' (每一枚微小紀念，皆是歲月的溫柔碎片)",
        textZh: "「每一枚微小紀念，皆是歲月的溫柔碎片。」",
        scores: { collector: 3, daydreamer: 1 }
      },
      {
        id: "D",
        text: "'Wander boldly toward the summit; create the future you seek.' (無畏開拓，親手雕琢所渴望的明日)",
        textZh: "「無畏開拓，親手雕琢所渴望的明日。」",
        scores: { explorer: 2, dreamchaser: 2 }
      }
    ]
  }
];

export const TEAM_INFO = {
  course: "Natural Science and Artificial Intelligence (自然科學與人工智慧)",
  institution: "Chung Yuan Christian University (中原大學)",
  department: "Department of Commercial Design (商業設計學系)",
  group: "Group A-8 (Group 8)",
  members: [
    { id: "11533175", name: "陳菲菲", englishName: "Chen Fei Fei", role: "UI/UX Design, Illustration & Visual Direction" },
    { id: "11533178", name: "郭蓮嘉", englishName: "Guo Lian Jia", role: "Concept Planning, Frontend Architecture & Scoring Engine" }
  ],
  presentationDate: "December 30, 2026",
  projectTitle: "SOULPRINT",
  tagline: "Discover the little things that make you, you.",
  description: "SOULPRINT is an interactive personality discovery experience inspired by independent creative zines and scrapbook editorial aesthetics. It celebrates everyday nuances, transforming micro-moments into personal visual archetypes."
};
