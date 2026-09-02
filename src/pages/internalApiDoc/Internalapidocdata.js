export const API_BASE_URL = "https://api.qrsmart.com/v1";

export const sections = [
  {
    id: "auth-section",
    label: "Authentication",
    icon: "🔐",
    items: [
      { id: "login",       label: "Login" },
      { id: "register",    label: "Register" },
    //   { id: "oauth-login", label: "OAuth Login" },
    ],
  },
  {
    id: "apikey-section",
    label: "API Keys",
    icon: "🔑",
    items: [
      { id: "generate-api-key", label: "Generate API Key" },
      { id: "list-api-keys",    label: "List API Keys" },
      { id: "revoke-api-key",   label: "Revoke API Key" },
    ],
  },
  {
    id: "qr-section",
    label: "QR Codes",
    icon: "◈",
    items: [
      { id: "create-qr",       label: "Create QR" },
      { id: "get-all-qrs",     label: "Get All QRs" },
      { id: "get-qr-by-id",    label: "Get QR by ID" },
      { id: "update-qr",       label: "Update QR" },
      { id: "delete-qr",       label: "Delete QR" },
      { id: "delete-qr-asset", label: "Delete QR Asset" },
      { id: "redirect-qr",     label: "Redirect QR (Short Link)" },
    ],
  },
//   {
//     id: "bulk-section",
//     label: "Bulk QR",
//     icon: "⊞",
//     items: [
//       { id: "list-bulk-jobs",       label: "List Bulk Jobs" },
//       { id: "get-bulk-by-job-name", label: "Get Bulk by Job Name" },
//       { id: "upload-bulk-excel",    label: "Upload Excel (Bulk Create)" },
//       { id: "delete-bulk",          label: "Delete Bulk QRs" },
//     ],
//   },
  {
    id: "user-section",
    label: "Users",
    icon: "👤",
    items: [
      { id: "get-user-by-id",  label: "Get User by ID" },
      { id: "edit-user",       label: "Edit User" },
      { id: "change-password", label: "Change Password" },
      { id: "delete-user",     label: "Delete User" },
    ],
  },
  {
    id: "media-section",
    label: "Media / Files",
    icon: "🗂",
    items: [
      { id: "get-image",        label: "Get Image File" },
      { id: "get-video",        label: "Get Video File" },
      { id: "get-audio",        label: "Get Audio File" },
      { id: "get-pdf",          label: "Get PDF File" },
      { id: "list-image-names", label: "List Image Names" },
    ],
  },
  {
    id: "misc-section",
    label: "Miscellaneous",
    icon: "⚙",
    items: [
    //   { id: "provide-short-link", label: "Provide Short Link" },
    //   { id: "change-status",      label: "Change QR Status" },
      { id: "buy-paid-plan",      label: "Buy Paid Plan" },
      { id: "buy-trial-plan",     label: "Buy Trial Plan" },
      { id: "contact-query",      label: "Contact Query" },
    ],
  },
];

export const contentMap = {

  // ─── AUTH ───────────────────────────────────────────────────────────────────
  login: {
    title: "Login",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/qr-auth/login/admin",
    description: "Authenticate a user and receive a JWT token.",
    authorization: null,
    requestBody: [
      { name: "email",    type: "string", example: "admin@example.com", required: true,  desc: "Registered email address." },
      { name: "password", type: "string", example: "••••••••",          required: true,  desc: "Account password." },
    ],
    responses: [
      {
        status: 200,
        label: "Success",
        description: "Returns a JWT token on successful authentication.",
        sample: `{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}`,
      },
      {
        status: 401,
        label: "Unauthorized",
        description: "Invalid credentials provided.",
        sample: `{
  "error": "Unauthorized",
  "message": "Invalid email or password."
}`,
      },
    ],
  },

  register: {
    title: "Register",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/qr-auth/register/admin",
    description: "Register a new user account.",
    authorization: null,
    requestBody: [
      { name: "name",     type: "string", example: "Dipesh Sharma",     required: true, desc: "Full name." },
      { name: "email",    type: "string", example: "admin@example.com", required: true, desc: "Email address." },
      { name: "password", type: "string", example: "••••••••",          required: true, desc: "Password (min 8 characters)." },
    ],
    responses: [
      {
        status: 201,
        label: "Created",
        description: "Account created successfully. Returns JWT token.",
        sample: `{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "User Created Successfully"
}`,
      },
      {
        status: 422,
        label: "Validation Error",
        description: "One or more fields failed validation.",
        sample: `{
  "error": "Unprocessable Entity",
  "details": [{ "field": "email", "message": "Already in use." }]
}`,
      },
    ],
  },

  "oauth-login": {
    title: "OAuth Login",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/user/loginViaOauth",
    description: "Authenticate via a third-party OAuth provider (Google, etc.).",
    authorization: null,
    requestBody: [
      { name: "provider", type: "string", example: "google",        required: true, desc: "OAuth provider name." },
      { name: "token",    type: "string", example: "ya29.a0AfH...", required: true, desc: "OAuth access token from the provider." },
    ],
    responses: [
      {
        status: 200,
        label: "Success",
        description: "OAuth authentication successful.",
        sample: `{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}`,
      },
    ],
  },

  // ─── API KEYS ───────────────────────────────────────────────────────────────
  "generate-api-key": {
    title: "Generate API Key",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/api-keys/generate",
    description: "Generate a new API key for programmatic access to QRSmart. Requires an active paid subscription. The full key is returned only once — store it securely in your environment variables. Maximum 5 active keys per account.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    note: "The full API key is shown only once in the response. After that, only the prefix (first 20 characters) is visible in your dashboard. If you lose the key, you must generate a new one.",
    requestBody: [
      { name: "name", type: "string", example: "Production App", required: true, desc: "A label to identify this key in your dashboard (e.g. 'Production App', 'My Website')." },
    ],
    responses: [
      {
        status: 201,
        label: "Created",
        description: "API key generated successfully. Copy the key now — it will not be shown again.",
        sample: `{
  "success": true,
  "data": {
    "_id": "key_abc123",
    "name": "Production App",
    "key": "qrs_live_a8f3k2m9xp10bnz72qqrstuvwxyz1234",
    "prefix": "qrs_live_a8f3k2m9xp",
    "createdAt": "2025-05-04T10:00:00Z"
  }
}`,
      },
      {
        status: 403,
        label: "Forbidden",
        description: "User does not have an active paid subscription.",
        sample: `{
  "success": false,
  "error": {
    "code": "SUBSCRIPTION_REQUIRED",
    "message": "API access requires an active paid subscription.",
    "upgradeUrl": "https://qrsmart.com/plans-and-payments"
  }
}`,
      },
      {
        status: 400,
        label: "Bad Request",
        description: "Maximum active key limit reached.",
        sample: `{
  "success": false,
  "message": "Maximum of 5 active API keys allowed. Revoke an existing key first."
}`,
      },
    ],
  },

  "list-api-keys": {
    title: "List API Keys",
    badge: "GET",
    requestMethod: "GET",
    requestUrl: "/api-keys",
    description: "Returns all API keys for the authenticated user. Full key values are never returned — only the prefix and usage metadata.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{
  "success": true,
  "data": [
    {
      "_id": "key_001",
      "name": "Production App",
      "prefix": "qrs_live_a8f3k2m9xp",
      "isActive": true,
      "dailyRequests": 47,
      "monthlyRequests": 892,
      "lastUsedAt": "2025-05-04T11:45:00Z",
      "createdAt": "2025-04-10T08:22:00Z"
    }
  ]
}`,
      },
    ],
  },

  "revoke-api-key": {
    title: "Revoke API Key",
    badge: "PATCH",
    requestMethod: "PATCH",
    requestUrl: "/api-keys/:id/revoke",
    description: "Permanently deactivates an API key. Any application using this key will immediately lose access. This action cannot be undone — you will need to generate a new key.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "id", type: "string", example: "key_001", required: true, desc: "API key ID (URL param)." },
    ],
    responses: [
      {
        status: 200,
        label: "Revoked",
        sample: `{
  "success": true,
  "message": "API key revoked successfully"
}`,
      },
      {
        status: 404,
        label: "Not Found",
        sample: `{
  "success": false,
  "message": "API key not found"
}`,
      },
    ],
  },

  // ─── QR CODES ───────────────────────────────────────────────────────────────
  "create-qr": {
    title: "Create QR Code",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/qr-index/qr/create",
    description: "Create a new QR code. Accepts multipart/form-data to support image/file uploads along with QR metadata.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    note: "Uses multipart/form-data (postForm). Send file fields as binary and all other fields as form values.",
    requestBody: [
      { name: "name",      type: "string",      example: "Summer Campaign",    required: true,  desc: "Display name for this QR code." },
      { name: "type",      type: "string",      example: "url",                required: true,  desc: "QR type: url, vcard, pdf, image, video, etc." },
      { name: "url",       type: "string",      example: "https://example.com",required: false, desc: "Target URL (required for URL-type QRs)." },
      {
        name: "style", type: "object", example: null, required: false, desc: "QR visual styling options.", properties: [
          { name: "backgroundColor", type: "string", example: "#ffffff",                            required: false, desc: "Background color (hex)." },
          { name: "foregroundColor", type: "string", example: "#000000",                            required: false, desc: "Dot/foreground color (hex)." },
          { name: "logo",            type: "string", example: "https://cdn.example.com/logo.png",   required: false, desc: "Logo URL to embed." },
        ],
      },
      { name: "file",      type: "File",        example: null,                 required: false, desc: "Binary file for media-type QRs (image, pdf, video, audio)." },
      { name: "expiresAt", type: "string|null", example: "2025-12-31T23:59:59Z", required: false, desc: "ISO 8601 expiry datetime. Pass null for no expiry." },
    ],
    responses: [
      {
        status: 201,
        label: "Created",
        description: "QR code created successfully.",
        sample: `{
  "message": "QR Code created successfully",
  "id": "qr_abc123"
}`,
      },
      {
        status: 401,
        label: "Unauthorized",
        description: "Missing or invalid bearer token.",
        sample: `{ "error": "Unauthorized" }`,
      },
    ],
  },

  "get-all-qrs": {
    title: "Get All QR Codes",
    badge: "GET",
    requestMethod: "GET",
    requestUrl: "/qr-index/qr/getAll",
    description: "Retrieve a paginated list of all QR codes for the authenticated user.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "page",      type: "integer", example: 1,         required: false, desc: "Page number (default: 1)." },
      { name: "limit",     type: "integer", example: 20,        required: false, desc: "Results per page (default: 20)." },
      { name: "status",    type: "string",  example: "active",  required: false, desc: "Filter: active | expired | paused." },
      { name: "folder_id", type: "string",  example: "fld_abc", required: false, desc: "Filter by folder ID." },
    ],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{
  "status": "success",
  "total": 142,
  "page": 1,
  "limit": 20,
  "data": []
}`,
      },
    ],
  },

  "get-qr-by-id": {
    title: "Get QR by ID",
    badge: "GET",
    requestMethod: "GET",
    requestUrl: "/qr-index/qr/getById/:id",
    description: "Fetch a single QR code by its ID.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "id", type: "string", example: "qr_abc123", required: true, desc: "QR code ID (URL param)." },
    ],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{
  "status": "success",
  "data": {
    "id": "qr_abc123",
    "name": "Summer Campaign",
    "type": "url",
    "shortCode": "xZ9a2",
    "status": "active",
    "createdAt": "2024-06-01T09:00:00Z"
  }
}`,
      },
      {
        status: 404,
        label: "Not Found",
        sample: `{ "error": "QR code not found." }`,
      },
    ],
  },

  "update-qr": {
    title: "Update QR Code",
    badge: "PUT",
    requestMethod: "PUT",
    requestUrl: "/qr-index/qr/update/:id",
    description: "Update an existing QR code. Accepts multipart/form-data to support file updates.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    note: "Uses multipart/form-data (putForm). Only include fields you want to update.",
    requestBody: [
      { name: "id",        type: "string",      required: true,  desc: "QR code ID (URL param)." },
      { name: "name",      type: "string",      required: false, desc: "Updated display name." },
      { name: "url",       type: "string",      required: false, desc: "Updated target URL." },
      { name: "style",     type: "object",      required: false, desc: "Updated style options." },
      { name: "file",      type: "File",        required: false, desc: "Replacement media file." },
      { name: "expiresAt", type: "string|null", required: false, desc: "Updated expiry date." },
    ],
    responses: [
      {
        status: 200,
        label: "Updated",
        sample: `{ "message": "QR Code updated successfully" }`,
      },
    ],
  },

  "delete-qr": {
    title: "Delete QR Code",
    badge: "DELETE",
    requestMethod: "DELETE",
    requestUrl: "/qr-index/qr/delete/:id",
    description: "Delete a QR code by ID.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "id", type: "string", required: true, desc: "QR code ID (URL param)." },
    ],
    responses: [
      {
        status: 200,
        label: "Deleted",
        sample: `{ "message": "QR Code deleted successfully" }`,
      },
    ],
  },

  "delete-qr-asset": {
    title: "Delete QR Asset",
    badge: "DELETE",
    requestMethod: "DELETE",
    requestUrl: "/qr-index/qr/asset/delete",
    description: "Delete a media asset (image, video, pdf, audio) associated with a QR code.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "qrId",      type: "string", required: true, desc: "QR code ID." },
      { name: "assetType", type: "string", example: "image", required: true, desc: "Asset type: image | video | audio | pdf." },
    ],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{ "message": "Asset deleted successfully" }`,
      },
    ],
  },

  "redirect-qr": {
    title: "Redirect QR (Short Link)",
    badge: "GET",
    requestMethod: "GET",
    requestUrl: "/qr-index/qr/r/:shortCode",
    description: "Resolve a QR short code to its target URL and return redirect metadata.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "shortCode", type: "string", example: "xZ9a2", required: true, desc: "Short code from the QR URL (URL param)." },
    ],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{ "url": "https://example.com/product", "message": "Redirect resolved" }`,
      },
      {
        status: 304,
        label: "Not Modified",
        sample: `{ "url": "https://example.com/product" }`,
      },
    ],
  },

  // ─── BULK QR ────────────────────────────────────────────────────────────────
  "list-bulk-jobs": {
    title: "List Bulk Jobs",
    badge: "GET",
    requestMethod: "GET",
    requestUrl: "/bulkQr/listBulkJobs",
    description: "List all bulk QR creation jobs for the current user.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{
  "data": [
    { "jobName": "batch_june_2024", "total": 50, "status": "completed" }
  ]
}`,
      },
    ],
  },

  "get-bulk-by-job-name": {
    title: "Get Bulk Job by Name",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/bulkQr/byJobName",
    description: "Fetch all QR codes belonging to a specific bulk job.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "jobName", type: "string", example: "batch_june_2024", required: true, desc: "The name of the bulk job to retrieve." },
    ],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{
  "jobName": "batch_june_2024",
  "qrCodes": []
}`,
      },
    ],
  },

  "upload-bulk-excel": {
    title: "Upload Excel (Bulk Create)",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/bulkQr/uploadExcel",
    description: "Upload an Excel (.xlsx) file to bulk-create QR codes. Each row in the spreadsheet represents one QR code.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    note: "Uses multipart/form-data (postForm). Send the .xlsx file as a binary field.",
    requestBody: [
      { name: "file",    type: "File (.xlsx)", required: true,  desc: "Excel spreadsheet with QR data rows." },
      { name: "jobName", type: "string",        required: false, desc: "Optional label for this bulk job." },
    ],
    responses: [
      {
        status: 200,
        label: "Queued",
        sample: `{ "message": "Bulk job queued successfully", "jobName": "batch_june_2024" }`,
      },
    ],
  },

  "delete-bulk": {
    title: "Delete Bulk QRs",
    badge: "DELETE",
    requestMethod: "DELETE",
    requestUrl: "/bulkQr/delete",
    description: "Delete multiple QR codes from a bulk job.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "ids", type: "array of string", example: '["qr_1","qr_2"]', required: true, desc: "Array of QR code IDs to delete." },
    ],
    responses: [
      {
        status: 200,
        label: "Deleted",
        sample: `{ "deleted": 2, "message": "QRs deleted" }`,
      },
    ],
  },

  // ─── USERS ──────────────────────────────────────────────────────────────────
  "get-user-by-id": {
    title: "Get User by ID",
    badge: "GET",
    requestMethod: "GET",
    requestUrl: "/qr-user/getById/:id",
    description: "Fetch a single user profile by their ID.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "id", type: "string", required: true, desc: "User ID (URL param)." },
    ],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{
  "id": "usr_1",
  "name": "Dipesh Sharma",
  "email": "dipesh@example.com",
  "paidPlan": true
}`,
      },
    ],
  },

  "edit-user": {
    title: "Edit User",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/qr-user/edit/:id",
    description: "Update user profile details.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "id",    type: "string", required: true,  desc: "User ID (URL param)." },
      { name: "name",  type: "string", required: false, desc: "Updated full name." },
      { name: "email", type: "string", required: false, desc: "Updated email address." },
    ],
    responses: [
      {
        status: 200,
        label: "Updated",
        sample: `{ "message": "User updated successfully" }`,
      },
    ],
  },

  "change-password": {
    title: "Change Password",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/qr-user/change-password/:id",
    description: "Update password for a specific user.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "id",              type: "string", required: true, desc: "User ID (URL param)." },
      { name: "currentPassword", type: "string", required: true, desc: "Current password for verification." },
      { name: "newPassword",     type: "string", required: true, desc: "New password (min 8 characters)." },
    ],
    responses: [
      {
        status: 200,
        label: "Updated",
        sample: `{ "message": "Password changed successfully" }`,
      },
      {
        status: 401,
        label: "Unauthorized",
        sample: `{ "error": "Current password is incorrect." }`,
      },
    ],
  },

  "delete-user": {
    title: "Delete User",
    badge: "DELETE",
    requestMethod: "DELETE",
    requestUrl: "/qr-user/delete/:id",
    description: "Delete a user account. Admin-only operation.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "id", type: "string", required: true, desc: "User ID (URL param)." },
    ],
    responses: [
      {
        status: 200,
        label: "Deleted",
        sample: `{ "message": "User deleted successfully" }`,
      },
    ],
  },

  // ─── MEDIA ──────────────────────────────────────────────────────────────────
  "get-image": {
    title: "Get Image File",
    badge: "GET",
    requestMethod: "GET",
    requestUrl: "/qr-index/files/images/:imageName",
    description: "Stream or retrieve an image file by name. Returns a binary Blob.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    note: "Response type is blob. Handle the returned Blob on the client side to display or download the image.",
    requestBody: [
      { name: "imageName", type: "string", required: true, desc: "Image filename (URL param)." },
    ],
    responses: [
      { status: 200, label: "Blob", description: "Returns raw image binary (blob).", sample: `<binary image data>` },
    ],
  },

  "get-video": {
    title: "Get Video File",
    badge: "GET",
    requestMethod: "GET",
    requestUrl: "/qr-index/files/videos/:fileName",
    description: "Stream a video file by filename.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "fileName", type: "string", required: true, desc: "Video filename (URL param)." },
    ],
    responses: [
      { status: 200, label: "Blob", description: "Returns raw video binary.", sample: `<binary video data>` },
    ],
  },

  "get-audio": {
    title: "Get Audio File",
    badge: "GET",
    requestMethod: "GET",
    requestUrl: "/qr-index/files/audios/:fileName",
    description: "Retrieve an audio file by filename.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "fileName", type: "string", required: true, desc: "Audio filename (URL param)." },
    ],
    responses: [
      { status: 200, label: "Blob", description: "Returns raw audio binary.", sample: `<binary audio data>` },
    ],
  },

  "get-pdf": {
    title: "Get PDF File",
    badge: "GET",
    requestMethod: "GET",
    requestUrl: "/qr-index/files/pdfs/:imageName",
    description: "Retrieve a PDF file by name.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    note: "Response type is blob.",
    requestBody: [
      { name: "imageName", type: "string", required: true, desc: "PDF filename (URL param)." },
    ],
    responses: [
      { status: 200, label: "Blob", description: "Returns raw PDF binary.", sample: `<binary pdf data>` },
    ],
  },

  "list-image-names": {
    title: "List Image Names",
    badge: "GET",
    requestMethod: "GET",
    requestUrl: "/new/listImageNames/:id",
    description: "List all image filenames associated with a QR code ID.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "id", type: "string", required: true, desc: "QR code ID (URL param)." },
    ],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{
  "images": ["img_001.jpg", "img_002.png"]
}`,
      },
    ],
  },

  // ─── MISC ───────────────────────────────────────────────────────────────────
  "provide-short-link": {
    title: "Provide Short Link",
    badge: "GET",
    requestMethod: "GET",
    requestUrl: "/new/provideShortLink",
    description: "Generate or retrieve an available short-link token.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{ "shortLink": "xZ9a2" }`,
      },
    ],
  },

  "change-status": {
    title: "Change QR Status",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/new/changeStatus",
    description: "Toggle a QR code's status between active, paused, and expired.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "id",     type: "string", required: true, desc: "QR code ID." },
      { name: "status", type: "string", example: "paused", required: true, desc: "New status: active | paused | expired." },
    ],
    responses: [
      {
        status: 200,
        label: "Updated",
        sample: `{ "message": "Status updated successfully" }`,
      },
    ],
  },

  "buy-paid-plan": {
    title: "Buy Paid Plan",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/user/buyPaidPlan",
    description: "Initiate purchase of a paid subscription plan.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "planId",       type: "string", required: true, desc: "ID of the plan to purchase." },
      { name: "paymentToken", type: "string", required: true, desc: "Payment gateway token." },
    ],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{ "message": "Plan activated", "paidPlan": true }`,
      },
    ],
  },

  "buy-trial-plan": {
    title: "Buy Trial Plan",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/user/buyTrialPlan",
    description: "Activate a free trial plan for the user.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    requestBody: [
      { name: "planId", type: "string", required: true, desc: "Trial plan ID." },
    ],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{ "message": "Trial activated", "trialPlanUsed": true }`,
      },
    ],
  },

  "contact-query": {
    title: "Contact Query",
    badge: "POST",
    requestMethod: "POST",
    requestUrl: "/contact/query/add",
    description: "Submit a contact or support query. Accepts multipart/form-data.",
    authorization: { name: "BearerAuth", headerParam: "Authorization", type: "Bearer Token (JWT)" },
    note: "Uses multipart/form-data (postForm). Attachment is optional.",
    requestBody: [
      { name: "name",       type: "string", required: true,  desc: "Sender name." },
      { name: "email",      type: "string", required: true,  desc: "Contact email." },
      { name: "message",    type: "string", required: true,  desc: "Query message." },
      { name: "attachment", type: "File",   required: false, desc: "Optional file attachment." },
    ],
    responses: [
      {
        status: 200,
        label: "Success",
        sample: `{ "message": "Query submitted successfully" }`,
      },
      {
        status: 201,
        label: "Created",
        sample: `{ "message": "Query created and logged" }`,
      },
    ],
  },
};