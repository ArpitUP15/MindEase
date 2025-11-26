import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "../assets/images/logo.png"
import { FaUserCircle, FaBell, FaThLarge } from "react-icons/fa";
import { MdDashboard, MdForum, MdEvent, MdBook } from "react-icons/md";
import { FaRegComment, FaRegEye } from "react-icons/fa";
import { FaCalendarAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import f from "../assets/images/f.png";
import { useNavigate } from "react-router-dom";

import event1 from "../assets/images/event1.png";
import event2 from "../assets/images/event2.png";
import event3 from "../assets/images/event3.png";

const PeerToPeer = () => {
  const topics = [
    {
      title: "Coping with exam stress during finals",
      tags: ["Academics", "Stress", "Exams"],
      description:
      "Finals are approaching and I'm really struggling with the pressure. Any tips for managing stress and staying focused?",
      author: "Student A",
      time: "2 hours ago",
      comments: 15,
      views: 245,
    },
    {
      title: "Building new friendships in a new city",
      tags: ["Social", "Loneliness", "Community"],
      description:
      "Just moved to a new city for university and finding it hard to meet people. Any advice on making new friends and building a support network?",
      author: "Newcomer B",
      time: "yesterday",
      comments: 22,
      views: 310,
    },
    {
      title: "Strategies for improving mental well-being",
      tags: ["Mental Health", "Self-Care", "Well-being"],
      description:
      "Looking for practical strategies and daily habits to boost mental well-being. What works for you all?",
      author: "Wellness C",
      time: "3 days ago",
      comments: 38,
      views: 480,
    },
    {
      title: "Navigating career choices after graduation",
      tags: ["Career", "Future", "Guidance"],
      description:
      "Graduation is just around the corner and I'm feeling lost about my career path. How did you decide what to do next?",
      author: "Graduate D",
      time: "1 week ago",
      comments: 10,
      views: 190,
    },
  ];
  
  const events = [
    {
      title: "Mindfulness & Meditation Workshop",
      date: "Oct 26, 2024",
      location: "Community Hall",
      image: event1,
      action: "Register Now",
    },
    {
      title: "Coffee & Connect Meetup",
      date: "Nov 5, 2024",
      location: "The Local Cafe",
      image: event2,
      action: "Join Us",
    },
    {
      title: "Board Game Night",
      date: "Nov 18, 2024",
      location: "Student Union",
      image: event3,
      action: "Sign Up",
    },
  ];
  
  const messages = [
    { sender: "support", text: "Hi there! How can I help you today?" },
    {
      sender: "user",
      text: "I'm feeling a bit overwhelmed with my studies.",
    },
    {
      sender: "support",
      text: "I understand. Many students feel that way sometimes. Would you like to talk about what specifically is making you feel overwhelmed?",
    },
  ];
  
  const navigate = useNavigate();        
  return (
    <div className="w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[100vh] max-w-full rounded-lg border md:min-w-[450px]"
      >
        {/* Sidebar */}
        <ResizablePanel defaultSize={20} className="bg-white border-r">
          <div className="flex flex-col">
            {/* Logo */}
            <div className="p-5 flex items-center gap-2 border-b">
              <img src={logo} alt="" />
              <span className="text-xl font-bold text-pink-600">MindEase</span>
            </div>

            {/* Sidebar Items */}
            <nav className="flex flex-col p-4 gap-4 text-gray-700 font-medium">
              <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
                <MdDashboard /> Dashboard
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
                <MdForum /> Forum
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
                <MdEvent /> Events
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
                <MdBook /> Guidelines
              </div>
            </nav>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Content */}
        <ResizablePanel defaultSize={80} className="bg-gray-50">
          <div className="flex flex-col h-full">
            {/* Navbar */}
            <div className="flex justify-end gap-10 items-center p-4 bg-white">
              <button
                className="bg-teal-600 shadow-md text-sm hover:bg-teal-700 text-white px-4 py-2 rounded"
                onClick={() => navigate("/")}
              >
                Back to home
              </button>
              <input
                type="text"
                placeholder="Search topics, volunteers, or events..."
                className="border rounded-md px-4 py-2 w-1/3 text-sm focus:ring focus:ring-blue-200"
              />
              <div className="flex items-center gap-6">
                <FaBell className="text-gray-600 cursor-pointer" />
                <FaUserCircle className="text-gray-600 text-2xl cursor-pointer" />
              </div>
            </div>

            {/* Hero Section */}
            <div className="px-8 lg:px-32">
              <div
                className="relative bg-cover bg-center h-[300px] flex items-center px-10 rounded-md"
                style={{
                  backgroundImage: `url(${f})`,
                }}
              >
                <div className="inset-0 absolute bg-white opacity-50 rounded-md"></div>
                <div className="z-10">
                  <div className="tracking-wider max-w-xl">
                    <h1 className="text-4xl font-bold text-black">
                      Your Community for Peer Support
                    </h1>
                    <p className="text-gray-900 text-sm py-2 mt-3">
                      Connect with trained student volunteers and peers to share
                      experiences, seek advice, and find understanding in a
                      safe, moderated environment.
                    </p>
                    <button className="mt-4 bg-teal-600 shadow-md text-sm hover:bg-teal-700 text-white px-4 py-2 rounded">
                      Join the Community
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Forum Topics */}
            <div className="px-8 lg:px-32 py-10">
              <h2 className="text-2xl font-bold text-center mb-6">
                Forum Topics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topics.map((topic, index) => (
                  <div
                    key={index}
                    className="bg-white shadow rounded-lg p-6 border hover:border-blue-400 transition"
                  >
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {topic.title}
                    </h3>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {topic.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-yellow-200 rounded-full text-yellow-800 px-3 text-xs py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {topic.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <FaUserCircle className="text-gray-400" />
                        <span>{topic.author}</span>
                        <span>• {topic.time}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <FaRegComment /> {topic.comments}
                        </div>
                        <div className="flex items-center gap-1">
                          <FaRegEye /> {topic.views}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View all button */}
              <div className="text-center mt-8">
                <button className="px-4 py-2 text-sm border rounded-md text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition">
                  View All Topics
                </button>
              </div>
            </div>

            {/* Community Events */}
            <div className="px-8 lg:px-32 py-10">
              <h2 className="text-2xl font-bold text-center mb-6">
                Community Events
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="bg-white shadow rounded-lg overflow-hidden border"
                  >
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-60"></div>
                    </div>
                    <div className="p-6">
                      <div className="h-32">
                        <h3 className="font-bold text-base text-gray-800 mb-2">
                          {event.title}
                        </h3>
                        <p className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <FaCalendarAlt /> {event.date}
                        </p>
                        <p className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <FaMapMarkerAlt /> {event.location}
                        </p>
                      </div>
                      <button className="w-full border border-teal-600 text-teal-600 px-4 py-1 text-sm rounded hover:bg-teal-600 hover:text-white transition">
                        {event.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* View all events button */}
              <div className="text-center mt-8">
                <button className="px-6 py-2 text-sm rounded-md bg-teal-500 text-white hover:bg-teal-600 transition">
                  See All Events
                </button>
              </div>
            </div>

            {/* Instant Chat Support */}
            <div className="px-8 lg:px-32 py-10">
              <h2 className="text-2xl font-bold text-center mb-6">
                Instant Chat Support
              </h2>

              <div className="max-w-2xl mx-auto bg-white shadow rounded-lg border">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="support"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        Chat with Sarah J.
                      </p>
                      <span className="text-green-500 text-xs">● Online</span>
                    </div>
                  </div>
                  <div className="text-gray-500 cursor-pointer">⋮</div>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-md text-sm max-w-xs ${
                          msg.sender === "user"
                            ? "bg-teal-600 text-white"
                            : "bg-teal-50 text-gray-700"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex items-center border-t p-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 text-sm outline-none"
                  />
                  <button className="text-teal-600 hover:text-teal-800 px-3">
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>

            {/* Guidlines */}

            <div className="px-8 lg:px-32 py-15">
              <h2 className="text-2xl font-bold text-center mb-6">
                Community Guidelines
              </h2>
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Be Respectful and Empathetic
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      Treat every member with kindness and empathy. Respect
                      different perspectives and experiences, and engage in
                      discussions with understanding and compassion.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Maintain Confidentiality</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      What’s shared in the community stays in the community.
                      Respect others’ privacy and avoid disclosing personal
                      information without consent.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Offer Constructive Feedback
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      When giving feedback, keep it supportive and
                      solution-focused. Aim to help others grow, not to
                      criticize or discourage.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Promote a Positive Environment
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      Encourage uplifting and healthy conversations. Share
                      resources, motivation, and positivity to create a safe and
                      welcoming space for everyone.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <div className="h-6 w-full mt-10 text-center text-xs font-bold">
        {" "}
        The Vangaurds
      </div>
    </div>
  );
};

export default PeerToPeer;
