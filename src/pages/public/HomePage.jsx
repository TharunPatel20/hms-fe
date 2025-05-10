import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  Stethoscope,
  Clock,
  Activity,
  CheckCircle,
  Globe,
  ShieldCheck,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Button from "../../components/common/Button";
import LoginModal from "../../components/auth/LoginModal";

const HomePage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className=" bg-white dark:bg-black">
      <Navbar />
      <div className="min-h-screen ">
        {/* Hero Section */}
        <div className="relative min-h-screen flex flex-col">
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-900 h-[80vh] flex items-center">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
              }}
            ></div>

            <div className="container mx-auto px-8 relative mt-6 z-10 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left text-white dark:text-white">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 ">
                  Modern Healthcare <br />
                  <span className="text-blue-300">At Your Fingertips</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  Experience seamless healthcare management with our
                  comprehensive hospital management system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button
                    onClick={() => setIsLoginModalOpen(true)}
                    variant="primary"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                    icon={<ArrowRight size={16} />}
                    iconPosition="right"
                  >
                    Get Started
                  </Button>
                  <Button
                    onClick={() => navigate("/appointment")}
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>

              <div className="md:w-1/2 mt-12 md:mt-0 hidden md:block">
                <img
                  src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Doctor with patient"
                  className="rounded-lg shadow-2xl object-cover transform rotate-0 hover:-rotate-3 transition-transform duration-500 max-h-96"
                />
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="container mx-auto px-6 relative -mt-8 z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="p-3 bg-blue-100 rounded-full inline-block mb-4">
                  <Calendar size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Easy Appointment Booking
                </h3>
                <p className="text-gray-600">
                  Book appointments online or in-person with ease. Choose your
                  preferred doctor and time slot.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="p-3 bg-green-100 rounded-full inline-block mb-4">
                  <Stethoscope size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
                <p className="text-gray-600">
                  Access to highly qualified and experienced doctors across
                  various medical specializations.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="p-3 bg-purple-100 rounded-full inline-block mb-4">
                  <Activity size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Digital Health Records
                </h3>
                <p className="text-gray-600">
                  Secure access to your medical history, prescriptions, and test
                  results at any time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="py-20 bg-gray-50  dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12  m-auto ">
              <div className="">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                  About Our Hospital
                </h2>
                <div className="flex justify-between">
                <p className="text-gray-600 mb-6 dark:text-white md:w-1/2 pt-8 " >
                  MediCare is a state-of-the-art hospital management system
                  designed to streamline healthcare services and improve patient
                  experience. Our platform connects patients with top medical
                  professionals and provides easy access to healthcare services.
                </p>

                <div className="space-y-4 dark:text-white">
                  <div className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-green-500 mr-3 mt-1 flex-shrink-0"
                    />
                    <p className="text-gray-600 dark:text-white">
                      Advanced technology for seamless healthcare management
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-green-500 mr-3 mt-1 flex-shrink-0"
                    />
                    <p className="text-gray-600 dark:text-white">
                      Highly qualified medical professionals from various
                      specializations
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-green-500 mr-3 mt-1 flex-shrink-0"
                    />
                    <p className="text-gray-600 dark:text-white">
                      24/7 patient support and emergency services
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle
                      size={20}
                      className="text-green-500 mr-3 mt-1 flex-shrink-0"
                    />
                    <p className="text-gray-600 dark:text-white">
                      Modern facilities with the latest medical equipment
                    </p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-blue-600 text-white  ">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold dark:text-white">Trusted by Thousands</h2>
              <p className="text-xl opacity-80 mt-2">Our impact in numbers</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="flex justify-center mb-4">
                  <Users size={24} className="text-blue-300" />
                </div>
                <p className="text-blue-100">Specialist Doctors</p>
              </div>

              <div className="p-6">
                <div className="text-4xl font-bold mb-2">10k+</div>
                <div className="flex justify-center mb-4">
                  <Users size={24} className="text-blue-300" />
                </div>
                <p className="text-blue-100">Happy Patients</p>
              </div>

              <div className="p-6">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="flex justify-center mb-4">
                  <BookOpen size={24} className="text-blue-300" />
                </div>
                <p className="text-blue-100">Departments</p>
              </div>

              <div className="p-6">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="flex justify-center mb-4">
                  <Clock size={24} className="text-blue-300" />
                </div>
                <p className="text-blue-100">Patient Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Services</h2>
              <p className="text-xl text-gray-600 mt-2  dark:text-white">
                Comprehensive healthcare solutions for all your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-blue-100 rounded-full inline-block mb-4">
                  <Globe size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Telemedicine</h3>
                <p className="text-gray-600 mb-4">
                  Virtual consultations with doctors from the comfort of your
                  home.
                </p>
                <a
                  href="#"
                  className="text-blue-600 flex items-center hover:text-blue-800 transition-colors"
                >
                  Learn more <ArrowRight size={16} className="ml-1" />
                </a>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-green-100 rounded-full inline-block mb-4">
                  <Activity size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Preventive Care</h3>
                <p className="text-gray-600 mb-4">
                  Regular check-ups and preventive health measures to maintain
                  wellness.
                </p>
                <a
                  href="#"
                  className="text-blue-600 flex items-center hover:text-blue-800 transition-colors"
                >
                  Learn more <ArrowRight size={16} className="ml-1" />
                </a>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-purple-100 rounded-full inline-block mb-4">
                  <ShieldCheck size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Emergency Care</h3>
                <p className="text-gray-600 mb-4">
                  24/7 emergency services with rapid response teams for critical
                  situations.
                </p>
                <a
                  href="#"
                  className="text-blue-600 flex items-center hover:text-blue-800 transition-colors"
                >
                  Learn more <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-100  dark:bg-black dark:border-rounded-lg dark:border-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">
              Ready to experience better healthcare?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto dark:text-white">
              Join thousands of patients who have transformed their healthcare
              experience with MediCare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsLoginModalOpen(true)}
                variant="primary"
                size="lg"
              >
                Get Started
              </Button>
              <Button
                onClick={() => navigate("/blogs")}
                variant="outline"
                size="lg"
              >
                Read Our Blog
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">MediCare</h3>
                <p className="text-sm text-gray-400">
                  Modern healthcare at your fingertips.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-1 ">Quick Links</h4>
                  <ul className="space-y-2 ">
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        Services
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        Doctors
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        About
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Contact</h4>
                  <p className="text-gray-400 p-2">
                    123 Hospital St
                    <br />
                    Medical City, MD
                    <br />
                    contact@medicare.com
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-6 pt-4 text-sm flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500">© 2025 MediCare</p>
              <div className="mt-2 md:mt-0 space-x-3">
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Login Modal */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default HomePage;
