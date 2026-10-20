export const INITIAL_CLUB_INFO = {
  name: "PULSE Arts & Sports Club",
  shortName: "PULSE",
  motto: "Uniting Creative Passion & Athletic Excellence",
  tagline: "Where imagination paints the canvas and adrenaline powers the field.",
  foundedYear: 2021,
  headquarters: "Student Activity Center & Arena, Campus East",
  stats: {
    totalMembers: 340,
    artsWingsCount: 5,
    sportsTeamsCount: 6,
    eventsThisSeason: 28,
    trophiesWon: 19,
    exhibitionsHeld: 14
  },
  wings: [
    {
      id: "arts",
      name: "Creative Arts Wing",
      shortDesc: "Fine Arts, Music, Theatre, Photography & Literature",
      color: "from-purple-600 to-pink-500",
      accent: "purple",
      icon: "Palette",
      disciplines: ["Fine Arts & Painting", "Acoustic & Band Music", "Theatre & Drama Guild", "Visual Photography", "Creative Writing & Poetry"]
    },
    {
      id: "sports",
      name: "Athletics & Sports Wing",
      shortDesc: "Football, Basketball, Badminton, Cricket, Track & Esports",
      color: "from-emerald-600 to-teal-500",
      accent: "emerald",
      icon: "Trophy",
      disciplines: ["Football Squad", "Basketball Team", "Badminton League", "Cricket Club", "Track & Cross Country", "Chess & Esports"]
    }
  ]
};

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Annual Inter-Club Showcase & Sports Tournament Registrations Open!",
    content: "Registrations are officially open for the Spring Fest 2026! Both the 5v5 Futsal Championship and the Canvas & Clay Art Exhibition are accepting entries. Team captain and solo artist meetings are this Thursday at 5:00 PM in the Main Auditorium.",
    wing: "all",
    priority: "urgent",
    author: "Elena Rostova (Club President)",
    date: "2026-10-18",
    badge: "Important"
  },
  {
    id: "ann-2",
    title: "Badminton Court 2 Resurfacing Complete + Floodlights Upgraded",
    content: "The indoor sports arena court 2 is reopened for evening practice sessions. Please remember to book your court slots in advance via the Facility Booking portal.",
    wing: "sports",
    priority: "notice",
    author: "Marcus Vance (Sports Secretary)",
    date: "2026-10-15",
    badge: "Facility"
  },
  {
    id: "ann-3",
    title: "Open Mic & Acoustic Jam Night: Theme 'Retro Wave'",
    content: "Join us this Friday at the Amphitheatre for our monthly open mic! Singer-songwriters, poets, stand-up performers, and instrumentalists welcome. Equipment and amps provided.",
    wing: "arts",
    priority: "upcoming",
    author: "Chloe Dubois (Arts Lead)",
    date: "2026-10-12",
    badge: "Culture"
  }
];

export const INITIAL_EVENTS = [
  {
    id: "evt-1",
    title: "Autumn Canvas & Photography Exhibition",
    wing: "arts",
    category: "Fine Arts & Media",
    date: "2026-10-25",
    time: "10:00 AM - 6:00 PM",
    venue: "Creative Arts Gallery Hall A",
    description: "An immersive gallery featuring over 45 selected paintings, digital illustrations, and street photography prints created by club members.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    organizer: "Chloe Dubois (Arts Lead)",
    capacity: 200,
    rsvps: ["Elena Rostova", "Devon Miles", "Samira Khan", "Alex Rivera"],
    featured: true,
    tags: ["Exhibition", "Fine Arts", "Photography"]
  },
  {
    id: "evt-2",
    title: "Inter-Department 7v7 Football Championship",
    wing: "sports",
    category: "Football",
    date: "2026-10-28",
    time: "3:30 PM - 7:30 PM",
    venue: "Main Athletic Turf & Stadium",
    description: "High-octane tournament with 8 knockout teams vying for the Golden Boot and the Chancellor's Trophy. Refreshments & live DJ commentary provided.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    organizer: "Marcus Vance (Sports Secretary)",
    capacity: 150,
    rsvps: ["Jordan Lee", "Elena Rostova", "Carlos Mendoza", "Liam Wright", "Tariq Ali"],
    featured: true,
    tags: ["Tournament", "Football", "Trophy Match"]
  },
  {
    id: "evt-3",
    title: "Acoustic Jam & Indie Band Auditions",
    wing: "arts",
    category: "Music & Band",
    date: "2026-11-02",
    time: "5:00 PM - 8:30 PM",
    venue: "Soundstage Studio 3",
    description: "Calling all guitarists, drummers, keyboardists, and vocalists! Auditions for the flagship club band for the upcoming state university tour.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    organizer: "Devon Miles (Music Director)",
    capacity: 50,
    rsvps: ["Chloe Dubois", "Maya Lin"],
    featured: false,
    tags: ["Music", "Auditions", "Band"]
  },
  {
    id: "evt-4",
    title: "Open Badminton Smash Singles Cup",
    wing: "sports",
    category: "Badminton",
    date: "2026-11-05",
    time: "9:00 AM - 4:00 PM",
    venue: "Indoor Sports Complex Courts 1-4",
    description: "Open singles competition across beginner, intermediate, and varsity brackets. Feather shuttles provided for all official bracket matches.",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    organizer: "Samira Khan (Badminton Captain)",
    capacity: 64,
    rsvps: ["Marcus Vance", "Carlos Mendoza", "Aarav Patel"],
    featured: false,
    tags: ["Badminton", "Tournament", "Singles"]
  },
  {
    id: "evt-5",
    title: "Stage Play & Theatrical Monologue Workshop",
    wing: "arts",
    category: "Theatre & Drama",
    date: "2026-11-08",
    time: "2:00 PM - 5:30 PM",
    venue: "Blackbox Theatre Studio",
    description: "Master the art of stage presence, voice projection, and improvisational drama led by guest theatre director and club alumni Sarah Jenkins.",
    image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80",
    organizer: "Elena Rostova (Drama Guild)",
    capacity: 40,
    rsvps: ["Devon Miles", "Samira Khan", "Sophia Chen"],
    featured: false,
    tags: ["Theatre", "Workshop", "Acting"]
  },
  {
    id: "evt-6",
    title: "Night Glow 5K Fun Run & Fitness Circuit",
    wing: "sports",
    category: "Athletics & Track",
    date: "2026-11-12",
    time: "6:30 PM - 8:30 PM",
    venue: "Campus Perimeter Track & Central Lawn",
    description: "Lace up your running shoes with neon glowbands and light sticks! A non-competitive 5K run followed by hydration bar and cool-down yoga.",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
    organizer: "Jordan Lee (Athletics Lead)",
    capacity: 120,
    rsvps: ["Elena Rostova", "Marcus Vance", "Aarav Patel", "Chloe Dubois"],
    featured: false,
    tags: ["5K Run", "Fitness", "Night Run"]
  }
];

export const INITIAL_MEMBERS = [
  {
    id: "mem-1",
    name: "Elena Rostova",
    role: "Club President",
    wing: "dual",
    primaryDiscipline: "Theatre & Track",
    bio: "Passionate about bridging athletic discipline with creative storytelling. Active marathon runner and dramatic actor.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    email: "elena.r@pulseclub.org",
    joinedYear: 2022,
    achievements: ["Organized 2025 Inter-State Fest", "2x Campus 10K Gold Medalist"]
  },
  {
    id: "mem-2",
    name: "Marcus Vance",
    role: "Sports Director & Football Captain",
    wing: "sports",
    primaryDiscipline: "Football & Fitness",
    bio: "Varsity football center-back, dedicated to building inclusive fitness programs and intramural sports leagues.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    email: "marcus.v@pulseclub.org",
    joinedYear: 2022,
    achievements: ["Varsity League MVP 2024", "Founded Youth Football Clinic"]
  },
  {
    id: "mem-3",
    name: "Chloe Dubois",
    role: "Arts Lead & Curator",
    wing: "arts",
    primaryDiscipline: "Oil Painting & Visual Art",
    bio: "Visual artist exploring contemporary realism and mural installations across campus spaces.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    email: "chloe.d@pulseclub.org",
    joinedYear: 2023,
    achievements: ["National Youth Art Fellow", "Campus Wall Mural Project Lead"]
  },
  {
    id: "mem-4",
    name: "Devon Miles",
    role: "Music Guild Coordinator",
    wing: "arts",
    primaryDiscipline: "Acoustic Guitar & Production",
    bio: "Composer, multi-instrumentalist, and sound engineer who loves hosting live jam sessions.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    email: "devon.m@pulseclub.org",
    joinedYear: 2023,
    achievements: ["Best Original Score - State Drama Fest", "Released Club EP 'Echoes'"]
  },
  {
    id: "mem-5",
    name: "Samira Khan",
    role: "Badminton Team Captain",
    wing: "sports",
    primaryDiscipline: "Badminton & Table Tennis",
    bio: "State-level badminton player promoting women in athletics and regular training bootcamps.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    email: "samira.k@pulseclub.org",
    joinedYear: 2023,
    achievements: ["University Singles Champion", "Sportsmanship Honor 2025"]
  },
  {
    id: "mem-6",
    name: "Carlos Mendoza",
    role: "Basketball Lead",
    wing: "sports",
    primaryDiscipline: "Basketball & Strength Training",
    bio: "Point guard passionate about 3v3 streetball culture, high-tempo conditioning, and team spirit.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    email: "carlos.m@pulseclub.org",
    joinedYear: 2024,
    achievements: ["3-Point Contest Winner 2024", "Intramural Tournament Finalist"]
  },
  {
    id: "mem-7",
    name: "Maya Lin",
    role: "Photography & Media Lead",
    wing: "arts",
    primaryDiscipline: "Sports Photography & Cinema",
    bio: "Capturing peak athletic intensity and raw artistic expression through the viewfinder.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    email: "maya.l@pulseclub.org",
    joinedYear: 2024,
    achievements: ["Featured in Campus Magazine", "Best Action Shot Award"]
  },
  {
    id: "mem-8",
    name: "Aarav Patel",
    role: "Chess & Esports Coordinator",
    wing: "sports",
    primaryDiscipline: "Chess (FIDE 1980) & Strategy",
    bio: "Mind sports enthusiast organizing campus blitz tournaments and tactical game analysis sessions.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    email: "aarav.p@pulseclub.org",
    joinedYear: 2024,
    achievements: ["Inter-Collegiate Rapid Chess Gold", "Organizer of 128-player LAN Cup"]
  }
];

export const INITIAL_GALLERY = [
  {
    id: "gal-1",
    title: "Championship Celebration: Cup Winners 2025",
    wing: "sports",
    category: "Football",
    author: "Sports Squad",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    likes: 124,
    description: "The moment our squad lifted the City Inter-Club Trophy after a dramatic penalty shootout victory!"
  },
  {
    id: "gal-2",
    title: "Vibrant Canvas: 'Aurora in Oil'",
    wing: "arts",
    category: "Fine Arts",
    author: "Chloe Dubois",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    likes: 98,
    description: "Selected as centerpiece of the annual spring salon. Layered oils on raw linen."
  },
  {
    id: "gal-3",
    title: "Courtside Action: Dunk in the 4th Quarter",
    wing: "sports",
    category: "Basketball",
    author: "Maya Lin (Photographer)",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    likes: 112,
    description: "High flying slam dunk captured during the semifinal rivalry clash."
  },
  {
    id: "gal-4",
    title: "Acoustic Sunset Sessions",
    wing: "arts",
    category: "Music",
    author: "Devon Miles & Band",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    likes: 87,
    description: "Intimate live recording in the courtyard with fellow acoustic string players."
  },
  {
    id: "gal-5",
    title: "Smash at the Net: Final Set Point",
    wing: "sports",
    category: "Badminton",
    author: "Samira Khan",
    image: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=800&q=80",
    likes: 76,
    description: "Fast-paced jump smash during the women's varsity finals match."
  },
  {
    id: "gal-6",
    title: "Sculpting Harmony: Clay & Bronze Studies",
    wing: "arts",
    category: "Sculpture",
    author: "Fine Arts Studio",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    likes: 93,
    description: "Exploration of physical balance and human posture through ceramic clay sculpting."
  }
];

export const INITIAL_FACILITIES = [
  {
    id: "fac-1",
    name: "Indoor Badminton Court A & B",
    wing: "sports",
    type: "Facility / Court",
    capacity: "4 Players / Court",
    location: "Sports Complex Ground Floor",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80",
    status: "Available",
    amenities: ["BWF Spec Mat", "LED Floodlights", "Racquet Rentals", "Locker Access"],
    slots: ["07:00 - 08:30 AM", "09:00 - 10:30 AM", "04:00 - 05:30 PM", "06:00 - 07:30 PM", "08:00 - 09:30 PM"]
  },
  {
    id: "fac-2",
    name: "Main Artificial Turf Football Pitch",
    wing: "sports",
    type: "Facility / Field",
    capacity: "14-22 Players",
    location: "Outdoor Athletic Arena",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80",
    status: "Available",
    amenities: ["FIFA Standard Turf", "Corner Flags", "Goal Nets", "Night Floodlights"],
    slots: ["06:00 - 07:30 AM", "04:30 - 06:00 PM", "06:30 - 08:00 PM", "08:00 - 09:30 PM"]
  },
  {
    id: "fac-3",
    name: "Creative Fine Arts Studio & Easel Lounge",
    wing: "arts",
    type: "Studio / Creative Space",
    capacity: "16 Artists",
    location: "Arts Pavilion 2nd Floor",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
    status: "Available",
    amenities: ["Natural Skylight", "Adjustable Easels", "Clay Wheels", "Drying Racks", "Wash Basins"],
    slots: ["10:00 AM - 01:00 PM", "02:00 - 05:00 PM", "05:30 - 08:30 PM"]
  },
  {
    id: "fac-4",
    name: "Acoustics Soundstage & Band Jam Room",
    wing: "arts",
    type: "Studio / Rehearsal",
    capacity: "8 Musicians",
    location: "Music Wing Lower Ground",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80",
    status: "Available",
    amenities: ["Drum Kit (Pearl)", "Marshall Guitar Amps", "Yamaha 88-key Stage Piano", "PA & Mics"],
    slots: ["11:00 AM - 01:00 PM", "02:00 - 04:00 PM", "04:30 - 06:30 PM", "07:00 - 09:00 PM"]
  },
  {
    id: "fac-5",
    name: "Professional Photography Gear Kit",
    wing: "arts",
    type: "Equipment Loan",
    capacity: "1 Member",
    location: "Media Equipment Desk",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    status: "Available",
    amenities: ["Sony Alpha A7 IV", "24-70mm f/2.8 GM", "Tripod", "Godox Speedlight & Softbox"],
    slots: ["Morning Checkout (9am-2pm)", "Evening Checkout (2pm-8pm)", "Full Day Weekend Checkout"]
  },
  {
    id: "fac-6",
    name: "Table Tennis & Mind Sports Lounge",
    wing: "sports",
    type: "Facility / Indoor",
    capacity: "8 Players",
    location: "Student Center Mezzanine",
    image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=600&q=80",
    status: "Available",
    amenities: ["Stiga Pro ITTF Tables", "Tournament Chess Sets & Clocks", "Paddles & 3-Star Balls"],
    slots: ["12:00 - 02:00 PM", "03:00 - 05:00 PM", "05:30 - 07:30 PM", "08:00 - 10:00 PM"]
  }
];
