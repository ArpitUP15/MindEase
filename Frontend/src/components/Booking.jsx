import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import BookingHeroImage from "../assets/images/BookingHeroImage.png";
import { GiNotebook } from "react-icons/gi";
import { PiStudentDuotone } from "react-icons/pi";
import { RiPsychotherapyLine } from "react-icons/ri";
import { BsCalendarDate } from "react-icons/bs";
import { Calendar } from "@/components/ui/calendar";
import { IoIosTimer } from "react-icons/io";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import logo from "../assets/images/logo.png";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext.jsx";
import { apiClient } from "@/lib/api";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const Booking = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [counsellorId, setCounsellorId] = useState("");
  const [counsellors, setCounsellors] = useState([]);
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState(timeSlots[1]);
  const [policy, setPolicy] = useState(false);
  const [notes, setNotes] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/authenticate/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const loadCounsellors = async () => {
      try {
        const { data } = await apiClient.get("/users", {
          params: { isCounselor: true },
        });
        setCounsellors(data.data || []);
        if (data.data?.length) {
          setCounsellorId(data.data[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch counsellors", error);
        toast.error("Unable to load counsellors");
      }
    };

    loadCounsellors();
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    const loadSessions = async () => {
      setLoadingSessions(true);
      try {
        const params = user.isCounselor
          ? { counselor: user._id }
          : { student: user._id };
        const { data } = await apiClient.get("/sessions", { params });
        setBookings(data.data || []);
      } catch (error) {
        console.error("Failed to load sessions", error);
        toast.error("Unable to load your bookings right now");
      } finally {
        setLoadingSessions(false);
      }
    };

    loadSessions();
  }, [user]);

  const scheduledTime = useMemo(() => {
    if (!date || !timeSlot) return new Date();

    const [hoursPart, minutesPart] = timeSlot.split(":");
    const [minutes, period] = minutesPart.split(" ");
    let hours = parseInt(hoursPart, 10);
    const mins = parseInt(minutes, 10);

    if (period === "PM" && hours < 12) {
      hours += 12;
    }
    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    const scheduled = new Date(date);
    scheduled.setHours(hours, mins, 0, 0);
    return scheduled;
  }, [date, timeSlot]);

  const handleBooking = async () => {
    if (!policy) {
      toast.error("Please accept the privacy policy.");
      return;
    }

    if (!user?._id || !counsellorId) {
      toast.error("Missing required information.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        studentId: user._id,
        counselorId: counsellorId,
        scheduledTime: scheduledTime.toISOString(),
        status: "pending",
        notes,
      };

      const { data } = await apiClient.post("/sessions", payload);
      setBookings((prev) => [...prev, data.data]);
      toast.success("Session booked successfully");

      setNotes("");
      setPolicy(false);
    } catch (error) {
      console.error("Failed to create session", error);
      const message = error?.response?.data?.message || "Booking failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#06D6A0FF]">
      <div className="px-8 py-2 flex items-center">
        <div className="flex gap-2 basis-[25%] items-center">
          <div><img src={logo} alt="MindEase" /></div>
          <div className="text-[#2589FB] font-bold text-xl">MindEase</div>
        </div>
        <div className="w-full">
          <ul className="list-none flex items-center justify-center gap-8">
            <li className="hover:scale-105 text-sm cursor-pointer hover:underline transition-all duration-100 text-white">
              Book a Session
            </li>
            <li className="hover:scale-105 text-sm cursor-pointer hover:underline transition-all duration-100 text-white">
              My Bookings
            </li>
            <li className="hover:scale-105 text-sm cursor-pointer hover:underline transition-all duration-100 text-white">
              Privacy Policy
            </li>

            <li
              className="hover:scale-105 text-sm cursor-pointer hover:underline transition-all duration-100 text-white"
              onClick={() => navigate("/")}
            >
              home
            </li>
          </ul>
        </div>
        <div className="basis-[20%] text-end">
          <img
            src="#"
            alt="profile"
          />
        </div>
      </div>

      <div className="bg-[#06D6A0FF] px-12 py-4 pb-14">
        <div className="flex">
          <div className="ml-21 sm:ml-[250px] p-4 mt-12">
            <div className="text-xl lg:text-4xl font-bold px-4 tracking-wider text-[#19191FFF]">
              Counseling for Students
            </div>
            <div className="text-sm sm:text-base mt-4 px-4 text-[#19191fff]">
              Securely book your counselling sessions with ease. Your privacy
              and well-being are our top priorities.
            </div>
            <div className="px-4 pt-8">
              <Button variant="sih" size="sm">
                Book Your Session Now
              </Button>
            </div>
          </div>
          <div className="w-[100%]">
            <img src={BookingHeroImage} alt="Counselling" className="w-full" />
          </div>
        </div>
      </div>

      <div className="bg-white flex-col mt-32 max-w-[900px] mx-auto px-12 py-8">
        <div className="flex items-center justify-start gap-4 py-1">
          <GiNotebook className="text-cyan-400 text-5xl" />
          <div className="text-xl sm:text-3xl font-bold text-[#171A1FFF]">
            Book a New Session
          </div>
        </div>

        <div className="mt-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 top-1 pl-3 flex items-center pointer-events-none">
              <PiStudentDuotone className="text-lg text-gray-600" />
            </div>
            <input
              type="text"
              value={user?.username || user?.email || ""}
              disabled
              className="w-full pl-10 pr-3 text-sm border border-gray-300 rounded-md py-1 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="mt-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Counsellor
          </label>
          <select
            value={counsellorId}
            onChange={(e) => setCounsellorId(e.target.value)}
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          >
            {counsellors.map((counsellor) => (
              <option key={counsellor._id} value={counsellor._id}>
                {counsellor.username || counsellor.email}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-20 sm:gap-72 mt-10">
          <div>
            <div className="flex items-center gap-2 py-4">
              <BsCalendarDate className="text-[#565D6DFF] text-2xl" />
              <div className="font-semibold text-base text-[#171A1FFF]">
                Select Date
              </div>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selected) => selected && setDate(selected)}
              className="rounded-lg w-80 p-4 border text-base shadow-md ring-zinc-600 ring-[0.5px]"
            />
          </div>

          <div className="flex-col items-center gap-4">
            <div className="flex items-center">
              <IoIosTimer className="text-2xl" />
              <div className="font-semibold text-base text-[#171A1FFF]">
                Time Slot
              </div>
            </div>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full px-3 py-1 border border-gray-300 rounded-md"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            rows={3}
            placeholder="Share anything the counsellor should know"
          />
        </div>

        <div className="mt-10">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={policy}
              onChange={(e) => setPolicy(e.target.checked)}
            />
            I agree to the privacy policy
          </label>
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="sih" size="sm" onClick={handleBooking} disabled={loading}>
            {loading ? "Processing..." : "Confirm Booking"}
          </Button>
        </div>
      </div>

      <div className="bg-white flex-col mt-10 max-w-[900px] mx-auto px-12 py-8">
        <div className="flex items-center justify-start gap-4 py-1">
          <RiPsychotherapyLine className="text-cyan-400 text-5xl" />
          <div className="text-xl sm:text-3xl font-bold text-[#171A1FFF]">
            Session Overview
          </div>
        </div>

        <div className="rounded-md mt-10 border px-4 py-4">
          <div className="flex items-center gap-2">
            <GrView className="text-cyan-500" />
            <div className="text-base font-semibold text-[#171A1FFF]">
              {user?.isCounselor ? "Upcoming Sessions" : "My Bookings"}
            </div>
          </div>

          {loadingSessions ? (
            <p className="text-sm text-gray-600 mt-4">Loading sessions...</p>
          ) : bookings.length === 0 ? (
            <p className="text-sm text-gray-600 mt-4">
              No sessions scheduled yet.
            </p>
          ) : (
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>When</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Counsellor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>
                      {new Date(booking.scheduledTime || booking.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {booking.student?.username || booking.student?.email || "-"}
                    </TableCell>
                    <TableCell>
                      {booking.counselor?.username || booking.counselor?.email || "-"}
                    </TableCell>
                    <TableCell className="capitalize">
                      {booking.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
