import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Clock } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';
import { useAuthStore } from '../../store/authStore.js';

const Upcoming = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
        const token = useAuthStore.getState().token;
      try {
        const response = await axios.get('http://localhost:6969/api/hms/appointment/get/patient/upcoming', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        console.log("API response:", response);
        setAppointments(response.data.data);
      } catch (error) {
        console.error('Error fetching upcoming appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Card title="Upcoming Appointments">
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-sm">No upcoming appointments.</p>
        ) : (
          appointments.map((appointment, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Calendar size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {appointment.doctorName}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {/* You can add specialization if available */}
                    </p>
                    <div className="flex items-center mt-2 text-gray-500 text-sm">
                      <Calendar size={14} className="mr-1" />
                      <span className="mr-3">
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                      </span>
                      <Clock size={14} className="mr-1" />
                      <span>
                        {appointment.startTime} - {appointment.endTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.appointmentType === 'online'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {appointment.appointmentType === 'online' ? 'Online' : 'In-Person'}
                  </span>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  {appointment.appointmentType === 'online' && (
                    <Button variant="primary" size="sm">
                      Join Call
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">
            View All Appointments
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Upcoming;
