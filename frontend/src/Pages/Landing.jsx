// import React, { useState, useEffect } from 'react';
// import { MapPin, Calendar, Hospital, FileText, User, ArrowRight, Phone, Mail, Clock, Menu, X, CheckCircle, Star, ArrowUp } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';

// const LandingPage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeTestimonial, setActiveTestimonial] = useState(0);
//   const [isVisible, setIsVisible] = useState({});

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible((prev) => ({
//               ...prev,
//               [entry.target.id]: true
//             }));
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     document.querySelectorAll('[data-animate]').forEach((el) => {
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Patient",
//       content: "HealthCare Hub transformed how I manage my healthcare. The interface is intuitive and booking appointments is a breeze!",
//       rating: 5,
//       image: "/api/placeholder/64/64"
//     },
//     {
//       name: "Dr. Michael Chen",
//       role: "Healthcare Provider",
//       content: "As a doctor, this platform has streamlined my practice. Patient management has never been more efficient.",
//       rating: 5,
//       image: "/api/placeholder/64/64"
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Healthcare Administrator",
//       content: "The comprehensive features and user-friendly design make this platform stand out from others in the market.",
//       rating: 5,
//       image: "/api/placeholder/64/64"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-white fonts-inter">
//       {/* Hero Section with Glassmorphism */}
//       <header className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white">
//         <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] mix-blend-overlay opacity-20"></div>
//         <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>

//         {/* Floating Navigation with Backdrop Blur */}
//         <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
//           <div className="container mx-auto px-6 py-4">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center space-x-2">
//                 <Hospital className="h-8 w-8" />
//                 <span className="text-xl font-bold">HealthCare Hub</span>
//               </div>

//               <div className="hidden md:flex items-center space-x-8">
//                 <a href="#features" className="hover:text-blue-100 transition-colors">Features</a>
//                 <a href="#testimonials" className="hover:text-blue-100 transition-colors">Testimonials</a>
//                 <a href="#contact" className="hover:text-blue-100 transition-colors">Contact</a>
//                 <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
//                   Sign In
//                 </button>
//               </div>

//               <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
//                 {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </button>
//             </div>

//             {isMenuOpen && (
//               <div className="md:hidden absolute top-full left-0 right-0 bg-white/10 backdrop-blur-md p-6 space-y-4 border-t border-white/10">
//                 <a href="#features" className="block hover:text-blue-100">Features</a>
//                 <a href="#testimonials" className="block hover:text-blue-100">Testimonials</a>
//                 <a href="#contact" className="block hover:text-blue-100">Contact</a>
//                 <button className="w-full bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-lg">
//                   Sign In
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>

//         {/* Hero Content with Animations */}
//         <div className="container mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
//           <div className="md:w-2/3" id="hero" data-animate>
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
//               Your Health Journey,{" "}
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
//                 Simplified
//               </span>
//             </h1>
//             <p className="text-xl mb-8 text-blue-50 animate-fade-in-delay">
//               Access medical records, schedule appointments, and find nearby hospitals - all in one secure platform.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
//               <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center group">
//                 Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//               </button>
//               <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-sm">
//                 Watch Demo
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Features Section with Hover Cards */}
//       <section id="features" className="py-20 bg-gray-50" data-animate>
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-4">Key Features</h2>
//           <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
//             Everything you need to manage your healthcare journey in one place
//           </p>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 icon: <MapPin className="h-8 w-8 text-blue-600" />,
//                 title: "Hospital Locator",
//                 description: "Find nearby hospitals with real-time availability and directions"
//               },
//               {
//                 icon: <Calendar className="h-8 w-8 text-blue-600" />,
//                 title: "Easy Scheduling",
//                 description: "Book and manage appointments with your healthcare providers"
//               },
//               {
//                 icon: <FileText className="h-8 w-8 text-blue-600" />,
//                 title: "Health Records",
//                 description: "Access your complete medical history and test results securely"
//               },
//               {
//                 icon: <User className="h-8 w-8 text-blue-600" />,
//                 title: "Patient Portal",
//                 description: "Manage your health data and communicate with doctors"
//               }
//             ].map((feature, index) => (
//               <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-none bg-white/50 backdrop-blur-sm hover:bg-white">
//                 <CardContent className="p-8">
//                   <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats Section with Glassmorphism */}
//       <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] mix-blend-overlay opacity-20"></div>
//         <div className="container mx-auto px-6 relative">
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             {[
//               { number: "1M+", label: "Active Users", icon: <User className="h-8 w-8" /> },
//               { number: "500+", label: "Partner Hospitals", icon: <Hospital className="h-8 w-8" /> },
//               { number: "24/7", label: "Support Available", icon: <Clock className="h-8 w-8" /> }
//             ].map((stat, index) => (
//               <div key={index} className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors">
//                 <div className="flex justify-center mb-4">{stat.icon}</div>
//                 <div className="text-5xl font-bold mb-2">{stat.number}</div>
//                 <div className="text-blue-100">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials with Modern Cards */}
//       <section id="testimonials" className="py-20 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-16">What Our Users Say</h2>
//           <div className="max-w-4xl mx-auto">
//             <div className="relative">
//               {testimonials.map((testimonial, index) => (
//                 <div
//                   key={index}
//                   className={`transition-all duration-500 ${
//                     activeTestimonial === index ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-0"
//                   }`}
//                 >
//                   <Card className="bg-white/50 backdrop-blur-sm p-8 shadow-xl">
//                     <CardContent>
//                       <div className="flex items-center mb-6">
//                         <img
//                           src={testimonial.image}
//                           alt={testimonial.name}
//                           className="w-16 h-16 rounded-full mr-4"
//                         />
//                         <div>
//                           <p className="font-semibold text-lg">{testimonial.name}</p>
//                           <p className="text-gray-500">{testimonial.role}</p>
//                         </div>
//                       </div>
//                       <div className="flex mb-4">
//                         {[...Array(testimonial.rating)].map((_, i) => (
//                           <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
//                         ))}
//                       </div>
//                       <p className="text-gray-600 text-lg italic">"{testimonial.content}"</p>
//                     </CardContent>
//                   </Card>
//                 </div>
//               ))}
//               <div className="flex justify-center mt-8 space-x-3">
//                 {testimonials.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setActiveTestimonial(index)}
//                     className={`w-3 h-3 rounded-full transition-colors ${
//                       activeTestimonial === index ? "bg-blue-600" : "bg-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section with Modern Form */}
//       <section id="contact" className="py-20 bg-white">
//         <div className="container mx-auto px-6">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
//               <p className="text-gray-600 mb-8 text-lg">
//                 Have questions about our platform? Our team is here to help you 24/7.
//               </p>
//               <div className="space-y-6">
//                 {[
//                   { icon: <Phone className="h-6 w-6" />, text: "+1 (555) 123-4567" },
//                   { icon: <Mail className="h-6 w-6" />, text: "support@healthcarehub.com" },
//                   { icon: <Clock className="h-6 w-6" />, text: "24/7 Support Available" }
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center space-x-4 text-gray-600">
//                     <div className="p-3 bg-blue-100 rounded-full">{item.icon}</div>
//                     <span className="text-lg">{item.text}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <Card className="shadow-2xl border-none bg-white">
//               <CardContent className="p-8">
//                 <form className="space-y-6">
//                   <div>
//                     <input
//                       type="text"
//                       placeholder="Your Name"
//                       className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
//                     />
//                   </div>
//                   <div>
//                     <input
//                       type="email"
//                       placeholder="Email Address"
//                       className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
//                     />
//                   </div>
//                   <div>
//                     <textarea
//                       placeholder="Your Message"
//                       rows={4}
//                       className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
//                     />
//                   </div>
//                   <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center group">
//                     Send Message <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Footer with Modern Design */}
//       <footer className="bg-gray-900 text-gray-400 py-16">
//         <div className="container mx-auto px-6">
//         <div className="grid md:grid-cols-4 gap-8 mb-12">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <Hospital className="h-8 w-8 text-white" />
//                 <span className="text-xl font-bold text-white">HealthCare Hub</span>
//               </div>
//               <p className="text-sm">
//                 Making healthcare accessible and manageable for everyone.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-white font-semibold mb-4">Quick Links</h3>
//               <div className="space-y-3">
//                 <a href="#features" className="block hover:text-white transition-colors">Features</a>
//                 <a href="#testimonials" className="block hover:text-white transition-colors">Testimonials</a>
//                 <a href="#contact" className="block hover:text-white transition-colors">Contact</a>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-white font-semibold mb-4">Legal</h3>
//               <div className="space-y-3">
//                 <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
//                 <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
//                 <a href="#" className="block hover:text-white transition-colors">Cookie Policy</a>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-white font-semibold mb-4">Follow Us</h3>
//               <div className="space-y-3">
//                 <a href="#" className="flex items-center hover:text-white transition-colors">
//                   Twitter <ArrowRight className="ml-2 h-4 w-4" />
//                 </a>
//                 <a href="#" className="flex items-center hover:text-white transition-colors">
//                   LinkedIn <ArrowRight className="ml-2 h-4 w-4" />
//                 </a>
//                 <a href="#" className="flex items-center hover:text-white transition-colors">
//                   Facebook <ArrowRight className="ml-2 h-4 w-4" />
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 pt-8 text-center">
//             <p>&copy; 2024 HealthCare Hub. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>

//       {/* Scroll to top button */}
//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
//       >
//         <ArrowUp className="h-6 w-6" />
//       </button>
//     </div>
//   );
// };

// export default LandingPage;

import React, { useState } from "react";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ChevronDown,
  Star,
  Award,
  Users,
  CheckCircle,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ContactUs from "./ContactUs";

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Previous code remains the same until About Section...

  return (
    <div className="flex flex-col min-h-screen fonts-Poppins">
      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-teal-600">CureNest</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-teal-600 font-medium"
              >
                Home
              </a>
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 font-medium">
                  <span>Departments</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-48">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    Cardiology
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    Neurology
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    Pediatrics
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    Dental Care
                  </a>
                </div>
              </div>
              <a
                href="#"
                className="text-gray-700 hover:text-teal-600 font-medium"
              >
                Doctors
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-teal-600 font-medium"
              >
                Services
              </a>
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 font-medium">
                  <span>Pages</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-48">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    About Us
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    Our Team
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    FAQ
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    Booking
                  </a>
                </div>
              </div>
              <a
                href="#"
                className="text-gray-700 hover:text-teal-600 font-medium"
              >
                Contact
              </a>
              <a href="/signin">
                <button className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition duration-300">
                  Sign In
                </button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4">
              <a href="#" className="block py-2 text-gray-700">
                Home
              </a>
              <a href="#" className="block py-2 text-gray-700">
                Departments
              </a>
              <a href="#" className="block py-2 text-gray-700">
                Doctors
              </a>
              <a href="#" className="block py-2 text-gray-700">
                Services
              </a>
              <a href="#" className="block py-2 text-gray-700">
                Pages
              </a>
              <a href="#" className="block py-2 text-gray-700">
                Contact
              </a>
              <a href="/signin">
                <button className="mt-4 w-full bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700">
                  Get Appointment
                </button>
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative text-black">
        {/* Slideshow */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="h-screen"
        >
          <SwiperSlide>
            <div
              className="h-screen bg-cover bg-center flex items-center"
              style={{
                backgroundImage: `url('https://wpthemesgrid.com/themes/medikit/img/slider2.jpg')`,
              }}
            >
              <div className="bg-opacity-80 p-8 rounded-lg max-w-xl ml-12">
                <h1 className="text-5xl font-bold leading-tight">
                  <span className="text-teal-600">Protect</span> Your Health And
                  Take
                  <span className="text-teal-600"> Care</span> Of Your Health
                </h1>
                <p className="mt-6 text-lg text-gray-700">
                  We provide{" "}
                  <span className="font-semibold text-teal-600">
                    special tips
                  </span>
                  and <span className="text-teal-500">advice</span> for health
                  care treatment and use high-level{" "}
                  <span className="font-semibold text-teal-600">
                    advanced technology
                  </span>{" "}
                  in our hospital.
                </p>
                <div className="mt-8 flex space-x-4">
                  <a href="/signin">
                    <button className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 transition duration-300">
                      Get Appointment
                    </button>
                  </a>
                  <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-md hover:bg-teal-600 hover:text-white transition duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="h-screen bg-cover bg-center flex items-center"
              style={{
                backgroundImage: `url('https://wpthemesgrid.com/themes/medikit/img/slider3.jpg')`,
              }}
            >
              <div className="bg-opacity-80 p-8 rounded-lg max-w-xl ml-12">
                <h1 className="text-5xl font-bold leading-tight">
                  <span className="text-teal-600">Advanced</span> Health Care
                  <span className="text-black-500">Technology</span>
                </h1>
                <p className="mt-6 text-lg text-gray-700">
                  Discover{" "}
                  <span className="font-semibold text-teal-600">
                    cutting-edge medical solutions
                  </span>{" "}
                  with our
                  <span className="text-yellow-500">
                    state-of-the-art facilities
                  </span>{" "}
                  and expert team.
                </p>
                <div className="mt-8 flex space-x-4">
                  <button className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 transition duration-300">
                    Book a Consultation
                  </button>
                  <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-md hover:bg-teal-600 hover:text-white transition duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="h-screen bg-cover bg-center flex items-center"
              style={{
                backgroundImage: `url('https://wpthemesgrid.com/themes/medikit/img/slider.jpg')`,
              }}
            >
              <div className="bg-opacity-80 p-8 rounded-lg max-w-xl ml-12">
                <h1 className="text-5xl font-bold leading-tight">
                  <span className="text-teal-600">Quality</span> Healthcare
                  <span className="text-yellow-500">Services</span>
                </h1>
                <p className="mt-6 text-lg text-gray-700">
                  We are dedicated to providing{" "}
                  <span className="font-semibold text-teal-600">
                    quality healthcare services
                  </span>
                  to ensure the{" "}
                  <span className="text-yellow-500">well-being</span> of our
                  patients.
                </p>
                <div className="mt-8 flex space-x-4">
                  <button className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 transition duration-300">
                    Contact Us
                  </button>
                  <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-md hover:bg-teal-600 hover:text-white transition duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-teal-600 text-6xl font-semibold">Our Services</span>
            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              We Offer Different Services To Improve Your Health
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "General Treatment",
                description: "Comprehensive care for your general health needs",
                icon: "🏥",
              },
              {
                title: "Teeth Whitening",
                description: "Professional dental whitening services",
                icon: "🦷",
              },
              {
                title: "Heart Surgery",
                description: "Advanced cardiac surgical procedures",
                icon: "❤",
              },
              {
                title: "Pediatrics",
                description: "Specialized care for children's health",
                icon: "👶",
              },
              {
                title: "Laboratory Service",
                description: "Advanced diagnostic testing facilities",
                icon: "🔬",
              },
              {
                title: "Neurology",
                description: "Expert care for neurological conditions",
                icon: "🧠",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a
                  href="#"
                  className="text-teal-600 hover:text-teal-700 flex items-center"
                >
                  Learn More <ChevronDown className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1500+", label: "Happy Clients", icon: Users },
              { number: "150+", label: "Experienced Doctors", icon: Award },
              { number: "350+", label: "Hospital Rooms", icon: CheckCircle },
              { number: "15+", label: "Years Experience", icon: Star },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <stat.icon className="w-12 h-12 mb-4" />
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-teal-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-teal-600 text-6xl font-semibold">Our Doctors</span>
            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              Our Outstanding Doctors
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. John Smith",
                specialty: "Cardiology",
                image: "/api/placeholder/300/400",
              },
              {
                name: "Dr. Sarah Johnson",
                specialty: "Neurology",
                image: "/api/placeholder/300/400",
              },
              {
                name: "Dr. Michael Brown",
                specialty: "Pediatrics",
                image: "/api/placeholder/300/400",
              },
              {
                name: "Dr. Emily Davis",
                specialty: "Dental Care",
                image: "/api/placeholder/300/400",
              },
            ].map((doctor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-teal-600 bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex space-x-4">
                      <Facebook className="w-6 h-6 text-white cursor-pointer" />
                      <Twitter className="w-6 h-6 text-white cursor-pointer" />
                      <Instagram className="w-6 h-6 text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    {doctor.name}
                  </h3>
                  <p className="text-teal-600 mt-1">{doctor.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ContactUs */}
      <ContactUs />

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">MediKit</h3>
              <p className="text-gray-400 mb-6">
                Leading the way in medical excellence, providing the care you
                deserve.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Doctors
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Departments
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Dental Care
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cardiology
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Neurology
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Orthopedics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Laboratory
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-400">
                    123 Health Street, Medical City
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-400">+123 456 7890</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-400">info@medikit.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-400">Mon - Sat: 8:00 - 17:00</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 MediKit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
