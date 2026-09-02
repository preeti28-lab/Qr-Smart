import React, { useEffect } from "react";
import ScreenView from "../../layouts/ScreenView";

import heroImg from "../../assets/images/products/variety/hero.webp";
import svgImg from "../../assets/images/products/variety/svg.webp";
import epsImg from "../../assets/images/products/variety/eps.webp";
import jpgImg from "../../assets/images/products/variety/jpg.webp";
import pngImg from "../../assets/images/products/variety/png.webp";
import pdfImg from "../../assets/images/products/variety/pdf.webp";

const formatImages = { svg: svgImg, jpg: jpgImg, png: pngImg, pdf: pdfImg, eps: epsImg };
const colors = { svg: ["#2868F4", "#EEF4FF"], jpg: ["#27966F", "#EFFAF5"], png: ["#7B43C5", "#F5EEFF"], pdf: ["#FF4D61", "#FFF0F2"], eps: ["#7C43C8", "#F5EEFF"] };

const content = {
  svg: ["SVG format", "The SVG (Scalable Vector Graphics) format provides high-quality, scalable images, ideal for high-resolution prints such as posters and brochures. Its size adjustment ability without loss of quality makes it perfect to accommodate various design and print size needs. Additionally, its lightness and ease of editing make it a preferred choice for web and digital applications, ensuring optimal performance in online environments. QR codes in SVG format are perfect for use in digital media and for high-quality prints."],
  eps: ["EPS format", "The EPS (Encapsulated PostScript) format excels in professional graphic design and print production environments. Often preferred for its broad compatibility with specialized software and its ability to ensure accurate QR code reproduction across different media. Although EPS files may be larger in size due to their complexity, their robustness and versatility make them a reliable choice for projects that require a high degree of fidelity in the reproduction and manipulation of vector images. QR codes in EPS format are ideal for high-quality prints and for projects that require high fidelity of reproduction."],
  jpg: ["JPG format", "The JPG (Joint Photographic Experts Group) format is a widely used image compression standard that stands out for its efficiency in reducing file size. Unlike vector formats like SVG and EPS, JPG is a raster image, meaning it is made up of pixels. It is suitable for online and digital applications where file size is crucial, although compression can result in a loss of quality, so it is not ideal for applications that require high fidelity in QR code reproduction. QR codes in JPG format are suitable for use in digital environments where file size is a priority."],
  png: ["PNG format", "The PNG (Portable Network Graphics) format is popular for its lossless compression and its ability to create images with transparent backgrounds, useful especially on websites. Unlike SVG and EPS formats, PNG is a raster image, meaning it is made up of a grid of pixels. This ensures sharp reproduction of details and colors, making it ideal for images with subtle gradients or transparencies. On the other hand, the PNG format is widely supported by a variety of software and platforms, making it easy to use in different digital environments and applications. QR codes in PNG format are ideal for use on websites and for applications that require transparency."],
  pdf: ["PDF format", "The PDF (Portable Document Format) format is prized for its ability to store documents accurately and compactly, making it a reliable choice for QR codes and other graphic elements. By creating a QR code in PDF format, you ensure high-quality, faithful reproduction on a variety of devices and print sizes. Additionally, PDF is easily accessible and shareable, making it easy to use in different contexts and applications."]
};

const steps = [
  ["1", "Create your QR", 'Design your QR code and save it in "My QRs".', "#2868F4"],
  ["2", "Click Download", 'In the same row, click the "Download" button.', "#2868F4"],
  ["3", "Choose format", "Select from PNG, JPEG, SVG, SVG Tiny, PDF or EPS.", "#FF8A28"],
  ["4", "Select size", "Pick the required size or choose a custom size.", "#38A66F"],
  ["5", "Download", "Click download and your QR is ready to use anywhere.", "#7B43C5"]
];

const Icon = ({ type }) => {
  const p = {
    chart: <><path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-7" /></>,
    quality: <><circle cx="12" cy="10" r="6"/><path d="m9.5 10 1.7 1.7 3.4-3.4M8 15l-1 5 5-2 5 2-1-5"/></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z"/><path d="m9 12 2 2 4-4"/></>,
    layers: <><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/></>,
    download: <><path d="M12 4v11M8 11l4 4 4-4M5 20h14"/></>,
    qr: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 14h2M18 18h2v2M14 18h2v2"/></>,
    document: <><path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M15 3v5h5M8 12h8M8 16h6"/></>
  };
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p[type]}</svg>;
};

const benefits = [
  ["Flexibility", "Multiple formats for every need and context.", "chart", "#2868F4", "#EEF4FF"],
  ["Quality", "High-quality downloads for digital and print.", "quality", "#7650E8", "#F3EEFF"],
  ["Compatibility", "Works seamlessly across platforms and devices.", "shield", "#27966F", "#EFF9F4"],
  ["Options", "From web to print, choose the perfect format.", "layers", "#FF8A28", "#FFF2E8"]
];

const FormatCard = ({ type }) => {
  const [color, bg] = colors[type];
  return <article className="overflow-hidden rounded-[18px] border border-[#e7eaf2] bg-white p-3 shadow-[0_7px_25px_rgba(31,50,95,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(31,50,95,.11)]">
    <div className="relative flex min-h-[205px] items-center justify-center overflow-hidden rounded-[14px]" style={{background:bg}}>
      <div className="absolute left-5 top-5 h-12 w-12 opacity-50" style={{backgroundImage:`radial-gradient(${color} 1.6px,transparent 1.6px)`,backgroundSize:'10px 10px'}} />
      <svg className="absolute bottom-0 left-0 h-24 w-full" viewBox="0 0 600 120" preserveAspectRatio="none"><path d="M0 78C85 40 130 43 205 73c85 34 151 31 232-15 65-37 112-37 163-15v77H0Z" fill={color} opacity=".10"/><path d="M0 102c92-36 145-39 226-16 83 24 157 19 229-17 62-31 104-29 145-9v60H0Z" fill={color} opacity=".08"/></svg>
      <img src={formatImages[type]} alt={content[type][0]} className="relative z-10 max-h-[175px] w-auto object-contain drop-shadow-[0_10px_14px_rgba(20,35,75,.12)]" />
    </div>
    <div className="px-4 pb-3 pt-4">
      <div className="mb-2 flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{background:color}}/><h3 className="text-[20px] font-bold tracking-[-.4px] text-[#101633]">{content[type][0]}</h3></div>
      <p className="text-[12px] leading-[1.75] text-[#667188] md:text-[13px]">{content[type][1]}</p>
    </div>
  </article>;
};

const DownloadFormats = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ScreenView><main className="relative min-h-screen overflow-hidden bg-white text-[#111633]">
    {/* Decorative waves / dots / orbit */}
    <div className="pointer-events-none absolute left-[-120px] top-[55px] z-0 h-[250px] w-[470px]"><svg viewBox="0 0 470 250" className="h-full w-full"><defs><linearGradient id="wave" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#DCE9FF"/><stop offset="1" stopColor="#F5F8FF" stopOpacity=".2"/></linearGradient></defs><path d="M0 164C72 126 110 71 188 76c82 6 128 55 196 28 37-14 62-50 86-86v232H0Z" fill="url(#wave)"/></svg></div>
    <div className="pointer-events-none absolute right-[-80px] top-[-110px] h-[280px] w-[280px] rounded-full border border-[#FF9D45] opacity-75"/><div className="pointer-events-none absolute right-[-30px] top-[82px] h-[125px] w-[125px] rounded-full bg-[#E9DAFF] opacity-65"/>
    <div className="pointer-events-none absolute left-[65px] top-[115px] h-[78px] w-[78px] opacity-60" style={{backgroundImage:'radial-gradient(#9DBFFF 1.7px,transparent 1.7px)',backgroundSize:'13px 13px'}}/>

    <section className="relative z-10 mx-auto max-w-[1180px] px-6 pb-4 pt-14">
      <div className="mx-auto max-w-[720px] text-center"><h1 className="text-[38px] font-bold leading-tight tracking-[-1.5px] md:text-[46px]">Variety of <span className="text-[#2868F4]">download</span> formats</h1><div className="mt-4 flex justify-center"><span className="h-[4px] w-9 rounded-full bg-[#2868F4]"/></div></div>
      <div className="mx-auto mt-7 max-w-[900px]"><img src={heroImg} alt="Download formats" className="mx-auto block max-h-[270px] w-full object-contain"/></div>
      <p className="mx-auto mt-5 max-w-[900px] text-center text-[12px] leading-[1.9] text-[#5F6A81] md:text-[13px]">At QRFY, we offer you a wide variety of formats to download your QR codes, giving you the flexibility to adapt them to your specific needs. In the following sections, we will guide you step by step through the download process and explore the advantages of each format so that you can make informed decisions and get the most out of your QR codes.</p>
    </section>

    <section className="relative z-10 mx-auto max-w-[1180px] px-6 pt-4"><div className="mb-5 text-center"><h2 className="text-[21px] font-bold">Benefits</h2><div className="mx-auto mt-2 h-[3px] w-8 rounded-full bg-[#2868F4]"/></div><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(([title,desc,icon,color,bg])=><div key={title} className="rounded-[15px] border border-[#e8ebf2] bg-white px-5 py-6 text-center shadow-[0_7px_24px_rgba(35,53,100,.055)]"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full" style={{background:bg,color}}><Icon type={icon}/></div><h3 className="mt-4 text-[13px] font-bold">{title}</h3><p className="mx-auto mt-2 max-w-[175px] text-[10px] leading-[1.7] text-[#687288]">{desc}</p></div>)}</div></section>

    <section className="relative z-10 mx-auto max-w-[1180px] px-6 pt-8"><div className="relative overflow-hidden rounded-[19px] bg-gradient-to-br from-[#F7F9FF] via-[#F1F5FF] to-[#EDF3FF] p-6 md:p-8"><div className="grid items-center gap-8 lg:grid-cols-[.9fr_1.25fr]">
      <div><h2 className="text-[21px] font-bold leading-[1.15] tracking-[-.5px]">How to download QR codes<br/>in QR code generator</h2><div className="mt-2 h-[3px] w-8 rounded-full bg-[#2868F4]"/><div className="mt-6 space-y-3">{steps.map(([n,t,d,c])=><div key={n} className="flex items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{background:c}}>{n}</span><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm" style={{color:c}}><Icon type={n==='5'?'download':n==='1'?'qr':'document'}/></span><div><h3 className="text-[10px] font-bold">{t}</h3><p className="text-[8px] leading-[1.45] text-[#687288]">{d}</p></div></div>)}</div></div>
      <div className="relative flex min-h-[300px] items-center justify-center"><div className="w-full max-w-[540px] rounded-[14px] border-[5px] border-[#30343D] bg-white p-2 shadow-[0_15px_30px_rgba(25,40,80,.16)]"><div className="rounded-lg border border-[#e7eaf0] p-5"><div className="flex justify-between text-[10px] font-semibold"><span>My QRs</span><span className="rounded-md bg-[#2868F4] px-3 py-1 text-white">Download</span></div><div className="mt-5 flex items-center gap-4 rounded-lg border p-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#2868F4]"><Icon type="qr"/></div><div className="flex-1 space-y-2"><div className="h-2 w-32 rounded bg-[#E7EAF0]"/><div className="h-2 w-20 rounded bg-[#F0F2F6]"/></div></div><div className="mx-auto mt-2 w-[155px] rounded-xl border bg-white p-3 shadow-lg"><b className="text-[8px]">Download Formats</b>{['PNG','JPEG','SVG','SVG Tiny','PDF','EPS'].map(x=><div key={x} className="py-1 text-[7px] text-[#5E6880]">▣ &nbsp;{x}</div>)}</div></div></div></div>
    </div><div className="pointer-events-none absolute bottom-5 right-8 h-16 w-16 opacity-55" style={{backgroundImage:'radial-gradient(#A6C4FF 1.7px,transparent 1.7px)',backgroundSize:'12px 12px'}}/></div></section>

    <section className="relative z-10 mx-auto max-w-[1180px] px-6 py-6"><div className="space-y-3">{['svg','jpg','png','pdf','eps'].map(type=><FormatCard key={type} type={type}/>)}</div></section>
    <div className="pointer-events-none absolute bottom-0 left-[-120px] h-48 w-96 rounded-full bg-gradient-to-tr from-[#E8F0FF] to-transparent opacity-60"/>
  </main></ScreenView>;
};

export default DownloadFormats;
