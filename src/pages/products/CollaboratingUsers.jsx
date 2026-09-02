import React, { useEffect } from "react";
import ScreenView from "../../layouts/ScreenView";

import heroImg from "../../assets/images/products/collaborate/hero.webp";
import how1Img from "../../assets/images/products/collaborate/how1.webp";
import how2Img from "../../assets/images/products/collaborate/how2.webp";
import how3Img from "../../assets/images/products/collaborate/how3.webp";
import how4Img from "../../assets/images/products/collaborate/how4.webp";

const HERO_IMG = heroImg;
const STEP_IMAGES = [how1Img, how2Img, how3Img, how4Img];

const benefits = [
  {
    title: "Facilitates collaboration",
    desc: "Inviting other users allows you to work as a team in the creation and management of QRs, which increases efficiency and productivity.",
    icon: "users",
    tone: "blue",
  },
  {
    title: "Improve organization",
    desc: "Assigning specific roles and permissions helps maintain precise control over who can access and modify each section, which contributes to better structuring of work.",
    icon: "shield",
    tone: "purple",
  },
  {
    title: "Increase flexibility",
    desc: "Different user roles allow you to adapt access and permissions according to the needs of the team, making it easier to assign tasks and responsibilities.",
    icon: "sliders",
    tone: "green",
  },
  {
    title: "Facilitates resource management",
    desc: "It is especially useful for companies that manage several projects or teams, as it allows effective distribution of available tasks and resources.",
    icon: "folder",
    tone: "orange",
  },
];

const Icon = ({ name, size = 22 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const paths = {
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M17 8a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    sliders: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
        <circle cx="9" cy="6" r="2" />
        <circle cx="15" cy="12" r="2" />
        <circle cx="11" cy="18" r="2" />
      </>
    ),
    folder: (
      <>
        <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5Z" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56V20h-2.54v-.1a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 0 0 8.1 15a1.7 1.7 0 0 0-1.56-1.04H6v-2.54h.54A1.7 1.7 0 0 0 8.1 10a1.7 1.7 0 0 0-.34-1.88L7.7 8.06l1.8-1.8.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 12.48 5.1V5h2.54v.1a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.88-.34L18 6.26l1.8 1.8-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1.04H21v2.54h-.04A1.7 1.7 0 0 0 19.4 15Z" />
      </>
    ),
    userPlus: (
      <>
        <circle cx="9" cy="8" r="4" />
        <path d="M2 21a7 7 0 0 1 14 0" />
        <path d="M19 8v6" />
        <path d="M16 11h6" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 15H6L5 6" />
        <path d="M10 11v6M14 11v6" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
};

const Step = ({ number, icon, title, desc }) => (
  <div className="flex gap-4 items-start">
    <div className="shrink-0 w-9 h-9 rounded-full bg-[#2165f5] text-white flex items-center justify-center text-sm font-bold shadow-[0_6px_14px_rgba(33,101,245,.22)]">
      {number}
    </div>
    <div className="w-11 h-11 shrink-0 rounded-full bg-white border border-blue-100 text-[#2165f5] flex items-center justify-center shadow-sm">
      <Icon name={icon} size={21} />
    </div>
    <div className="pt-1">
      <h3 className="font-bold text-[#101b4d] text-[14px]">{title}</h3>
      <p className="mt-1 text-[12px] leading-5 text-[#5b6380]">{desc}</p>
    </div>
  </div>
);

const RoleRow = ({ number, icon, title, children, tone = "blue" }) => {
  const toneClass = {
    blue: "bg-blue-50 text-[#2165f5]",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-emerald-50 text-emerald-600",
  }[tone];

  return (
    <div className="flex items-start gap-4 bg-white rounded-2xl px-4 py-4 border border-white shadow-[0_5px_18px_rgba(43,72,150,.06)]">
      <div className="flex items-center gap-3 shrink-0">
        <span className="w-8 h-8 rounded-full bg-[#2165f5] text-white text-xs font-bold flex items-center justify-center">
          {number}
        </span>
        <span className={`w-11 h-11 rounded-full flex items-center justify-center ${toneClass}`}>
          <Icon name={icon} size={21} />
        </span>
      </div>
      <p className="text-[12px] leading-5 text-[#5b6380] pt-1">
        <strong className="text-[#18224d]">{title}</strong>{" "}
        {children}
      </p>
    </div>
  );
};

const CollaboratingUsers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <div className="relative overflow-hidden bg-white text-[#101b4d]">
        {/* Decorative background shapes */}
        <div className="pointer-events-none absolute -left-28 top-16 w-80 h-72 rounded-[45%_55%_55%_45%] bg-gradient-to-br from-[#dce9ff] to-[#edf4ff] opacity-90" />
        <div className="pointer-events-none absolute right-[-90px] top-28 w-56 h-56 rounded-full bg-[#f0e5ff] opacity-70" />
        <div className="pointer-events-none absolute right-[-55px] top-[-35px] w-64 h-64 rounded-full border border-orange-300" />
        <div
          className="pointer-events-none absolute left-14 top-36 w-12 h-12 opacity-70"
          style={{
            backgroundImage: "radial-gradient(#4d87ff 1.5px, transparent 1.5px)",
            backgroundSize: "9px 9px",
          }}
        />

        <main className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-12">
          {/* Hero */}
          <section className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111b51]">
              Collaborating users
            </h1>
            <div className="mx-auto mt-4 flex items-center justify-center gap-2">
              <span className="h-1 w-12 rounded-full bg-[#2165f5]" />
              <span className="h-1 w-2 rounded-full bg-[#2165f5]" />
            </div>

            <div className="mt-8 flex justify-center">
              <img
                src={HERO_IMG}
                alt="Collaborating users"
                className="w-full max-w-3xl object-contain drop-shadow-[0_18px_28px_rgba(43,76,150,.10)]"
              />
            </div>
          </section>

          {/* Intro */}
          <section className="max-w-5xl mx-auto mt-8 text-center space-y-5 text-[14px] md:text-[15px] leading-7 text-[#172044] font-medium">
            <p>
              Imagine that you are leading a team in a company and you need an efficient way to coordinate tasks and share information between different departments. Have you wondered how you could improve collaboration and organization to achieve your goals more effectively? The answer could be in inviting users on our QR generation platform.
            </p>
            <p>
              Let's say you're the leader of the marketing team at a growing company. Recently, you have implemented a strategy that uses QR codes to improve interaction with customers. Now, you find yourself in the need to manage these QRs in a collaborative and efficient way between your marketing team and other departments.
            </p>
            <p>
              With our user invitation tool, you can assign specific roles to each team member. For example, you could give the IT department access to set up custom domains, while the company manager can have full Administrator access to make payments and manage subscriptions.
            </p>
            <p>
              Meanwhile, the rest of the marketing team can have access to create and manage QRs, allowing them to make changes as needed and evaluate ROI in real time. This flexibility and adaptability in roles and permissions not only facilitates collaboration between departments, but also improves efficiency and productivity throughout the company. Discover how this feature can streamline project management and promote synergy between teams, driving business success.
            </p>
          </section>

          {/* Benefits */}
          <section className="relative mt-12 rounded-[24px] border border-blue-100 bg-white px-6 md:px-10 py-8 shadow-[0_14px_45px_rgba(51,90,180,.10)] overflow-hidden">
            <div
              className="absolute right-5 top-5 w-12 h-12 opacity-60"
              style={{
                backgroundImage: "radial-gradient(#75a0ff 1.5px, transparent 1.5px)",
                backgroundSize: "9px 9px",
              }}
            />
            <div className="absolute left-5 bottom-0 w-20 h-10 bg-gradient-to-t from-blue-50/80 to-transparent rounded-full" />

            <h2 className="text-2xl md:text-3xl font-extrabold">Benefits</h2>
            <div className="mt-2 h-1 w-10 rounded-full bg-[#2165f5]" />
            <span className="block mt-4 h-1 w-2 rounded-full bg-[#2165f5]" />

            <p className="mt-5 max-w-5xl text-[14px] leading-6 text-[#59627f]">
              By inviting other users to collaborate on your QR generator account, you are not only sharing access to the platform, but you are opening the doors to more efficient and organized collaboration. Discover how this feature can benefit both companies and individual users working on collaborative projects.
            </p>

            <div className="mt-6 space-y-2">
              {benefits.map((b, i) => (
                <div key={b.title} className="flex gap-4 items-start py-3 border-b border-[#edf1fa] last:border-0">
                  <span className="mt-1 w-6 h-6 rounded-full bg-[#2177ee] text-white flex items-center justify-center shrink-0">
                    ✓
                  </span>
                  <span className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center ${
                    b.tone === "purple" ? "bg-purple-50 text-purple-600" :
                    b.tone === "green" ? "bg-emerald-50 text-emerald-600" :
                    b.tone === "orange" ? "bg-orange-50 text-orange-500" :
                    "bg-blue-50 text-[#2165f5]"
                  }`}>
                    <Icon name={b.icon} size={23} />
                  </span>
                  <p className="text-[13px] md:text-[14px] leading-6 text-[#59627f] pt-1">
                    <strong className="text-[#172044]">{b.title}:</strong> {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How to use */}
          <section className="relative mt-12 rounded-[24px] bg-gradient-to-br from-[#f2f6ff] via-[#f7f8ff] to-[#eef5ff] p-6 md:p-8 shadow-[0_12px_35px_rgba(65,92,170,.08)] overflow-hidden">
            <div
              className="absolute right-5 bottom-8 w-12 h-12 opacity-50"
              style={{
                backgroundImage: "radial-gradient(#75a0ff 1.5px, transparent 1.5px)",
                backgroundSize: "9px 9px",
              }}
            />

            <h2 className="text-2xl md:text-3xl font-extrabold">How to use</h2>
            <div className="mt-2 h-1 w-10 rounded-full bg-[#2165f5]" />

            <div className="mt-8 grid lg:grid-cols-[.82fr_1.18fr] gap-8 items-center">
              <div className="space-y-6">
                <Step number="1" icon="settings" title="Access Users section" desc={'Access the "Users" section by clicking on the gear icon in the upper right.'} />
                <Step number="2" icon="userPlus" title="Add new user" desc={'Click on "add user" and enter the email address of the user you want to invite.'} />
                <Step number="3" icon="lock" title="Select role" desc="Choose between Admin, Contributor or Limited." />
                <Step number="4" icon="folder" title="Set permissions" desc="Choose the sections and folders that the user will be able to access." />
                <Step number="5" icon="send" title="Create & Invite" desc={'Click "Create" to send the invitation email. The status will be "Pending" until they activate their account.'} />
              </div>

              <div className="rounded-[20px] bg-white/80 border border-white p-3 shadow-[0_14px_35px_rgba(58,83,150,.12)]">
                <img src={STEP_IMAGES[0]} alt="Add user" className="w-full rounded-[15px] object-contain" />
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <RoleRow number="1" icon="shield" title="The Admin user has full access, with the same permissions as the original account." tone="blue">
                That is, everything you can do from your personal account can also be done by the user who is in Admin, including the ability to make payments.
              </RoleRow>
              <RoleRow number="2" icon="users" title="The Contributor user has read, modify and create access" tone="purple">
                to any of the selected sections within "Permissions" but cannot make payments.
              </RoleRow>
              <RoleRow number="3" icon="lock" title="The Limited user only has reading access" tone="green">
                to any of the selected sections within "Permissions" and will not be able to create or modify QRs, nor can they make payments.
              </RoleRow>
            </div>
          </section>

          {/* Detailed permission steps */}
          <section className="mt-10 space-y-10">
            <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 items-center">
              <div className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 text-[#2165f5] font-bold text-sm">
                  <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">2</span>
                  Permissions
                </span>
                <p className="mt-4 text-[14px] leading-7 text-[#59627f]">
                  Once you have selected the role, you will have to select within "Permissions" which sections you want the guest user to have access to:
                </p>
                <ul className="mt-4 space-y-2 text-[14px] text-[#59627f]">
                  <li>• Statistics</li>
                  <li>• My QRs</li>
                  <li>• Plans and payments</li>
                  <li>• Templates</li>
                  <li>• My domains</li>
                </ul>
                <p className="mt-5 text-[14px] leading-7 text-[#59627f]">
                  Remember that this step only applies to Contributor and Limited users, since the Admin user will have the same permissions as your account.
                </p>
              </div>
              <div className="order-1 lg:order-2 rounded-[22px] border border-blue-100 bg-white p-3 shadow-[0_12px_35px_rgba(51,90,180,.09)]">
                <img src={STEP_IMAGES[1]} alt="Permissions" className="w-full rounded-[16px]" />
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 items-center">
              <div className="rounded-[22px] border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white p-3 shadow-[0_12px_35px_rgba(51,90,180,.07)]">
                <img src={STEP_IMAGES[2]} alt="Folders" className="w-full rounded-[16px]" />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">3</span>
                  Folders
                </span>
                <p className="mt-4 text-[14px] leading-7 text-[#59627f]">
                  Select the folders you want the guest user to have access to. Please note that if you do not select any folders, the guest user will only be able to access QRs that do not have folders assigned to them.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 items-center">
              <div className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm">
                  <span className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">4</span>
                  Finish & invite
                </span>
                <p className="mt-4 text-[14px] leading-7 text-[#59627f]">
                  Finally, you can choose whether or not the guest user can delete their own account. By default, this option is activated.
                </p>
                <p className="mt-4 text-[14px] leading-7 text-[#59627f]">
                  Finish the process by clicking "Create". Once this is done, an email will be sent to the user to activate their account. Until then, the guest user's status will remain "Pending".
                </p>
                <p className="mt-4 text-[14px] leading-7 text-[#59627f]">
                  When the guest user has activated their account, after creating a password to register, the user's status will appear as "Active".
                </p>
              </div>
              <div className="order-1 lg:order-2 rounded-[22px] border border-orange-100 bg-gradient-to-br from-orange-50/50 to-white p-3 shadow-[0_12px_35px_rgba(51,90,180,.07)]">
                <img src={STEP_IMAGES[3]} alt="Finish invitation" className="w-full rounded-[16px]" />
              </div>
            </div>
          </section>

          {/* Bottom actions */}
          <section className="relative mt-12 rounded-[24px] bg-white border border-blue-100 p-6 md:p-8 shadow-[0_14px_40px_rgba(51,90,180,.09)]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                ["send", "Resend invitation", "You can resend the invitation if you need to.", "blue"],
                ["edit", "Edit permissions", "You can edit the guest user's permissions whenever you want.", "purple"],
                ["trash", "Delete user", "You can delete the guest user's account to remove access.", "green"],
                ["users", "Status Active", "When the guest user activates their account, the status will appear as Active.", "orange"],
              ].map(([icon, title, desc, tone], i) => (
                <div key={title} className="text-center px-4 lg:border-r last:border-r-0 border-[#e7ebf5]">
                  <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center ${
                    tone === "purple" ? "bg-purple-50 text-purple-600" :
                    tone === "green" ? "bg-emerald-50 text-emerald-600" :
                    tone === "orange" ? "bg-orange-50 text-orange-500" :
                    "bg-blue-50 text-[#2165f5]"
                  }`}>
                    <Icon name={icon} size={25} />
                  </div>
                  <h3 className="mt-4 font-bold text-sm text-[#18224d]">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#69718b]">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <ul className="grid md:grid-cols-3 gap-3 text-sm text-[#59627f]">
                <li className="rounded-xl bg-blue-50/70 px-4 py-3">✓ You can resend the invitation if you need to</li>
                <li className="rounded-xl bg-purple-50/70 px-4 py-3">✓ You can edit the guest user's permissions whenever you want</li>
                <li className="rounded-xl bg-emerald-50/70 px-4 py-3">✓ You can delete the guest user's account to remove access</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </ScreenView>
  );
};

export default CollaboratingUsers;
