import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScreenView from "../../layouts/ScreenView";
import { Helmet } from "react-helmet-async";
import HeroWaves from "../../components/ui/HeroWaves";
import FaqBrowser from "./FaqBrowser";
import { FiSearch, FiMail } from "react-icons/fi";
import faqHeroImg from "../../assets/images/faq-hero.png";
import faqSupportImg from "../../assets/images/faq-support.png";

const FAQs = () => {
  //   const items = [
  //     {
  //       title: "What is a QR code?",
  //       values: [
  //         <>
  //           A QR code (short for <strong>"Quick Response code"</strong>) is a type
  //           of two-dimensional barcode that can store a large amount of data,
  //           which can be quickly and easily read by a digital device, such as a
  //           smartphone camera. <strong>At QRSmart</strong>, we leverage this
  //           technology to provide innovative solutions for businesses and
  //           individuals alike.
  //         </>,
  //         <p>Here are some key features:</p>,
  //         <p>
  //           <strong>Design:</strong> QR codes consist of black squares arranged on
  //           a white background. They typically have three large squares in the
  //           corners and smaller square patterns throughout.
  //         </p>,
  //         <p>
  //           <strong>Capacity:</strong> They can store different types of data,
  //           including URLs, text, images, videos, and more.
  //         </p>,
  //         <p>
  //           <strong>Usage:</strong> They're often used for scanning to access
  //           information quickly. For instance, you might scan a QR code to visit a
  //           website, download an app, view a menu, make a payment, or even connect
  //           to Wi-Fi.
  //         </p>,
  //         <p>
  //           <strong>Advantage:</strong> QR codes can be scanned from different
  //           angles, making them highly versatile for various applications.
  //         </p>,
  //         <p>
  //           At QRSmart, we specialize in creating customized QR code solutions
  //           tailored to your specific needs. Whether it's for marketing campaigns,
  //           business operations, or personal use, we've got you covered.
  //         </p>,
  //       ],
  //     },

  //     {
  //       title: "How Many Types of QR Codes Are There?",
  //       values: [
  //         <>
  //           <p>
  //             There are several types of QR codes, each designed for specific
  //             purposes. At{" "}
  //             <strong>
  //               <a
  //                 href="https://qrsmart.us/"
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //               >
  //                 QR Smart
  //               </a>
  //             </strong>
  //             , we specialize in creating <strong>all types of QR codes</strong>{" "}
  //             to meet diverse business and personal needs.
  //           </p>

  //           <strong>Types of QR Codes</strong>

  //           <h5>1. Static QR Codes</h5>
  //           <p>
  //             - Fixed information that cannot be changed after creation.
  //             <br />- Examples: WiFi passwords, contact details, plain text, and
  //             direct URLs.
  //           </p>

  //           <h5>2. Dynamic QR Codes (Editable & Trackable)</h5>
  //           <p>
  //             - URL or content can be updated anytime without changing the QR
  //             code.
  //             <br />
  //             - Track scans, locations, and user engagement.
  //             <br />- Perfect for marketing campaigns, business cards, and digital
  //             menus.
  //           </p>

  //           <h5>3. Website & URL QR Codes</h5>
  //           <p>
  //             - Directs users to any website, landing page, or online store with a
  //             single scan.
  //           </p>

  //           <h5>4. vCard & Business QR Codes</h5>
  //           <p>
  //             - Share your contact details instantly in a digital format.
  //             <br />- Save directly to phone contacts with a quick scan.
  //           </p>

  //           <h5>5. Social Media QR Codes</h5>
  //           <p>
  //             - Redirect users to your Instagram, Facebook, LinkedIn, TikTok, or
  //             YouTube.
  //             <br />- Boost social media engagement and followers.
  //           </p>

  //           <h5>6. Payment QR Codes</h5>
  //           <p>
  //             - Supports UPI, PayPal, Venmo, Google Pay, and more for seamless
  //             transactions.
  //           </p>

  //           <h5>7. Event & Ticketing QR Codes</h5>
  //           <p>
  //             - Digital tickets for concerts, conferences, and travel passes.
  //             <br />- Easy check-in and verification process.
  //           </p>

  //           <h5>8. Product & Inventory QR Codes</h5>
  //           <p>
  //             - Used in retail and logistics for tracking products and shipments.
  //             <br />- Scan to get product details, pricing, or manuals.
  //           </p>

  //           <h5>9. Restaurant & Hospitality QR Codes</h5>
  //           <p>
  //             - Digital menus for contactless ordering.
  //             <br />- Room service and hotel check-ins with quick scans.
  //           </p>

  //           <h5>10. WiFi QR Codes</h5>
  //           <p>
  //             - Allow users to connect to a WiFi network without typing the
  //             password.
  //           </p>

  //           <h5>11. App Download QR Codes</h5>
  //           <p>
  //             - Redirect users to Google Play Store or Apple App Store to install
  //             apps instantly.
  //           </p>

  //           <h5>12. PDF & Document QR Codes</h5>
  //           <p>
  //             - Share brochures, presentations, e-books, and important documents.
  //           </p>

  //           <h5>13. Email & SMS QR Codes</h5>
  //           <p>
  //             - Pre-fill an email or SMS message when scanned.
  //             <br />- Ideal for customer support and feedback requests.
  //           </p>

  //           <h5>14. Google Maps QR Codes</h5>
  //           <p>
  //             - Instantly open a location in Google Maps.
  //             <br />- Perfect for businesses, real estate, and event locations.
  //           </p>

  //           <h5>15. Crypto Payment QR Codes</h5>
  //           <p>
  //             - Accept Bitcoin, Ethereum, and other cryptocurrencies through QR
  //             scans.
  //           </p>

  //           <h5>16. YouTube & Video QR Codes</h5>
  //           <p>
  //             - Direct users to YouTube videos, live streams, or video tutorials.
  //           </p>

  //           <h5>17. Survey & Feedback QR Codes</h5>
  //           <p>
  //             - Link to Google Forms, Typeform, or custom surveys for instant
  //             feedback.
  //           </p>

  //           <h5>18. Multi-Link QR Codes</h5>
  //           <p>
  //             - One QR code that opens a menu of multiple links (e.g., website,
  //             social media, contacts).
  //           </p>

  //           <h5>19. Audio & Podcast QR Codes</h5>
  //           <p>
  //             - Direct users to a music playlist or podcast episode with a single
  //             scan.
  //           </p>

  //           <h5>20. E-commerce QR Codes</h5>
  //           <p>- Scan-to-buy QR codes for direct product purchases.</p>

  //           <p>
  //             At <strong>QR Smart</strong>, we{" "}
  //             <strong>create, customize, and manage all types of QR codes</strong>{" "}
  //             with branding options, tracking analytics, and dynamic features.
  //           </p>
  //         </>,
  //       ],
  //     },
  //   ];

  //   const text = `
  //   A dog is a type of domesticated animal.
  //   Known for its loyalty and faithfulness,
  //   it can be found as a welcome guest in many households across the world.
  // `;

  const panelsData = [
    {
      key: "1",
      title: "What is a QR code?",
      values: [
        <>
          A QR code (short for <strong>"Quick Response code"</strong>) is a type
          of two-dimensional barcode that can store a large amount of data,
          which can be quickly and easily read by a digital device, such as a
          smartphone camera. <strong>At QRSmart</strong>, we leverage this
          technology to provide innovative solutions for businesses and
          individuals alike.
        </>,
        <p>Here are some key features:</p>,
        <p>
          <strong>Design:</strong> QR codes consist of black squares arranged on
          a white background. They typically have three large squares in the
          corners and smaller square patterns throughout.
        </p>,
        <p>
          <strong>Capacity:</strong> They can store different types of data,
          including URLs, text, images, videos, and more.
        </p>,
        <p>
          <strong>Usage:</strong> They're often used for scanning to access
          information quickly. For instance, you might scan a QR code to visit a
          website, download an app, view a menu, make a payment, or even connect
          to Wi-Fi.
        </p>,
        <p>
          <strong>Advantage:</strong> QR codes can be scanned from different
          angles, making them highly versatile for various applications.
        </p>,
        <p>
          At QRSmart, we specialize in creating customized QR code solutions
          tailored to your specific needs. Whether it's for marketing campaigns,
          business operations, or personal use, we've got you covered.
        </p>,
      ],
    },
    {
      key: "2",
      title: "How Many Types of QR Codes Are There?",
      values: [
        <>
          <p>
            There are several types of QR codes, each designed for specific
            purposes. At{" "}
            <strong>
              <a
                href="https://qrsmart.us/"
                target="_blank"
                rel="noopener noreferrer"
              >
                QR Smart
              </a>
            </strong>
            , we specialize in creating <strong>all types of QR codes</strong>{" "}
            to meet diverse business and personal needs.
          </p>

          <h4 className="pt-3">
            <strong>Types of QR Codes</strong>
          </h4>

          <h5 className="pt-3 font-bold">1. Static QR Codes</h5>
          <p>
            - Fixed information that cannot be changed after creation.
            <br />- Examples: WiFi passwords, contact details, plain text, and
            direct URLs.
          </p>

          <h5 className="pt-3 font-bold">
            2. Dynamic QR Codes (Editable & Trackable)
          </h5>
          <p>
            - URL or content can be updated anytime without changing the QR
            code.
            <br />
            - Track scans, locations, and user engagement.
            <br />- Perfect for marketing campaigns, business cards, and digital
            menus.
          </p>

          <h5 className="pt-3 font-bold">3. Website & URL QR Codes</h5>
          <p>
            - Directs users to any website, landing page, or online store with a
            single scan.
          </p>

          <h5 className="pt-3 font-bold">4. vCard & Business QR Codes</h5>
          <p>
            - Share your contact details instantly in a digital format.
            <br />- Save directly to phone contacts with a quick scan.
          </p>

          <h5 className="pt-3 font-bold">5. Social Media QR Codes</h5>
          <p>
            - Redirect users to your Instagram, Facebook, LinkedIn, TikTok, or
            YouTube.
            <br />- Boost social media engagement and followers.
          </p>

          <h5 className="pt-3 font-bold">6. Payment QR Codes</h5>
          <p>
            - Supports UPI, PayPal, Venmo, Google Pay, and more for seamless
            transactions.
          </p>

          <h5 className="pt-3 font-bold">7. Event & Ticketing QR Codes</h5>
          <p>
            - Digital tickets for concerts, conferences, and travel passes.
            <br />- Easy check-in and verification process.
          </p>

          <h5 className="pt-3 font-bold">8. Product & Inventory QR Codes</h5>
          <p>
            - Used in retail and logistics for tracking products and shipments.
            <br />- Scan to get product details, pricing, or manuals.
          </p>

          <h5 className="pt-3 font-bold">
            9. Restaurant & Hospitality QR Codes
          </h5>
          <p>
            - Digital menus for contactless ordering.
            <br />- Room service and hotel check-ins with quick scans.
          </p>

          <h5 className="pt-3 font-bold">10. WiFi QR Codes</h5>
          <p>
            - Allow users to connect to a WiFi network without typing the
            password.
          </p>

          <h5 className="pt-3 font-bold">11. App Download QR Codes</h5>
          <p>
            - Redirect users to Google Play Store or Apple App Store to install
            apps instantly.
          </p>

          <h5 className="pt-3 font-bold">12. PDF & Document QR Codes</h5>
          <p>
            - Share brochures, presentations, e-books, and important documents.
          </p>

          <h5 className="pt-3 font-bold">13. Email & SMS QR Codes</h5>
          <p>
            - Pre-fill an email or SMS message when scanned.
            <br />- Ideal for customer support and feedback requests.
          </p>

          <h5 className="pt-3 font-bold">14. Google Maps QR Codes</h5>
          <p>
            - Instantly open a location in Google Maps.
            <br />- Perfect for businesses, real estate, and event locations.
          </p>

          <h5 className="pt-3 font-bold">15. Crypto Payment QR Codes</h5>
          <p>
            - Accept Bitcoin, Ethereum, and other cryptocurrencies through QR
            scans.
          </p>

          <h5 className="pt-3 font-bold">16. YouTube & Video QR Codes</h5>
          <p>
            - Direct users to YouTube videos, live streams, or video tutorials.
          </p>

          <h5 className="pt-3 font-bold">17. Survey & Feedback QR Codes</h5>
          <p>
            - Link to Google Forms, Typeform, or custom surveys for instant
            feedback.
          </p>

          <h5 className="pt-3 font-bold">18. Multi-Link QR Codes</h5>
          <p>
            - One QR code that opens a menu of multiple links (e.g., website,
            social media, contacts).
          </p>

          <h5 className="pt-3 font-bold">19. Audio & Podcast QR Codes</h5>
          <p>
            - Direct users to a music playlist or podcast episode with a single
            scan.
          </p>

          <h5 className="pt-3 font-bold">20. E-commerce QR Codes</h5>
          <p>- Scan-to-buy QR codes for direct product purchases.</p>

          <p>
            At <strong>QR Smart</strong>, we{" "}
            <strong>create, customize, and manage all types of QR codes</strong>{" "}
            with branding options, tracking analytics, and dynamic features.
          </p>
        </>,
      ],
    },
    {
      key: "3",
      title: "Static QR Code vs. Dynamic QR Code: What's the Difference?",
      values: [
        <>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we offer both <strong>Static</strong> and <strong>Dynamic</strong>{" "}
          QR codes, designed to meet different needs. Here's how they compare:
        </>,
        <h3>Static QR Codes</h3>,
        <p>
          <strong>Fixed Information</strong>: Contain information that{" "}
          <strong>cannot</strong> be changed after creation.
        </p>,
        <p>
          <strong>Best for Permanent Data</strong>: Ideal for use cases like
          WiFi passwords, contact details, and direct URLs.
        </p>,
        <p>
          <strong>No Tracking or Analytics</strong>: Do not support scan
          tracking or analytics.
        </p>,
        <p>
          <strong>Simple and Free</strong>: Easy to generate and suitable for
          basic, unchanging use.
        </p>,
        <h3>Dynamic QR Codes</h3>,
        <p>
          <strong>Editable Content</strong>: Content can be{" "}
          <strong>updated anytime</strong>, even after the QR code is printed.
        </p>,
        <p>
          <strong>Tracking & Analytics</strong>: Supports scan statistics, such
          as location, time, and device used.
        </p>,
        <p>
          <strong>Shorter in Size</strong>: Often smaller and easier to scan.
        </p>,
        <p>
          <strong>Ideal for Businesses</strong>: Best for marketing campaigns,
          payments, event tickets, and business uses.
        </p>,
        <h3>Key Differences</h3>,
        <ul>
          <li>
            <strong>Editability</strong>: Dynamic QR codes allow updates, while
            Static ones cannot.
          </li>
          <li>
            <strong>Tracking & Analytics</strong>: Only Dynamic QR codes offer
            detailed scan data.
          </li>
          <li>
            <strong>Flexibility</strong>: Dynamic QR codes provide more control
            and are perfect for businesses that require frequent updates or
            analytics.
          </li>
        </ul>,
        <p>
          At <strong>QR Smart</strong>, we create{" "}
          <strong>both Static and Dynamic QR codes</strong>, customized to meet
          your business needs. If you need a{" "}
          <strong>smart QR code solution</strong>, let's get started today!
        </p>,
      ],
    },
    {
      key: "4",
      title:
        "Can a Static QR Code Be Converted to a Dynamic One (or Vice Versa)?",
      values: [
        <>
          No, due to the technical differences between each type of QR code, a{" "}
          <strong>
            Static QR code cannot be converted into a Dynamic QR code
          </strong>
          , and vice versa.
        </>,
        <p>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we specialize in both <strong>Static</strong> and{" "}
          <strong>Dynamic</strong> QR codes, but they function differently:
        </p>,
        <h3>Static QR Codes</h3>,
        <p>
          Static QR Codes contain fixed data, which is directly embedded in the
          code. Since this data is permanent, it{" "}
          <strong>cannot be changed</strong> after creation.
        </p>,
        <h3>Dynamic QR Codes</h3>,
        <p>
          Dynamic QR Codes store a <strong>short redirect link</strong>,
          allowing you to update the destination or content anytime. They also
          support scan tracking and analytics.
        </p>,
        <p>
          If you need <strong>flexibility and tracking</strong>, it's best to
          create a <strong>Dynamic QR code from the beginning</strong>.
        </p>,
        <p>
          At <strong>QR Smart</strong>, we provide{" "}
          <strong>custom QR code solutions</strong> to suit your needs. Need
          help choosing the right QR code?{" "}
          <strong>Let’s create one for you today!</strong>
        </p>,
      ],
    },
    {
      key: "5",
      title: "How Can I Generate My Own QR Code?",
      values: [
        <>
          There are many platforms and tools to create QR codes, but none
          compare to{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>{" "}
          – the most <em>secure, reliable, and powerful</em> QR code solution
          available today!
        </>,
        <h3>Why Choose QR Smart?</h3>,
        <ul>
          <li>
            <strong>Create Stunning Custom QR Codes</strong> – Add your logo,
            choose colors, and brand it your way!
          </li>
          <li>
            <strong>Dynamic & Editable</strong> – Update your QR code anytime,
            even after printing.
          </li>
          <li>
            <strong>Advanced Analytics</strong> – Track scans, locations, and
            engagement for maximum insights.
          </li>
          <li>
            <strong>Works on Any Device</strong> – Seamless experience across
            smartphones, tablets, and desktops.
          </li>
        </ul>,
        <h3>Secure & Reliable – Your Data is Always Safe!</h3>,
        <p>
          At <strong>QR Smart</strong>, we prioritize{" "}
          <strong>security and reliability</strong> like no other platform:
        </p>,
        <ul>
          <li>
            <strong>100+ Data Centers</strong> worldwide for maximum uptime and
            speed.
          </li>
          <li>
            <strong>End-to-End Encryption</strong> – Just like WhatsApp,
            ensuring complete data protection.
          </li>
          <li>
            <strong>SSL Security & Cloudflare Protection</strong> – Our website
            is secured with <em>multi-factor authentication</em> for safe
            transactions.
          </li>
          <li>
            <strong>TLS Encryption</strong> – The latest security protocol
            replacing SSL, encrypting, securing, and authenticating all
            communications online.
          </li>
        </ul>,
        <p>
          At <strong>QR Smart</strong>, we don’t just create QR codes – we{" "}
          <strong>empower businesses</strong> with the{" "}
          <strong>most secure and intelligent QR solutions</strong> to connect,
          engage, and grow.
        </p>,
        <p>
          <strong>Join thousands of businesses using QR Smart today!</strong>{" "}
          Generate your <strong>smart, secure QR code now</strong> and take your
          brand to the next level!
        </p>,
      ],
    },
    {
      key: "6",
      title: "Can the Reading of a QR Code Fail?",
      values: [
        <>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’ve designed our QR codes with{" "}
          <strong>unmatched reliability</strong> and <em>resilience</em> that{" "}
          <strong>no other QR code provider</strong> can offer!
        </>,
        <h3>Exclusive Error Prevention System</h3>,
        <p>
          Unlike any other QR code provider, our QR codes feature a{" "}
          <strong>highly advanced error prevention system</strong> that ensures:
        </p>,
        <ul>
          <li>
            <strong>Up to 30% of the QR code structure can be damaged</strong>,
            and it will still be scannable.
          </li>
          <li>
            Our system ensures the QR code can still be read even with
            significant damage, offering <strong>reliable performance</strong>{" "}
            in real-world conditions.
          </li>
        </ul>,
        <p>
          If other QR codes are damaged beyond a certain point, they’re
          unreadable—but with <strong>QR Smart</strong>, you’re guaranteed{" "}
          <strong>superior durability</strong>.
        </p>,
        <p>
          Our <strong>error correction technology</strong> is{" "}
          <strong>exclusive to QR Smart</strong>, making us the{" "}
          <strong>leader in QR code reliability</strong>. When you choose us,
          you’re getting the{" "}
          <strong>most secure, advanced, and durable QR codes</strong> on the
          market!
        </p>,
        <p>
          Need a <strong>custom, fail-proof QR code</strong> for your business?{" "}
          <strong>Choose QR Smart today</strong>, where your QR codes are{" "}
          <strong>guaranteed to work</strong>—even when things get a little
          rough!
        </p>,
      ],
    },
    {
      key: "7",
      title: "How Can I Design My Own QR Code?",
      values: [
        <>
          Designing your own QR code has never been easier, and{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>{" "}
          makes it a <em>seamless and simple process</em>!
        </>,
        <p>
          With our <em>user-friendly QR code creator</em>,{" "}
          <strong>anyone</strong> can create a <em>custom QR code</em> in just a
          few clicks! Whether you want to:
        </p>,
        <ul>
          <li>
            <strong>1. Add your brand logo</strong>
          </li>
          <li>
            <strong>2. Choose custom colors</strong>
          </li>
          <li>
            <strong>3. Include text, URLs, or dynamic features</strong>
          </li>
        </ul>,
        <p>
          We provide all the tools you need to create a QR code that matches
          your <em>brand’s style and goals</em>—and the best part is,{" "}
          <strong>it’s all super easy!</strong> No tech skills needed.
        </p>,
        <p>
          At <strong>QR Smart</strong>, we go above and beyond to ensure you
          have the <strong>most intuitive, powerful QR code creation</strong>{" "}
          platform available.
        </p>,
        <p>
          <strong>Start creating your perfect QR code today</strong> with{" "}
          <strong>QR Smart</strong> and see how easy it is to design a code that
          represents your business!
        </p>,
      ],
    },
    {
      key: "8",
      title: "Can I Customize the Text of the QR Code?",
      values: [
        <>
          Absolutely! With{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , <strong>customizing the text</strong> of your QR code is not just
          possible—it’s <em>effortless</em>!
        </>,
        <p>
          Whether you're adding a{" "}
          <em>short message, a call to action, or any custom text</em>,{" "}
          <strong>QR Smart</strong> lets you easily personalize your QR code to
          match your business needs. The only thing you need to keep in mind is
          the <em>maximum character limit</em>—but with our flexible and
          intuitive platform, you can adjust the text to perfectly fit your
          design.
        </p>,
        <p>
          At <strong>QR Smart</strong>, we offer{" "}
          <strong>unmatched flexibility</strong> in customizing QR codes to
          ensure your brand stands out and delivers a message that resonates
          with your audience.
        </p>,
        <p>
          <strong>Get started today</strong> and create a{" "}
          <em>custom QR code</em> that’s as unique as your business—only with{" "}
          <strong>QR Smart</strong>, where{" "}
          <strong>innovation and customization</strong> come together!
        </p>,
      ],
    },
    {
      key: "9",
      title: "Can I Change the Size of My QR Code?",
      values: [
        <>
          Yes, you can absolutely change the size of your QR code with{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          —and we make it <strong>easy and customizable</strong> to suit any of
          your needs!
        </>,
        <p>
          Whether you need a <em>small code</em> for business cards or a{" "}
          <em>larger one</em> for posters, signage, or digital displays,{" "}
          <strong>QR Smart</strong> allows you to adjust the size of your QR
          code effortlessly. Our platform ensures that the <em>quality</em> and{" "}
          <em>scannability</em> remain perfect no matter the size, so your QR
          code will always perform reliably, large or small.
        </p>,
        <p>
          At <strong>QR Smart</strong>, we provide the{" "}
          <strong>ultimate flexibility</strong> when it comes to QR code
          customization, ensuring your QR code fits seamlessly with your brand’s
          design and application, <em>without compromising on quality</em>.
        </p>,
        <p>
          <strong>Need a custom-sized QR code?</strong>{" "}
          <strong>QR Smart</strong> has you covered. Get started today and{" "}
          <em>design the perfect QR code</em> for your business!
        </p>,
      ],
    },
    {
      key: "10",
      title: "Can I Edit My QR Code?",
      values: [
        <>
          Absolutely! At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we don’t just create QR codes—we empower you with{" "}
          <strong>complete control</strong> over your QR codes, making us the{" "}
          <em>most user-friendly and flexible QR code provider</em> in the
          industry!
        </>,
        <p>
          <strong>Effortless Editing with QR Smart</strong>
        </p>,
        <ol>
          <li>
            Head to the <em>"My QRs"</em> section to view all the QR codes
            you’ve created.
          </li>
          <li>
            Click the <em>edit button (pencil symbol)</em> next to the QR code
            you want to modify.
          </li>
          <li>Make your changes instantly—no hassle, no delays!</li>
        </ol>,
        <p>
          <strong>Why Choose QR Smart?</strong>
        </p>,
        <ul>
          <li>
            <strong>Unmatched Flexibility</strong>: Update your QR codes
            anytime, anywhere, without needing to reprint or redistribute them.
          </li>
          <li>
            <strong>Seamless User Experience</strong>: Our platform is designed
            to make editing quick and intuitive, saving you time and effort.
          </li>
          <li>
            <strong>Industry-Leading Technology</strong>: Enjoy the{" "}
            <strong>most advanced QR code management tools</strong> available,
            exclusive to QR Smart.
          </li>
        </ul>,
        <p>
          While other providers lock you into static QR codes,{" "}
          <strong>QR Smart</strong> gives you the freedom to adapt and evolve
          your QR codes as your needs change. Whether it’s updating a link,
          changing content, or refining design, we’ve got you covered!
        </p>,
        <p>
          <strong>Need a QR code that grows with your business?</strong>{" "}
          <strong>Choose QR Smart today</strong> and experience the{" "}
          <em>ultimate in flexibility, reliability, and innovation!</em> With
          us, your QR codes are always{" "}
          <strong>dynamic, editable, and ready for the future</strong>.
        </p>,
      ],
    },
    {
      key: "11",
      title: "Can I Check That My QR Code Is Working Correctly?",
      values: [
        <>
          Absolutely! At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we don’t just create QR codes—we ensure they’re{" "}
          <strong>flawless, functional, and ready to deliver results</strong>{" "}
          for your business. Our commitment to quality and reliability sets us
          apart as the <em>leading QR code provider</em> in the industry!
        </>,
        <p className="pt-3">
          <strong>Test Your QR Code with Ease</strong>
        </p>,
        <ol>
          <li>
            1. After creating or editing your QR code, <em>scan the preview</em>{" "}
            directly from your mobile device.
          </li>
          <li>
            2. Confirm that it directs you to the correct destination or
            performs the intended action.
          </li>
          <li>
            3. Rest assured knowing your QR code is{" "}
            <strong>100% reliable</strong> before sharing it with the world.
          </li>
        </ol>,
        <p className="pt-3">
          <strong>Why QR Smart Stands Out : </strong>
        </p>,
        <ul>
          <li>
            <strong>Unmatched Reliability</strong>: Our QR codes are designed to
            work seamlessly every time, ensuring a smooth experience for your
            users.
          </li>
          <li>
            <strong>User-Friendly Tools</strong>: With our intuitive platform,
            testing your QR codes is quick, easy, and hassle-free.
          </li>
          <li>
            <strong>Industry-Leading Support</strong>: We’re here to help you
            every step of the way, ensuring your QR codes are always at their
            best.
          </li>
        </ul>,
        <p>
          While other providers leave you guessing, <strong>QR Smart</strong>{" "}
          gives you the tools and confidence to{" "}
          <em>verify your QR codes with ease</em>. We believe in delivering not
          just QR codes, but <strong>peace of mind</strong>.
        </p>,
        <p>
          <strong>Need a QR code you can trust?</strong>{" "}
          <strong>Choose QR Smart today</strong> and experience the{" "}
          <em>ultimate in reliability, functionality, and innovation.</em> With
          us, your QR codes are always{" "}
          <strong>tested, trusted, and ready to impress</strong>!
        </p>,
      ],
    },
    {
      key: "12",
      title: "Why Aren’t My QR Codes Working?",
      values: [
        <>
          Let’s Fix That! At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re committed to ensuring your QR codes are{" "}
          <strong>flawless, functional, and ready to deliver results</strong>.
          If you’re experiencing issues, don’t worry—we’ve got you covered with{" "}
          <strong>expert guidance and industry-leading support</strong>!
        </>,
        <p className="pt-3">
          <strong>Common Reasons for QR Code Issues</strong>
        </p>,
        <p>
          If you’re in the <em>trial period</em> or subscribed to any of our
          plans, your active QR codes should work perfectly. However, if they’re
          not scanning, it’s likely due to <em>design elements</em>. Here’s how
          to ensure your QR codes are <strong>scan-friendly</strong>:
        </p>,
        <p className="pt-3">
          <strong>Design Tips for Perfect QR Codes</strong>
        </p>,
        <ul>
          <li>
            <strong>Contrast is Key</strong>: Ensure there’s a{" "}
            <em>significant contrast</em> between the foreground (QR code) and
            the background. Low contrast can make scanning difficult.
          </li>
          <li>
            <strong>Size Matters</strong>: Make sure your QR code is the{" "}
            <em>right size</em> for the scanning distance.
            <ul>
              <li>
                Dynamic QR codes: Should not be smaller than{" "}
                <strong>2 x 2 cm</strong>.
              </li>
              <li>
                Static QR codes: Should not be smaller than{" "}
                <strong>3 x 3 cm</strong>.
              </li>
            </ul>
          </li>
          <li>
            <strong>Logo Placement</strong>: If you’re using a logo, ensure it
            doesn’t obstruct the <em>critical elements</em> of the QR code (like
            the positioning markers).
          </li>
        </ul>,
        <p className="pt-3">
          <strong>Why QR Smart Stands Out</strong>
        </p>,
        <p>
          While other providers leave you to figure things out on your own,{" "}
          <strong>QR Smart</strong> offers{" "}
          <strong>unmatched support and expertise</strong> to ensure your QR
          codes are always <em>scan-ready</em>. Our platform is designed to help
          you create QR codes that are not just functional but{" "}
          <strong>visually appealing and reliable</strong>.
        </p>,
        <p className="pt-3">
          <strong>Need Help? We’re Here for You!</strong>
        </p>,
        <p>
          If you’ve checked all the design elements and your QR codes still
          aren’t working, our <strong>dedicated support team</strong> is just a
          message away. We’ll help you troubleshoot and get your QR codes back
          on track in no time!
        </p>,
        <p>
          <strong>Choose QR Smart today</strong> and experience the{" "}
          <em>
            ultimate in QR code reliability, functionality, and innovation
          </em>
          . With us, your QR codes are always <strong>designed to work</strong>!
        </p>,
      ],
    },

    {
      key: "13",
      title: "What Data Is Collected in Dynamic QR Scans?",
      values: [
        <>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we don’t just create QR codes—we provide you with{" "}
          <strong>powerful insights</strong> to help you understand your
          audience and optimize your campaigns. With our{" "}
          <em>dynamic QR codes</em>, you’ll gain access to{" "}
          <strong>detailed analytics</strong> that no other QR code provider can
          match!
        </>,
        <p className="pt-3">
          <strong>Data Collected in Dynamic QR Scans</strong>
        </p>,
        <p>
          When you use <strong>QR Smart’s dynamic QR codes</strong>, you’ll be
          able to track:
        </p>,
        <ul>
          <li>
            <strong>Total Scans</strong>: The overall number of times your QR
            code has been scanned.
          </li>
          <li>
            <strong>Scans by Operating System</strong>: Know which devices (iOS,
            Android, etc.) are being used to scan your QR codes.
          </li>
          <li>
            <strong>Location Data</strong>: Understand where your scans are
            coming from, helping you target your audience more effectively.
          </li>
          <li>
            <strong>Unique Scans</strong>: Track the number of individual users
            scanning your QR code, giving you a clear picture of your reach.
          </li>
        </ul>,
        <p className="pt-3">
          <strong>Why QR Smart’s Analytics Stand Out</strong>
        </p>,
        <p>
          While other providers offer basic scan counts,{" "}
          <strong>QR Smart</strong> delivers{" "}
          <strong>comprehensive, actionable insights</strong> that help you make
          smarter decisions. Our analytics are designed to be{" "}
          <strong>user-friendly, accurate, and deeply informative</strong>, so
          you can focus on what matters most—growing your business.
        </p>,
        <p className="pt-3">
          <strong>Need QR Codes That Work Smarter for You?</strong>
        </p>,
        <p>
          <strong>Choose QR Smart today</strong> and unlock the power of{" "}
          <strong>advanced QR code analytics</strong>. With us, you’re not just
          creating QR codes—you’re gaining a <strong>competitive edge</strong>{" "}
          with data-driven insights!
        </p>,
        <p className="pt-3">
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re proud to offer the{" "}
          <strong>
            most reliable, innovative, and user-friendly QR code solutions
          </strong>{" "}
          in the industry. When you choose us, you’re choosing{" "}
          <strong>excellence, precision, and unmatched support</strong>. Let’s
          take your business to the next level together!
        </p>,
      ],
    },
    {
      key: "14",
      title: "How Do I Download My QR Code?",
      values: [
        <>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we make it <strong>simple and seamless</strong> to download your QR
          codes in the format that works best for you. Whether you’re printing,
          sharing digitally, or embedding in designs, we’ve got you covered with{" "}
          <em>unmatched flexibility and quality</em>!
        </>,
        <p className="pt-3">
          <strong>Download Your QR Code in Just a Few Clicks</strong>
        </p>,
        <p>
          1. Go to the <strong>"My QRs"</strong> section to view all your
          created QR codes.
        </p>,
        <p>
          2. Click on the QR code you want to download, or head to the{" "}
          <strong>"Detail"</strong> section of that specific QR code.
        </p>,
        <p>
          3. Choose your preferred format:{" "}
          <strong>PNG, JPEG, EPS, or SVG</strong>.
        </p>,
        <p>4. Download and use your QR code anywhere, anytime!</p>,
        <p className="pt-3">
          <strong>Why QR Smart Stands Out</strong>
        </p>,
        <ul>
          <li>
            <strong>Multiple Formats</strong>: Whether you need high-resolution
            prints (EPS/SVG) or web-friendly images (PNG/JPEG), we’ve got the
            perfect format for your needs.
          </li>
          <li>
            <strong>User-Friendly Platform</strong>: Our intuitive interface
            makes downloading QR codes quick and hassle-free.
          </li>
          <li>
            <strong>Industry-Leading Quality</strong>: Enjoy{" "}
            <strong>crisp, professional-quality QR codes</strong> that are ready
            to impress.
          </li>
        </ul>,
        <p>
          While other providers limit your options, <strong>QR Smart</strong>{" "}
          gives you the <strong>freedom and flexibility</strong> to download
          your QR codes in the format that suits your project best. We’re here
          to make your experience{" "}
          <strong>smooth, efficient, and stress-free</strong>.
        </p>,
        <p className="pt-3">
          <strong>Need QR Codes That Work Everywhere?</strong>
        </p>,
        <p>
          <strong>Choose QR Smart today</strong> and experience the{" "}
          <strong>ultimate in QR code versatility and quality</strong>. With us,
          your QR codes are always{" "}
          <strong>ready to download, share, and succeed</strong>!
        </p>,
        <p className="pt-3">
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re proud to offer the{" "}
          <strong>
            most reliable, innovative, and user-friendly QR code solutions
          </strong>{" "}
          in the industry. When you choose us, you’re choosing{" "}
          <strong>excellence, precision, and unmatched support</strong>. Let’s
          take your business to the next level together!
        </p>,
      ],
    },
    {
      key: "15",
      title: "How Do I Print My QR Code?",
      values: [
        <>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we make printing your QR codes{" "}
          <strong>simple, efficient, and hassle-free</strong>. Once you’ve
          downloaded your QR code in the format that works best for you (PNG,
          JPEG, EPS, or SVG), follow these easy steps to ensure a{" "}
          <strong>flawless printing experience</strong>:
        </>,
        <p className="pt-3">
          <strong>Steps to Print Your QR Code</strong>
        </p>,
        <p>
          1. <strong>Download Your QR Code</strong>: Head to the{" "}
          <strong>"My QRs"</strong> section or the <strong>"Detail"</strong>{" "}
          section of your QR code, and download it in your preferred format
          (PNG, JPEG, EPS, or SVG).
        </p>,
        <p>
          2. <strong>Test Before Printing</strong>: Always{" "}
          <strong>scan your QR code</strong> with your mobile device to confirm
          it works perfectly. This step ensures there are no surprises after
          printing!
        </p>,
        <p>
          3. <strong>Open the File</strong>: Open the downloaded QR code file on
          your computer using any image viewer or design software.
        </p>,
        <p>
          4. <strong>Adjust Settings</strong>: Ensure the QR code is sized
          appropriately for your print material (e.g., business cards, posters,
          flyers).
        </p>,
        <p>
          5. <strong>Print</strong>: Use your printer to produce a{" "}
          <strong>high-quality, scannable QR code</strong>.
        </p>,
        <p className="pt-3">
          <strong>Why QR Smart Stands Out</strong>
        </p>,
        <ul>
          <li>
            <strong>Crystal-Clear Quality</strong>: Our QR codes are designed to
            print <strong>crisp and clear</strong>, ensuring they scan perfectly
            every time.
          </li>
          <li>
            <strong>Flexible Formats</strong>: Whether you need a small QR code
            for business cards or a large one for banners, we provide the{" "}
            <strong>right format for every need</strong>.
          </li>
          <li>
            <strong>User-Friendly Process</strong>: From download to print, we
            make the entire process <strong>simple and stress-free</strong>.
          </li>
        </ul>,
        <p>
          While other providers leave you guessing, <strong>QR Smart</strong>{" "}
          ensures your QR codes are <strong>print-ready and reliable</strong>.
          We’re here to help you create QR codes that not only look great but
          also <strong>deliver results</strong>.
        </p>,
        <p className="pt-3">
          <strong>Need QR Codes That Print Perfectly?</strong>
        </p>,
        <p>
          <strong>Choose QR Smart today</strong> and experience the{" "}
          <strong>ultimate in QR code quality and reliability</strong>. With us,
          your QR codes are always{" "}
          <strong>ready to print, scan, and succeed</strong>!
        </p>,
        <p className="pt-3">
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re proud to offer the{" "}
          <strong>
            most reliable, innovative, and user-friendly QR code solutions
          </strong>{" "}
          in the industry. When you choose us, you’re choosing{" "}
          <strong>excellence, precision, and unmatched support</strong>. Let’s
          take your business to the next level together!
        </p>,
      ],
    },
    {
      key: "16",
      title: "How Many Plans Are There and How Are They Different?",
      values: [
        <>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re thrilled to offer <strong>3 flexible plans</strong> designed
          to meet your needs, whether you’re looking for short-term solutions or
          long-term value. Each plan gives you{" "}
          <strong>full access to all the powerful tools</strong> on our
          platform, with the difference lying in the{" "}
          <strong>duration and billing frequency</strong>. Plus, we’re excited
          to announce <strong>exclusive discounts</strong> on our plans, making
          it easier than ever to get started! And don’t forget, we offer a{" "}
          <strong>7-day free trial</strong> so you can explore the platform
          risk-free!
        </>,
        <p className="pt-3">
          <strong>Our Plans at a Glance</strong>
        </p>,
        <ul>
          <li className="pt-3">
            <strong>3-Month Plan</strong>
            <br />-{" "}
            <strong>
              Price: ~₹3,559.00/month~ Now just ₹2,900.00/month
            </strong>{" "}
            (Save ₹659/month!)
            <br />- <strong>Billing:</strong> Quarterly (billed every 3 months)
            <br />- <strong>Perfect For:</strong> Short-term projects or users
            who want flexibility without a long-term commitment.
          </li>
          <li className="pt-3">
            <strong>6-Month Plan</strong>
            <br />-{" "}
            <strong>
              Price: ~₹2,645.00/month~ Now just ₹2,200.00/month
            </strong>{" "}
            (Save ₹445/month!)
            <br />- <strong>Billing:</strong> Every semester (billed every 6
            months)
            <br />- <strong>Perfect For:</strong> Medium-term users who want to
            save more while enjoying extended access.
          </li>
          <li className="pt-3">
            <strong>12-Month Plan</strong>
            <br />-{" "}
            <strong>
              Price: ~₹1,732.00/month~ Now just ₹1,500.00/month
            </strong>{" "}
            (Save ₹232/month!)
            <br />- <strong>Billing:</strong> Annually (billed every 12 months)
            <br />- <strong>Perfect For:</strong> Long-term users who want the{" "}
            <strong>best value and maximum savings</strong>.
          </li>
        </ul>,
        <p className="pt-3">
          <strong>What’s Included in All Plans?</strong>
        </p>,
        <ul>
          <li>
            <strong>Unlimited QR Codes</strong>: Create as many QR codes as you
            need.
          </li>
          <li>
            <strong>Advanced Analytics</strong>: Track scans, locations,
            devices, and more.
          </li>
          <li>
            <strong>Customizable Designs</strong>: Add logos, colors, and
            branding to your QR codes.
          </li>
          <li>
            <strong>Multiple Formats</strong>: Download QR codes in PNG, JPEG,
            EPS, or SVG.
          </li>
          <li>
            <strong>Dynamic QR Codes</strong>: Edit and update your QR codes
            anytime.
          </li>
        </ul>,
        <p className="pt-3">
          <strong>Why Choose QR Smart?</strong>
        </p>,
        <p>
          While other providers limit your options, <strong>QR Smart</strong>{" "}
          gives you{" "}
          <strong>unmatched flexibility, affordability, and value</strong>.
          Whether you’re a small business, a marketer, or a large enterprise, we
          have the perfect plan to help you succeed.
        </p>,
        <p className="pt-3">
          <strong>Try Us Risk-Free!</strong>
        </p>,
        <p>
          Take advantage of our <strong>7-day free trial</strong> to explore the
          platform and see why{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>{" "}
          is the <strong>best QR code provider</strong> in the industry. When
          you’re ready, choose the plan that works best for you and start
          creating <strong>powerful, reliable, and innovative QR codes</strong>{" "}
          today!
        </p>,
        <p className="pt-3">
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re proud to offer the{" "}
          <strong>
            most reliable, innovative, and user-friendly QR code solutions
          </strong>{" "}
          in the industry. When you choose us, you’re choosing{" "}
          <strong>excellence, precision, and unmatched support</strong>. Let’s
          take your business to the next level together!
        </p>,
        <p>
          <strong>
            Don’t miss out on these exclusive discounts—upgrade your QR code
            game with QR Smart today!
          </strong>{" "}
          🎉
        </p>,
      ],
    },
    {
      key: "17",
      title: "What Payment Methods Does QR Smart Accept?",
      values: [
        <>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we make payments <strong>easy and convenient</strong> for our
          customers! We accept a wide range of payment methods, ensuring that
          you can choose the option that best suits you. Whether you prefer
          traditional cards, online wallets, or meal cards, we've got you
          covered.
        </>,
        <p>
          Here are the <strong>payment methods</strong> we support:
        </p>,
        <ul>
          <li className="pt-3">
            <strong>Credit & Debit Cards:</strong>
            <br />
            - Visa
            <br />
            - Mastercard
            <br />
            - American Express
            <br />
            - Rupay
            <br />
            - Maestro
            <br />- Diners Club
          </li>
          <li className="pt-3">
            <strong>UPI Payments:</strong>
            <br />- UPI (Unified Payments Interface) for quick and secure
            transactions
          </li>
          <li className="pt-3">
            <strong>Netbanking:</strong>
            <br />- Over <strong>50 netbanking options</strong> supported,
            giving you the freedom to pay using your preferred bank
          </li>
          <li className="pt-3">
            <strong>Mobile Wallets:</strong>
            <br />
            - Mobikwik
            <br />
            - PayUmoney
            <br />
            - FreeCharge
            <br />
            - Airtel Money
            <br />
            - Ola Money
            <br />- PayZapp
          </li>
          <li className="pt-3">
            <strong>Meal Cards:</strong>
            <br />- We also accept <strong>meal cards</strong> for added
            convenience
          </li>
        </ul>,
        <p className="pt-3">
          At <strong>QR Smart</strong>, we are committed to providing{" "}
          <strong>flexible payment solutions</strong> that ensure you have the
          best experience possible. No matter how you prefer to pay, we’ve made
          it easy for you to get started with our services!
        </p>,
        <p>
          <strong>Ready to get started with QR Smart?</strong> Choose your
          payment method and join the <strong>best QR code platform</strong>{" "}
          today!
        </p>,
      ],
    },
    {
      key: "18",
      title: "Can I Change or Update My Payment Method?",
      values: [
        <>
          Yes, with{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , <strong>updating or changing your payment method</strong> is quick
          and easy! We understand that flexibility is key, and we’ve designed
          our platform to make this process as simple as possible for you.
        </>,
        <p>To update your payment method:</p>,
        <ol>
          <li>
            Go to the <strong>"My Plans"</strong> section
          </li>
          <li>
            Click on <strong>"Update Card"</strong>
          </li>
          <li>Follow the easy steps to enter your new payment details</li>
        </ol>,
        <p className="pt-3">
          At <strong>QR Smart</strong>, we provide seamless and hassle-free
          solutions, ensuring you never face any interruptions with your
          payments. Whether you're using <strong>Visa, Mastercard, UPI</strong>,
          or any other payment method, we make managing your account{" "}
          <strong>easy and convenient</strong>.
        </p>,
        <p>
          <strong>Need to update your payment details?</strong> With{" "}
          <strong>QR Smart</strong>, you can handle it in just a few clicks and
          keep your QR code services running smoothly.{" "}
          <strong>Join us today</strong> and experience the best in QR code
          innovation.
        </p>,
      ],
    },
    {
      key: "19",
      title: "Where Can I Download My Invoices?",
      values: [
        <>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we make managing your account and payments{" "}
          <strong>simple, transparent, and hassle-free</strong>. Need your
          invoice? No problem! Here’s how you can easily download it:
        </>,
        <p className="pt-3">
          <strong>Steps to Download Your Invoice</strong>
        </p>,
        <ol>
          <li>
            Go to the <strong>"Plans and Payments"</strong> section in your
            account.
          </li>
          <li>
            Click on the <strong>invoice icon</strong> next to your payment
            details.
          </li>
          <li>
            Fill out the form with your <strong>tax information</strong> (if
            required).
          </li>
          <li>Download your invoice instantly!</li>
        </ol>,
        <p className="pt-3">
          <strong>Why QR Smart Stands Out</strong>
        </p>,
        <ul>
          <li>
            <strong>Easy Access</strong>: Your invoices are just a click away,
            making financial management a breeze.
          </li>
          <li>
            <strong>Transparent Process</strong>: We provide clear, detailed
            invoices for all your payments.
          </li>
          <li>
            <strong>Dedicated Support</strong>: If you encounter any issues, our
            support team is always ready to help.
          </li>
        </ul>,
        <p className="pt-3">
          <strong>Need Help? We’re Here for You!</strong> If you have any
          trouble downloading your invoice or filling out the form, don’t
          hesitate to reach out to our <strong>support team</strong>. We’re here
          to ensure your experience with{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>{" "}
          is seamless and stress-free.
        </p>,
        <p className="pt-3">
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re proud to offer the{" "}
          <strong>
            most reliable, innovative, and user-friendly QR code solutions
          </strong>{" "}
          in the industry. When you choose us, you’re choosing{" "}
          <strong>excellence, precision, and unmatched support</strong>. Let’s
          take your business to the next level together.
        </p>,
        <p>
          <strong>Need your invoice?</strong> Download it in seconds and enjoy
          the convenience of QR Smart today.
        </p>,
      ],
    },
    {
      key: "20",
      title: "When Can I Start Using the Purchased Plan?",
      values: [
        <>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we believe in{" "}
          <strong>instant access and seamless experiences</strong>. As soon as
          your payment is successfully processed, you can{" "}
          <strong>immediately start using all the powerful tools</strong> on our
          platform. No delays, no waiting—just instant access to create, manage,
          and track your QR codes like a pro!
        </>,
        <p className="pt-3">
          <strong>Why QR Smart Stands Out</strong>
        </p>,
        <ul>
          <li>
            <strong>Instant Activation</strong>: Your plan is activated the
            moment your payment is confirmed.
          </li>
          <li>
            <strong>Full Access</strong>: Start using all features, including{" "}
            <strong>
              unlimited QR codes, advanced analytics, customizable designs, and
              more
            </strong>
            .
          </li>
          <li>
            <strong>No Hidden Delays</strong>: We value your time, so we ensure
            you can get started right away.
          </li>
        </ul>,
        <p className="pt-3">
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re proud to offer the{" "}
          <strong>
            most reliable, innovative, and user-friendly QR code solutions
          </strong>{" "}
          in the industry. When you choose us, you’re choosing{" "}
          <strong>excellence, precision, and unmatched support</strong>. Let’s
          take your business to the next level together.
        </p>,
        <p>
          <strong>Ready to get started?</strong> Make your payment and unlock
          the full power of QR Smart today!
        </p>,
      ],
    },
    {
      key: "21",
      title: "How Long Does My Subscription Last?",
      values: [
        <>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we offer <strong>flexible subscription plans</strong> designed to
          fit your needs. The duration of your subscription depends on the plan
          you choose. Here’s a quick breakdown of our plans:
        </>,
        <p className="pt-3">
          <strong>Our Subscription Plans</strong>
        </p>,
        <ul>
          <li>
            <strong>Quarterly Plan</strong>: Duration: 3 months. Perfect for
            short-term projects or users who want flexibility without a
            long-term commitment.
          </li>
          <li>
            <strong>Semi-Annual Plan</strong>: Duration: 6 months. Ideal for
            medium-term users who want extended access and savings.
          </li>
          <li>
            <strong>Annual Plan</strong>: Duration: 12 months. Best for
            long-term users who want the{" "}
            <strong>ultimate value and maximum savings</strong>.
          </li>
        </ul>,
        <p className="pt-3">
          <strong>What’s Included in All Plans</strong>
        </p>,
        <ul>
          <li>
            <strong>Unlimited QR Codes</strong>: Create as many QR codes as you
            need.
          </li>
          <li>
            <strong>Advanced Analytics</strong>: Track scans, locations,
            devices, and more.
          </li>
          <li>
            <strong>Customizable Designs</strong>: Add logos, colors, and
            branding to your QR codes.
          </li>
          <li>
            <strong>Multiple Formats</strong>: Download QR codes in PNG, JPEG,
            EPS, or SVG.
          </li>
          <li>
            <strong>Dynamic QR Codes</strong>: Edit and update your QR codes
            anytime.
          </li>
        </ul>,
        <p className="pt-3">
          <strong>Why Choose QR Smart?</strong> While other providers limit your
          options, <strong>QR Smart</strong> gives you{" "}
          <strong>unmatched flexibility, affordability, and value</strong>.
          Whether you’re a small business, a marketer, or a large enterprise, we
          have the perfect plan to help you succeed.
        </p>,
        <p className="pt-3">
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re proud to offer the{" "}
          <strong>
            most reliable, innovative, and user-friendly QR code solutions
          </strong>{" "}
          in the industry. When you choose us, you’re choosing{" "}
          <strong>excellence, precision, and unmatched support</strong>. Let’s
          take your business to the next level together.
        </p>,
        <p>
          Choose the plan that works best for you and start creating powerful,
          reliable, and innovative QR codes today!
        </p>,
      ],
    },
    {
      key: "22",
      title: "Is My Subscription Renewal Automatic?",
      values: [
        <>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we make managing your subscription simple and hassle-free. Yes, your
          subscription will renew automatically to ensure uninterrupted access
          to all our powerful tools and features. Here’s what you need to know:
        </>,
        <p className="pt-3">
          <strong>Automatic Renewal Details</strong>
        </p>,
        <ul>
          <li>
            Renewal Process: Your subscription will automatically renew at the
            end of its term (quarterly, semi-annual, or annual) unless you
            cancel it at least one day before the renewal date
          </li>
          <li>
            No Interruptions: Automatic renewal ensures you never lose access to
            your QR codes and analytics.
          </li>
          <li>
            Cancellation Policy: If you wish to cancel, make sure to do so
            before the renewal date. Once the renewal is processed, it cannot be
            canceled.
          </li>
        </ul>,
        <p className="pt-3">
          <strong>Why Choose QR Smart?</strong>
        </p>,
        <ul>
          <li>
            Seamless Experience: We handle the renewal process so you can focus
            on creating and managing your QR codes.
          </li>
          <li>
            {" "}
            Flexible Plans: Choose from quarterly, semi-annual, or annual plans
            to suit your needs.
          </li>
          <li>
            Cancellation Policy: If you wish to cancel, make sure to do so
            before the renewal date. Once the renewal is processed, it cannot be
            canceled.
          </li>
        </ul>,
        <p className="pt-3">
          <strong>Need to Cancel or Make Changes?</strong>
        </p>,
        <ul>
          <li>
            If you’d like to cancel your subscription or switch plans, simply do
            so before the renewal date through your account settings. We’re here
            to make the process as smooth as possible!
          </li>
        </ul>,
        <p className="pt-3">
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re proud to offer the{" "}
          <strong>
            most reliable, innovative, and user-friendly QR code solutions
          </strong>{" "}
          in the industry. When you choose us, you’re choosing{" "}
          <strong>excellence, precision, and unmatched support</strong>. Let’s
          take your business to the next level together.
        </p>,
        <p>
          Enjoy uninterrupted access to the best QR code tools—choose QR Smart
          today!
        </p>,
      ],
    },
    {
      key: "23",
      title: "How Do I Cancel My Subscription?",
      values: [
        <>
          We’re sorry to hear that you want to cancel, but *QR Smart* makes the
          process quick and easy!
        </>,
        <p className="pt-3">
          <strong>To cancel your subscription: </strong>
        </p>,
        <ul>
          <li>
            Go to the <strong>"Billing"</strong>section in your account{" "}
          </li>
          <li>
            Click on the <strong>cancel </strong>subscription* option{" "}
          </li>
          <li>
            Cancellation Policy: If you wish to cancel, make sure to do so
            before the renewal date. Once the renewal is processed, it cannot be
            canceled.
          </li>
        </ul>,
        <p className="pt-3">
          Alternatively, you can also cancel by <strong>clicking here</strong>.
        </p>,
        <p>
          At{" "}
          <strong>
            QR Smart, we want to make sure you have a smooth experience, and
            we're always here to provide you with the **best possible QR code
            solutions.
          </strong>{" "}
          If you ever change your mind, we’re just a few clicks away from
          reactivating your account.
        </p>,
        <p>
          <strong>Need to cancel?</strong> We’ve made it easy, but we’ll miss
          you! 😊
        </p>,
      ],
    },
    {
      key: "24",
      title: "What Happens to My QR Codes If My Subscription Is Canceled?",
      values: [
        <p>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we understand how important your QR codes and data are to your
          business. Here’s what happens if your subscription is canceled:
        </p>,
        <p className="pt-3">
          <strong>After Subscription Cancellation</strong>
        </p>,
        <ul>
          <li>
            <strong>Your QR Codes Stay Safe</strong>: Your QR codes won’t go
            anywhere—they’ll remain intact and functional.
          </li>
          <li>
            <strong>Access Restricted</strong>: You won’t be able to{" "}
            <strong>access, edit, or view the collected data</strong> (scans,
            locations, devices, etc.) until you renew or update your plan.
          </li>
          <li>
            <strong>Reactivate Anytime</strong>: Simply renew your subscription
            to regain full access to your QR codes and analytics.
          </li>
        </ul>,
        <p>
          <strong>Important Note</strong>: Your QR codes will{" "}
          <strong>only disappear permanently</strong> if you{" "}
          <strong>delete your QR Smart account</strong> under the guidelines of{" "}
          <strong>The American Data Privacy and Protection Act (ADPPA)</strong>.
          Until then, your data and QR codes are safe with us.
        </p>,
        <p className="pt-3">
          <strong>Why Choose QR Smart?</strong>
        </p>,
        <ul>
          <li>
            <strong>Data Security</strong>: We prioritize the safety and privacy
            of your QR codes and data.
          </li>
          <li>
            <strong>Flexible Plans</strong>: Choose from quarterly, semi-annual,
            or annual plans to suit your needs.
          </li>
          <li>
            <strong>Unmatched Support</strong>: Our team is always here to help
            with any questions or concerns.
          </li>
        </ul>,
        <p className="pt-3">
          <strong>Need to Reactivate Your Plan?</strong> If you’d like to regain
          access to your QR codes and data, simply renew your subscription
          through your account. We’re here to make the process as smooth as
          possible!
        </p>,
        <p className="pt-3">
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re proud to offer the{" "}
          <strong>
            most reliable, innovative, and user-friendly QR code solutions
          </strong>{" "}
          in the industry. When you choose us, you’re choosing{" "}
          <strong>excellence, precision, and unmatched support</strong>. Let’s
          take your business to the next level together!
        </p>,
        <p>
          Your QR codes are safe with us—renew your plan today and keep your
          business running smoothly!
        </p>,
      ],
    },
    {
      key: "25",
      title: "Do You Offer Refunds for Unused Subscription Periods?",
      values: [
        <p>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we do not offer refunds for unused subscription periods. However, we
          provide <strong>full control</strong> over your subscription, allowing
          you to cancel at any time to prevent automatic renewal.
        </p>,
        <p className="pt-3">
          To <strong>avoid renewal charges</strong>, simply:
        </p>,
        <ul>
          <li>
            Go to the <strong>"Billing"</strong> section in your account
          </li>
          <li>
            Click on the <strong>cancel subscription</strong> option
          </li>
        </ul>,
        <p className="pt-3">
          With <strong>QR Smart</strong>, you get{" "}
          <strong>complete flexibility</strong> and transparency in managing
          your subscription. If you decide to return in the future, we’ll always
          be here with the <strong>best QR code solutions</strong>!
        </p>,
        <p>
          <strong>
            Manage your subscription easily with QR Smart—your ultimate QR code
            partner!
          </strong>
        </p>,
      ],
    },
    {
      key: "26",
      title: "How Long Is the Trial Period?",
      values: [
        <p>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we offer a <strong>7-day trial period</strong> where you can{" "}
          <em>fully explore</em> our powerful QR code generator. During this
          time, you can test all the features, customize your QR codes, and see
          firsthand why <strong>QR Smart</strong> is the{" "}
          <strong>best QR solution available!</strong>
        </p>,
        <p>
          <strong>
            Enjoy the full experience for 7 days—no commitment, just innovation!
          </strong>{" "}
          Try <strong>QR Smart</strong> today!
        </p>,
      ],
    },
    {
      key: "27",
      title: "What Type of Access Does the Trial Period Give Me?",
      values: [
        <p>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we believe in <strong>transparency and confidence</strong>. That’s
          why our <strong>7-day free trial</strong> gives you{" "}
          <em>full access</em> to all of our powerful tools and features. We
          want you to experience everything our platform has to offer so you can
          make an informed decision.
        </p>,
        <p className="pt-3">
          <strong>What’s Included in the Trial Period?</strong>
        </p>,
        <ul>
          <li>
            <strong>Unlimited QR Codes</strong>: Create as many QR codes as you
            need.
          </li>
          <li>
            <strong>Advanced Analytics</strong>: Track scans, locations,
            devices, and more.
          </li>
          <li>
            <strong>Customizable Designs</strong>: Add logos, colors, and
            branding to your QR codes.
          </li>
          <li>
            <strong>Multiple Formats</strong>: Download QR codes in PNG, JPEG,
            EPS, or SVG.
          </li>
          <li>
            <strong>Dynamic QR Codes</strong>: Edit and update your QR codes
            anytime.
          </li>
        </ul>,
        <p className="pt-3">
          <strong>Why Choose QR Smart?</strong> While other providers limit your
          trial experience, <strong>QR Smart</strong> gives you{" "}
          <strong>complete access</strong> to evaluate our platform thoroughly.
          We’re confident that once you see the power and flexibility of our
          tools, you’ll never look back!
        </p>,
        <p className="pt-3">
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re proud to offer the{" "}
          <strong>
            most reliable, innovative, and user-friendly QR code solutions
          </strong>{" "}
          in the industry. When you choose us, you’re choosing{" "}
          <strong>excellence, precision, and unmatched support</strong>. Let’s
          take your business to the next level together!
        </p>,
        <p>
          <strong>
            Ready to experience the best? Start your 7-day free trial today and
            see why QR Smart is the ultimate QR code solution!
          </strong>
        </p>,
      ],
    },
    {
      key: "28",
      title: "Can the Trial Period Be Extended?",
      values: [
        <p>
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we understand that you might want more time to explore our platform,
          but the <strong>trial period is fixed at 7 days</strong>. This gives
          you ample time to test all our tools and features thoroughly. After
          the trial period ends, you can continue using the platform by
          subscribing to one of our{" "}
          <strong>flexible and affordable plans</strong>.
        </p>,
        <p className="pt-3">
          <strong>Why Choose QR Smart?</strong>
        </p>,
        <ul>
          <li>
            <strong>Full Access During Trial</strong>: Experience all our tools
            and features without limitations.
          </li>
          <li>
            <strong>Seamless Transition</strong>: Once the trial ends, you can
            easily subscribe to a plan that fits your needs.
          </li>
          <li>
            <strong>Unmatched Value</strong>: Our plans are designed to provide
            the <strong>best value and flexibility</strong> for businesses of
            all sizes.
          </li>
        </ul>,
        <p className="pt-3">
          <strong>Ready to Continue?</strong>
        </p>,
        <p>
          If you’ve enjoyed the trial and want to keep using{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , simply choose from our{" "}
          <strong>quarterly, semi-annual, or annual plans</strong> to continue
          creating, managing, and tracking your QR codes like a pro!
        </p>,
        <p className="pt-3">
          At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , we’re proud to offer the{" "}
          <strong>
            most reliable, innovative, and user-friendly QR code solutions
          </strong>{" "}
          in the industry. When you choose us, you’re choosing{" "}
          <strong>excellence, precision, and unmatched support</strong>. Let’s
          take your business to the next level together!
        </p>,
        <p>
          <strong>
            Don’t let the trial end without experiencing the full power of QR
            Smart—subscribe today and keep the momentum going!
          </strong>
        </p>,
      ],
    },
    {
      key: "29",
      title:
        "Can I Use QR Codes Generated in the Trial Period for Commercial Purposes?",
      values: [
        <p>
          <strong> Yes!</strong> At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , even during the trial period, you can use your QR codes for any
          commercial purpose without limitations. Our QR codes are designed to
          be secure, dynamic, customizable, and trackable, helping businesses
          engage customers, improve operations, and increase revenue
          effortlessly.
        </p>,
        <p>
          That’s a great decision! Here is the{" "}
          <strong>full list of 1,000 commercial uses for QR codes</strong>,
          showing just how powerful and versatile{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>{" "}
          is for businesses across <strong>every industry</strong>.
        </p>,
        <p>
          <strong></strong>
        </p>,
      ],
    },
    {
      key: "30",
      title:
        "Can I Use QR Codes Generated in the Trial Period for Commercial Purposes?",
      values: [
        <p>
          <strong>Yes!</strong> At{" "}
          <strong>
            <a
              href="https://qrsmart.us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QR Smart
            </a>
          </strong>
          , even during the <strong>trial period</strong>, you can use your QR
          codes <strong>for any commercial purpose</strong> without limitations.
          Our QR codes are designed to be{" "}
          <strong>secure, dynamic, customizable, and trackable</strong>, helping
          businesses{" "}
          <strong>
            engage customers, improve operations, and increase revenue
            effortlessly
          </strong>
          .
        </p>,
      ],
    },
    {
      key: "31",
      title: "1,000 Ways to Use QR Codes for Commercial Purposes",
      values: [
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p>
              <strong>1-200: Retail & E-Commerce</strong>
            </p>
            <ol>
              <li>1. Product packaging QR codes</li>
              <li>2. Digital product labels</li>
              <li>3. Price tags with QR codes</li>
              <li>4. Scan-to-buy product pages</li>
              <li>5. Loyalty program sign-ups</li>
              <li>6. Online product catalogs</li>
              <li>7. Promotional discounts & coupons</li>
              <li>8. Personalized QR codes on receipts</li>
              <li>9. Customer feedback QR codes</li>
              <li>10. Scan to compare product reviews</li>
              <li>11. QR codes on mannequins in clothing stores</li>
              <li>12. Self-checkout QR codes</li>
              <li>13. QR codes for inventory tracking</li>
              <li>14. Buy-now QR codes on ads</li>
              <li>15. QR codes linking to exclusive online sales</li>
              <li>16. Store navigation QR codes</li>
              <li>17. Virtual shopping assistants via QR codes</li>
              <li>18. QR codes for in-store pickup instructions</li>
              <li>19. Scan-to-order feature in retail stores</li>
              <li>20. QR codes for product recall alerts</li>
              <li>21. Customer support QR code helpdesk</li>
              <li>22. Augmented reality try-on feature</li>
              <li>23. Personalized shopping experiences via QR codes</li>
              <li>24. QR codes for product demos</li>
              <li>25. QR codes linking to user manuals</li>
              <li>26. Instant restock notifications via QR codes</li>
              <li>27. Gift card balance checks via QR codes</li>
              <li>28. Digital warranty registrations</li>
              <li>29. QR codes for mobile payment integration</li>
              <li>30. QR codes for brand authentication</li>
              <li>31. Contactless delivery verification</li>
              <li>32. QR codes on shipping labels</li>
              <li>33. Eco-friendly paperless receipts</li>
              <li>34. Scan for product repair services</li>
              <li>35. QR codes for reseller authentication</li>
              <li>36. QR codes for product sustainability info</li>
              <li>37. Custom product engraving ordering via QR codes</li>
              <li>38. QR codes to sign up for newsletters</li>
              <li>39. QR codes for free sample requests</li>
              <li>40. QR codes for restocking subscriptions</li>
              <li>41. QR codes for in-store scavenger hunts</li>
              <li>42. QR codes for trending product lists</li>
              <li>43. QR codes for seasonal promotions</li>
              <li>44. QR codes for influencer collaborations</li>
              <li>
                45. QR codes linking to corporate responsibility initiatives
              </li>
              <li>46. Scan for “Shop the Look” collections</li>
              <li>47. QR codes for instant credit approvals</li>
              <li>48. QR codes to find local product availability</li>
              <li>49. Scan for alternative product recommendations</li>
              <li>50. QR codes for social commerce integration</li>
            </ol>
            ,
          </div>
          <div>
            <p className="pt-3">
              <strong>201-300: Restaurants & Food Services</strong>
            </p>

            <ol>
              <li>201. QR code menus</li>
              <li>202. Contactless ordering & payment</li>
              <li>203. QR codes for table reservations</li>
              <li>204. QR codes for digital receipts</li>
              <li>205. QR codes for special promotions</li>
              <li>206. Scan-to-order room service in hotels</li>
              <li>207. QR codes for self-checkout at food kiosks</li>
              <li>208. QR codes for subscription meal plans</li>
              <li>209. Scan for allergy-friendly meal options</li>
              <li>210. QR codes for personalized nutrition info</li>
              <li>211. Scan for chef-curated wine pairings</li>
              <li>212. QR codes to book private dining experiences</li>
              <li>213. QR codes for tracking order status</li>
              <li>214. QR codes for requesting dietary modifications</li>
              <li>215. QR codes for interactive cooking classes</li>
              <li>216. QR codes for automatic tipping options</li>
              <li>217. QR codes for exclusive VIP club access</li>
              <li>218. QR codes for event catering bookings</li>
              <li>219. Scan for instant food ordering at stadiums</li>
              <li>220. QR codes for digital cookbook downloads</li>
            </ol>
          </div>
          <div>
            <p className="pt-3">
              <strong>301-400: Marketing & Advertising</strong>
            </p>
            <ol>
              <li>301. QR codes on billboards</li>
              <li>302. QR codes on digital ads</li>
              <li>303. QR codes for email marketing</li>
              <li>304. QR codes for SMS promotions</li>
              <li>305. QR codes for influencer campaigns</li>
              <li>306. QR codes for affiliate marketing tracking</li>
              <li>307. QR codes on magazine ads</li>
              <li>308. QR codes on TV commercials</li>
              <li>309. QR codes on direct mail</li>
              <li>310. QR codes for viral marketing campaigns</li>
            </ol>
          </div>
          <div>
            <p className="pt-3">
              <strong>401-500: Business & Corporate</strong>
            </p>
            <ol>
              <li>401. Employee ID badges with QR authentication</li>
              <li>402. QR codes for corporate event check-ins</li>
              <li>403. QR codes on business presentations</li>
              <li>404. QR codes on recruitment posters</li>
              <li>405. QR codes for job applications</li>
              <li>406. QR codes for internal memos</li>
              <li>407. QR codes for company newsletters</li>
              <li>408. QR codes on official business documents</li>
            </ol>
          </div>
          <div>
            <p className="pt-3">
              <strong>501-600: Transportation & Logistics</strong>
            </p>
            <ol>
              <li>501. QR codes on parking tickets</li>
              <li>502. Public transport schedules</li>
              <li>503. Digital airline boarding passes</li>
              <li>504. QR codes for toll payments</li>
              <li>505. QR-coded shipping labels</li>
              <li>506. QR codes for real-time shipment tracking</li>
            </ol>
          </div>
          <div>
            <p className="pt-3">
              <strong>601-700: Finance & Payments</strong>
            </p>
            <ol>
              <li>601. QR codes for mobile payments</li>
              <li>602. QR codes for PayPal transactions</li>
              <li>603. QR codes for cryptocurrency payments</li>
            </ol>
          </div>
          <div>
            <p className="pt-3">
              <strong>701-800: Healthcare & Wellness</strong>
            </p>
            <ol>
              <li>701. QR codes for digital medical records</li>
              <li>702. QR codes on prescription labels</li>
              <li>703. QR codes for virtual doctor consultations</li>
            </ol>
          </div>
          <div>
            <p className="pt-3">
              <strong>801-900: Real Estate & Property Management</strong>
            </p>
            <ol>
              <li>801. QR codes on property listings</li>
              <li>802. QR codes for digital rental applications</li>
              <li>803. QR codes for smart home automation</li>
            </ol>
          </div>
          <div>
            <p className="pt-3">
              <strong>901-1,000: Education & Training</strong>
            </p>
            <ol>
              <li>901. QR codes on digital textbooks</li>
              <li>902. QR codes for online courses</li>
              <li>903. QR codes for virtual classroom access</li>
            </ol>
          </div>
        </div>,
      ],
    },
    {
      key: "32",
      title: "QR Smart: The Best QR Code Solution for Your Business!",
      values: [
        <>
          <p>
            At <em>QR Smart</em>, we provide:
          </p>
          <ul className="pt-3">
            <li>
              <strong>Secure & Reliable QR Codes</strong> – End-to-end
              encryption like WhatsApp
            </li>
            <li>
              <strong>Customizable & Dynamic QR Codes</strong> – Edit anytime,
              even after printing
            </li>
            <li>
              <strong>Trackable Analytics</strong> – Know how, when, and where
              your QR codes are scanned
            </li>
            <li>
              <strong>Multi-Platform Support</strong> – Works on all devices &
              operating systems
            </li>
            <li>
              <strong>Enterprise-Grade Security</strong> – Protected by{" "}
              <em>SSL encryption & Cloudflare security</em>
            </li>
          </ul>
          <p className="pt-3">
            <em>Start using QR Smart today</em> and transform your business with
            the most powerful QR code technology available! 🚀
          </p>
          <p>
            <strong>
              <a href="https://qrsmart.us/">Get Started Now</a>
            </strong>
          </p>
        </>,
      ],
    },
    {
      key: "33",
      title:
        "Should I Cancel the Trial Period If I Am Not Going to Continue Using the Platform?",
      values: [
        <>
          <p>
            At <em>QR Smart</em>, we prioritize{" "}
            <strong>user convenience and flexibility</strong>. You do{" "}
            <strong>not</strong> need to cancel the trial period manually. It
            will <strong>automatically expire after 7 days</strong> without any
            charges or obligations.
          </p>
          <ul>
            <li>
              <strong>No hidden fees</strong>
            </li>
            <li>
              <strong>No auto-renewal</strong>
            </li>
            <li>
              <strong>No need to cancel manually</strong>
            </li>
          </ul>
          <p className="pt-3">
            If you’re on a <em>paid plan</em>, you can cancel at any time.
            However, we’re confident that once you experience the{" "}
            <strong>power, security, and flexibility</strong> of{" "}
            <em>QR Smart</em>, you’ll want to continue using our platform for
            all your <strong>QR code needs</strong>! 🚀
          </p>
          <p>
            ✨{" "}
            <strong>
              Join QR Smart today and experience the future of QR technology!
            </strong>
          </p>
        </>,
      ],
    },
    {
      key: "34",
      title: "What Happens to My QR Codes Once the Trial Period Ends?",
      values: [
        <>
          <p>
            At <em>QR Smart</em>, we ensure that your{" "}
            <strong>QR codes remain safe and accessible</strong> even after your
            trial period ends.
          </p>
          <ul className="pt-3">
            <li>
              <strong>Storage Duration:</strong> Your QR codes will be{" "}
              <strong>securely stored for three months</strong> after the trial
              ends.
            </li>
            <li>
              <strong>Access Restriction:</strong> During this period, you won’t
              be able to use or edit them unless you{" "}
              <strong>subscribe to one of our plans</strong>.
            </li>
            <li>
              <strong>Instant Reactivation:</strong> Once you choose a plan,
              your QR codes will be <strong>immediately restored</strong>{" "}
              without any data loss.
            </li>
          </ul>
          <p className="pt-3">
            With <em>QR Smart</em>, your QR codes are always{" "}
            <strong>protected, encrypted, and ready for use</strong> whenever
            you decide to continue!
          </p>
        </>,
      ],
    },
    {
      key: "35",
      title: "What are Static QR Codes and How Can They Be Used?",
      values: [
        <>
          <p>
            At <em>QR Smart</em>, we provide the most{" "}
            <strong>secure, reliable, and versatile QR code solutions</strong>{" "}
            for every need! <strong>Static QR codes</strong> are a fantastic way
            to <em>share unchanging information</em> in a seamless and efficient
            manner. Unlike <strong>dynamic QR codes</strong>, which allow linked
            content to be updated, <strong>static QR codes</strong> keep
            information <em>constant</em> over time, making them{" "}
            <em>ideal for various applications</em>. Here are three{" "}
            <strong>real-world examples</strong> showcasing their{" "}
            <strong>practical benefits</strong>:
          </p>

          <h3 className="pt-3">
            <strong>Example 1:</strong> Wi-Fi Access in a Coffee Shop
          </h3>
          <p>
            Imagine a <em>coffee shop</em> that offers{" "}
            <strong>free Wi-Fi</strong> to its customers. By using a{" "}
            <strong>static QR code</strong> generated by <em>QR Smart</em>, the
            shop can create a unique code that{" "}
            <strong>instantly connects customers</strong> to the Wi-Fi network.
            Since this code remains <strong>constant over time</strong>,
            customers can <strong>easily scan and connect</strong> without the
            business needing to update or replace the QR code.
          </p>
          <ul>
            <li className="pl-3">
              <strong>Simple & user-friendly</strong>
            </li>
            <li className="pl-3">
              <strong>No need to repeatedly share passwords</strong>
            </li>
            <li className="pl-3">
              <strong>Enhances customer experience</strong>
            </li>
          </ul>

          <h3 className="pt-3">
            <strong>Example 2:</strong> Museum Audio Guides{" "}
          </h3>
          <p>
            A <em>museum</em> can use{" "}
            <strong>QR Smart’s static QR codes</strong> to provide visitors with{" "}
            <strong>instant access to audio guides</strong> for different
            exhibits. By scanning the QR code placed near an artwork or
            historical artifact, visitors can{" "}
            <strong>
              listen to detailed descriptions, artist backgrounds, or historical
              facts
            </strong>{" "}
            without needing printed brochures or tour guides. Since the audio
            guide remains the same over time, a <strong>static QR code</strong>{" "}
            is the <strong>perfect solution</strong>!
          </p>
          <ul>
            <li className="pl-3">
              <strong>No need for costly updates</strong>
            </li>
            <li className="pl-3">
              <strong>Enhances visitor engagement</strong>
            </li>
            <li className="pl-3">
              <strong>Eliminates the need for printed materials</strong>
            </li>
          </ul>

          <h3 className="pt-3">
            <strong>Example 3:</strong> Emergency Contact Information
          </h3>
          <p>
            Imagine a <em>medical alert bracelet</em> that contains a{" "}
            <strong>static QR code</strong> generated by <em>QR Smart</em>. When
            scanned, this QR code provides{" "}
            <strong>essential medical details</strong> such as allergies, blood
            type, and emergency contacts. Since this information does not need
            frequent updates, a <strong>static QR code</strong> ensures that
            first responders <strong>always</strong> have quick and easy access
            to <strong>life-saving information</strong>!
          </p>
          <ul>
            <li className="pl-3">
              <strong>Reliable and permanent information storage</strong>
            </li>
            <li className="pl-3">
              <strong>Accessible anytime, anywhere</strong>
            </li>
            <li className="pl-3">
              <strong>
                Ideal for hospitals, schools, or personal wearables
              </strong>
            </li>
          </ul>

          <p className="pt-3">
            At <em>QR Smart</em>, we believe in{" "}
            <strong>innovation, security, and convenience</strong>. Whether it's{" "}
            <strong>
              Wi-Fi access, museum guides, medical details, or any other use
              case
            </strong>
            , our <strong>state-of-the-art QR technology</strong> ensures{" "}
            <strong>seamless integration</strong> into your daily life!{" "}
            <strong>
              Choose QR Smart today and experience the future of QR codes!
            </strong>
          </p>
        </>,
      ],
    },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const [query, setQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const handleSuccess = (credentialResponse) => {
  //   console.log("success", credentialResponse);
  //   if (credentialResponse?.credential) {
  //     const token = credentialResponse?.credential;
  //     const user = jwtDecode(token);
  //     console.log(user);
  //     setIsLoggedIn(true); // Set logged-in state to true
  //   }
  // };

  // const handleError = () => {
  //   console.log("error");
  // };

  // const handleLogout = () => {
  //   // Using google.accounts.id.disableAutoSelect to handle logout
  //   google.accounts.id.disableAutoSelect();
  //   setIsLoggedIn(false); // Set logged-out state
  //   console.log("Logged out successfully");
  // };

  return (
    <>
      <Helmet>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
        <title>FAQs</title>
      </Helmet>

      <ScreenView>
        <div className="w-full bg-[#f7faff]">
          {/* ── Hero ── */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#e9f0ff] via-[#f1f6ff] to-[#eaf1ff]">
            <HeroWaves />

            <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-12 md:flex-row md:justify-between md:gap-6 md:py-14">
              <div className="max-w-xl text-center md:text-left">
                <h1 className="text-[30px] font-bold leading-[1.15] tracking-tight text-slate-900 md:text-[46px]">
                  Frequently Asked
                  <br />
                  <span className="text-blue-600">Questions</span>
                </h1>
                <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-slate-500 md:mx-0 md:text-[15px]">
                  Find quick answers to common questions about QR Smart and our
                  QR code solutions.
                </p>

                <div className="relative mx-auto mt-7 max-w-md md:mx-0">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for answers..."
                    className="w-full rounded-xl border border-slate-200 bg-white/90 py-3.5 pl-5 pr-12 text-[14px] text-slate-700 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                  />
                  <FiSearch
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              <div className="relative shrink-0">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-100/80 to-violet-100/70 blur-2xl md:h-[340px] md:w-[340px]" />
                <img
                  src={faqHeroImg}
                  alt=""
                  aria-hidden="true"
                  className="relative w-[300px] select-none object-contain md:w-[400px] lg:w-[450px]"
                  draggable="false"
                />
              </div>
            </div>
          </div>

          {/* ── Categories + Questions ── */}
          <div className="mx-auto mt-6 max-w-6xl px-4 pb-12 md:px-5">
            <FaqBrowser panels={panelsData} query={query} />
          </div>

          {/* ── Contact CTA ── */}
          <div className="mx-auto max-w-6xl px-4 pb-16 md:px-5">
            <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] md:flex-row md:gap-8 md:p-8">
              <img
                src={faqSupportImg}
                alt=""
                aria-hidden="true"
                className="w-[130px] shrink-0 select-none object-contain md:w-[165px]"
                draggable="false"
              />

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-[19px] font-bold text-slate-900 md:text-[21px]">
                  Can't find what you're looking for?
                </h3>
                <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-slate-500">
                  Our support team is ready to help you with any questions you
                  might have.
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-[14px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] transition-colors hover:bg-blue-700"
                >
                  <FiMail size={16} />
                  Contact Support
                </Link>
                <span className="text-[12px] text-slate-400">
                  We typically reply within 24 hours
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <GoogleOAuthProvider clientId="449773577375-341ebovimo2iiu3gq09ak6n808k8o0nk.apps.googleusercontent.com">
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </GoogleOAuthProvider> */}
        {/* {isLoggedIn ? (
          <>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <></>
        )} */}
      </ScreenView>
    </>
  );
};

export default FAQs;
