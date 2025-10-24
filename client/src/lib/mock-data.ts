// Mock data for SonaLink demo

import { User, Course, Material, ForumThread, Quiz, Notification } from './types';

export const mockUser: User = {
  id: 1,
  name: "Rakks Kumar",
  email: "rakks@sona.ac.in",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rakks",
  bio: "Final year CS student | ML enthusiast",
  role: "student",
  stats: {
    uploads: 24,
    answers: 58,
    quizzes: 12
  }
};

export const mockCourses: Course[] = [
  {
    id: 401,
    code: "CS401",
    name: "Machine Learning",
    faculty: "Dr. Karthik",
    description: "Introduction to ML algorithms and applications",
    member_count: 120,
    joined: true
  },
  {
    id: 301,
    code: "CS301",
    name: "Control Systems",
    faculty: "Dr. Priya",
    description: "Block diagrams, transfer functions, and system stability",
    member_count: 95,
    joined: true
  },
  {
    id: 402,
    code: "CS402",
    name: "Data Mining",
    faculty: "Dr. Venkat",
    description: "Data preprocessing, clustering, and classification",
    member_count: 110,
    joined: true
  },
  {
    id: 305,
    code: "CS305",
    name: "Computer Networks",
    faculty: "Dr. Ramesh",
    description: "Network protocols, TCP/IP, and security",
    member_count: 130,
    joined: false
  }
];

export const mockMaterials: Material[] = [
  {
    id: 123,
    title: "Control Systems - Unit 1 Notes",
    description: "Block diagram summary and examples with solved problems",
    file_url: "https://example.com/control_unit1.pdf",
    preview_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    file_type: "pdf",
    uploader: {
      id: 45,
      name: "Rakks",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rakks"
    },
    tags: ["Notes", "Control Systems", "Unit 1"],
    upvotes: 24,
    downloads: 89,
    created_at: "2025-10-15T07:12:00Z",
    course_id: 301
  },
  {
    id: 124,
    title: "ML Assignment 2 Solutions",
    description: "Complete solutions with code and explanations",
    file_url: "https://example.com/ml_assignment2.pdf",
    file_type: "pdf",
    uploader: {
      id: 23,
      name: "Priya S",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    },
    tags: ["Assignment", "Machine Learning", "Solutions"],
    upvotes: 42,
    downloads: 156,
    created_at: "2025-10-17T14:30:00Z",
    course_id: 401
  },
  {
    id: 125,
    title: "Data Mining Cheat Sheet",
    description: "Quick reference for algorithms and formulas",
    file_url: "https://example.com/dm_cheatsheet.pdf",
    file_type: "pdf",
    uploader: {
      id: 67,
      name: "Arun M",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arun"
    },
    tags: ["Cheat Sheet", "Data Mining", "Exam Prep"],
    upvotes: 38,
    downloads: 203,
    created_at: "2025-10-12T09:45:00Z",
    course_id: 402
  },
  {
    id: 126,
    title: "Network Protocols Diagram",
    description: "Visual guide to OSI and TCP/IP layers",
    file_url: "https://example.com/network_protocols.png",
    preview_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    file_type: "image",
    uploader: {
      id: 89,
      name: "Divya R",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Divya"
    },
    tags: ["Diagram", "Networks", "Protocols"],
    upvotes: 31,
    downloads: 124,
    created_at: "2025-10-18T11:20:00Z",
    course_id: 305
  }
];

export const mockThreads: ForumThread[] = [
  {
    id: 201,
    title: "Help with Transfer Function derivation?",
    body: "I'm stuck on problem 3.4 from the textbook. Can someone explain the step where they simplify the denominator?",
    user: {
      id: 34,
      name: "Kiran P",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kiran"
    },
    tags: ["Control Systems", "Help"],
    answers_count: 3,
    accepted: true,
    created_at: "2025-10-18T08:30:00Z",
    course_id: 301
  },
  {
    id: 202,
    title: "Best resources for understanding backpropagation?",
    body: "I've watched several videos but still confused about the gradient calculations. Any recommendations?",
    user: {
      id: 56,
      name: "Sneha K",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha"
    },
    tags: ["Machine Learning", "Resources"],
    answers_count: 5,
    accepted: false,
    created_at: "2025-10-19T06:15:00Z",
    course_id: 401
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: 301,
    title: "ML Basics - Week 1 Quiz",
    description: "Test your understanding of supervised vs unsupervised learning",
    creator: {
      id: 1,
      name: "Rakks Kumar",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rakks"
    },
    questions: [
      {
        id: 1,
        question: "Which of the following is a supervised learning algorithm?",
        options: ["K-Means", "Linear Regression", "PCA", "DBSCAN"],
        correct_answer: 1
      },
      {
        id: 2,
        question: "What is the main goal of unsupervised learning?",
        options: [
          "Predict labels",
          "Find patterns in data",
          "Classify images",
          "Optimize parameters"
        ],
        correct_answer: 1
      }
    ],
    attempts: 47,
    avg_score: 78,
    course_id: 401,
    created_at: "2025-10-10T10:00:00Z"
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "reply",
    body: "Rakks replied to your question in Control Systems",
    link: "/courses/301/forum/201",
    isRead: false,
    created_at: "2025-10-19T09:30:00Z"
  },
  {
    id: 2,
    type: "upload",
    body: "New material uploaded in Machine Learning",
    link: "/courses/401/materials/124",
    isRead: false,
    created_at: "2025-10-19T07:00:00Z"
  },
  {
    id: 3,
    type: "quiz",
    body: "Sneha challenged you to a quiz",
    link: "/courses/401/quizzes/301",
    isRead: true,
    created_at: "2025-10-18T15:20:00Z"
  }
];
