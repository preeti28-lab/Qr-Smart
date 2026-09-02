import React from "react";
import {
  FiFileText,
  FiTarget,
  FiShield,
  FiUserCheck,
  FiBox,
  FiTag,
  FiCreditCard,
  FiRotateCcw,
  FiPercent,
  FiLock,
  FiEdit3,
  FiUsers,
  FiCopy,
  FiAward,
  FiLink,
  FiDatabase,
  FiCalendar,
  FiBookOpen,
  FiHeadphones,
} from "react-icons/fi";

const site = (
  <a href="https://qrsmart.us" className="text-blue-600">
    https://qrsmart.us
  </a>
);

/**
 * Terms of Use sections. Text bilkul wahi hai jo pehle page par tha -
 * sirf 19 collapsible sections me group kiya gaya hai.
 */
export const TERMS_SECTIONS = [
  {
    id: "introduction",
    navLabel: "Introduction and Data",
    title: "Introduction and Data of QR Smart",
    summary:
      "Learn about QR Smart, our website, and how we provide innovative QR solutions.",
    icon: FiFileText,
    accent: "bg-blue-600",
    content: (
      <>
        <p>
          The website {site} (hereinafter, the "Website") is owned by QR Smart, a
          leading provider of innovative QR code solutions. QR Smart is
          committed to delivering high-quality, efficient, and secure QR code
          generation and management services for businesses and individuals
          alike.
        </p>
        <p>
          QR Smart makes the Website available to you so that you can learn more
          about us, explore the services we provide, and, if you wish, contact
          us and enter into contracts with us.
        </p>
      </>
    ),
  },
  {
    id: "purpose-and-scope",
    navLabel: "Purpose and Scope",
    title: "Purpose and Scope of Application",
    summary:
      "Understand the legal framework governing the use of our website and services.",
    icon: FiTarget,
    accent: "bg-green-500",
    content: (
      <>
        <p>
          These conditions of use, along with the Privacy Policy and the Cookies
          Policy, form the legal framework governing the use of {site}. These
          conditions of use are available in English for your convenience, and
          you may consult, archive, or print them at any time.
        </p>
        <p>
          For any inquiries regarding the processing of your personal data,
          please visit our Privacy Policy and our Cookies Policy.
        </p>
        <p>
          QR Smart employs third-party cookies on the Website. For more details
          on the type of cookies used, their purpose, and how to configure your
          browser settings to manage cookies, please refer to our Cookies
          Policy.
        </p>
      </>
    ),
  },
  {
    id: "access-and-acceptance",
    navLabel: "Access & Acceptance",
    title: "Access to the Website and Acceptance",
    summary:
      "Learn about free access, registration, and acceptance of these terms.",
    icon: FiShield,
    accent: "bg-violet-500",
    content: (
      <>
        <p>
          Access to the Website is free, apart from any costs related to your
          Internet connection. You can freely browse and access the Website
          without registration. However, if you wish to subscribe to a service,
          registration will be required.
        </p>
        <p>
          Using the Website implies full acceptance of these Terms of Use, along
          with the Privacy Policy and Cookies Policy. By accessing and using the
          Website, you confirm that you are of legal age and have the legal
          capacity to agree to these terms.
        </p>
      </>
    ),
  },
  {
    id: "conditions-of-use",
    navLabel: "Conditions of Use",
    title: "Conditions of Use of the Website",
    summary:
      "Rules and responsibilities for using our website lawfully and in good faith.",
    icon: FiUserCheck,
    accent: "bg-orange-500",
    content: (
      <p>
        Users agree to use the Website lawfully and in good faith. Any misuse of
        the Website that violates these conditions, applicable laws, or ethical
        standards may result in legal action.
      </p>
    ),
  },
  {
    id: "description-of-service",
    navLabel: "Description of Service",
    title: "Description of the Service",
    summary:
      "Details about our subscription-based QR code generation and analytics service.",
    icon: FiBox,
    accent: "bg-pink-500",
    content: (
      <>
        <p>
          QR Smart provides a subscription-based QR code generation and
          analytics service. The contract language will be determined based on
          the country of origin of the user.
        </p>
        <h3>5.1 Subscription</h3>
        <p>
          The subscription service varies based on the selected plan and will be
          automatically renewed unless canceled. Users may cancel their
          subscription at any time and will continue to have access until the
          end of the billing period.
        </p>
      </>
    ),
  },
  {
    id: "price-and-taxes",
    navLabel: "Pricing and Taxes",
    title: "Price and Taxes",
    summary: "Information about pricing, currency, and applicable taxes.",
    icon: FiTag,
    accent: "bg-teal-500",
    content: (
      <p>
        Prices for QR Smart services are displayed in USD ($) and may be subject
        to applicable taxes based on the user's location.
      </p>
    ),
  },
  {
    id: "payment-method",
    navLabel: "Payment Method",
    title: "Payment Method",
    summary:
      "Learn about secure payment gateways and accepted payment methods.",
    icon: FiCreditCard,
    accent: "bg-amber-500",
    content: (
      <p>
        Online payments can be made using credit or debit cards through a secure
        payment gateway with SSL encryption.
      </p>
    ),
  },
  {
    id: "withdrawal-and-refunds",
    navLabel: "Withdrawals & Refunds",
    title: "Right of Withdrawal and Refunds",
    summary:
      "Understand our refund policy, trial period, and cancellation terms.",
    icon: FiRotateCcw,
    accent: "bg-indigo-500",
    content: (
      <>
        <h3>8.1 Right of Withdrawal</h3>
        <p>
          Due to the digital nature of our service, once a subscription is
          completed, there is no right of withdrawal or refund. However, users
          have a 7-day free trial period to explore the platform before
          subscribing.
        </p>
        <h3>8.2 Refunds</h3>
        <p>
          Once a payment has been made from any source, it is strictly
          non-refundable. Regardless of whether you are satisfied with our
          services or not, we will not issue any refunds under any
          circumstances. Users may cancel their subscription to prevent future
          charges but will retain access for the remaining billing period.
        </p>
      </>
    ),
  },
  {
    id: "validity-of-offers",
    navLabel: "Validity of Offers",
    title: "Validity of Offers",
    summary:
      "Service and pricing may change — stay updated with the latest offers.",
    icon: FiPercent,
    accent: "bg-blue-500",
    content: (
      <p>
        QR Smart reserves the right to modify or update services and pricing at
        any time.
      </p>
    ),
  },
  {
    id: "security",
    navLabel: "Security",
    title: "Security",
    summary:
      "We implement industry-standard security measures to protect your data.",
    icon: FiLock,
    accent: "bg-green-500",
    content: (
      <p>
        We implement industry-standard security measures, including SSL
        encryption, to protect user data. However, QR Smart cannot guarantee
        absolute security.
      </p>
    ),
  },
  {
    id: "modifications-and-nullity",
    navLabel: "Modifications & Nullity",
    title: "Modifications and Nullity",
    summary:
      "How and when we update these terms, and how you will be notified.",
    icon: FiEdit3,
    accent: "bg-rose-500",
    content: (
      <p>
        QR Smart may update the Terms of Use at any time. If an email
        notification fails to reach you, we are not responsible for any issues
        arising from your email service provider or our mail server.
      </p>
    ),
  },
  {
    id: "dispute-resolution",
    navLabel: "Dispute Resolution",
    title: "Claims and Dispute Resolution",
    summary: "How we handle claims and resolve disputes amicably.",
    icon: FiUsers,
    accent: "bg-cyan-500",
    content: (
      <p>
        QR Smart strives to resolve disputes amicably. However, if necessary, we
        follow applicable Indian laws for dispute resolution.
      </p>
    ),
  },
  {
    id: "ip-rights",
    navLabel: "IP Rights",
    title: "Intellectual and Industrial Property Rights",
    summary: "Ownership of website content and restrictions on its use.",
    icon: FiCopy,
    accent: "bg-purple-500",
    content: (
      <p>
        All content on the Website is owned by QR Smart or properly licensed.
        Unauthorized reproduction or distribution is prohibited. QR Smart
        reserves the right to take legal action against violations.
      </p>
    ),
  },
  {
    id: "responsibilities",
    navLabel: "Responsibilities",
    title: "Responsibilities and Guarantees",
    summary:
      "Your responsibilities as a user and the limits of our liability.",
    icon: FiAward,
    accent: "bg-orange-400",
    content: (
      <p>
        Users are responsible for their use of the Website and its contents. QR
        Smart is not liable for third-party interruptions, network failures, or
        unauthorized intrusions.
      </p>
    ),
  },
  {
    id: "links",
    navLabel: "Links",
    title: "Links",
    summary: "Our position on third-party websites linked to or from our site.",
    icon: FiLink,
    accent: "bg-blue-500",
    content: (
      <p>
        QR Smart does not endorse third-party websites linking to or linked from
        our Website. We are not responsible for third-party content.
      </p>
    ),
  },
  {
    id: "data-protection",
    navLabel: "Data Protection",
    title: "Data Protection",
    summary: "How your personal data is processed and protected.",
    icon: FiDatabase,
    accent: "bg-green-600",
    content: (
      <p>
        User data is processed according to our Privacy Policy. We employ
        advanced security measures to protect your personal information.
      </p>
    ),
  },
  {
    id: "duration-and-modification",
    navLabel: "Duration & Modification",
    title: "Duration and Modification",
    summary: "How long these terms stay in effect and how changes are shared.",
    icon: FiCalendar,
    accent: "bg-violet-600",
    content: (
      <p>
        These Terms remain in effect until modified or updated. Any changes will
        be communicated to users.
      </p>
    ),
  },
  {
    id: "general-provisions",
    navLabel: "General Provisions",
    title: "General Provisions",
    summary: "What happens if any single clause is found to be invalid.",
    icon: FiBookOpen,
    accent: "bg-slate-500",
    content: (
      <p>
        If any clause is deemed invalid, the remaining clauses remain
        enforceable.
      </p>
    ),
  },
  {
    id: "customer-service",
    navLabel: "Customer Service",
    title: "Customer Service",
    summary: "Get in touch for inquiries, complaints, or support requests.",
    icon: FiHeadphones,
    accent: "bg-blue-600",
    content: (
      <p>
        For any inquiries, complaints, or support requests, contact us at:
        <br />
        Email:{" "}
        <a href="mailto:support@qrsmart.us" className="text-blue-600">
          support@qrsmart.us
        </a>
      </p>
    ),
  },
];

/** Hero ke neeche wali highlight strip */
export const TERMS_HIGHLIGHTS = [
  {
    title: "Your Legal Rights",
    desc: "Understand your legal rights in QR Smart.",
    icon: FiAward,
    tone: "bg-violet-50 text-violet-500",
  },
  {
    title: "Your Granted Rights",
    desc: "Explore the rights you gain while using us.",
    icon: FiUserCheck,
    tone: "bg-blue-50 text-blue-600",
  },
  {
    title: "Rules & Responsibilities",
    desc: "Learn the rules everyone must follow.",
    icon: FiFileText,
    tone: "bg-blue-50 text-blue-600",
  },
  {
    title: "Safe & Transparent",
    desc: "We are committed to fair and secure usage.",
    icon: FiShield,
    tone: "bg-violet-50 text-violet-500",
  },
];
