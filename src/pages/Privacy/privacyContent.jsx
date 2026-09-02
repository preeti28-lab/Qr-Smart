import React from "react";
import {
  FiUsers,
  FiFileText,
  FiShield,
  FiUser,
  FiDatabase,
  FiClock,
  FiLock,
  FiEdit3,
  FiPhoneCall,
} from "react-icons/fi";

const mail = (
  <a href="mailto:support@qrsmart.us" className="text-blue-600 underline">
    support@qrsmart.us
  </a>
);

/**
 * Privacy policy sections. Text bilkul wahi hai jo pehle page par tha -
 * sirf 10 collapsible sections me group kiya gaya hai.
 */
export const PRIVACY_SECTIONS = [
  {
    id: "responsible-party",
    navLabel: "Responsible Party",
    title: "Responsible Party and Description",
    summary:
      "Learn who we are and how QR Smart is dedicated to providing innovative and secure solutions.",
    icon: FiUsers,
    accent: "bg-blue-600",
    content: (
      <>
        <h3>1.1. Responsible Party</h3>
        <p>
          The entity responsible for managing this website is{" "}
          <strong>QR Smart</strong> (hereinafter referred to as "QR Smart" or
          "the Service"), a premier platform dedicated to providing innovative
          and secure solutions in the digital space.
        </p>
        <p>
          <strong className="pr-1">Contact Information :</strong>
          Email: {mail}
        </p>

        <h3>1.2. Description</h3>
        <p>
          Acceptance of the Privacy Policy of QR Smart (hereinafter "Privacy
          Policy") is a necessary condition for using our website and services
          (hereinafter "the Service").
        </p>
        <p>
          This Privacy Policy regulates the collection, processing, and use of
          your personal and non-personal information as a user of QR Smart,
          effective from the date stated above.
        </p>
        <p>
          QR Smart complies with applicable local and international regulations,
          including data protection laws, to ensure the security and privacy of
          your data.
        </p>
      </>
    ),
  },
  {
    id: "information-collected",
    navLabel: "Information Collected",
    title: "Information Collected",
    summary:
      "Understand the types of information we collect automatically, voluntarily, and from third parties.",
    icon: FiFileText,
    accent: "bg-emerald-500",
    content: (
      <>
        <p>
          Access to our website can be made without providing any personal
          information. However, to register or use our services, you may need to
          provide certain personal data.
        </p>
        <p>We collect information in three ways:</p>
        <ul>
          <li>Automatically</li>
          <li>Voluntarily provided by you</li>
          <li>Provided by third parties</li>
        </ul>

        <h3>2.1. Automatically Collected Data</h3>
        <p>This includes:</p>
        <ul>
          <li>
            Data collected via JSON Web Tokens (JWT) for authentication and
            secure session management.
          </li>
          <li>
            IP address, device type, OS version, browser type, language,
            country, and network details.
          </li>
          <li>Service usage data, including errors encountered during use.</li>
        </ul>
        <p>
          QR Smart utilizes Google Analytics to analyze website traffic and user
          behavior. Data may be transmitted and processed by Google under its
          privacy terms.
        </p>

        <h3>2.2. Voluntarily Provided Data</h3>
        <p>This includes:</p>
        <ul>
          <li>
            Personal details such as name, email address, billing address, and
            payment information required for registration and purchases.
          </li>
          <li>
            Information submitted via contact forms or customer support
            channels.
          </li>
        </ul>

        <h3>2.3. Data Provided by Third Parties</h3>
        <p>This includes:</p>
        <ul>
          <li>
            Information from payment processors, such as transaction details.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "rights-and-purposes",
    navLabel: "Rights and Purposes",
    title: "Rights and Purposes",
    summary:
      "Learn how your data is used and your rights regarding your personal information.",
    icon: FiShield,
    accent: "bg-violet-500",
    content: (
      <>
        <p>
          Providing personal data is voluntary. However, not providing required
          information may limit access to some services.
        </p>
        <p>
          Your personal data will be incorporated into QR Smart’s data
          processing records for:
        </p>
        <ul>
          <li>Responding to inquiries and service requests.</li>
          <li>Managing and improving our services.</li>
          <li>Processing transactions and payments.</li>
          <li>Ensuring security and preventing fraudulent activities.</li>
          <li>
            Sending relevant service updates and promotional content (with your
            consent).
          </li>
        </ul>
        <p>You have the right to:</p>
        <ul>
          <li>Access, modify, or delete your data.</li>
          <li>Restrict or object to data processing.</li>
          <li>Request data portability.</li>
          <li>Withdraw consent at any time.</li>
          <li>
            Lodge complaints with the relevant data protection authority if
            necessary.
          </li>
        </ul>
        <p>For any of the above requests, please contact us at {mail}.</p>
      </>
    ),
  },
  {
    id: "age-requirement",
    navLabel: "Age Requirement",
    title: "Age Requirement",
    summary:
      "By using our website, you confirm that you are of legal age and can enter into this agreement.",
    icon: FiUser,
    accent: "bg-orange-500",
    content: (
      <p>
        By using this website, you confirm that you are of legal age and possess
        the legal capacity to comply with this agreement. All information
        provided must be true and accurate.
      </p>
    ),
  },
  {
    id: "use-of-data",
    navLabel: "Use of Data",
    title: "Use of Data",
    summary:
      "Discover how we use collected data to provide, improve, and secure our services.",
    icon: FiDatabase,
    accent: "bg-pink-500",
    content: (
      <>
        <p>QR Smart will use collected data to:</p>
        <ul>
          <li>Manage and enhance the Service.</li>
          <li>Respond to user inquiries.</li>
          <li>Process payments securely.</li>
          <li>Provide and personalize our services.</li>
          <li>Investigate and prevent fraudulent or illegal activities.</li>
        </ul>
      </>
    ),
  },
  {
    id: "data-retention",
    navLabel: "Data Retention",
    title: "Data Retention",
    summary:
      "Find out how long we retain your data and the categories we store.",
    icon: FiClock,
    accent: "bg-teal-500",
    content: (
      <>
        <p>QR Smart retains user data as follows:</p>
        <ul>
          <li>
            <strong>Anonymous data:</strong> Indefinitely.
          </li>
          <li>
            <strong>Customer data:</strong> For the legally required minimum
            duration.
          </li>
          <li>
            <strong>General user data:</strong> Up to 12 months for customer
            service purposes.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-sharing",
    navLabel: "Data Sharing",
    title: "Data Sharing with Third Parties",
    summary:
      "Learn when and why we share data with trusted third parties to operate our services.",
    icon: FiUsers,
    accent: "bg-indigo-500",
    content: (
      <>
        <p>
          QR Smart collaborates with trusted third parties to operate its
          services, including:
        </p>
        <ul>
          <li>
            Payment processors, hosting providers, customer service platforms,
            and analytical tools.
          </li>
          <li>Legal authorities when necessary to comply with regulations.</li>
        </ul>
      </>
    ),
  },
  {
    id: "security-measures",
    navLabel: "Security Measures",
    title: "Security Measures",
    summary:
      "Explore the security measures we implement to protect your data from unauthorized access.",
    icon: FiLock,
    accent: "bg-amber-500",
    content: (
      <>
        <p>
          QR Smart employs advanced security measures, including JSON Web Tokens
          (JWT), to authenticate and protect user data from unauthorized access,
          alteration, loss, or destruction.
        </p>
        <p>
          Even after deletion, cached copies of personal information may remain
          in backups or if shared by other users.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-policy",
    navLabel: "Changes to Policy",
    title: "Changes to the Privacy Policy",
    summary:
      "We may update this policy from time to time. Stay informed about the latest changes.",
    icon: FiEdit3,
    accent: "bg-blue-500",
    content: (
      <p>
        QR Smart reserves the right to update this Privacy Policy. Users will be
        informed of any changes via email or a notice on our website.
      </p>
    ),
  },
  {
    id: "contact",
    navLabel: "Contact",
    title: "Contact",
    summary:
      "Get in touch with us for any privacy-related questions or concerns.",
    icon: FiPhoneCall,
    accent: "bg-green-500",
    content: (
      <>
        <p>
          For any questions regarding this Privacy Policy, please contact us at:{" "}
          {mail}
        </p>
        <p>
          QR Smart is dedicated to providing cutting-edge solutions while
          prioritizing user privacy and security.
        </p>
      </>
    ),
  },
];
