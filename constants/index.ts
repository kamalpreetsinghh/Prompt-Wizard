export const errors = {
  name: "Name should be at least 2 characters long, and should only contain letters and spaces.",
  email: "Please enter a valid email address",
  password:
    "Password should contain at least one uppercase letter, one lowercase letter, at least one digit, and at least 8 characters long.",
  confirmPassword: "Passwords do not match.",
  emailAlreadyExisis:
    "Email already exists. Please use a different email address.",
  emailNotExist:
    "Email address doest not exist. Please enter correct email address.",
};

export const regex = {
  name: /^[a-zA-Z-' ]{2,}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

export const prompts = [
  {
    prompt:
      "A 3D rendering of a tree with bright yellow leaves and an abstract style.",
    tag: "aiart",
  },
  {
    prompt:
      "A photograph of an old man walking in the rain making eye contact with the viewer in a mid-shot view.",
    tag: "aiart",
  },
  {
    prompt:
      "A photograph of a person sitting on a bench facing the sunset in black and white.",
    tag: "midjourney",
  },
  {
    prompt: "A beautiful Amazon warrior in a sheer white dress.",
    tag: "mubert",
  },
  {
    prompt: "Write a resume for a [TITLE] based on this job description.",
    tag: "resume",
  },
  {
    prompt:
      "Tailor my resume to this job description for a [JOB TITLE] role at [COMPANY].",
    tag: "resume",
  },
];

export const footerLinks = [
  {
    title: "For developers",
    links: [
      "Go Pro!",
      "Explore development work",
      "Development blog",
      "Code podcast",
      "Open-source projects",
      "Refer a Friend",
      "Code of conduct",
    ],
  },
  {
    title: "Hire developers",
    links: [
      "Post a job opening",
      "Post a freelance project",
      "Search for developers",
    ],
  },
  {
    title: "Brands",
    links: ["Advertise with us"],
  },
  {
    title: "Company",
    links: [
      "About",
      "Careers",
      "Support",
      "Media kit",
      "Testimonials",
      "API",
      "Terms of service",
      "Privacy policy",
      "Cookie policy",
    ],
  },
  {
    title: "Directories",
    links: [
      "Development jobs",
      "Developers for hire",
      "Freelance developers for hire",
      "Tags",
      "Places",
    ],
  },
  {
    title: "Development assets",
    links: [
      "Code Marketplace",
      "GitHub Marketplace",
      "NPM Registry",
      "Packagephobia",
    ],
  },
  {
    title: "Development Resources",
    links: [
      "Freelancing",
      "Development Hiring",
      "Development Portfolio",
      "Development Education",
      "Creative Process",
      "Development Industry Trends",
    ],
  },
];
