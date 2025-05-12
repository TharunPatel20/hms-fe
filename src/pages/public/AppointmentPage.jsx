import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import AppointmentForm from "../../components/forms/AppointmentForm";
import Card from "../../components/common/Card";
import LoginModal from "../../components/auth/LoginModal";
import { Calendar, Clock, MapPin, Mail, Phone, User } from "lucide-react";

export default function AppointmentPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Book an Appointment
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AppointmentForm onLoginModalOpen={() => setIsLoginModalOpen(true)} />
            </div>

            <Card className="bg-blue-50 border-none">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Appointment Information
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: <User size={18} className="text-blue-600 mr-3" />,
                    title: "Expert Doctors",
                    text: "Consult with experienced specialists.",
                  },
                  {
                    icon: <Clock size={18} className="text-blue-600 mr-3" />,
                    title: "Flexible Scheduling",
                    text: "Choose a convenient time.",
                  },
                  {
                    icon: <Calendar size={18} className="text-blue-600 mr-3" />,
                    title: "Online or In-Person",
                    text: "Choose your preferred mode.",
                  },
                ].map(({ icon, title, text }, idx) => (
                  <div className="flex items-start" key={idx}>
                    {icon}
                    <div>
                      <p className="font-medium text-gray-700">{title}</p>
                      <p className="text-sm text-gray-600">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-blue-200" />

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone size={16} className="text-blue-600 mr-2" />
                  <p className="text-gray-700">+1 (123) 456-7890</p>
                </div>
                <div className="flex items-center">
                  <Mail size={16} className="text-blue-600 mr-2" />
                  <p className="text-gray-700">appointments@medicare.com</p>
                </div>
                <div className="flex items-start">
                  <MapPin size={16} className="text-blue-600 mr-2 mt-1" />
                  <p className="text-gray-700">
                    123 Hospital Street
                    <br />
                    Medical District, MD 12345
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </div>
    </>
  );
}
