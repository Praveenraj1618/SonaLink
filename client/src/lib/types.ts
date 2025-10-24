// SonaLink TypeScript Types

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role?: 'student' | 'tutor' | 'admin';
  joinedCourses?: Course[];
  stats?: {
    uploads: number;
    answers: number;
    quizzes: number;
  };
}

export interface Course {
  id: number;
  code: string;
  name: string;
  faculty: string;
  description?: string;
  member_count: number;
  joined?: boolean;
}

export interface Material {
  id: number;
  title: string;
  description?: string;
  file_url: string;
  preview_url?: string;
  file_type: 'pdf' | 'image' | 'document';
  uploader: {
    id: number;
    name: string;
    avatar?: string;
  };
  tags: string[];
  upvotes: number;
  downloads: number;
  created_at: string;
  course_id?: number;
}

export interface ForumThread {
  id: number;
  title: string;
  body: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  tags: string[];
  answers_count: number;
  accepted?: boolean;
  created_at: string;
  course_id: number;
}

export interface ForumReply {
  id: number;
  body: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  created_at: string;
  is_accepted?: boolean;
}

export interface Quiz {
  id: number;
  title: string;
  description?: string;
  creator: {
    id: number;
    name: string;
    avatar?: string;
  };
  questions: QuizQuestion[];
  attempts: number;
  avg_score?: number;
  course_id: number;
  created_at: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
}

export interface Notification {
  id: number;
  type: 'upload' | 'reply' | 'quiz' | 'mention';
  body: string;
  link: string;
  isRead: boolean;
  created_at: string;
}

export interface SearchSuggestion {
  type: 'material' | 'course' | 'post' | 'person';
  label: string;
  id: number;
  meta?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}

// API Endpoints Documentation
/**
 * SonaLink API Endpoints
 * 
 * BASE_URL: https://api.sonalink.edu
 * 
 * === AUTHENTICATION ===
 * 
 * POST /auth/signup
 * Request: { name: string, email: string, password: string }
 * Response: { message: string, user_id: number }
 * 
 * GET /auth/verify?token=xxx
 * Response: { success: boolean, message: string }
 * 
 * POST /auth/login
 * Request: { email: string, password: string, remember?: boolean }
 * Response: { token: string, user: User }
 * 
 * POST /auth/resend-verification
 * Request: { email: string }
 * Response: { message: string }
 * 
 * POST /auth/forgot-password
 * Request: { email: string }
 * Response: { message: string }
 * 
 * POST /auth/reset-password
 * Request: { token: string, password: string }
 * Response: { message: string }
 * 
 * === COURSES ===
 * 
 * GET /courses
 * Query: ?search=xxx&limit=20&offset=0
 * Response: PaginatedResponse<Course>
 * 
 * GET /courses/:id
 * Response: Course & { announcements: Announcement[], top_materials: Material[] }
 * 
 * POST /courses/:id/join
 * Response: { message: string, joined: boolean }
 * 
 * GET /courses/:id/members
 * Query: ?search=xxx&sort=name|contributions
 * Response: PaginatedResponse<User>
 * 
 * === MATERIALS ===
 * 
 * GET /courses/:id/materials
 * Query: ?tag=xxx&sort=recent|popular&page=1&limit=12
 * Response: PaginatedResponse<Material>
 * 
 * POST /courses/:id/materials (multipart/form-data)
 * Body: { file: File, title: string, description?: string, tags: string[] }
 * Response: { material: Material }
 * 
 * GET /materials/:id
 * Response: Material & { comments: Comment[] }
 * 
 * POST /materials/:id/upvote
 * Response: { upvotes: number, user_voted: boolean }
 * 
 * GET /materials/:id/download
 * Response: File stream (increments download count)
 * 
 * POST /materials/:id/comments
 * Request: { body: string }
 * Response: { comment: Comment }
 * 
 * === FORUM ===
 * 
 * GET /courses/:id/forum
 * Query: ?filter=all|unanswered|solved&page=1
 * Response: PaginatedResponse<ForumThread>
 * 
 * POST /courses/:id/forum
 * Request: { title: string, body: string, tags: string[] }
 * Response: { thread: ForumThread }
 * 
 * GET /forum/:threadId
 * Response: ForumThread & { replies: ForumReply[] }
 * 
 * POST /forum/:threadId/reply
 * Request: { body: string }
 * Response: { reply: ForumReply }
 * 
 * POST /forum/replies/:replyId/accept
 * Response: { accepted: boolean }
 * 
 * === QUIZZES ===
 * 
 * GET /courses/:id/quizzes
 * Response: PaginatedResponse<Quiz>
 * 
 * POST /courses/:id/quizzes
 * Request: { title: string, description?: string, questions: QuizQuestion[] }
 * Response: { quiz: Quiz }
 * 
 * GET /quizzes/:id
 * Response: Quiz
 * 
 * POST /quizzes/:id/attempt
 * Request: { answers: number[] }
 * Response: { score: number, total: number, correct_answers: number[] }
 * 
 * GET /quizzes/:id/leaderboard
 * Response: { entries: Array<{ user: User, score: number, completed_at: string }> }
 * 
 * === SEARCH ===
 * 
 * GET /search
 * Query: ?q=xxx&type=all|materials|courses|posts|people&page=1
 * Response: { materials: Material[], courses: Course[], posts: ForumThread[], people: User[] }
 * 
 * GET /search/suggestions
 * Query: ?q=xxx
 * Response: { suggestions: SearchSuggestion[] }
 * 
 * === PROFILE ===
 * 
 * GET /profile/:userId
 * Response: User & { materials: Material[], posts: ForumThread[], courses: Course[] }
 * 
 * PUT /profile
 * Request: { name?: string, bio?: string, avatar?: File }
 * Response: { user: User }
 * 
 * === NOTIFICATIONS ===
 * 
 * GET /notifications
 * Query: ?filter=all|unread&page=1
 * Response: PaginatedResponse<Notification>
 * 
 * PUT /notifications/:id/read
 * Response: { success: boolean }
 * 
 * PUT /notifications/read-all
 * Response: { success: boolean }
 * 
 * DELETE /notifications/:id
 * Response: { success: boolean }
 * 
 * === SETTINGS ===
 * 
 * PUT /settings/password
 * Request: { current_password: string, new_password: string }
 * Response: { message: string }
 * 
 * PUT /settings/notifications
 * Request: { email_notifications: boolean, material_uploads: boolean, ... }
 * Response: { message: string }
 */

export interface Comment {
  id: number;
  body: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  created_at: string;
}

export interface Announcement {
  id: number;
  title: string;
  body: string;
  course_id: number;
  created_at: string;
}
