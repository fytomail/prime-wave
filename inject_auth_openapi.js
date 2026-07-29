const fs = require('fs');
const path = require('path');

const openapiPath = path.join(__dirname, 'lib/api-spec/openapi.yaml');
let content = fs.readFileSync(openapiPath, 'utf8');

const authPaths = `
  # ─── AUTH ───────────────────────────────────────────────────────────────
  /auth/register:
    post:
      operationId: register
      tags: [auth]
      summary: Register new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name: { type: string }
                email: { type: string }
                password: { type: string }
                role: { type: string }
      responses:
        "200":
          description: Registration successful
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AuthResponse"

  /auth/login:
    post:
      operationId: login
      tags: [auth]
      summary: Login with email/password
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email: { type: string }
                password: { type: string }
      responses:
        "200":
          description: Login successful
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AuthResponse"

  /auth/logout:
    post:
      operationId: logout
      tags: [auth]
      summary: Logout
      responses:
        "200":
          description: Logout successful

  /auth/refresh-token:
    post:
      operationId: refreshToken
      tags: [auth]
      summary: Refresh token
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                refreshToken: { type: string }
      responses:
        "200":
          description: Token refreshed
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AuthResponse"

  /auth/profile:
    get:
      operationId: getProfile
      tags: [auth]
      summary: Get user profile
      responses:
        "200":
          description: Profile retrieved
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AuthResponse"

  /auth/verify-token:
    get:
      operationId: verifyToken
      tags: [auth]
      summary: Verify access token
      responses:
        "200":
          description: Token is valid

`;

const authSchemas = `
    User:
      type: object
      properties:
        _id: { type: string }
        name: { type: string }
        username: { type: string }
        email: { type: string }
        role: { type: string }
        defaultPortal: { type: string }
        isEmailVerified: { type: boolean }

    Tokens:
      type: object
      properties:
        accessToken: { type: string }
        refreshToken: { type: string }

    AuthResponse:
      type: object
      properties:
        success: { type: boolean }
        message: { type: string }
        data:
          type: object
          properties:
            user: { $ref: "#/components/schemas/User" }
            student: { $ref: "#/components/schemas/Student" }
            tokens: { $ref: "#/components/schemas/Tokens" }

    ErrorResponse:
      type: object
      properties:
        status: { type: string }
        error:
          type: object
          properties:
            statusCode: { type: number }
            message: { type: string }
`;

// Insert authPaths right after "paths:"
content = content.replace('paths:\n', 'paths:\n' + authPaths);

// Insert authSchemas right after "schemas:"
content = content.replace('schemas:\n', 'schemas:\n' + authSchemas);

fs.writeFileSync(openapiPath, content, 'utf8');
console.log('Successfully injected auth paths and schemas.');
