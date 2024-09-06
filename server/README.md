
# Animage API Documentation

## Base URL:
```
http://your-domain.com
```

---

## Endpoints

### 1. Root Endpoint
#### `GET /`
- **Description**: Welcome message
- **Response**: 
  - **Status**: 200
  - **Body**: `{ message: "Hi Fellas" }`

---

### 2. User Authentication

#### 2.1. Register
#### `POST /api/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "your_username",
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Response**:
  - **Status**: 201
  - **Body**:
    ```json
    {
      "id": 1,
      "username": "your_username",
      "email": "user@example.com"
    }
    ```

#### 2.2. Login
#### `POST /api/login`
- **Description**: Logs in the user and returns an access token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Response**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "access_token": "your_access_token"
    }
    ```

#### 2.3. Google Login
#### `POST /api/login/google`
- **Description**: Logs in the user via Google OAuth and returns an access token.
- **Request Body**:
  ```json
  {
    "googleToken": "your_google_token"
  }
  ```
- **Response**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "access_token": "your_access_token"
    }
    ```

---

### 3. Images

#### 3.1. Get All Images
#### `GET /api/images`
- **Description**: Returns a list of all images (requires authentication).
- **Headers**:
  - `Authorization: Bearer <access_token>`
- **Response**:
  - **Status**: 200
  - **Body**:
    ```json
    [
      {
        "id": 1,
        "imgName": "example_image",
        "imgUrl": "http://image.url",
        "prompt": "example prompt",
        "userId": 1,
        "User": {
          "id": 1,
          "username": "user1",
          "email": "user1@example.com"
        }
      },
      ...
    ]
    ```

#### 3.2. Upload Image
#### `POST /api/images`
- **Description**: Uploads an image and generates AI-stylized result (requires authentication).
- **Headers**:
  - `Authorization: Bearer <access_token>`
  - `Content-Type: multipart/form-data`
- **Request Body**:
  - **Multipart Form Data**:
    - `File`: Image file
    - `prompt`: Description of how the AI should style the image.
- **Response**:
  - **Status**: 201
  - **Body**:
    ```json
    {
      "imgName": "example_image",
      "imgUrl": "http://generated.image.url",
      "prompt": "example prompt",
      "userId": 1
    }
    ```

#### 3.3. Get User's Images
#### `GET /api/my-images`
- **Description**: Returns images uploaded by the authenticated user.
- **Headers**:
  - `Authorization: Bearer <access_token>`
- **Response**:
  - **Status**: 200
  - **Body**:
    ```json
    [
      {
        "id": 1,
        "imgName": "example_image",
        "imgUrl": "http://image.url",
        "prompt": "example prompt",
        "userId": 1,
        "User": {
          "id": 1,
          "username": "user1",
          "email": "user1@example.com"
        }
      },
      ...
    ]
    ```

#### 3.4. Get Image by ID
#### `GET /api/images/:id`
- **Description**: Fetches a specific image by ID.
- **Headers**:
  - `Authorization: Bearer <access_token>`
- **Response**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "imgName": "example_image",
      "imgUrl": "http://image.url",
      "prompt": "example prompt",
      "userId": 1
    }
    ```

#### 3.5. Delete Image by ID
#### `DELETE /api/images/:id`
- **Description**: Deletes an image by ID (requires authentication).
- **Headers**:
  - `Authorization: Bearer <access_token>`
- **Response**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "message": "Data id 1 has been deleted!"
    }
    ```

#### 3.6. Edit Image by ID
#### `PUT /api/images/edit/:id`
- **Description**: Edits image details (requires authentication).
- **Headers**:
  - `Authorization: Bearer <access_token>`
- **Request Body**:
  ```json
  {
    "imgName": "new_image_name"
  }
  ```
- **Response**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "imageData": {
        "id": 1,
        "imgName": "new_image_name",
        "imgUrl": "http://image.url",
        "prompt": "example prompt",
        "userId": 1
      }
    }
    ```

#### 3.7. Send Image to Email
#### `POST /api/images/send-mail/:id`
- **Description**: Sends the generated image to the authenticated user's email.
- **Headers**:
  - `Authorization: Bearer <access_token>`
- **Response**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "message": "Email sent successfully with the image attachment."
    }
    ```

---

### 4. User Profile

#### 4.1. Get User Profile
#### `GET /api/userlogin-data/`
- **Description**: Fetches the authenticated user's profile data.
- **Headers**:
  - `Authorization: Bearer <access_token>`
- **Response**:
  - **Status**: 200
  - **Body**:
    ```json
    {
      "username": "user1",
      "email": "user1@example.com"
    }
    ```

---

### Error Handling
All endpoints return proper error responses with corresponding status codes and error messages. Possible errors include:
- `400 Bad Request`: Invalid request data or missing required fields.
- `401 Unauthorized`: Missing or invalid authentication token.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Unexpected server error.

---

### Authentication
The API uses **JWT-based Authentication** for all protected routes. The token must be passed in the `Authorization` header as follows:
```
Authorization: Bearer <access_token>
```

---

### Conclusion
This API allows users to register, log in, and interact with AI-generated images, including uploading, viewing, editing, and sending images via email. Each endpoint requires proper authentication where indicated.
