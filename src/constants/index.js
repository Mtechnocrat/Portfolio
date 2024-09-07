import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const HERO_CONTENT = `I am an enthusiastic full stack developer with a strong foundation in building web applications. I have developed my skills in front-end technologies like React and Next.js, and back-end technologies such as Node.js, MySQL, Git, and GitHub through academic projects and internships. I am eager to apply my knowledge to create innovative solutions, enhance user experiences, and contribute to business growth as I embark on my professional journey.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. Through academic projects and internships, I have gained experience with a variety of technologies, including React, Next.js, Node.js, MySQL, Git, and GitHub. My journey in web development began with a curiosity for how things work, and it has grown into a desire to continuously learn and adapt to new challenges. I thrive in collaborative environments and enjoy exploring new technologies and contributing to open-source projects.`;

export const EDUCATION = [
  {
    year: "2021 - 2025",
    course: "Bachelor of Engineering in Computer Science",
    school: "Chitkara University",
    Percentage: `CGPA-8.77`,
    technologies: ["Javascript", "React.js", "Next.js", "mongoDB"],
  },
  {
    year: "2020 - 2021",
    course: "Senior Secondary Education",
    school: "Sam International School",
    Percentage: `Percentage : 85%`,
    technologies: ["HTML", "CSS", "Vue.js", "mySQL"],
  },
  {
    year: "2018 - 2019",
    course: "Secondary Education",
    school: "Sam International School",
    Percentage: `Percentage : 87%`,
    technologies: ["Python", "Svelte", "Three.js", "Postgres"],
  },
];

export const PROJECTS = [
  {
    title: "Food-Delivery App",
    image: project1,
    description:
      " Tomato is a dynamic food delivery platform developed with the MERN stack and Stripe for secure payments.",
    technologies: ["React", "Express.Js", "Stripe", "Node.js", "MongoDB"],
    link:"https://food-delivery-app-frontend-etrp.onrender.com/",
  },
  {
    title: "Expense Tracker",
    image: project2,
    description:
      "A simple expense tracking application built with the MERN (MongoDB, Express, React, Node.js) stack, helping users manage their daily expenses and stay on top of their finances.",
    technologies: ["React", "CSS", "Express.js","Node.Js","MongoDB"],
    link:"https://expense-tracker-frontend-ochre.vercel.app/",
  },
  {
    title: "Portfolio Website",
    image: project3,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["React", "CSS", "Tailwind"],
    link:"#",
  },
  {
    title: "BookVerse",
    image: project4,
    description:
      "A responsive book website built with HTML and CSS, offering a clean, user-friendly interface. It adapts to different screen sizes, showcasing books by genre, featured collections, and reviews, ensuring an engaging experience on all devices.",
    technologies: ["HTML", "CSS", "Vue.js", "Express", "mySQL"],
    link:"https://mtechnocrat.github.io/BooksVerse/",
  },
];

export const CONTACT = {
  address: "New Delhi, India",
  phoneNo: "",
  email: "mr.genixx@gmail.com",
};
