const fs = require('fs');
const path = require('path');

// Complete OpenAPI 3.0/3.1 Swagger Spec for Prime Wave API
const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Prime Wave API Specification",
    version: "1.0.0",
    description: "Complete REST API documentation for Prime Wave Platform (Student Roadmap, 32 Assignments, Certificates, Feedback, Company Portal, Access Control, and Admin Portal)."
  },
  servers: [
    {
      url: "https://api.meetkishore.in/api/v1",
      description: "Production API Server"
    },
    {
      url: "http://localhost:5000/api/v1",
      description: "Local Development API Server"
    }
  ],
  paths: {
    "/student/certificates": {
      get: {
        tags: ["Certificates"],
        summary: "Get student semester certificates",
        description: "Retrieves all verified semester completion certificates with student name, title, issue date, and credit scores.",
        responses: {
          "200": {
            description: "Successful response returning verified certificates list.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          certificateId: { type: "string", example: "PW-CERT-SEM1-84921" },
                          semesterNumber: { type: "integer", example: 1 },
                          title: { type: "string", example: "AI Development Foundations" },
                          studentName: { type: "string", example: "Santhosh M" },
                          creditScore: { type: "integer", example: 180 },
                          issueDate: { type: "string", example: "2026-08-03" },
                          verified: { type: "boolean", example: true }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/student/credits/summary": {
      get: {
        tags: ["Certificates"],
        summary: "Get student total earned credits summary",
        description: "Returns total credit score calculation across topic completions (+20 CR), assignments (+50 CR), and flagship projects (+100 CR).",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        studentName: { type: "string", example: "Santhosh M" },
                        totalCredits: { type: "integer", example: 800 },
                        completedTopics: { type: "integer", example: 15 },
                        completedAssignments: { type: "integer", example: 4 },
                        completedProjects: { type: "integer", example: 3 },
                        ppsScore: { type: "number", example: 98 }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/student/feedback": {
      post: {
        tags: ["Feedback"],
        summary: "Submit student platform review and feedback",
        description: "Submits student service review and rating (1-5 stars) to the Admin Portal.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["studentName", "universityName", "description", "rating"],
                properties: {
                  studentName: { type: "string", example: "Santhosh M" },
                  universityName: { type: "string", example: "Anna University" },
                  description: { type: "string", example: "The AI Vibe Coding roadmap and interactive chatbot are outstanding!" },
                  rating: { type: "integer", example: 5 },
                  category: { type: "string", example: "Learning Roadmap" }
                }
              }
            }
          },
          responses: {
            "201": {
              description: "Feedback created successfully and sent to admin portal."
            }
          }
        },
        get: {
          tags: ["Feedback"],
          summary: "Get student submitted feedbacks",
          responses: {
            "200": { description: "Returns list of submitted feedbacks" }
          }
        }
      }
    },
    "/admin/feedback": {
      get: {
        tags: ["Admin"],
        summary: "Get all student feedbacks for Admin Portal",
        description: "Admin endpoint to review student feedback submissions, star ratings, and review status.",
        responses: {
          "200": { description: "List of student feedbacks for admin review" }
        }
      }
    },
    "/admin/companies": {
      get: {
        tags: ["Admin"],
        summary: "List all partner companies & portal access status",
        responses: {
          "200": { description: "Returns list of authorized partner companies" }
        }
      }
    },
    "/admin/companies/access": {
      post: {
        tags: ["Admin"],
        summary: "Grant company portal access by authorized email",
        description: "Only Admin can grant company portal access to authorized recruiter email IDs.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email"],
                properties: {
                  name: { type: "string", example: "Google Inc." },
                  email: { type: "string", example: "hr@google.com" },
                  industry: { type: "string", example: "AI & Cloud Infrastructure" },
                  location: { type: "string", example: "Mountain View, CA / Remote" }
                }
              }
            }
          }
        },
        responses: {
          "201": { description: "Company portal access granted successfully." }
        }
      }
    },
    "/admin/companies/{id}/access": {
      patch: {
        tags: ["Admin"],
        summary: "Toggle or revoke company portal access permission",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  accessGranted: { type: "boolean", example: false }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Company access state updated." }
        }
      }
    },
    "/roadmap/curriculum": {
      get: {
        tags: ["Roadmap"],
        summary: "Get 8-Semester Curriculum structure",
        responses: { "200": { description: "Full 8-semester curriculum data" } }
      }
    },
    "/roadmap/topic/complete": {
      post: {
        tags: ["Roadmap"],
        summary: "Complete topic and unlock next item",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  semesterNumber: { type: "integer", example: 1 },
                  moduleId: { type: "string", example: "mod-1-1" },
                  topicId: { type: "string", example: "top-1-1-1" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Topic completed (+20 CR)" } }
      }
    },
    "/assignments": {
      get: {
        tags: ["Assignments"],
        summary: "Get 32 practical assignments across 8 semesters",
        responses: { "200": { description: "List of 32 assignments" } }
      }
    },
    "/assignments/{id}/submit": {
      post: {
        tags: ["Assignments"],
        summary: "Submit assignment solution for AI evaluation",
        responses: { "200": { description: "Assignment evaluated and (+50 CR) awarded" } }
      }
    },
    "/company/candidates": {
      get: {
        tags: ["Company Portal"],
        summary: "Get candidate pool with PPS scores and skill match",
        responses: { "200": { description: "List of matched student candidates" } }
      }
    },
    "/company/interviews": {
      get: {
        tags: ["Company Portal"],
        summary: "Get scheduled technical interviews",
        responses: { "200": { description: "List of scheduled interview rounds" } }
      }
    },
    "/company/interviews/schedule": {
      post: {
        tags: ["Company Portal"],
        summary: "Schedule new technical interview round",
        responses: { "201": { description: "Interview scheduled" } }
      }
    },
    "/company/analytics": {
      get: {
        tags: ["Company Portal"],
        summary: "Get recruitment analytics KPIs and hiring funnel data",
        responses: { "200": { description: "Recruitment analytics summary" } }
      }
    },
    "/admin/stats": {
      get: {
        tags: ["Admin"],
        summary: "Get platform administrator metrics & statistics",
        responses: { "200": { description: "Platform statistics summary" } }
      }
    }
  }
};

// Write swagger.json in root and lib/api-spec/
const rootSwaggerPath = path.join(__dirname, '../swagger.json');
const specSwaggerPath = path.join(__dirname, '../lib/api-spec/swagger.json');

fs.writeFileSync(rootSwaggerPath, JSON.stringify(swaggerSpec, null, 2), 'utf8');
fs.writeFileSync(specSwaggerPath, JSON.stringify(swaggerSpec, null, 2), 'utf8');

console.log('Successfully generated swagger.json specification for https://api.meetkishore.in/api-docs!');
