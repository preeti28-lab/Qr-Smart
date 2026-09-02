export const API_BASE_URL = "https://api.yourservice.com/v1";

export const sections = [
    {
        id: "qr-section",
        label: "QR Section",
        icon: "◈",
        items: [
            { id: "qr", label: "QR" },
            { id: "bulk-create", label: "Bulk create" },
            { id: "bulk-edit", label: "Bulk edit" },
            { id: "list-qrs", label: "List QRs" },
            { id: "get-a-qr", label: "Get a QR" },
            { id: "update-a-qr", label: "Update a QR" },
            { id: "duplicate-a-qr", label: "Duplicate a QR" },
            { id: "generate-qr-image", label: "Generate QR image" },
            { id: "retrieve-qr-image", label: "Retrieve a QR image" },
            { id: "batch-delete", label: "Batch delete" },
            { id: "analysis-report", label: "Analysis report" },
        ],
    },
    {
        id: "folder-section",
        label: "Folder Section",
        icon: "◫",
        items: [
            { id: "folder", label: "Folder" },
            { id: "create-folder", label: "Create a new folder" },
            { id: "get-folders-list", label: "Get folders list" },
        ],
    },
    {
        id: "faq-section",
        label: "FAQ Section",
        icon: "◉",
        items: [{ id: "faq", label: "FAQ" }],
    },
];

export const contentMap = {
    qr: {
        title: "QR Code",
        badge: "Overview",
        description:
            "The QR Code API allows you to programmatically create, manage, and track QR codes for your application. All endpoints require authentication via your API key.",
        authNote: "All requests must include your API key in the Authorization header.",
        details: [
            {
                label: "Base URL",
                value: `${API_BASE_URL}`,
                code: true,
            },
            {
                label: "Authentication",
                value: "Bearer Token (API Key)",
            },
            {
                label: "Content-Type",
                value: "application/json",
                code: true,
            },
        ],
        example: {
            lang: "bash",
            code: `curl -X GET "${API_BASE_URL}/qr" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
        },
        response: `{
  "status": "success",
  "version": "1.0",
  "docs": "${API_BASE_URL}/docs"
}`,
    },

    "bulk-create": {
        title: "Bulk Create",
        badge: "POST",
        requestMethod: "POST",
        requestUrl: "/api/public/qrs",
        authorization: {
            name: "ApiKeyAuth",
            headerParam: "API-KEY",
        },
        requestBody: [
            {
                name: "style",
                type: "object",
                example: null,
                required: false,
                desc: "Style applied to all QR codes in this batch.",
                properties: [
                    { name: "backgroundColor", type: "string", example: "#ffffff", required: false, desc: "Background color of the QR code (hex)." },
                    { name: "foregroundColor", type: "string", example: "#000000", required: false, desc: "Foreground/dot color of the QR code (hex)." },
                    { name: "logo", type: "string", example: "https://cdn.example.com/logo.png", required: false, desc: "URL of a logo image to embed in the center." },
                    { name: "frame", type: "string", example: "rounded", required: false, desc: "Frame style: none, rounded, square." },
                    { name: "errorCorrection", type: "string", example: "M", required: false, desc: "Error correction level: L, M, Q, or H." },
                ],
            },
            {
                name: "folder",
                type: "integer | null",
                example: 1,
                required: false,
                desc: "Folder ID. Assign a user folder to all QR codes in this batch.",
            },
            {
                name: "qrs",
                type: "array of object",
                example: null,
                required: true,
                desc: "Array of QR code objects to create. Each object defines an individual QR code.",
                properties: [
                    { name: "name", type: "string", example: "Product A", required: true, desc: "Display name for the QR code." },
                    { name: "url", type: "string", example: "https://example.com/product-a", required: true, desc: "The target URL this QR code will redirect to." },
                    { name: "expiresAt", type: "string | null", example: "2025-12-31T23:59:59Z", required: false, desc: "ISO 8601 expiry datetime. Leave null for no expiry." },
                    { name: "tags", type: "array of string", example: "sale, q3", required: false, desc: "Labels for organizing and filtering QR codes." },
                    {
                        name: "style",
                        type: "object",
                        example: null,
                        required: false,
                        desc: "Per-QR style override. Takes precedence over the top-level style.",
                        properties: [
                            { name: "backgroundColor", type: "string", example: "#ffffff", required: false, desc: "Background color override." },
                            { name: "foregroundColor", type: "string", example: "#1a1a2e", required: false, desc: "Foreground color override." },
                        ],
                    },
                ],
            },
        ],
        example: {
            lang: "bash",
            code: `curl -X POST "https://api.yourservice.com/api/public/qrs" \\
  -H "API-KEY: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "style": {
      "backgroundColor": "#ffffff",
      "foregroundColor": "#000000",
      "errorCorrection": "M"
    },
    "folder": 1,
    "qrs": [
      {
        "name": "Product A",
        "url": "https://example.com/product-a",
        "tags": ["sale", "q3"]
      },
      {
        "name": "Product B",
        "url": "https://example.com/product-b",
        "expiresAt": "2025-12-31T23:59:59Z"
      }
    ]
  }'`,
        },
        responseSample: {
            lang: "bash",
            code: `{

  "ids": [

    1,

    2,

    3,

    4

  ]

}

'`,
        },
        responses: [
            {
                status: 200,
                label: "Created",
                description: "QR codes were created successfully. Returns the IDs of the newly created QR codes.",
                sample: `{
  "ids": [
    1,
    2,
    3,
    4
  ]
}`,
            },
            {
                status: 401,
                label: "Validation Failed",
                description: "Missing or invalid API key. Ensure the API-KEY header is set correctly.",
                sample: `{
  "error": "Unauthorized",
  "message": "Invalid or missing API key."
}`,
            },
            {
                status: 422,
                label: "Invalid API Key",
                description: "One or more request body fields failed validation.",
                sample: `{
  "error": "Unprocessable Entity",
  "details": [
    {
      "field": "qrs[0].url",
      "message": "Must be a valid URL."
    }
  ]
}`,
            },
            {
                status: 404,
                label: "Not Found",
                description: "One or more request body fields failed validation.",
                sample: `{
  "error": "Unprocessable Entity",
  "details": [
    {
      "field": "qrs[0].url",
      "message": "Must be a valid URL."
    }
  ]
}`,
            },
        ],
    },

    "bulk-edit": {
        title: "Bulk Edit QRs",
        badge: "PATCH",
        badgeColor: "yellow",
        endpoint: "/qr/bulk",
        description:
            "Update multiple QR codes simultaneously. You can modify URLs, names, folders, or expiry dates for up to 1000 QR codes in one call.",
        params: [
            { name: "ids", type: "array", required: true, desc: "Array of QR code IDs to update." },
            { name: "updates", type: "object", required: true, desc: "Fields to update across all specified QRs." },
            { name: "updates.url", type: "string", required: false, desc: "New target URL." },
            { name: "updates.folder_id", type: "string", required: false, desc: "Move QRs to this folder ID." },
            { name: "updates.expires_at", type: "string", required: false, desc: "New expiry date in ISO 8601 format." },
        ],
        example: {
            lang: "json",
            code: `PATCH ${API_BASE_URL}/qr/bulk
Authorization: Bearer YOUR_API_KEY

{
  "ids": ["qr_1a2b3c", "qr_4d5e6f"],
  "updates": {
    "folder_id": "fld_new456",
    "expires_at": "2025-06-30T23:59:59Z"
  }
}`,
        },
        response: `{
  "status": "success",
  "updated": 2,
  "failed": 0
}`,
    },

    "list-qrs": {
        title: "List QR Codes",
        badge: "GET",
        requestMethod: "GET",
        requestUrl: "/qr",
        authorization: {
            name: "ApiKeyAuth",
            headerParam: "Authorization",
        },
        requestBody: [
            { name: "page", type: "integer", required: false, desc: "Page number." },
            { name: "limit", type: "integer", required: false, desc: "Results per page." },
            { name: "folder_id", type: "string", required: false, desc: "Filter by folder." },
            { name: "status", type: "string", required: false, desc: "active | expired | paused" },
            { name: "created_after", type: "string", required: false, desc: "ISO 8601 date." },
        ],
        example: {
            lang: "bash",
            code: `GET /qr?page=1&limit=20&status=active`,
        },
        responses: [
            {
                status: 200,
                label: "Success",
                sample: `{
  "status": "success",
  "total": 142,
  "page": 1,
  "limit": 20
}`,
            },
        ],
    },

    "get-a-qr": {
        title: "Get a QR Code",
        badge: "GET",
        requestMethod: "GET",
        requestUrl: "/qr/:id",
        authorization: {
            name: "ApiKeyAuth",
            headerParam: "Authorization",
        },
        requestBody: [
            { name: "id", type: "string", required: true, desc: "QR ID." },
        ],
        example: {
            lang: "bash",
            code: `GET /qr/qr_1a2b3c`,
        },
        responses: [
            {
                status: 200,
                label: "Success",
                sample: `{
  "status": "success",
  "qr_code": {}
}`,
            },
        ],
    },

    "update-a-qr": {
        title: "Update a QR Code",
        badge: "PUT",
        requestMethod: "PUT",
        requestUrl: "/qr/:id",
        authorization: {
            name: "ApiKeyAuth",
            headerParam: "Authorization",
        },
        requestBody: [
            { name: "id", type: "string", required: true, desc: "QR ID." },
            { name: "name", type: "string", required: false },
            { name: "url", type: "string", required: false },
            { name: "folder_id", type: "string", required: false },
            { name: "expires_at", type: "string", required: false },
            { name: "status", type: "string", required: false },
        ],
        example: {
            lang: "json",
            code: `{
  "name": "Summer Campaign",
  "url": "https://example.com"
}`,
        },
        responses: [
            {
                status: 200,
                label: "Updated",
                sample: `{
  "status": "success"
}`,
            },
        ],
    },

    "duplicate-a-qr": {
        title: "Duplicate a QR Code",
        badge: "POST",
        requestMethod: "POST",
        requestUrl: "/qr/:id/duplicate",
        authorization: {
            name: "ApiKeyAuth",
            headerParam: "Authorization",
        },
        requestBody: [
            { name: "id", type: "string", required: true },
            { name: "name", type: "string", required: false },
            { name: "folder_id", type: "string", required: false },
        ],
        example: {
            lang: "json",
            code: `{
  "name": "Campaign Copy"
}`,
        },
        responses: [
            {
                status: 200,
                label: "Duplicated",
                sample: `{
  "status": "success"
}`,
            },
        ],
    },

    "generate-qr-image": {
        title: "Generate QR Image",
        badge: "POST",
        requestMethod: "POST",
        requestUrl: "/qr/:id/image",
        authorization: {
            name: "ApiKeyAuth",
            headerParam: "Authorization",
        },
        requestBody: [
            { name: "id", type: "string", required: true },
            { name: "format", type: "string", required: false },
            { name: "size", type: "integer", required: false },
            { name: "color", type: "string", required: false },
            { name: "background", type: "string", required: false },
            { name: "logo_url", type: "string", required: false },
        ],
        example: {
            lang: "json",
            code: `{
  "format": "png",
  "size": 1024
}`,
        },
        responses: [
            {
                status: 200,
                label: "Generated",
                sample: `{
  "image_url": "https://..."
}`,
            },
        ],
    },

    "retrieve-qr-image": {
        title: "Retrieve QR Image",
        badge: "GET",
        requestMethod: "GET",
        requestUrl: "/qr/:id/image",
        authorization: {
            name: "ApiKeyAuth",
            headerParam: "Authorization",
        },
        requestBody: [
            { name: "id", type: "string", required: true },
            { name: "format", type: "string", required: false },
        ],
        example: {
            lang: "bash",
            code: `GET /qr/:id/image`,
        },
        responses: [
            {
                status: 200,
                label: "Success",
                sample: `{
  "image_url": "https://..."
}`,
            },
        ],
    },

    "batch-delete": {
        title: "Batch Delete QRs",
        badge: "DELETE",
        requestMethod: "DELETE",
        requestUrl: "/qr/batch",
        authorization: {
            name: "ApiKeyAuth",
            headerParam: "Authorization",
        },
        requestBody: [
            {
                name: "ids",
                type: "array of string",
                required: true,
                desc: "QR IDs to delete.",
            },
        ],
        example: {
            lang: "json",
            code: `{
  "ids": ["qr_1", "qr_2"]
}`,
        },
        responses: [
            {
                status: 200,
                label: "Deleted",
                sample: `{
  "deleted": 2
}`,
            },
        ],
    },

    "analysis-report": {
        title: "Analysis Report",
        badge: "GET",
        requestMethod: "GET",
        requestUrl: "/qr/:id/analytics",
        authorization: {
            name: "ApiKeyAuth",
            headerParam: "Authorization",
        },
        requestBody: [
            { name: "id", type: "string", required: true },
            { name: "start_date", type: "string", required: false },
            { name: "end_date", type: "string", required: false },
            { name: "granularity", type: "string", required: false },
        ],
        example: {
            lang: "bash",
            code: `GET /qr/:id/analytics`,
        },
        responses: [
            {
                status: 200,
                label: "Success",
                sample: `{
  "total_scans": 1240
}`,
            },
        ],
    },

    folder: {
        title: "Folders",
        badge: "Overview",
        description:
            "Folders let you organize your QR codes into logical groups. Each QR code can belong to one folder. Folders can be nested up to 3 levels deep.",
        details: [
            { label: "Base Endpoint", value: `${API_BASE_URL}/folders`, code: true },
            { label: "Max Nesting", value: "3 levels deep" },
            { label: "Max QRs per Folder", value: "10,000" },
        ],
        example: {
            lang: "bash",
            code: `curl -X GET "${API_BASE_URL}/folders" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
        },
        response: `{
  "status": "success",
  "folders": []
}`,
    },

    "create-folder": {
        title: "Create a New Folder",
        badge: "POST",
        badgeColor: "green",
        endpoint: "/folders",
        description: "Create a new folder to organize your QR codes. Optionally nest it inside a parent folder.",
        params: [
            { name: "name", type: "string", required: true, desc: "Name of the new folder." },
            { name: "parent_id", type: "string", required: false, desc: "Parent folder ID for nesting. Omit for root-level." },
            { name: "color", type: "string", required: false, desc: "Hex color code to visually tag the folder." },
        ],
        example: {
            lang: "json",
            code: `POST ${API_BASE_URL}/folders
Authorization: Bearer YOUR_API_KEY

{
  "name": "Marketing Q3",
  "color": "#4f46e5"
}`,
        },
        response: `{
  "status": "success",
  "folder": {
    "id": "fld_abc123",
    "name": "Marketing Q3",
    "parent_id": null,
    "color": "#4f46e5",
    "qr_count": 0,
    "created_at": "2024-06-01T09:00:00Z"
  }
}`,
    },

    "get-folders-list": {
        title: "Get Folders List",
        badge: "GET",
        badgeColor: "blue",
        endpoint: "/folders",
        description: "Retrieve all folders in your account, including nested structure and QR code counts.",
        params: [
            { name: "parent_id", type: "string", required: false, desc: "Filter to get children of a specific folder. Omit for root folders." },
            { name: "include_qr_count", type: "boolean", required: false, desc: "Include the number of QRs in each folder. Default: true." },
        ],
        example: {
            lang: "bash",
            code: `curl -X GET "${API_BASE_URL}/folders?include_qr_count=true" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
        },
        response: `{
  "status": "success",
  "folders": [
    {
      "id": "fld_abc123",
      "name": "Marketing Q3",
      "parent_id": null,
      "color": "#4f46e5",
      "qr_count": 24,
      "children": [
        {
          "id": "fld_def456",
          "name": "Email Campaigns",
          "qr_count": 12
        }
      ]
    }
  ]
}`,
    },

    faq: {
        title: "Frequently Asked Questions",
        badge: "FAQ",
        faqs: [
            {
                q: "What is the maximum number of requests I can make?",
                a: "The maximum number of requests depends on the specific API you are using. When the limit is reached, the API will return a 429 status code.",
            },
            {
                q: "Will I receive identical QR Code designs to those generated manually if I use the API?",
                a: "Yes, you can generate the same QR code designs through both the API and the manual generator.",
            },
            {
                q: "Is the API free to use, or do I have to pay for it?",
                a: "Accessing the API requires a paid subscription. You need to upgrade your account to use it.",
            },
            {
                q: "Where are the QR codes that are generated by the API stored?",
                a: "All QR codes created via the API are saved in your account.",
            },
            {
                q: "Is it possible to remove QR codes with the API?",
                a: "Yes, you can delete a QR code using its corresponding QR ID.",
            },
            {
                q: "Is there any restriction on the number of QRs I can create using the API?",
                a: "Yes, there is a limit on the number of QRs you can create per account, except for static QRs generated using the Generate QR Image API.",
            },
        ],
    },
};