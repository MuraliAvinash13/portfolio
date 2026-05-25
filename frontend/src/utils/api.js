// REST API client with local fallback for Mukhe Murali Avinash Portfolio

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Local Mock Data Fallbacks
const MOCK_SKILLS = [
  { name: 'Java', category: 'Backend', proficiencyPercentage: 90 },
  { name: 'Spring Boot', category: 'Backend', proficiencyPercentage: 85 },
  { name: 'Node.js', category: 'Backend', proficiencyPercentage: 75 },
  { name: 'React.js', category: 'Frontend', proficiencyPercentage: 85 },
  { name: 'Vite', category: 'Frontend', proficiencyPercentage: 80 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiencyPercentage: 90 },
  { name: 'Three.js', category: 'Frontend', proficiencyPercentage: 70 },
  { name: 'MySQL', category: 'Database', proficiencyPercentage: 85 },
  { name: 'MongoDB', category: 'Database', proficiencyPercentage: 80 },
  { name: 'AI & Deep Learning', category: 'AI', proficiencyPercentage: 70 },
  { name: 'Machine Learning', category: 'AI', proficiencyPercentage: 75 },
];

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Blood Bank Management System",
    description: "A full-stack blood donation platform connecting donors, hospitals, and blood banks. Streamlines request approval, donor eligibility tracking, and real-time inventory management.",
    techStack: "Java, Spring Boot, React.js, MySQL, REST APIs",
    githubLink: "https://github.com/MuraliAvinash13",
    architectureDiagram: "Client (React) -> Load Balancer -> Service Instance (Spring Boot Gateway) -> Microservices (Donor Service, Inventory Service) -> MySQL DB",
    screenshots: "Dashboard, Donor Form, Inventory Table"
  },
  {
    id: 2,
    title: "Pharmacy Ordering Management System",
    description: "A comprehensive supply chain and order management solution for pharmacies and distributors. Features role-based access control, batch tracking, automated order invoicing, and inventory notifications.",
    techStack: "React.js, Node.js, Express.js, MongoDB, REST APIs",
    githubLink: "https://github.com/MuraliAvinash13",
    architectureDiagram: "Client (React) -> Gateway/Reverse Proxy -> Pharmacy Service -> Auth Service -> Inventory Service -> MongoDB",
    screenshots: "Login Screen, Inventory Catalog, Invoicing Dashboard"
  },
  {
    id: 3,
    title: "Grayscale Image Colorization AI",
    description: "A deep learning application that takes grayscale images and applies natural, realistic colorizations using a Convolutional Neural Network (CNN) and Generative Adversarial Networks (GANs).",
    techStack: "Python, TensorFlow/Keras, Flask, OpenCV, React.js",
    githubLink: "https://github.com/MuraliAvinash13",
  
    architectureDiagram: "User Interface (React) -> API Endpoint (Flask) -> Deep Learning Inference Pipeline (PyTorch/TensorFlow) -> CDN Cache -> Returned Colorized Image",
    screenshots: "Inference Dashboard, Before-After Slider, Custom Settings"
  },
  {
    id: 4,
    title: "Futuristic 3D Developer Portfolio",
    description: "A high-fidelity space command theme portfolio website showcasing professional experience, interactive skill planets, floating 3D crystals, and an AI chat assistant.",
    techStack: "React.js, Vite, Three.js, React Three Fiber, Framer Motion, GSAP, Tailwind CSS, Spring Boot, MySQL",
    githubLink: "https://github.com/MuraliAvinash13",
    architectureDiagram: "Browser Frontend (React Three Fiber, GSAP) -> REST API Gateway (Spring Boot) -> Database Layer (MySQL) + AVA Chat Agent Engine",
    screenshots: "3D Universe Canvas, Skills Galaxy, Experience Stations, AVA Chat Interface"
  }
];

// Helper to execute fetch requests with automated fallback
async function fetchWithFallback(url, options = {}, fallbackData) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`API call to ${url} failed. Using offline fallback. Error: ${error.message}`);
    return fallbackData;
  }
}

export const portfolioApi = {
  // Fetch all projects
  getProjects: async () => {
    return fetchWithFallback(`${API_BASE_URL}/projects`, {}, MOCK_PROJECTS);
  },

  // Fetch all skills
  getSkills: async () => {
    return fetchWithFallback(`${API_BASE_URL}/skills`, {}, MOCK_SKILLS);
  },

  // Submit contact message
  submitContact: async (contactData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      if (!response.ok) {
        throw new Error('Contact API failed');
      }
      return await response.json();
    } catch (error) {
      console.warn('Contact API offline. Simulating local success.', error.message);
      // Return a simulated success payload
      return {
        id: Date.now(),
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
        createdAt: new Date().toISOString()
      };
    }
  },

  // Ask AVA Chatbot
  askChatbot: async (userMessage) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
      if (!response.ok) {
        throw new Error('Chatbot API failed');
      }
      return await response.json();
    } catch (error) {
      console.warn('Chatbot API offline. Evaluating answer locally.');
      // Local AVA virtual assistant matching logic
      const message = userMessage.toLowerCase().trim();
      let answer = "";

      if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message.includes("greet")) {
        answer = "Hello! I am AVA, virtual assistant for Mukhe Murali Avinash. I can walk you through Avinash's background, professional projects, and skill proficiencies. Ask me anything!";
      } else if (message.includes("who are you") || message.includes("ava") || message.includes("your name")) {
        answer = "I am AVA, which stands for **Avinash Virtual Assistant**. I'm a futuristic AI agent designed to act as Avinash's holographic interface and answer queries about his portfolio, skills, achievements, and availability!";
      } else if (message.includes("who is") || message.includes("murali") || message.includes("avinash") || message.includes("about")) {
        answer = "Mukhe Murali Avinash is a highly skilled **Java Full Stack Developer**, **MERN Stack Developer**, and **AI Enthusiast** with a CGPA of **8.3**. He has built 4+ real-world applications ranging from enterprise web solutions to deep-learning image processing networks.";
      } else if (message.includes("project") || message.includes("portfolio")) {
        answer = "Avinash has built several projects: **Blood Bank Management System** (Spring Boot/React), **Pharmacy Ordering System** (MERN), **Grayscale Image Colorization AI** (Flask/GANs), and this **3D Space command Portfolio**. Which one would you like to explore?";
      } else if (message.includes("blood bank")) {
        answer = "The **Blood Bank Management System** is built using **Java, Spring Boot, React.js, and MySQL**. It features microservices for medical donor eligibility checks and real-time inventory matching.";
      } else if (message.includes("pharmacy") || message.includes("ordering")) {
        answer = "The **Pharmacy Ordering Management System** is a MERN stack web app featuring dynamic batch invoice generation in PDF, automatic drug stock alerts, and multi-tier access control.";
      } else if (message.includes("colorization") || message.includes("grayscale") || message.includes("image")) {
        answer = "The **Grayscale Image Colorization AI** colorizes historical black-and-white photos using CNNs & GANs. Built with Python, Flask, PyTorch/TensorFlow, and React.";
      } else if (message.includes("skill") || message.includes("technology") || message.includes("tech stack")) {
        answer = "Avinash is proficient in: **Backend** (Java, Spring Boot, Node.js, Express.js, MySQL, MongoDB), **Frontend** (React.js, Vite, Three.js, React Three Fiber, GSAP, Framer Motion, Tailwind CSS), and **AI/ML** (Python, Computer Vision, GANs).";
      } else if (message.includes("experience") || message.includes("intern") || message.includes("work") || message.includes("timeline")) {
        answer = "Avinash has completed two key milestones:\n\n1. **Edunet Foundation (Internship)**: Gained real-world web architecture development experience.\n2. **QSpiders (Java Full Stack Training)**: Intensive training covering Advanced Java, Spring Boot, MySQL, and React.";
      } else if (message.includes("contact") || message.includes("email") || message.includes("phone") || message.includes("reach") || message.includes("hire")) {
        answer = "You can reach Mukhe Murali Avinash at **muraliavinash99@gmail.com**, or check out his Github: **github.com/Murali-Portfolio** and LinkedIn. You can also send a message via the Contact Form on the bottom right!";
      } else if (message.includes("resume") || message.includes("cv") || message.includes("download")) {
        answer = "You can download Avinash's resume by clicking the **DOWNLOAD RESUME** button in the header dashboard, or I can initiate it for you.";
      } else if (message.includes("cgpa") || message.includes("grade") || message.includes("education") || message.includes("college")) {
        answer = "Avinash holds an academic **CGPA of 8.3** in Computer Science & Engineering, specializing in Java Full Stack and AI algorithms.";
      } else {
        answer = "I'm AVA, Avinash's assistant. I can describe his skills, projects, and internship experience. Could you try asking about his skills, projects, QSpiders, or how to contact him?";
      }

      return {
        response: answer,
        sender: "AVA",
        timestamp: new Date().toISOString()
      };
    }
  },

  // Get download url for resume
  getResumeDownloadUrl: () => {
    return `${API_BASE_URL}/resume/download`;
  }
};
