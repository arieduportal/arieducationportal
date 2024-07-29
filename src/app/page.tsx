/* eslint-disable @next/next/no-img-element */
"use client";

interface FAQ {
  question: string;
  answer: string;
}

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navigation, Pagination, A11y, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import gsap from "gsap"
import { TimelineMax, Sine, Bounce, Linear, TextPlugin, ScrollTrigger } from 'gsap/all';
import Accordion from './components/accordion';
import faq from './faq.json';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(TextPlugin, ScrollTrigger, Bounce, Sine, Linear);

const testimonials = [
  { id: 1, name: "Rev Fr. Hillary Mgbodile", office: "PPSMB Chairman (Formerly CIC Principal)", workPlace: "PPSMB Office", quote: "We have three projects with this template and that is because we love the design, the large number of possibilities to customize the template and the support received. We recommend it!" },
  { id: 2, name: "Ngwu Fransica", office: "Parent", workPlace: "Educational Sector", quote: "We have three projects with this template and that is because we love the design, the large number of possibilities to customize the template and the support received. We recommend it!" },
  { id: 3, name: "Agu Michael", office: "Student CIC Enugu", workPlace: "College Of The Immaculate Conception Enugu", quote: "We have three projects with this template and that is because we love the design, the large number of possibilities to customize the template and the support received. We recommend it!" }
], team = [
  { id: 1, name: "Arinze Justin Okechukwu", position: "Founder", email: "", wa: "", link: "", bg: "pink" },
  { id: 2, name: "Arinze Justin Okechukwu", position: "Software developer", email: "", wa: "", link: "", bg: "rgb(15 118 110)" },
  { id: 3, name: "Arinze Justin Okechukwu", position: "Marketer", email: "", wa: "", link: "", bg: "purple" },
  { id: 4, name: "Arinze Justin Okechukwu", position: "Marketer", email: "", wa: "", link: "", bg: "orange" },
  { id: 5, name: "Arinze Justin Okechukwu", position: "Developer", email: "", wa: "", link: "", bg: "#4452F2" }
], mission = [
  { id: 1, title: 'Integrated School Administration' },
  { id: 2, title: 'Academic Excellence Management' },
  { id: 3, title: 'Secure Online Payments' }
], partners = [
  '/image/partners/mea.png',
  '/image/partners/cic.png',
  '/image/partners/blossom.png',
  '/image/partners/mea.png',
  '/image/partners/cic.png',
  '/image/partners/blossom.png',
];

export default function Index() {
  const [hasRun, setHasRun] = useState(false);
  const tlMaxRef = useRef<TimelineMax | null>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    var words = ['joyful', 'grateful', 'excited', 'satified', 'delighted', 'happy'],
      cr = document.getElementById("cr") as HTMLElement,
      boxes = document.querySelectorAll(".box-school") as NodeListOf<Element>,
      stage = document.getElementById("stage-school") as HTMLElement,
      teamSection = document.querySelector(".team-section") as HTMLElement;

    const underlinePath = document.querySelector("#underline__svg path") as SVGPathElement,
      penSVG = document.querySelector("#pen__svg") as SVGSVGElement,
      pathLength = underlinePath.getTotalLength(),
      slider = sliderRef.current;

    let scrollAmount = 0,
      scrollSpeed = 2;

    if (cr) {
      const tlMax = new TimelineMax({ repeat: -1 });
      tlMaxRef.current = tlMax;

      for (var i = 0; i < words.length; i++) {
        cr.innerHTML = words[i];
        tlMax.to('#cr', 2, { text: { value: words[i] }, ease: Sine.easeInOut }, '+=3.5')
      };
    }

    // if (typeof window !== 'undefined') {
    //   ScrollSmoother.create({
    //     wrapper: 'body',
    //     content: '#_next',
    //     smooth: 2,
    //     normalizeScroll: true,
    //     ignoreMobileResize: true,
    //     effects: true,
    //     ease: Sine.easeInOut,
    //   });
    // }

    const lines = linesRef.current,
      tlMission = gsap.timeline({ repeat: -1 });

    tlMission.add(
      gsap.fromTo(
        lines,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.9, ease: Sine.easeInOut, stagger: 2 }
      )
    ).add(
      gsap.to(lines, {
        opacity: 0,
        y: -100,
        duration: 0.9,
        delay: 0.9,
        ease: Sine.easeInOut,
        stagger: 2,
      }),
      1.3
    );

    gsap.set(underlinePath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: underlinePath,
        start: "top center",
        end: "top 20%",
        scrub: true,
      }
    })
      .to(underlinePath, {
        strokeDashoffset: 0,
        duration: 1,
        ease: Sine.easeInOut
      })
      .to(penSVG, {
        motionPath: {
          path: underlinePath,
          align: underlinePath,
          alignOrigin: [0.5, 0.5]
        },
        duration: 1,
        ease: Sine.easeInOut
      }, 0);

    gsap.to(stage, {
      css: {
        perspective: 500,
        transformStyle: "preserve-3d"
      }
    })

    boxes.forEach((element, index) => {
      gsap.set(element, {
        css: {
          rotationY: index * 360 / 6,
          transformOrigin: "50% 50% -300"
        }
      });

      gsap.to(element, 60, {
        css: {
          z: 0.01,
          rotationY: "+=359"
        },
        repeat: -1,
        ease: Linear.easeInOut
      });
    });

    if (teamSection) {
      let members = gsap.utils.toArray<HTMLElement>(".team-strip");

      members.forEach((container, i) => {
        let member = container.querySelectorAll<HTMLElement>(".team-card"),
          distance = () => {
            let lastItemBounds = member[member.length - 1].getBoundingClientRect(),
              containerBounds = container.getBoundingClientRect();
            return Math.max(0, lastItemBounds.right - containerBounds.right);
          };

        gsap.to(container, {
          x: () => -distance(),
          ease: Sine.easeInOut,
          scrollTrigger: {
            trigger: container,
            start: "center center",
            pinnedContainer: teamSection,
            end: () => "+=" + distance(),
            pin: teamSection,
            scrub: true,
            invalidateOnRefresh: true,
          }
        })
      });
    }

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= slider!.scrollWidth / 2) {
        scrollAmount = 0;
      }
      slider!.scrollLeft = scrollAmount;
    };

    intervalRef.current = setInterval(scroll, 20);

    return () => {
      if (tlMaxRef.current) {
        tlMaxRef.current.kill();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    const slider = sliderRef.current;
    intervalRef.current = setInterval(() => {
      if (slider) {
        let scrollAmount = slider.scrollLeft;
        scrollAmount += 2;
        if (scrollAmount >= slider.scrollWidth / 2) {
          scrollAmount = 0;
        }
        slider.scrollLeft = scrollAmount;
      }
    }, 20);
  };

  const faqData: FAQ[] = faq;

  return (
    <div className="relative">
      <div className="">

      </div>
      <div className="mt-3 pt-3">
        <div className="bg-slate-50 py-8 pb-0 relative app-bg-cover" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_CDN}/svg/bg.svg) !important` }} id="mission">
          <div className="app-container relative pt-12 lg:pt-20 pb-8 px-0">
            <div className="text-center mb-6 pb-6">
              <div className="flex relative flex-wrap min-h-[1px] flex-col justify-center items-center align-middle">
                <div data-wow-delay="0.2s" className="rounded-full wow slideInUp bg-sky-200 text-sky-600 px-4 py-1 translate-x-0">
                  <p className="uppercase text-sm text-sky-600 px-1 py-0.5 font-roboto">our mission</p>
                </div>
                <div data-wow-delay="0.3s" className="text-center wow slideInUp mt-2 pt-2 mb-4 pb-4 w-full">
                  {mission.map((item, i) => {
                    return <div key={i} ref={(el) => (linesRef.current[i] = el!)} style={{ opacity: 0, transform: 'translateY(100px)', position: 'absolute', backgroundImage: 'linear-gradient(180deg, #2f2e41 0%, #F2DFDF 100%)' }} className="line bg-transparent clip-text font-inter w-full text-center text-2xl md:text-3xl lg:text-4xl font-semibold md:leading-[1.3] lg:leading-[1.3] md:font-bold">{item.title}</div>
                  })}
                </div>
                <p data-wow-delay="0.3s" className="text-sm wow slideInUp text-slate-700 font-inter pt-3 mt-3"></p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-y-5 mt-1 pt-2 md:mt-4 md:pt-5">
                <div data-wow-delay="0.2s" className="flex wow bounceInUp relative min-h-[1px]" style={{ order: 'initial', flexBasis: 'initial', flexGrow: 'initial', alignSelf: 'initial', flexShrink: 'initial' }}>
                  <div className="flex border-b md:border-b-0 md:border-r border-gray-200 relative w-fulll transition-all duration-300 p-4 flex-wrap align-start">
                    <div className="mr-0 mb-5 w-full relative text-center" style={{ alignContent: 'initial' }}>
                      <div className="w-full">
                        <div className="flex flex-wrap justify-center m-0 py-0 px-8 transition-all duration-300">
                          <div className="text-center flex items-center relative transition-all duration-300 flex-col" style={{ flexGrow: '1' }}>
                            <div className="relative">
                              <div className="relative">
                                <div className="inline-flex mb-10">
                                  <img src={process.env.NEXT_PUBLIC_CDN + "/image/integration.png"} decoding="async" loading="lazy" data-src={process.env.NEXT_PUBLIC_CDN + "/image/integration.png"} className="w-64 max-w-full h-64 mx-auto" alt="" />
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <h2 className="text-xl m-0 mb-2 pb-1 text-teal-600 transition-all duration-300">Integrated School Administration</h2>
                              <p className="mb-1 text-rasin-black text-sm">We streamline school operations with efficient staff payroll management, centralized website control, and advanced communication tools. Our goal is to improve operational efficiency through seamless integration.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-wow-delay="0.5s" className="flex wow bounceInUp relative min-h-[1px]" style={{ order: 'initial', flexBasis: 'initial', flexGrow: 'initial', alignSelf: 'initial', flexShrink: 'initial' }}>
                  <div className="flex border-b md:border-b-0 md:border-r border-gray-200 relative w-fulll transition-all duration-300 p-4 flex-wrap align-start">
                    <div className="mr-0 mb-5 w-full relative text-center" style={{ alignContent: 'initial' }}>
                      <div className="w-full">
                        <div className="flex flex-wrap justify-center m-0 py-0 px-8 transition-all duration-300">
                          <div className="text-center flex items-center relative transition-all duration-300 flex-col" style={{ flexGrow: '1' }}>
                            <div className="relative">
                              <div className="relative">
                                <div className="inline-flex mb-10">
                                  <img src={process.env.NEXT_PUBLIC_CDN + "/image/academics.png"} decoding="async" loading="lazy" data-src={process.env.NEXT_PUBLIC_CDN + "/image/academics.png"} className="w-64 mx-auto max-w-full h-64" alt="" />
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <h2 className="text-xl m-0 mb-2 pb-1 text-teal-500 transition-all duration-300">Academic Excellence Management</h2>
                              <p className="mb-1 text-rasin-black text-sm">Our platform excels in result tracking and performance insights, providing digital report cards to enhance educational outcomes. We are committed to academic excellence through comprehensive analytics and effective result management.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-1 right-4 w-auto rounded-full bg-slate-100/70 shadow-custom backdrop-blur border border-white">
                        <p className="px-4 py-1 text-sm text-black font-merri">Priority</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-wow-delay="0.7s" className="flex wow bounceInUp relative min-h-[1px]" style={{ order: 'initial', flexBasis: 'initial', flexGrow: 'initial', alignSelf: 'initial', flexShrink: 'initial' }}>
                  <div className="flex relative w-fulll transition-all duration-300 p-4 flex-wrap align-start">
                    <div className="mr-0 mb-5 w-full relative text-center" style={{ alignContent: 'initial' }}>
                      <div className="w-full">
                        <div className="flex flex-wrap justify-center m-0 py-0 px-8 transition-all duration-300">
                          <div className="text-center flex items-center relative transition-all duration-300 flex-col" style={{ flexGrow: '1' }}>
                            <div className="relative">
                              <div className="relative">
                                <div className="inline-flex mb-10">
                                  <img src={process.env.NEXT_PUBLIC_CDN + "/image/4492252.png"} decoding="async" loading="lazy" data-src={process.env.NEXT_PUBLIC_CDN + "/image/4492252.png"} className="w-64 max-w-full h-64 mx-auto" alt="" />
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <h2 className="text-xl m-0 mb-2 pb-1 text-teal-500 transition-all duration-300">Secure Online Payments</h2>
                              <p className="mb-1 text-rasin-black text-sm">Our secure e-payment system simplifies fee collection and automates receipts, ensuring hassle-free financial operations. We prioritize secure transaction processing to make school fee management effortless.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-1/3 top-1/4 round-shape">
              <img src={process.env.NEXT_PUBLIC_CDN + "/image/round-shape.png"} alt="shape circle" className="max-w-full align-middle" />
            </div>
            <div className="absolute right-10 bottom-1/3 round-shape border bg-transparent border-purple-600 rounded-full">
              <p className="p-2"></p>
            </div>
            <div className="absolute bottom-16 left-6 tri-shape border bg-transparent border-pink-500 rounded-t-full">
              <p className="p-1.5"></p>
            </div>
          </div>
        </div>
        <div className="app-container flex justify-center items-center mx-auto relative pb-3">
          <div className="flex relative flex-wrap min-h-[1px] flex-col justify-center items-center align-middle">
            <div className="text-center">
              <div data-wow-delay="0.4s" className="rounded-full wow slideInUp bg-sky-200 text-sky-600 px-4 py-1 translate-x-0">
                <p className="uppercase text-sm text-sky-600 px-1 py-0.5 font-satoshi lg:font-roboto">our services</p>
              </div>
            </div>
            <div data-wow-delay="0.3s" className="text-center wow slideInUp mt-2 pt-2 mb-6 pb-6 w-full md:w-3/4 lg:w-2/3">
              <p className="text-rasin-black font-satoshi lg:font-roboto text-2xl md:text-3xl lg:text-4xl capitalize font-semibold md:leading-[1.3] lg:leading-[1.3] md:font-bold">We develop solutions for schools</p>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="pt-20 bg-gradient-to-b from-slate-200 from-45% to-slate-50">
            <div className="-mt-32 app-container gap-2 md:gap-4 grid grid-cols-1 md:grid-cols-2 justify-between align-middle">
              <div data-wow-delay="0.3s" className="bg-white wow slideInUp shadow-custom rounded-lg py-1.5 px-1 md:py-2 md:px-1.5 text-slate-700 text-sm flex m-0.5 md:m-1.5 mx-1">
                <div className="p-7 md:p-8 transition-all duration-500">
                  <div className="relative text-start flex flex-col md:flex-row justify-between items-start md:flex-grow-1">
                    <div className="mb-5 md:mb-0 md:mr-9 relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 transform rotate-[-5deg] text-sky-400" width={768} height={768} viewBox="0 0 14 14">
                        <path className='fill-sky-100' stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M7.26 12.535L4.795 5.153a.5.5 0 0 1 .633-.633l7.382 2.463a.5.5 0 0 1-.009.951l-3.245 1.02a.5.5 0 0 0-.328.326L8.21 12.526a.5.5 0 0 1-.952.009Zm2.103-3.46l3.468 3.467M.852 3.625l1.673.449M1.562 7.65l1.225-1.224M3.788.69l.448 1.672M7.813 1.4L6.588 2.624"></path>
                      </svg>
                    </div>
                    <div className="">
                      <h3 className="text-xl transition-all duration-500 m-0 mb-[.7em] capitalize text-teal-600 font-semibold font-roboto">search engine optimization</h3>
                      <p className="mb-0 text-[15px] leading-7 font-satoshi font-medium text-black transform transition-transform duration-500">We essential makes sure that your school website ranks well in search engine results and attracts relevant traffic.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div data-wow-delay="0.6s" className="bg-white wow slideInUp shadow-custom rounded-lg py-1.5 px-1 md:py-2 md:px-1.5 text-slate-700 text-sm flex m-0.5 md:m-1.5 mx-1">
                <div className="p-7 md:p-8 transition-all duration-500">
                  <div className="relative text-start flex flex-col md:flex-row justify-between items-start md:flex-grow-1">
                    <div className="mb-5 md:mb-0 md:mr-9 relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 transform rotate-[-5deg] text-sky-400" width={768} height={768} viewBox="0 0 32 32">
                        <path className="fill-sky-400" d="M16 4L3 7v2l13-3l13 3V7zm-6 6c-3.227 0-6.375 1.313-6.375 1.313l-.625.28V27h11.281c.348.598.98 1 1.719 1c.738 0 1.371-.402 1.719-1H29V11.594l-.625-.281S25.227 10 22 10c-2.918 0-5.48.98-6 1.188C15.48 10.98 12.918 10 10 10m0 2c1.934 0 4 .625 5 .969v11.125c-1.113-.367-2.941-.875-5-.875c-2.102 0-3.813.484-5 .875V12.969C5.77 12.69 7.8 12 10 12m12 0c2.2 0 4.23.691 5 .969v11.125c-1.188-.39-2.898-.875-5-.875c-2.059 0-3.887.508-5 .875V12.969c1-.344 3.066-.969 5-.969"></path>
                      </svg>
                    </div>
                    <div className="">
                      <h3 className="text-xl transition-all duration-500 m-0 mb-[.7em] capitalize text-teal-600 font-medium md:font-semibold font-inter">Academics portal</h3>
                      <p className="mb-0 text-[15px] leading-7 font-satoshi font-medium text-black transform transition-transform duration-500">Streamline result management and student data with our comprehensive academics portal, empowering institutions to efficiently track progress and enhance educational outcome.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div data-wow-delay="0.3s" className="bg-white wow slideInUp shadow-custom rounded-lg py-2 px-1.5 text-slate-700 text-sm flex m-1.5 mx-1">
                <div className="p-7 md:p-8 transition-all duration-500">
                  <div className="relative text-start flex flex-col md:flex-row justify-between items-start md:flex-grow-1">
                    <div className="mb-5 md:mb-0 md:mr-9 relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 transform rotate-[30deg] text-slate-300" width="768" height="768" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m10.986 13.928l.762-2.284l-1.324-3.629a15.694 15.694 0 0 1-.892-.081c-.458-.027-.405-.727.054-.701c0 0 1.403.108 2.239.108c.889 0 2.266-.108 2.266-.108c.458-.027.512.646.054.701c0 0-.461.054-.973.081l2.006 5.966a81.578 81.578 0 0 0-2.599-.061l-.429-1.177l-.403 1.171c-.252.001-.508.01-.761.014m-7.156.393A8.463 8.463 0 0 1 3.5 12c0-1.232.264-2.402.736-3.459l2.036 5.578c.849-.059 1.69-.103 2.526-.137L6.792 8.015c.512-.027.973-.081.973-.081c.458-.054.404-.727-.055-.701c0 0-1.376.108-2.265.108c-.16 0-.347-.004-.547-.01A8.491 8.491 0 0 1 12 3.5c2.213 0 4.228.846 5.74 2.232c-.036-.002-.072-.007-.11-.007c-.835 0-1.427.727-1.427 1.509c0 .701.404 1.293.835 1.994c.323.566.701 1.293.701 2.344c0 .674-.245 1.463-.573 2.51c.301.019.604.043.907.066l.798-2.307c.485-1.213.646-2.182.646-3.044c0-.313-.021-.603-.057-.874A8.469 8.469 0 0 1 20.5 12c0 .807-.128 1.581-.339 2.32c.5.049 1.005.112 1.508.169A9.916 9.916 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 .862.125 1.692.331 2.49c.5-.057 1.002-.12 1.499-.169m14.638 3.167c-1.792 2.184-4.35 3.013-6.468 3.013c-1.876 0-4.551-.698-6.463-3.013c-.585.048-1.174.1-1.769.161C5.571 20.271 8.578 22 12 22c3.422 0 6.429-1.729 8.232-4.351a79.692 79.692 0 0 0-1.764-.161M12 15.01c-3.715 0-7.368.266-10.958.733c.179.41.35.825.506 1.247c3.427-.431 6.91-.679 10.452-.679s7.025.248 10.452.679c.156-.422.327-.836.506-1.246A84.852 84.852 0 0 0 12 15.01" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 transform rotate-[10deg] absolute top-3 text-sky-400" width="768" height="768" viewBox="0 0 48 48">
                        <g fill="none" stroke="silver" strokeWidth="4">
                          <circle cx="22" cy="40" r="4.2" fill="#38BDF8" />
                          <circle cx="26" cy="8" r="4.2" fill="#38BDF8" />
                          <circle cx="36" cy="24" r="4.2" fill="#38BDF8" />
                          <circle cx="12" cy="24" r="4.2" fill="#38BDF8" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M32 24L16 24" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M23 11L15 21" />
                          <path d="M32.9998 27L24.9987 37" />
                        </g>
                      </svg>
                    </div>
                    <div className="">
                      <h3 className="text-xl transition-all duration-500 m-0 mb-[.7em] capitalize text-teal-600 font-medium md:font-semibold font-inter">website control</h3>
                      <p className="mb-0 text-[15px] leading-7 font-satoshi font-medium text-black transform transition-transform duration-500">Take charge of the school websites effortlessly with our <span className="font-semibold text-base font-merri text-black">WEBSITE CONTROL</span>, providing seamless control and management for enhanced online presence and communication.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div data-wow-delay="0.6s" className="bg-white wow slideInUp shadow-custom rounded-lg py-2 px-1.5 text-slate-700 text-sm flex m-1.5 mx-1">
                <div className="p-7 md:p-8 transition-all duration-500">
                  <div className="relative text-start flex flex-col md:flex-row justify-between items-start md:flex-grow-1">
                    <div className="mb-5 md:mb-0 md:mr-9 relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-slate-300" width={672} height={768} viewBox="0 0 448 512">
                        <path fill="currentColor" d="M96 128a128 128 0 1 0 256 0a128 128 0 1 0-256 0m94.5 200.2l18.6 31l-33.3 123.9l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7h386.6c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9l-33.3-123.9l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2h-39.5c-12.4 0-20.1 13.6-13.7 24.2z"></path>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-10 h-10 -right-6 -top-2 text-sky-400 transform -rotate-90" width={768} height={768} viewBox="0 0 16 16">
                        <path fill="currentColor" d="M3 2.75V3h.5a.5.5 0 0 0 .5-.5V2h-.25a.75.75 0 0 0-.75.75M3.75 1h4.5C9.216 1 10 1.784 10 2.75v.543l2.975 2.975A3.5 3.5 0 0 1 14 8.743V14.5a.5.5 0 0 1-1 0V8.743a2.5 2.5 0 0 0-.732-1.768L10 4.707v2.585l.854.854a.5.5 0 0 1-.707.708l-.983-.984l-.034-.034l-1.224-1.224a.738.738 0 1 0-1.043 1.044l1.491 1.49a.5.5 0 0 1 .147.354v1a1 1 0 0 0 .999 1a.5.5 0 0 1 .5.5v1.25A1.75 1.75 0 0 1 8.25 15h-4.5A1.75 1.75 0 0 1 2 13.25V2.75C2 1.784 2.784 1 3.75 1M8 14h.25a.75.75 0 0 0 .75-.75V13h-.5a.5.5 0 0 0-.5.5zm.21-1.972a2 2 0 0 1-.71-1.527v-.794l-.193-.193A2 2 0 1 1 6.066 6q.12-.14.276-.257a1.74 1.74 0 0 1 2.271.161L9 6.292V4h-.5A1.5 1.5 0 0 1 7 2.5V2H5v.5A1.5 1.5 0 0 1 3.5 4H3v8h.5A1.5 1.5 0 0 1 5 13.5v.5h2v-.5a1.5 1.5 0 0 1 1.21-1.472M8.5 3H9v-.25A.75.75 0 0 0 8.25 2H8v.5a.5.5 0 0 0 .5.5M3 13v.25c0 .414.336.75.75.75H4v-.5a.5.5 0 0 0-.5-.5zm3.596-4.197l-.44-.44a1.73 1.73 0 0 1-.508-1.3a1 1 0 1 0 .948 1.74"></path>
                      </svg>
                    </div>
                    <div className="">
                      <h3 className="text-xl transition-all duration-500 m-0 mb-[.7em] capitalize text-teal-600 font-medium md:font-semibold font-inter">staff pay manager</h3>
                      <p className="mb-0 text-[15px] leading-7 font-satoshi font-medium text-black transform transition-transform duration-500">Optimize staff salary management with our dedicated payment portal, streamlining the process for efficient and secure transactions, ensuring timely compensation for all employees.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div data-wow-delay="0.3s" className="bg-white wow slideInUp shadow-custom rounded-xl py-2 px-1.5 text-slate-700 text-sm flex m-1.5 mx-1">
                <div className="p-7 md:p-8 transition-all duration-500">
                  <div className="relative text-start flex flex-col md:flex-row justify-between items-start md:flex-grow-1">
                    <div className="mb-5 md:mb-0 md:mr-9 relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-sky-400" width={768} height={768} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5 12a1 1 0 0 0-1 1v8a1 1 0 0 0 2 0v-8a1 1 0 0 0-1-1m5-10a1 1 0 0 0-1 1v18a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1m10 14a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1m-5-8a1 1 0 0 0-1 1v12a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1"></path>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width={768} height={768} viewBox="0 0 512 512" className="w-14 h-14 absolute top-3 text-slate-200">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="m344 280l88-88m-200 24l64 64M80 320l104-104"></path>
                        <circle cx={456} cy={168} r={24} fill="none" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32}></circle>
                        <circle cx={320} cy={304} r={24} fill="none" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32}></circle>
                        <circle cx={208} cy={192} r={24} fill="none" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32}></circle>
                        <circle cx={56} cy={344} r={24} fill="none" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32}></circle>
                      </svg>
                    </div>
                    <div className="">
                      <h3 className="text-xl transition-all duration-500 m-0 mb-[.7em] capitalize text-teal-600 font-medium md:font-semibold font-inter">analytics gateway</h3>
                      <p className="mb-0 text-[15px] leading-7 font-satoshi font-medium text-black transform transition-transform duration-500">Elevate data-driven decision-making with our analytics gateway, seamlessly integrating student and staff data with school sites for insightful performance analysis and strategic planning.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div data-wow-delay="0.6s" className="bg-white wow slideInUp shadow-custom rounded-xl py-2 px-1.5 text-slate-700 text-sm flex m-1.5 mx-1">
                <div className="p-[35px] transition-all duration-500">
                  <div className="relative text-start flex flex-col md:flex-row justify-between items-start md:flex-grow-1">
                    <div className="mb-5 md:mb-0 md:mr-9 relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 transform rotate-[-14deg] text-slate-200" width={768} height={768} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2m-7.5 12a2.5 2.5 0 1 1 0-5a2.47 2.47 0 0 1 1.5.512c-.604.456-1 1.173-1 1.988s.396 1.532 1 1.988a2.47 2.47 0 0 1-1.5.512m4 0a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5"></path>
                      </svg>
                      <svg className="w-14 h-14 transform rotate-[5deg] absolute top-6 text-sky-400" xmlns="http://www.w3.org/2000/svg" width={768} height={768} viewBox="0 0 20 20">
                        <path fill="currentColor" d="M6.803 18.998c-.194-.127 3.153-7.16 3.038-7.469c-.116-.309-3.665-1.436-3.838-1.979c-.174-.543 7.007-8.707 7.196-8.549c.188.158-3.129 7.238-3.039 7.469c.091.23 3.728 1.404 3.838 1.979c.111.575-7.002 8.676-7.195 8.549"></path>
                      </svg>
                    </div>
                    <div className="">
                      <h3 className="text-xl transition-all duration-500 m-0 mb-[.7em] capitalize text-teal-600 font-medium md:font-semibold font-inter">E-Payment system</h3>
                      <p className="mb-0 text-[15px] leading-7 font-satoshi font-medium text-black transform transition-transform duration-500">Simplify school fee payments with our e-payment portal, offering a convenient and secure platform for hassle-free transactions, ensuring smooth financial management for students and parents.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 my-7">
          <div className="app-container relative pt-12 lg:pt-20 pb-8 md:py-12 lg:pb-16 px-0">
            <div className="flex flex-wrap flex-col lg:flex-row justify-between align-middle items-center">
              <div className="w-full lg:w-1/3 pb-6 lg:pb-0">
                <div className="relative">
                  <div className="relative z-10 flex flex-row justify-between items-center align-middle pb-6">
                    <motion.div whileInView={{ opacity: .7, y: 0, transition: { delay: 1, duration: 0.9, bounce: 0.6, type: "spring", repeatType: "reverse" } }} viewport={{ once: false, amount: .6 }} initial={{ opacity: .1, y: -90 }} className="-mb-12 relative bg-white shadow-custom rounded-full border border-slate-100 w-40 lg: h-40 lg:">
                      <img src={process.env.NEXT_PUBLIC_CDN + "/image/time.png"} data-src={process.env.NEXT_PUBLIC_CDN + "/image/time.png"} alt="" className="rounded-full bg-white w-40 lg: h-40 lg: opacity-60" />
                    </motion.div>
                    <motion.div whileInView={{ opacity: .7, y: 0, transition: { delay: 1, duration: 0.9, bounce: 0.6, type: "spring", repeatType: "reverse" } }} viewport={{ once: false, amount: .6 }} initial={{ opacity: .1, y: -90 }} className="-mb-24 relative bg-white shadow-custom rounded-full border border-slate-100 w-40 h-40">
                      <img src={process.env.NEXT_PUBLIC_CDN + "/image/feedback.png"} data-src={process.env.NEXT_PUBLIC_CDN + "/image/feedback.png"} alt="" className="rounded-full bg-white w-40 h-40 opacity-60" />
                    </motion.div>
                  </div>
                  <div className="pt-6 w-full relative">
                    <motion.div whileInView={{ scale: 1, y: 0, transition: { delay: .7, duration: 0.9, bounce: 0.6, type: "spring", repeatType: "reverse" } }} viewport={{ once: false, amount: .6 }} initial={{ scale: .1, y: 70 }} className="-mt-14 relative z-50 bg-white shadow-custom rounded-full border border-slate-100 w-64 h-64 mx-auto">
                      <img src={process.env.NEXT_PUBLIC_CDN + "/image/students.png"} data-src={process.env.NEXT_PUBLIC_CDN + "/image/students.png"} alt="" className="rounded-full bg-white w-64 h-64 opacity-100" />
                    </motion.div>
                  </div>
                  <motion.div whileInView={{ opacity: .9, x: 0, transition: { delay: 1, duration: 0.9 } }} viewport={{ once: false, amount: .3 }} initial={{ opacity: .8, x: -400 }} className="absolute z-20 p-4 rounded-full bg-pink-500 opacity-80 right-0 bottom-1/4"></motion.div>
                  <motion.div whileInView={{ opacity: .9, x: 0, transition: { delay: 1, duration: 0.9 } }} viewport={{ once: false, amount: .3 }} initial={{ opacity: .8, x: 400 }} className="absolute z-30 p-3 rounded-full bg-teal-500 opacity-90 left-0 top-1/4 animate-spin"></motion.div>
                </div>
              </div>
              <div className="w-full lg:w-2/3 flex">
                <div className="w-full relative p-4">
                  <div data-wow-delay="0.3s" className="bg-white shadow-custom rounded-lg bounceInRight wow">
                    <div className="flex w-full justify-around flex-col lg:flex-row align-middle content-center">
                      <div data-wow-delay="0.6s" className="wow fadeIn w-auto lg:w-1/3 min-h-[1px] relative">
                        <div className="transition-all lg:h-full border-t lg:border-t-0 lg:border-r border-slate-100 duration-500 flex flex-wrap w-full content-start relative pt-10 px-7 pb-12">
                          <div className="relative w-full transition-all duration-300">
                            <VisibilitySensor partialVisibility offset={{ bottom: 19 }} onChange={(isVisible: any) => {
                              if (isVisible && !hasRun) {
                                setHasRun(true);
                              }
                            }}>
                              {({ isVisible }: any) => (
                                <h2 className="bg-transparent m-0 mb-6 font-inter font-semibold text-lg md:text-2xl lg:text-4xl relative inline-block transition-all clip-text align-middle duration-500" style={{ backgroundImage: 'linear-gradient(180deg, #2f2e41 0%, #F2DFDF 100%)' }}>
                                  {isVisible ? <CountUp suffix="+" delay={1.5} duration={11.75} end={new Date().getFullYear() - 2021} /> : 0}
                                </h2>
                              )}
                            </VisibilitySensor>
                          </div>
                          <div className="relative w-full transition-all duration-500">
                            <h6 className="m-0 mb-6 text-sm font-roboto align-middle transition-all relative inline-block text-teal-500 uppercase font-semibold">years of operation</h6>
                          </div>
                          <div className="relative w-full transition-all duration-500">
                            <p className="mb-1 align-middle relative inline-block text-rasin-black text-[15px] leading-6 fon-merri">
                              We have been proudly operating for over 3 years, consistently delivering quality and excellence in all sections of our software.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div data-wow-delay="0.8s" className="wow fadeIn w-auto lg:w-1/3 min-h-[1px] relative">
                        <div className="transition-all lg:h-full duration-500 flex flex-wrap w-full content-start relative pt-10 px-7 pb-12">
                          <div className="relative w-full transition-all duration-300">
                            <VisibilitySensor partialVisibility offset={{ bottom: 19 }} onChange={(isVisible: any) => {
                              if (isVisible && !hasRun) {
                                setHasRun(true);
                              }
                            }}>
                              {({ isVisible }: any) => (
                                <h2 className="bg-transparent m-0 mb-6 font-inter font-semibold text-lg md:text-2xl lg:text-4xl relative inline-block transition-all clip-text align-middle duration-500" style={{ backgroundImage: 'linear-gradient(180deg, #2f2e41 0%, #F2DFDF 100%)' }}>
                                  {isVisible ? <CountUp suffix="%" delay={1.5} duration={9.75} decimal="1" end={97} /> : 0}
                                </h2>
                              )}
                            </VisibilitySensor>
                          </div>
                          <div className="relative w-full transition-all duration-500">
                            <h6 className="m-0 mb-6 text-sm font-roboto align-middle transition-all relative inline-block text-teal-500 uppercase font-semibold">positive feedback</h6>
                          </div>
                          <div className="relative w-full transition-all duration-500">
                            <p className="mb-1 align-middle relative inline-block text-rasin-black text-[15px] leading-6 fon-merri">
                              Discover why our users rave about their experience with our software! With a remarkable 97% positive feedback rate, you are in good spot for excellence.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div data-wow-delay="1.0s" className="wow fadeIn w-auto lg:w-1/3 min-h-[1px] relative">
                        <div className="transition-all lg:h-full duration-500 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-wrap w-full content-start relative pt-10 px-7 pb-12">
                          <div className="relative w-full transition-all duration-300">
                            <VisibilitySensor partialVisibility offset={{ bottom: 19 }} onChange={(isVisible: any) => {
                              if (isVisible && !hasRun) {
                                setHasRun(true);
                              }
                            }}>
                              {({ isVisible }: any) => (
                                <h2 className="bg-transparent m-0 mb-6 font-inter font-semibold text-lg md:text-2xl lg:text-4xl relative inline-block transition-all clip-text align-middle duration-500" style={{ backgroundImage: 'linear-gradient(180deg, #2f2e41 0%, #F2DFDF 100%)' }}>
                                  {isVisible ? <CountUp suffix="+" delay={1.5} duration={6.75} end={4378} /> : 0}
                                </h2>
                              )}
                            </VisibilitySensor>
                          </div>
                          <div className="relative w-full transition-all duration-500">
                            <h6 className="m-0 mb-6 text-sm font-roboto align-middle transition-all relative inline-block text-teal-500 uppercase font-semibold">number of students</h6>
                          </div>
                          <div className="relative w-full transition-all duration-500">
                            <p className="mb-1 align-middle relative inline-block text-rasin-black text-[15px] leading-6 fon-merri">
                              Join the growing number of schools that have chosen our software to empower their students! Experience the difference with our trusted platform.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="bg-gradient-to-b from-slate-50 from-35% to-white transition-all duration-300 px-0 py-8 md:py-10 lg:py-12 z-[1]">
            <div className="app-container flex flex-wrap mx-auto relative">
              <div className="w-full lg:w-1/3 relative min-h-1 flex">
                <div className="flex p-4 transition-all duration-300 relative flex-wrap content-start w-full">
                  <div data-wow-delay="0.3s" className="mb-3 pb-2 wow rollIn">
                    <a href="#pricing" className="rounded-full font-inter text-sm font-medium w-auto px-4 py-1.5 bg-slate-100/50 transition-all duration-500 cursor-pointer inline-block backdrop-blur-sm shadow-custom ripple-btn hover:text-white text-black hover:bg-black border-2 border-white hover:border-transparent">
                      Join excellence
                      <svg className="ml-2 w-5 h-5 relative inline-block" xmlns="http://www.w3.org/2000/svg" width={768} height={768} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M13.47 8.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H6.5a.75.75 0 0 1 0-1.5h9.69z"></path>
                      </svg>
                      <span></span>
                    </a>
                  </div>
                  <div data-wow-delay="0.6s" className="mb-3 wow bounceInLeft w-full ml-0 relative text-left">
                    <div className="mx-0 mt-0 mb-5 transition-all duration-300">
                      <div className="relative text-start flex flex-wrap items-center flex-grow-[1]">
                        <div className="mr-1.5">
                          <div className="text-xl shadow-custom w-12 h-12 z-10 relative inline-flex rounded-full text-teal-700 bg-teal-100">
                            <svg className="text-teal-700 absolute left-1/2 top-1/2 transform w-6 h-6 text-base inline-block -translate-y-1/2 -translate-x-1/2" xmlns="http://www.w3.org/2000/svg" width={768} height={768} viewBox="0 0 20 20">
                              <path fill="currentColor" d="M10 0c5.342 0 10 4.41 10 9.5c0 5.004-4.553 8.942-10 8.942a11.01 11.01 0 0 1-3.43-.546c-.464.45-.623.603-1.608 1.553c-.71.536-1.378.718-1.975.38c-.602-.34-.783-1.002-.66-1.874l.4-2.319C.99 14.002 0 11.842 0 9.5C0 4.41 4.657 0 10 0m0 1.4c-4.586 0-8.6 3.8-8.6 8.1c0 2.045.912 3.928 2.52 5.33l.02.017l.297.258l-.067.39l-.138.804l-.037.214l-.285 1.658a2.79 2.79 0 0 0-.03.337v.095c0 .005-.001.007-.002.008c.007-.01.143-.053.376-.223l2.17-2.106l.414.156a9.589 9.589 0 0 0 3.362.605c4.716 0 8.6-3.36 8.6-7.543c0-4.299-4.014-8.1-8.6-8.1M5.227 7.813a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998m4.998 0a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998m4.997 0a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998"></path>
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-base font-normal m-0 text-slate-800 font-inter">
                          <strong className="text-black font-inter">— 98.9</strong>
                          &nbsp;&nbsp;Customer Satisfaction
                        </h3>
                        <p></p>
                      </div>
                    </div>
                  </div>
                  <div data-wow-delay="0.4s" className="w-auto wow bounceInLeft mr-0 mb-3 max-w-full">
                    <div className="relative transition-all duration-300">
                      <h2 className="m-0 font-semibold inline-block text-2xl md:text-4xl relative font-inter text-blue-800">Hear from</h2>
                      <h2 className="m-0 font-semibold text-gradient-2 inline-block text-2xl md:text-4xl relative font-merri mx-1.5 ml-2 bg-transparent bg-clip-text" id="cr">happy</h2>
                      <h2 className="m-0 font-semibold inline-block text-2xl md:text-4xl relative font-inter text-blue-800">customers</h2>
                    </div>
                  </div>
                  <div data-wow-delay="0.6s" className="w-full wow bounceInLeft mb-3">
                    <div className="relative">
                      <p className="my-2 mx-0 text-base font-satoshi text-slate-600 inline-block relative">The true measure of value of any school is performance. Create an online presence for your school.</p>
                    </div>
                  </div>
                  <div data-wow-delay="0.8s" className="w-full wow bounceInLeft text-left ml-0 pl-0">
                    <img width="255" height="110" className="opacity-100 w-[127px] align-middle inline-block h-auto max-w-full" loading="lazy" data-src={process.env.NEXT_PUBLIC_CDN + "/image/Trustpilot.png"} decoding="async" src={process.env.NEXT_PUBLIC_CDN + "/image/Trustpilot.png"} alt="" />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-2/3">
                <div className="m-0 ml-1.5 relative flex-wrap flex w-full content-start p-4">
                  <div className="-left-1 -top-2.5 w-auto mr-0 mb-0 absolute z-50">
                    <div data-wow-delay="0.3s" className="wow bounceInDown">
                      <div className="relative block animate-bounce bounce">
                        <div className="w-1/2 max-w-full relative justify-center inline-flex items-center">
                          <figure className="inline-block m-0 relative w-full">
                            <img className="h-auto max-w-full" src={process.env.NEXT_PUBLIC_CDN + "/image/testi.png"} data-src={process.env.NEXT_PUBLIC_CDN + "/image/testi.png"} alt="" loading="lazy" decoding="async" width="186" height="181" />
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div data-wow-delay="0.3s" className="w-full wow bounceInUp md:w-[96%] mx-auto bg-transparent-white rounded-lg my-6 pb-5">
                    <Swiper
                      modules={[Navigation, Pagination, A11y, EffectFade]}
                      spaceBetween={50}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                      effect="fade"
                      loop={true}
                      speed={500}
                      className="w-full bg-transparent-white rounded-lg h-auto"
                    >
                      {testimonials.map((item, i) => {
                        return <SwiperSlide data-wow-delay={`0.${i + 4}s`} key={item.id} className="bg-white wow zoomInUp w-full rounded-b-xl rounded-t-sm swiper-margin text-rasin-black relative pt-10 pb-6">
                          <div className="flex mb-6 justify-center">
                            <ul className="text-yellow-600 rounded-lg border border-slate-100 py-1 px-3.5 text-sm">
                              {[1, 2, 3, 4, 5].map((i, el) => {
                                return <li key={i} className="inline-block m-0 text-base text-[#fc0] p-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width={768} height={768} viewBox="0 0 24 24">
                                    <path fill="currentColor" fillOpacity={0.15} stroke="currentColor" d="M10.144 6.628c.786-1.961 1.18-2.942 1.856-2.942c.676 0 1.07.98 1.856 2.942l.037.09c.444 1.109.666 1.663 1.12 2c.452.336 1.047.39 2.236.496l.214.019c1.946.174 2.92.261 3.127.88c.209.62-.514 1.277-1.96 2.591l-.481.44c-.732.665-1.098.998-1.268 1.434a2.002 2.002 0 0 0-.08.25c-.111.454-.004.937.21 1.902l.067.3c.393 1.775.59 2.662.247 3.045a1 1 0 0 1-.481.296c-.496.136-1.2-.438-2.61-1.586c-.925-.754-1.388-1.131-1.919-1.216a1.997 1.997 0 0 0-.63 0c-.532.085-.994.462-1.92 1.216c-1.408 1.148-2.113 1.722-2.609 1.586a1 1 0 0 1-.48-.296c-.344-.383-.147-1.27.246-3.044l.067-.301c.214-.966.321-1.448.21-1.903a2.002 2.002 0 0 0-.08-.25c-.17-.435-.536-.768-1.268-1.434l-.482-.439c-1.445-1.314-2.168-1.972-1.96-2.59c.209-.62 1.182-.707 3.128-.881l.214-.02c1.19-.106 1.784-.159 2.237-.496c.453-.336.675-.89 1.12-1.998z"></path>
                                  </svg>
                                </li>
                              })}
                            </ul>
                          </div>
                          <div className="mb-6 mt-2 px-4 lg:px-8 text-rasin-black relative">
                            <div className="absolute right-1 -top-16">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-700 w-14 h-14 md:w-20 md:h-20" width={768} height={768} viewBox="0 0 16 16">
                                <g fill="#334155" fillOpacity={0.25}>
                                  <g clipPath="url(#gravityUiQuoteOpen0)">
                                    <path fill="currentColor" fillRule="evenodd" d="M12.411 6.33A2.751 2.751 0 0 1 14.5 9v.25A2.75 2.75 0 0 1 11.75 12h-.25a2.747 2.747 0 0 1-2.748-2.657V9.34H8.75V9c0-.131.01-.26.027-.386c.02-.261.05-.518.09-.77a8.028 8.028 0 0 1 .559-1.918a7.207 7.207 0 0 1 2.162-2.801l.098-.076A.238.238 0 0 1 11.83 3c.186 0 .306.202.22.367a18.552 18.552 0 0 0-.22.433a17.949 17.949 0 0 0-.43.951a14.39 14.39 0 0 0-.557 1.578l.054-.013a2.76 2.76 0 0 1 .603-.066h.25c.228 0 .45.028.661.08m.549-1.405A4.252 4.252 0 0 1 16 9v.25a4.25 4.25 0 0 1-4.25 4.25h-.25A4.245 4.245 0 0 1 8 11.662A4.245 4.245 0 0 1 4.5 13.5h-.25A4.25 4.25 0 0 1 0 9.336V9c0-.183.012-.365.035-.543c.207-2.62 1.358-4.966 3.488-6.599A1.738 1.738 0 0 1 4.58 1.5c1.341 0 2.146 1.425 1.548 2.564c-.111.211-.26.508-.418.86c.788.234 1.481.69 2.005 1.297a8.763 8.763 0 0 1 3.058-4.363A1.738 1.738 0 0 1 11.83 1.5c1.341 0 2.146 1.425 1.548 2.564c-.111.211-.26.508-.418.86ZM5.16 6.33a2.756 2.756 0 0 0-.661-.08h-.25a2.76 2.76 0 0 0-.657.079a14.398 14.398 0 0 1 .68-1.865A17.736 17.736 0 0 1 4.8 3.367A.251.251 0 0 0 4.58 3a.238.238 0 0 0-.144.049a7.737 7.737 0 0 0-.93.844a7.208 7.208 0 0 0-1.39 2.172a8.029 8.029 0 0 0-.498 1.779a8.753 8.753 0 0 0-.091.77A2.773 2.773 0 0 0 1.5 9v.339h.001v.004A2.747 2.747 0 0 0 4.25 12h.251a2.75 2.75 0 0 0 2.75-2.75V9c0-1.29-.89-2.374-2.089-2.67Z" clipRule="evenodd"></path>
                                  </g>
                                  <defs>
                                    <clipPath id="gravityUiQuoteOpen0">
                                      <path fill="currentColor" d="M0 0h16v16H0z"></path>
                                    </clipPath>
                                  </defs>
                                </g>
                              </svg>
                            </div>
                            <blockquote className="w-full mt-5 pt-2">
                              <p className="text-rasin-black text-base md:text-lg text-center font-inter">
                                <span className="font-medium md:font-semibold">{item.quote}</span>
                              </p>
                            </blockquote>
                          </div>
                          <div className="justify-between flex flex-col flex-wrap">
                            <div className="flex justify-center items-center">
                              <figure className="rounded-full overflow-hidden w-[68px] border-2 border-slate-100">
                                <img src={process.env.NEXT_PUBLIC_CDN + "/image/person.png"} decoding="async" className="max-w-full h-auto" loading="lazy" daa-src={process.env.NEXT_PUBLIC_CDN + "/image/person.png"} width="68" height="69" alt={item.name} />
                              </figure>
                              <div className="text-start pl-4">
                                <h3 className="text-black font-roboto font-semibold text-base">{item.name}</h3>
                                <h4 className="text-slate-400 font-normal text-sm">{item.office}</h4>
                              </div>
                            </div>
                          </div>
                          <div className="border-t border-slate-100 mt-3.5 pt-3.5">
                            <div className="relative">
                              <p className="text-center font-semibold text-lg md:text-xl font-roboto text-rasin-black">{item.workPlace}</p>
                            </div>
                          </div>
                        </SwiperSlide>;
                      })}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative app-container">
              <div className="absolute -left-12 md:-left-7 -bottom-8 z-50">
                <div data-wow-delay="0.3s" className="bounceInDown wow">
                  <div className="relative block animate-bounce bounce">
                    <div className="w-1/2 max-w-full relative justify-center inline-flex items-center">
                      <figure className="inline-block m-0 relative w-full">
                        <img className="h-auto max-w-full" src={process.env.NEXT_PUBLIC_CDN + "/image/online.png"} data-src={process.env.NEXT_PUBLIC_CDN + "/image/online.png"} alt="" loading="lazy" decoding="async" width="600" height="662" />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-8 my-5">
                <div className="app-container relative py-0 px-0">
                  <div>
                    <div id="team" className="flex relative mb-4 pb-6 flex-wrap min-h-[1px] flex-col justify-center items-center align-middle">
                      <div data-wow-delay="0.2s" className="rounded-full wow slideInUp bg-sky-200 text-sky-600 px-4 py-1 translate-x-0">
                        <p className="uppercase text-sm text-sky-600 px-1 py-0.5 font-roboto">Axiolot Hub Team</p>
                      </div>
                      <h2 data-wow-delay="0.3s" className="text-center wow slideInUp mt-2 pt-2 w-full">
                        <h2 className="bg-transparent m-0 font-satoshi font-semibold text-lg md:text-2xl lg:text-4xl relative inline-block transition-all clip-text align-middle duration-500" style={{ backgroundImage: 'linear-gradient(180deg, #2f2e41 0%, #F2DFDF 100%)' }}>
                          The Amazing Team Behind The Software
                        </h2>
                      </h2>
                      <p data-wow-delay="0.3s" className="text-base wow slideInUp text-slate-700 font-satoshi pt-3 mt-3">
                        We are from an experienced background with a proven track record and a vision to help you succeed.
                      </p>
                    </div>
                    <div data-wow-delay="0.3s" className="wow slideInUp">
                      <div className="relative overflow-hidden team-section">
                        <div className="w-full px-0 mx-auto">
                          <div className="flex flex-nowrap relative team-wrapper" style={{ willChange: "transform" }}>
                            <div className="flex flex-nowrap relative team-strip pb-5" style={{ willChange: "transform" }}>
                              {team.map((item, index) => {
                                return <div key={item.id} data-wow-delay={`0.${index + 3}s`} className="bg-white wow bounceInLeft relative w-[80vw] mx-1 mr-2.5 md:mr-0 team-card md:w-[50vw] lg:w-[25vw] rounded-lg shadow-custom p-4 md:mx-4 lg:mx-8 box-content">
                                  <div className="py-8 px-4 w-full">
                                    <div className="py-4 w-full flex justify-center align-middle items-center">
                                      <div className="relative bg-slate-100 rounded-full border-slate-100 border p-3 shadow-lg">
                                        <img src={process.env.NEXT_PUBLIC_CDN + "/image/person.png"} decoding="async" loading="lazy" className="w-32 h-32 mx-auto my-auto" data-src={process.env.NEXT_PUBLIC_CDN + "/image/person.png"} alt="Person avatar" />
                                      </div>
                                    </div>
                                    <div className="py-2 w-full text-center font-roboto">
                                      <p className="font-semibold pb-1 text-base text-rasin-black text-center capitalize">{item.name}</p>
                                      <span className="text-sm font-normal text-slate-600 font-inter capitalize">{item.position}</span>
                                    </div>
                                    <div className="pt-4 pb-3 flex flex-row justify-evenly items-center align-middle">
                                      <div>
                                        <a href={item.email} target="_blank" className="">
                                          <svg className="w-8 h-8 text-slate-600" xmlns="http://www.w3.org/2000/svg" width={768} height={768} viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12v1.45q0 1.475-1.012 2.513T18.5 17q-.875 0-1.65-.375t-1.3-1.075q-.725.725-1.638 1.088T12 17q-2.075 0-3.537-1.463T7 12t1.463-3.537T12 7t3.538 1.463T17 12v1.45q0 .65.425 1.1T18.5 15t1.075-.45t.425-1.1V12q0-3.35-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20h5v2zm0-7q1.25 0 2.125-.875T15 12t-.875-2.125T12 9t-2.125.875T9 12t.875 2.125T12 15"></path>
                                          </svg>
                                        </a>
                                      </div>
                                      <div>
                                        <a href={item.link} className="" target="_blank">
                                          <svg className="w-8 h-8 text-slate-600" xmlns="http://www.w3.org/2000/svg" width={768} height={768} viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M4.75 1.875a2.125 2.125 0 1 0 0 4.25a2.125 2.125 0 0 0 0-4.25m-2 6A.125.125 0 0 0 2.625 8v13c0 .069.056.125.125.125h4A.125.125 0 0 0 6.875 21V8a.125.125 0 0 0-.125-.125zm6.5 0A.125.125 0 0 0 9.125 8v13c0 .069.056.125.125.125h4a.125.125 0 0 0 .125-.125v-7a1.875 1.875 0 1 1 3.75 0v7c0 .069.056.125.125.125h4a.125.125 0 0 0 .125-.125v-8.62c0-2.427-2.11-4.325-4.525-4.106a7.168 7.168 0 0 0-2.169.548l-1.306.56V8a.125.125 0 0 0-.125-.125z"></path>
                                          </svg>
                                        </a>
                                      </div>
                                      <div>
                                        <a href={item.wa} className="" target="_blank">
                                          <svg className="w-8 h-8 text-slate-600" xmlns="http://www.w3.org/2000/svg" width={768} height={768} viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"></path>
                                          </svg>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-6 px-0 pt-8">
                <div className="flex-wrap flex relative mx-auto">
                  <div className="flex w-full min-h-[1px] relative">
                    <div className="flex w-full relative content-start flex-wrap transition-all duration-500 m-0 mb-3">
                      <div className="relative">
                        <p data-wow-delay="0.3" className="text-base wow slideInUp text-center md:text-left md:text-lg font-inter font-medium mb-0.5 align-middle relative inline-block">These top schools are already using our software</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:hidden border relative border-transparent lg:border-slate-50 rounded-lg w-full transition-border duration-500 h-48">
                    <div data-wow-delay="0.3s" className="py-5 wow bounceIn  px-2.5 w-full h-48 my-0 mx-auto relative">
                      <div className="group h-full relative" id="stage-school">
                        {partners.concat(partners).map((src, index) => (
                          <div key={index} className="box-school absolute inset-x-0 my-0 mx-auto overflow-hidden w-36 h-36 inline-block bg-white p-6 rounded-full shadow-custom">
                            <img src={process.env.NEXT_PUBLIC_CDN + src} alt={`School logo ${index + 1}`} className="transition-all duration-500 w-36 h-auto" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave} className="overflow-hidden whitespace-nowrap hidden lg:block mt-6 pt-2">
                    <div
                      ref={sliderRef}
                      className="flex space-x-6"
                      style={{ width: '200%', animation: 'scroll 20s linear infinite' }}
                    >
                      {partners.concat(partners).map((src, index) => (
                        <div data-wow-delay={`0.${index + 1}s`} key={index} className="flex-none w-[10%] py-6 mx-auto wow slideInRight">
                          <img
                            src={process.env.NEXT_PUBLIC_CDN + src}
                            className="w-20 h-auto object-cover hover:scale-110 transition-transform duration-300"
                            alt={`School logo ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-5 pb-2 px-0 relative">
                <div className="text-center w-full">
                  <div className="px-1.5 py-3.5 md:px-3.5 flex flex-wrap relative w-full content-start">
                    <div className="ml-0 mb-5 w-full">
                      <div className="relative">
                        <h2 data-wow-delay="0.3s" className="text-lg wow slideInUp md:text-2xl lg:text-3xl m-0 font-satoshi text-blue-600 font-bold relative align-middle inline-block leading-9 mb-3 capitalize">Do you want to digitalize your school ? Try our
                          <mark className="p-1 relative inline-block text-inherit bg-inherit mb-0 mx-1">
                            <span className="relative z-10 text-blue-400">Software</span>
                            <span className="left-0 -bottom-1 h-auto text-inherit opacity-100 inline-block absolute z-0">
                              <svg id="pen__svg" className="inner-svg1 text-purple-500" width="51" height="51" viewBox="0 0 51 51" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.204 1.044C32.02 2.814 5.66 31.155 4.514 35.116c-.632 2.182-1.75 5.516-2.483 7.409-3.024 7.805-1.54 9.29 6.265 6.265 1.893-.733 5.227-1.848 7.41-2.477 3.834-1.105 4.473-1.647 19.175-16.27 0 0 10.63-10.546 15.21-15.125C53 8.997 42.021-1.418 36.203 1.044Zm7.263 5.369c3.56 3.28 4.114 4.749 2.643 6.995l-1.115 1.7-4.586-4.543-4.585-4.544 1.42-1.157C39.311 3.18 40.2 3.4 43.467 6.413ZM37.863 13.3l4.266 4.304-11.547 11.561-11.547 11.561-4.48-4.446-4.481-4.447 11.404-11.418c6.273-6.28 11.566-11.42 11.762-11.42.197 0 2.277 1.938 4.623 4.305ZM12.016 39.03l3.54 3.584-3.562 1.098-5.316 1.641c-1.665.516-1.727.455-1.211-1.21l1.614-5.226c1.289-4.177.685-4.191 4.935.113Z"></path>
                              </svg>
                              <svg id="underline__svg" className="block w-full h-auto relative max-h-[.475em] fill-pink-400 inner-svg2" width="233" height="13" viewBox="0 0 233 13" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
                                <path d="m.624 9.414-.312-2.48C0 4.454.001 4.454.002 4.454l.035-.005.102-.013.398-.047c.351-.042.872-.102 1.557-.179 1.37-.152 3.401-.368 6.05-.622C13.44 3.081 21.212 2.42 31.13 1.804 50.966.572 79.394-.48 113.797.24c34.387.717 63.927 2.663 84.874 4.429a1048.61 1048.61 0 0 1 24.513 2.34 641.605 641.605 0 0 1 8.243.944l.432.054.149.02-.318 2.479-.319 2.48-.137-.018c-.094-.012-.234-.03-.421-.052a634.593 634.593 0 0 0-8.167-.936 1043.26 1043.26 0 0 0-24.395-2.329c-20.864-1.76-50.296-3.697-84.558-4.413-34.246-.714-62.535.332-82.253 1.556-9.859.612-17.574 1.269-22.82 1.772-2.622.251-4.627.464-5.973.614a213.493 213.493 0 0 0-1.901.22l-.094.01-.028.004Z"></path>
                              </svg>
                            </span>
                          </mark>
                        </h2>
                      </div>
                    </div>
                    <div data-wow-delay="0.3s" className="text-slate-700 wow zoomInUp text-sm md:text-base font-medium w-full text-center">
                      <div className="m-0 mb-6 transition-all duration-600">
                        <span className="text-slate-700 inline-block">Make your school online footprint popular.</span>
                        <span className="text-slate-500 inline-block ml-2">Move from book keeping to digital</span>
                      </div>
                    </div>
                    <div className="w-full relative text-center">
                      <div className="w-1/2 md:w-1/4 lg:w-1/5 mx-auto">
                        <button data-wow-delay="0.3s" className="hover:shadow-md wow bounceInUp ripple-btn overflow-hidden transition-shadow duration-300 bg-gradient-to-tr hover:bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-white relative text-center w-full mx-auto rounded-full p-4 opacity-100 inline-block">
                          <p className="z-50 relative transition-[color] duration-700 text-white capitalize">Book a demo</p>
                          <span className="absolute w-0 h-0 z-0 opacity-100 rounded-full block"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 py-8 pb-4 md:pt-16 relative app-bg-cover" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_CDN}/svg/bg.svg) !important` }} id="faq">
          <div className="app-container relative">
            <div data-wow-delay="0.3s" className="mb-4 wow slideInUp text-center">
              <h2 className="bg-transparent m-0 mb-6 font-satoshi font-semibold text-lg md:text-2xl lg:text-4xl relative inline-block transition-all clip-text align-middle duration-500" style={{ backgroundImage: 'linear-gradient(180deg, #2f2e41 0%, #F2DFDF 100%)' }}>
                AXIOLOT HUB FAQs
              </h2>
              <p className="text-sm font-roboto text-rasin-black">Find answers to frequently asked questions our software.</p>
            </div>
            <div className="py-6 grid grid-cols-1 md:grid-cols-2 justify-between align-middle items-start gap-8 gap-y-4">
              {
                faqData.map((faq, i) => {
                  return <Accordion key={i} data-wow-delay={`0.${i + 1}s`} className="wow bounceInUp" title={faq.question}>
                    <p data-wow-delay={`0.${i + 3}s`} className="py-8 wow fadeIn px-0 font-satoshi text-sm md:text-base text-rasin-black">{faq.answer}</p>
                  </Accordion>
                })
              }
            </div>
          </div>
        </div>
        <div className="text-center pb-8 mt-1 pt-6 relative bg-white">
          <div data-wow-delay="0.4s" className="inline-block bg-purple-200/50 wow zoomInRight backdrop-blur-md px-3 rounded-full text-purple-600 text-base font-inter uppercase text-medium">Contact</div>
          <div data-wow-delay="0.4s" className="inline-block ml-3 text-base wow zoomInLeft">Looking for a corporate solution? <a className="text-gradient-2 ml-1 font-semibold capitalize underline">contact us</a></div>
        </div>
      </div>
    </div>
  )
}
