import { lazy } from "react";

// lazy

// builder
const Builder = lazy(() => import("../app/builder/Builder"));
const Content = lazy(() => import("../app/builder/Content"));
const QRDesign = lazy(() => import("../app/builder/QRDesign"));

// bulk
const Bulk = lazy(() => import("../app/bulk/Bulk"));
const QRBulkDesign = lazy(() => import("../app/bulk/QRBulkDesign"));
const UploadBulkExcel = lazy(() => import("../app/bulk/UploadBulkExcel"));

// qr code
const MyQRCode = lazy(() => import("../app/qrcode/MyQRCode"));
const QRDetails = lazy(() => import("../app/qrcode/QRDetails"));

// payments
const Payments = lazy(() => import("../pages/payments/Payments"));

// stats
const Stats = lazy(() => import("../pages/stats/Stats"));

// templates
const Templates = lazy(() => import("../pages/templates/Templates"));
const CreateTemplate = lazy(() => import("../pages/templates/CreateTemplate"));
const EditTemplate = lazy(() => import ("../pages/templates/EditTemplate"));

// profile
const Profile = lazy(() => import("../pages/profile/Profile"));

// users
const AllUsers = lazy(() => import("../pages/users/AllUsers"));

const panels = [
    {
        path: 'builder',
        children: [
            {
                path: '',
                element: 
                <Builder />,
                meta: {
                    title: 'QR Builder',
                }
            },
            {
                path: 'content',
                element: <Content />,
                meta: {
                    title: 'QR Content',
                }
            },
            {
                path: 'qr-design',
                element: <QRDesign />,
                meta: {
                    title: "QR Design",
                }
            },
        ],
        meta: {
            title: "QR Builder"
        }
    },
    {
        path: 'bulk-qr-code-generator',
        children: [
            {
                path: '',
                element: <Bulk />,
                meta: {
                    title: 'Bulk',
                }
            },
            {
                path: 'qr-design',
                element: <QRBulkDesign />,
                meta: {
                    title: "QR Design",
                }
            },
            {
                path: 'upload',
                element: <UploadBulkExcel />,
                meta: {
                    title: 'Upload Bulk Excel',
                }
            },
        ],
        meta: {
            title: "Bulk"
        }
    },
    {
        path: 'my-qr-codes',
        children: [
            {
                path: '',
                element: <MyQRCode />,
                meta: {
                    title: "My QR Codes",
                }
            },
            {
                path: 'details',
                element: <QRDetails />,
                meta: {
                    title: "QR Code Details",
                }
            }
        ],
        meta: {
            title: "My QR Codes",
        }
    },
    {
        path: 'plans-and-payments',
        element: <Payments />,
        meta: {
            title: 'Plans and payments'
        }
    },
    {
        path: 'stats',
        element: <Stats />,
        meta: {
            title: "Stats",
        }
    },
    {
        path: "templates",
        children: [
            {
                path: '',
                element: <Templates />,
                meta: {
                    title: 'Templates'
                }
            },
            {
                path: 'create',
                element: <CreateTemplate />,
                meta: {
                    title: 'Create Template'
                }
            },
            {
                path: 'edit',
                element: <EditTemplate />,
                meta: {
                    title: 'Edit Template'
                }
            },
        ],
        meta: {
            title: 'Templates'
        }
    },
    {
        path: 'profile',
        element: <Profile />,
        meta: {
            title: "Profile"
        }
    },
    {
        path: 'users',
        element: <AllUsers />,
        meta: {
            title: "All Users"
        }
    },
]

export default panels;