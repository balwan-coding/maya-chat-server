export const MESSAGE = Object.freeze({
  /* ================== GENERAL ================== */
  SUCCESS: "Success",
  FAILED: "Failed",
  SOMETHING_WENT_WRONG: "Something went wrong",
  INTERNAL_SERVER_ERROR: "Internal server error",
  NOT_FOUND: "Data not found",

  /* ================== AUTH ================== */
  LOGIN_SUCCESS: "Login successful",
  LOGIN_FAILED: "Invalid email or password",
  LOGOUT_SUCCESS: "Logout successful",
  REGISTER_SUCCESS: "Registration successful",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Access forbidden",
  TOKEN_MISSING: "Authorization token missing",
  TOKEN_INVALID: "Invalid or expired token",

  /* ================== USER ================== */
  USER_CREATED: "User created successfully",
  USER_UPDATED: "User updated successfully",
  USER_DELETED: "User deleted successfully",
  USER_NOT_FOUND: "User not found",
  USER_ALREADY_EXISTS: "User already exists",
  PROFILE_FETCHED: "Profile fetched successfully",

  /* ================== VALIDATION ================== */
  VALIDATION_ERROR: "Validation error",
  REQUIRED_FIELDS_MISSING: "Required fields are missing",
  INVALID_REQUEST: "Invalid request data",

  /* ================== DATABASE ================== */
  DATA_FETCHED: "Data fetched successfully",
  DATA_CREATED: "Data created successfully",
  DATA_UPDATED: "Data updated successfully",
  DATA_DELETED: "Data deleted successfully",
  DATABASE_ERROR: "Database operation failed",

  /* ================== CHAT / MESSAGE ================== */
  CHAT_CREATED: "Chat created successfully",
  CHAT_FETCHED: "Chat fetched successfully",
  CHAT_NOT_FOUND: "Chat not found",

  MESSAGE_SENT: "Message sent successfully",
  MESSAGE_FETCHED: "Messages fetched successfully",
  MESSAGE_DELETED: "Message deleted successfully",

  /* ================== FILE / UPLOAD ================== */
  FILE_UPLOADED: "File uploaded successfully",
  FILE_DELETED: "File deleted successfully",
  FILE_TYPE_NOT_ALLOWED: "File type not allowed",
  FILE_TOO_LARGE: "File size exceeds limit",

  /* ================== PERMISSION ================== */
  ACCESS_DENIED: "Access denied",
});
