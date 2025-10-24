# SonaLink API Documentation

**Base URL**: `https://api.sonalink.edu`  
**Version**: 1.0.0  
**Authentication**: Bearer token in Authorization header

---

## Authentication Endpoints

### POST /auth/signup
Create a new user account with college email verification.

**Request:**
```json
{
  "name": "string (required)",
  "email": "string (required, must end with @sona.ac.in)",
  "password": "string (required, min 6 characters)"
}
```

**Response** (201 Created):
```json
{
  "message": "Verification email sent",
  "user_id": 123
}
```

---

### GET /auth/verify
Verify email address with token from verification email.

**Query Parameters:**
- `token`: string (required)

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

### POST /auth/login
Authenticate user and receive access token.

**Request:**
```json
{
  "email": "string (required)",
  "password": "string (required)",
  "remember": "boolean (optional)"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGci...",
  "user": {
    "id": 123,
    "name": "Rakks Kumar",
    "email": "rakks@sona.ac.in",
    "avatar": "https://...",
    "role": "student"
  }
}
```

---

### POST /auth/resend-verification
Resend verification email.

**Request:**
```json
{
  "email": "string (required)"
}
```

**Response** (200 OK):
```json
{
  "message": "Verification email sent"
}
```

---

### POST /auth/forgot-password
Request password reset link.

**Request:**
```json
{
  "email": "string (required)"
}
```

**Response** (200 OK):
```json
{
  "message": "Password reset link sent"
}
```

---

### POST /auth/reset-password
Reset password with token.

**Request:**
```json
{
  "token": "string (required)",
  "password": "string (required, min 6 characters)"
}
```

**Response** (200 OK):
```json
{
  "message": "Password reset successfully"
}
```

---

## Course Endpoints

### GET /courses
Get paginated list of all courses.

**Query Parameters:**
- `search`: string (optional) - Search by code, name, or faculty
- `limit`: number (optional, default 20)
- `offset`: number (optional, default 0)

**Response** (200 OK):
```json
{
  "items": [
    {
      "id": 301,
      "code": "CS301",
      "name": "Data Structures",
      "faculty": "Dr. Kumar",
      "description": "Advanced data structures and algorithms",
      "member_count": 156,
      "joined": false
    }
  ],
  "page": 1,
  "totalPages": 5,
  "totalItems": 100
}
```

---

### GET /courses/:id
Get detailed information about a specific course.

**Response** (200 OK):
```json
{
  "id": 301,
  "code": "CS301",
  "name": "Data Structures",
  "faculty": "Dr. Kumar",
  "description": "...",
  "member_count": 156,
  "joined": true,
  "announcements": [
    {
      "id": 1,
      "title": "Midterm Schedule",
      "body": "The midterm exam will be held on...",
      "created_at": "2025-10-15T10:00:00Z"
    }
  ],
  "top_materials": [
    // Array of Material objects
  ]
}
```

---

### POST /courses/:id/join
Join a course.

**Response** (200 OK):
```json
{
  "message": "Successfully joined course",
  "joined": true
}
```

---

### GET /courses/:id/members
Get paginated list of course members.

**Query Parameters:**
- `search`: string (optional)
- `sort`: "name" | "contributions" (optional, default "name")
- `page`: number (optional, default 1)
- `limit`: number (optional, default 20)

**Response** (200 OK):
```json
{
  "items": [
    {
      "id": 1,
      "name": "Rakks Kumar",
      "email": "rakks@sona.ac.in",
      "avatar": "https://...",
      "role": "student",
      "stats": {
        "uploads": 12,
        "answers": 34,
        "quizzes": 5
      }
    }
  ],
  "page": 1,
  "totalPages": 8,
  "totalItems": 156
}
```

---

## Material Endpoints

### GET /courses/:id/materials
Get paginated materials for a course.

**Query Parameters:**
- `tag`: string (optional) - Filter by tag
- `sort`: "recent" | "popular" (optional, default "recent")
- `page`: number (optional, default 1)
- `limit`: number (optional, default 12)

**Response** (200 OK):
```json
{
  "items": [
    {
      "id": 101,
      "title": "Introduction to Binary Trees",
      "description": "Comprehensive notes on binary trees",
      "file_url": "https://storage.sonalink.edu/files/...",
      "preview_url": "https://storage.sonalink.edu/previews/...",
      "file_type": "pdf",
      "uploader": {
        "id": 1,
        "name": "Rakks Kumar",
        "avatar": "https://..."
      },
      "tags": ["Data Structures", "Trees"],
      "upvotes": 45,
      "downloads": 123,
      "created_at": "2025-10-15T14:30:00Z",
      "course_id": 301
    }
  ],
  "page": 1,
  "totalPages": 4,
  "totalItems": 48
}
```

---

### POST /courses/:id/materials
Upload new material (multipart/form-data).

**Request:**
- `file`: File (required, max 50MB, allowed: pdf, doc, docx, ppt, pptx, jpg, png)
- `title`: string (required)
- `description`: string (optional)
- `tags`: string[] (required)

**Response** (201 Created):
```json
{
  "material": {
    "id": 125,
    "title": "Binary Search Trees",
    // ... full Material object
  }
}
```

---

### GET /materials/:id
Get detailed information about a material.

**Response** (200 OK):
```json
{
  "id": 101,
  "title": "Introduction to Binary Trees",
  // ... Material fields
  "comments": [
    {
      "id": 1,
      "body": "Really helpful notes!",
      "user": {
        "id": 2,
        "name": "Priya S",
        "avatar": "https://..."
      },
      "created_at": "2025-10-16T09:15:00Z"
    }
  ]
}
```

---

### POST /materials/:id/upvote
Toggle upvote on a material.

**Response** (200 OK):
```json
{
  "upvotes": 46,
  "user_voted": true
}
```

---

### GET /materials/:id/download
Download material file (increments download count).

**Response**: File stream with appropriate Content-Type header

---

### POST /materials/:id/comments
Add comment to material.

**Request:**
```json
{
  "body": "string (required)"
}
```

**Response** (201 Created):
```json
{
  "comment": {
    "id": 15,
    "body": "Great notes!",
    "user": { ... },
    "created_at": "2025-10-19T10:30:00Z"
  }
}
```

---

## Forum Endpoints

### GET /courses/:id/forum
Get paginated forum threads for a course.

**Query Parameters:**
- `filter`: "all" | "unanswered" | "solved" (optional, default "all")
- `page`: number (optional, default 1)
- `limit`: number (optional, default 20)

**Response** (200 OK):
```json
{
  "items": [
    {
      "id": 201,
      "title": "How to implement binary search tree?",
      "body": "I'm having trouble with...",
      "user": {
        "id": 3,
        "name": "Ananya R",
        "avatar": "https://..."
      },
      "tags": ["Binary Trees", "Help"],
      "answers_count": 3,
      "accepted": true,
      "created_at": "2025-10-18T11:20:00Z",
      "course_id": 301
    }
  ],
  "page": 1,
  "totalPages": 3,
  "totalItems": 52
}
```

---

### POST /courses/:id/forum
Create new forum thread.

**Request:**
```json
{
  "title": "string (required)",
  "body": "string (required)",
  "tags": ["string"] (required)
}
```

**Response** (201 Created):
```json
{
  "thread": {
    "id": 210,
    // ... full ForumThread object
  }
}
```

---

### GET /forum/:threadId
Get thread with all replies.

**Response** (200 OK):
```json
{
  "id": 201,
  "title": "How to implement binary search tree?",
  // ... ForumThread fields
  "replies": [
    {
      "id": 301,
      "body": "You can start by defining a Node class...",
      "user": {
        "id": 1,
        "name": "Rakks Kumar",
        "avatar": "https://..."
      },
      "created_at": "2025-10-18T12:00:00Z",
      "is_accepted": true
    }
  ]
}
```

---

### POST /forum/:threadId/reply
Add reply to thread.

**Request:**
```json
{
  "body": "string (required)"
}
```

**Response** (201 Created):
```json
{
  "reply": {
    "id": 305,
    // ... full ForumReply object
  }
}
```

---

### POST /forum/replies/:replyId/accept
Mark reply as accepted answer (only thread author).

**Response** (200 OK):
```json
{
  "accepted": true
}
```

---

## Quiz Endpoints

### GET /courses/:id/quizzes
Get quizzes for a course.

**Response** (200 OK):
```json
{
  "items": [
    {
      "id": 301,
      "title": "ML Basics - Week 1 Quiz",
      "description": "Test your understanding...",
      "creator": {
        "id": 1,
        "name": "Rakks Kumar",
        "avatar": "https://..."
      },
      "questions": [
        {
          "id": 1,
          "question": "Which algorithm is supervised?",
          "options": ["K-Means", "Linear Regression", "PCA", "DBSCAN"],
          "correct_answer": 1
        }
      ],
      "attempts": 47,
      "avg_score": 78,
      "course_id": 401,
      "created_at": "2025-10-10T10:00:00Z"
    }
  ],
  "page": 1,
  "totalPages": 2,
  "totalItems": 15
}
```

---

### POST /courses/:id/quizzes
Create new quiz.

**Request:**
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "questions": [
    {
      "question": "string (required)",
      "options": ["string", "string", "string", "string"] (required, 4 options),
      "correct_answer": 0-3 (required)
    }
  ] (required, min 1 question)
}
```

**Response** (201 Created):
```json
{
  "quiz": {
    "id": 310,
    // ... full Quiz object
  }
}
```

---

### GET /quizzes/:id
Get quiz details (includes questions without correct answers until submitted).

**Response** (200 OK):
```json
{
  "id": 301,
  "title": "ML Basics - Week 1 Quiz",
  // ... Quiz fields without correct_answer in questions
}
```

---

### POST /quizzes/:id/attempt
Submit quiz attempt.

**Request:**
```json
{
  "answers": [1, 2, 0, 3] (array of selected option indices)
}
```

**Response** (200 OK):
```json
{
  "score": 75,
  "total": 4,
  "correct_answers": [1, 2, 0, 1]
}
```

---

### GET /quizzes/:id/leaderboard
Get quiz leaderboard.

**Query Parameters:**
- `limit`: number (optional, default 10)

**Response** (200 OK):
```json
{
  "entries": [
    {
      "user": {
        "id": 5,
        "name": "Priya S",
        "avatar": "https://..."
      },
      "score": 100,
      "completed_at": "2025-10-15T14:20:00Z"
    }
  ]
}
```

---

## Search Endpoints

### GET /search
Global search across materials, courses, posts, and people.

**Query Parameters:**
- `q`: string (required)
- `type`: "all" | "materials" | "courses" | "posts" | "people" (optional, default "all")
- `page`: number (optional, default 1)

**Response** (200 OK):
```json
{
  "materials": [/* Material objects */],
  "courses": [/* Course objects */],
  "posts": [/* ForumThread objects */],
  "people": [/* User objects */]
}
```

---

### GET /search/suggestions
Get search suggestions (debounced, 250ms).

**Query Parameters:**
- `q`: string (required, min 2 characters)

**Response** (200 OK):
```json
{
  "suggestions": [
    {
      "type": "material",
      "label": "Data Structures Notes",
      "id": 101,
      "meta": "CS301"
    },
    {
      "type": "course",
      "label": "Machine Learning",
      "id": 401,
      "meta": "Prof. Sharma"
    }
  ]
}
```

---

## Profile Endpoints

### GET /profile/:userId
Get public profile information.

**Response** (200 OK):
```json
{
  "id": 1,
  "name": "Rakks Kumar",
  "email": "rakks@sona.ac.in",
  "avatar": "https://...",
  "bio": "CS student passionate about algorithms",
  "role": "student",
  "stats": {
    "uploads": 12,
    "answers": 34,
    "quizzes": 5
  },
  "materials": [/* User's uploaded materials */],
  "posts": [/* User's forum posts */],
  "courses": [/* Joined courses */]
}
```

---

### PUT /profile
Update own profile (multipart/form-data).

**Request:**
- `name`: string (optional)
- `bio`: string (optional)
- `avatar`: File (optional, max 2MB)

**Response** (200 OK):
```json
{
  "user": {
    // ... updated User object
  }
}
```

---

## Notification Endpoints

### GET /notifications
Get user's notifications.

**Query Parameters:**
- `filter`: "all" | "unread" (optional, default "all")
- `page`: number (optional, default 1)
- `limit`: number (optional, default 20)

**Response** (200 OK):
```json
{
  "items": [
    {
      "id": 1,
      "type": "reply",
      "body": "Rakks replied to your question in Control Systems",
      "link": "/courses/301/forum/201",
      "isRead": false,
      "created_at": "2025-10-19T09:30:00Z"
    }
  ],
  "page": 1,
  "totalPages": 2,
  "totalItems": 25
}
```

---

### PUT /notifications/:id/read
Mark notification as read.

**Response** (200 OK):
```json
{
  "success": true
}
```

---

### PUT /notifications/read-all
Mark all notifications as read.

**Response** (200 OK):
```json
{
  "success": true
}
```

---

### DELETE /notifications/:id
Delete notification.

**Response** (200 OK):
```json
{
  "success": true
}
```

---

## Settings Endpoints

### PUT /settings/password
Change password.

**Request:**
```json
{
  "current_password": "string (required)",
  "new_password": "string (required, min 6 characters)"
}
```

**Response** (200 OK):
```json
{
  "message": "Password changed successfully"
}
```

---

### PUT /settings/notifications
Update notification preferences.

**Request:**
```json
{
  "email_notifications": "boolean",
  "material_uploads": "boolean",
  "forum_replies": "boolean",
  "quiz_challenges": "boolean",
  "weekly_digest": "boolean"
}
```

**Response** (200 OK):
```json
{
  "message": "Preferences updated successfully"
}
```

---

## Admin Endpoints (Development Only)

### POST /admin/seed/users
Seed database with mock users.

**Response** (200 OK):
```json
{
  "message": "50 users created",
  "count": 50
}
```

---

### POST /admin/seed/courses
Seed courses with data.

**Response** (200 OK):
```json
{
  "message": "10 courses created",
  "count": 10
}
```

---

### POST /admin/seed/all
Seed entire database.

**Response** (200 OK):
```json
{
  "message": "Database seeded successfully",
  "users": 50,
  "courses": 10,
  "materials": 100,
  "threads": 50,
  "quizzes": 20
}
```

---

### DELETE /admin/reset
Clear all seed data.

**Response** (200 OK):
```json
{
  "message": "Database reset successfully"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request parameters",
  "details": "Email must end with @sona.ac.in"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

---

## Rate Limiting

- **General endpoints**: 100 requests per minute per user
- **Search endpoints**: 30 requests per minute per user
- **Upload endpoints**: 10 requests per minute per user

Rate limit headers are included in all responses:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Unix timestamp when limit resets
