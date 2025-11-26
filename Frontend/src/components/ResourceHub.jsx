import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPlayCircle } from "react-icons/fa";
import resourceHubMainImage from "../assets/images/resourceHubMainImage.png";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext.jsx";
import { apiClient } from "@/lib/api";

const videosData = [
  {
    id: "1",
    title: "What Is Mental Health And How Can I Improve It? | headspace",
    link: "https://www.youtube.com/embed/gtUGVzEUy5A",

    thumbnail: "https://img.youtube.com/vi/gtUGVzEUy5A/0.jpg",
    description:
      "Learn what mental health really means and discover simple ways to improve your well-being every day",
    duration: "04:07",
    tags: ["mental health", "self care", "mindfulness", "healthy mind"],
  },
  {
    id: "2",
    title:
      "De-stress in 5 Minutes: A Free Mind and Body Meditation with Elisha Mudly",
    link: "https://www.youtube.com/embed/wE292vsJcBY",

    thumbnail: "https://img.youtube.com/vi/wE292vsJcBY/0.jpg",
    description:
      "Relax your mind and body in just 5 minutes with this guided meditation by Elisha Mudly",
    duration: "04:52",
    tags: [
      "meditation",
      "stress relief",
      "mental wellness",
      "relaxation techniques",
    ],
  },
  {
    id: "3",
    title: "Atomic Habits for Mental Health",
    link: "https://www.youtube.com/embed/AOHT-YiOeQA",
    thumbnail: "https://img.youtube.com/vi/AOHT-YiOeQA/0.jpg",
    description:
      "Discover how small daily habits can transform your mental health",
    duration: "14:19",
    tags: [
      "mental health",
      "productivity",
      "mental wellness",
      "emotional well being",
    ],
  },
  {
    id: "4",
    title: "6 Therapy Skills to Stop Overthinking Everything",
    link: "https://www.youtube.com/embed/tK2LaefZcy8",
    thumbnail: "https://img.youtube.com/vi/tK2LaefZcy8/0.jpg",
    description: "Simple techniques to reduce stress and think clearly",
    duration: "15:40",
    tags: [
      "mental health",
      "stop overthinking",
      "mental wellness",
      "anxiety relief",
    ],
  },
  {
    id: "5",
    title:
      "REWIRE YOUR BRAIN - Neuroscientist Explains How To Control Your Mind in MINUTES!",
    link: "https://www.youtube.com/embed/_W_wPVRpqTs",
    thumbnail: "https://img.youtube.com/vi/_W_wPVRpqTs/0.jpg",
    description:
      "Learn to rewire your brain and take control of your thoughts in minutes with insights from a neurologist",
    duration: "10:08",
    tags: ["neuroscience", "focus and clarity", "productivity", "healthy mind"],
  },
  {
    id: "6",
    title:
      "Feel More Optimistic ( Ten Minute Guided Meditation ) Positive Thinking",
    link: "https://www.youtube.com/embed/SuuX7YKnfuc",
    thumbnail: "https://img.youtube.com/vi/SuuX7YKnfuc/0.jpg",
    description:
      "Boost your positivity with this 10-minute guided meditation, cultivate optimism",
    duration: "10:15",
    tags: ["guided meditation", "optimism", "mental wellness", "calm mind"],
  },
  {
    id: "7",
    title: "How to Stop Taking Things Personally",
    link: "https://www.youtube.com/embed/BI4dBryghRk",
    thumbnail: "https://img.youtube.com/vi/BI4dBryghRk/0.jpg",
    description:
      "Learn practical strategies to stop taking things personally, protect your emotions and respond with confidence",
    duration: "18:52",
    tags: [
      "emotional intelligence",
      "personal growth",
      "confidence",
      "emotional well being",
    ],
  },
  {
    id: "8",
    title: "How to Stop Comparing Yourself to Others",
    link: "https://www.youtube.com/embed/1f9IE3CkB4s",
    thumbnail: "https://img.youtube.com/vi/1f9IE3CkB4s/0.jpg",
    description: "Build confidence, self-love, and a healthier mindset",
    duration: "16:30",
    tags: [
      "mental health",
      "self-improvement",
      "motivation",
      "emotional wellbeing ",
    ],
  },
  {
    id: "9",
    title: "The Key To Dealing With Social Anxiety",
    link: "https://www.youtube.com/embed/XIrQKo-d7h4",
    thumbnail: "https://img.youtube.com/vi/XIrQKo-d7h4/0.jpg",
    description: "Learn tips to stay calm and connect with others",
    duration: "05:30",
    tags: [
      "overcoming anxiety",
      "social skills",
      "productivity",
      "confidence building",
    ],
  },
  {
    id: "10",
    title: "Keep going! Your failures don't define you! by Gaur Gopal Das",
    link: "https://www.youtube.com/embed/4e0-dQEmJDY",
    thumbnail: "https://img.youtube.com/vi/4e0-dQEmJDY/0.jpg",
    description: "Stay motivated your failures don't define who you are",
    duration: "05:34",
    tags: ["motivation", "optimism", "mental wellness", "life lessons"],
  },
];
const audioData = [
  {
    id: "1",
    title: "What Is Mental Health And How Can I Improve It? | headspace",
    link: "https://www.youtube.com/embed/gtUGVzEUy5A",

    thumbnail: "https://img.youtube.com/vi/gtUGVzEUy5A/0.jpg",
    description:
      "Learn what mental health really means and discover simple ways to improve your well-being every day",
    duration: "04:07",
    tags: ["mental health", "self care", "mindfulness", "healthy mind"],
  },
  {
    id: "2",
    title:
      "De-stress in 5 Minutes: A Free Mind and Body Meditation with Elisha Mudly",
    link: "https://www.youtube.com/embed/wE292vsJcBY",

    thumbnail: "https://img.youtube.com/vi/wE292vsJcBY/0.jpg",
    description:
      "Relax your mind and body in just 5 minutes with this guided meditation by Elisha Mudly",
    duration: "04:52",
    tags: [
      "meditation",
      "stress relief",
      "mental wellness",
      "relaxation techniques",
    ],
  },
  {
    id: "3",
    title: "Atomic Habits for Mental Health",
    link: "https://www.youtube.com/embed/AOHT-YiOeQA",
    thumbnail: "https://img.youtube.com/vi/AOHT-YiOeQA/0.jpg",
    description:
      "Discover how small daily habits can transform your mental health",
    duration: "14:19",
    tags: [
      "mental health",
      "productivity",
      "mental wellness",
      "emotional well being",
    ],
  },
  {
    id: "4",
    title: "6 Therapy Skills to Stop Overthinking Everything",
    link: "https://www.youtube.com/embed/tK2LaefZcy8",
    thumbnail: "https://img.youtube.com/vi/tK2LaefZcy8/0.jpg",
    description: "Simple techniques to reduce stress and think clearly",
    duration: "15:40",
    tags: [
      "mental health",
      "stop overthinking",
      "mental wellness",
      "anxiety relief",
    ],
  },
  {
    id: "5",
    title:
      "REWIRE YOUR BRAIN - Neuroscientist Explains How To Control Your Mind in MINUTES!",
    link: "https://www.youtube.com/embed/_W_wPVRpqTs",
    thumbnail: "https://img.youtube.com/vi/_W_wPVRpqTs/0.jpg",
    description:
      "Learn to rewire your brain and take control of your thoughts in minutes with insights from a neurologist",
    duration: "10:08",
    tags: ["neuroscience", "focus and clarity", "productivity", "healthy mind"],
  },
  {
    id: "6",
    title:
      "Feel More Optimistic ( Ten Minute Guided Meditation ) Positive Thinking",
    link: "https://www.youtube.com/embed/SuuX7YKnfuc",
    thumbnail: "https://img.youtube.com/vi/SuuX7YKnfuc/0.jpg",
    description:
      "Boost your positivity with this 10-minute guided meditation, cultivate optimism",
    duration: "10:15",
    tags: ["guided meditation", "optimism", "mental wellness", "calm mind"],
  },
  {
    id: "7",
    title: "How to Stop Taking Things Personally",
    link: "https://www.youtube.com/embed/BI4dBryghRk",
    thumbnail: "https://img.youtube.com/vi/BI4dBryghRk/0.jpg",
    description:
      "Learn practical strategies to stop taking things personally, protect your emotions and respond with confidence",
    duration: "18:52",
    tags: [
      "emotional intelligence",
      "personal growth",
      "confidence",
      "emotional well being",
    ],
  },
  {
    id: "8",
    title: "How to Stop Comparing Yourself to Others",
    link: "https://www.youtube.com/embed/1f9IE3CkB4s",
    thumbnail: "https://img.youtube.com/vi/1f9IE3CkB4s/0.jpg",
    description: "Build confidence, self-love, and a healthier mindset",
    duration: "16:30",
    tags: [
      "mental health",
      "self-improvement",
      "motivation",
      "emotional wellbeing ",
    ],
  },
  {
    id: "9",
    title: "The Key To Dealing With Social Anxiety",
    link: "https://www.youtube.com/embed/XIrQKo-d7h4",
    thumbnail: "https://img.youtube.com/vi/XIrQKo-d7h4/0.jpg",
    description: "Learn tips to stay calm and connect with others",
    duration: "05:30",
    tags: [
      "overcoming anxiety",
      "social skills",
      "productivity",
      "confidence building",
    ],
  },
  {
    id: "10",
    title: "Keep going! Your failures don't define you! by Gaur Gopal Das",
    link: "https://www.youtube.com/embed/4e0-dQEmJDY",
    thumbnail: "https://img.youtube.com/vi/4e0-dQEmJDY/0.jpg",
    description: "Stay motivated your failures don't define who you are",
    duration: "05:34",
    tags: ["motivation", "optimism", "mental wellness", "life lessons"],
  }]
const imagesData = [
  {
    url: "https://i.pinimg.com/736x/24/94/15/24941524b485722e85c8b6243e41cc41.jpg",
    description: "Improve, don't prove",
  },
  {
    url: "https://i.pinimg.com/736x/68/1f/75/681f754c036c8f24cc615aa06d41286d.jpg",
    description: "You are stronger than you think",
  },
  {
    url: "https://i.pinimg.com/736x/7c/5e/5f/7c5e5f25b28254bc6b13d70628f3b9bf.jpg",
    description: "Your mind attracts what you think",
  },
  {
    url: "https://i.pinimg.com/736x/ed/5e/69/ed5e699bb6c3e656880ee6b20351af92.jpg",
    description: "Stay positive",
  },

  {
    url: "https://i.pinimg.com/736x/e7/94/e2/e794e2a942042d7290ebd28f948fd217.jpg",
    description: "Stress less, live more",
  },
  {
    url: "https://i.pinimg.com/736x/f8/41/50/f841505df9dd5355ccfced8ad935a4c2.jpg",
    description: "Embrace solitude, it builds independence and confidence",
  },
  {
    url: "https://i.pinimg.com/1200x/ce/04/0f/ce040f64704bd64cfb259c24de9b504c.jpg",
    description: "Detach from judgement live freely",
  },
  {
    url: "https://i.pinimg.com/736x/73/32/74/73327488fd7428d53d878cd7aa4f1753.jpg",
    description: "Stay logical, stay strong",
  },
  {
    url: "https://i.pinimg.com/736x/57/58/f6/5758f66bc9f021afac719e075215b6f4.jpg",
    description: "5 Quick Ways to Ease Anxiety in 5 Minutes",
  },
  {
    url: "https://i.pinimg.com/736x/5a/ee/60/5aee60f57175b150c1c3569463b547ce.jpg",
    description: "It's ok",
  },
  {
    url: "https://i.pinimg.com/736x/16/63/7d/16637dadb1b5e53065bfc5f39568b1e4.jpg",
    description: "Overcoming fear of failure",
  },
  {
    url: "https://i.pinimg.com/1200x/11/13/67/111367f63a53b8aa6ad33d0e4370fd60.jpg",
    description: "Keep going",
  },
];

const ResourceHub = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [search, setSearch] = useState("");
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [showAllAudios, setShowAllAudios] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [imageSearch, setImageSearch] = useState("");
  const [resources, setResources] = useState([]);
  const [isLoadingResources, setIsLoadingResources] = useState(false);
  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    url: "",
  });
  const [savingResource, setSavingResource] = useState(false);

  const handleVideoClick = (video) => {
    if (isAuthenticated) {
      setSelectedVideo(video);
    } else {
      navigate("/authenticate/login");
    }
  };

  const handleAudioClick = (audio) => {
    if (isAuthenticated) {
      setSelectedAudio(audio);
    } else {
      navigate("/authenticate/login");
    }
  };

  const closePlayer = () => {
    setSelectedVideo(null);
    setSelectedAudio(null);
  };

  const filteredVideos = useMemo(
    () =>
      videosData.filter((v) =>
        v.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const filteredAudios = useMemo(
    () =>
      audioData.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const filteredImages = useMemo(
    () =>
      imagesData.filter((img) =>
        img.description.toLowerCase().includes(imageSearch.toLowerCase())
      ),
    [imageSearch]
  );

  const fetchResources = async () => {
    setIsLoadingResources(true);
    try {
      const { data } = await apiClient.get("/resources");
      setResources(data.data || []);
    } catch (error) {
      console.error("Failed to load resources", error);
      toast.error("Unable to load resources right now");
    } finally {
      setIsLoadingResources(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleResourceFormChange = (field) => (e) => {
    const value = e.target.value;
    setResourceForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateResource = async (e) => {
    e.preventDefault();

    if (!resourceForm.title.trim() || !resourceForm.description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    setSavingResource(true);
    try {
      const { data } = await apiClient.post("/resources", resourceForm);
      setResources((prev) => [data.data, ...prev]);
      toast.success("Resource shared successfully");
      setResourceForm({ title: "", description: "", url: "" });
    } catch (error) {
      console.error("Failed to create resource", error);
      const message = error?.response?.data?.message || "Failed to add resource";
      toast.error(message);
    } finally {
      setSavingResource(false);
    }
  };

  return (
    <div>
      <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center bg-slate-100 gap-4 sm:gap-0">
        <div className="flex gap-2 items-center justify-center sm:basis-[25%]">
          <div>
            <img src={logo} alt="MindEase" />
          </div>
          <div className="text-[#2589FB] font-bold text-xl">MindEase</div>
        </div>
        <div className="w-full">
          <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <li
              className="cursor-pointer hover:underline hover:scale-105 transition"
              onClick={() => navigate("/")}
            >
              Go Back To Home
            </li>
            {isAuthenticated && (
              <li
                className="cursor-pointer hover:underline hover:scale-105 transition"
                onClick={() => navigate("/Dashboard")}
              >
                Dashboard
              </li>
            )}
          </ul>
        </div>
        <div className="flex justify-center sm:justify-end sm:basis-[20%]">
          {!isAuthenticated ? (
            <Button
              variant="sih"
              size="sm"
              className="active:scale-[0.95] transition duration-150"
              onClick={() => navigate("/authenticate/login")}
            >
              Login
            </Button>
          ) : (
            <span className="text-sm text-gray-700">
              Welcome back, {user?.username || user?.email}
            </span>
          )}
        </div>
      </div>

      <div
        className="relative w-full min-h-[85vh] bg-cover bg-center px-6"
        style={{ backgroundImage: `url(${resourceHubMainImage})` }}
      >
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative flex justify-end items-start pt-12 pr-24">
          <div className="max-w-xl text-left">
            <h1 className="font-bold text-zinc-800 text-2xl sm:text-3xl lg:text-4xl tracking-wide leading-snug">
              Cultivate Inner Peace & Growth with <span className="text-blue-400">MindEase</span>
            </h1>
            <p className="mt-4 text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
              Explore a curated collection of psychoeducational resources designed to support your mental well-being journey.
              Discover tools for motivation, relaxation, and cognitive exercises.
            </p>
            <div className="flex items-center justify-start mt-10">
              <button className="mt-6 text-white rounded-full px-4 py-2 bg-blue-500 hover:bg-blue-600 transition shadow-lg">
                Explore Resources
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Static sections preserved */}
      {/* Videos Section */}
      <section className="py-6 bg-cyan-50">
        <h1 className="sm:text-3xl pb-10 text-xl text-black font-bold text-center">
          Motivational Videos
        </h1>
        <div className="max-w-[600px] mx-auto mb-10 px-6">
          <input
            type="text"
            placeholder="Search videos..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto px-6">
          {(showAllVideos ? filteredVideos : filteredVideos.slice(0, 3)).map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleVideoClick(video)}
            >
              <div className="relative group">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-[200px] object-cover"
                />
                <span className="absolute top-2 right-2 bg-white/70 text-black text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
                <FaPlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
              <div className="px-4 py-3">
                <h3 className="text-black text-base font-bold">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
        {filteredVideos.length > 3 && (
          <div className="w-fit mx-auto mt-6">
            <Button variant="outline" onClick={() => setShowAllVideos(!showAllVideos)}>
              {showAllVideos ? "Show Less" : "See All"}
            </Button>
          </div>
        )}
      </section>

      {/* Audios Section */}
      <section className="py-6 bg-cyan-50">
        <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center">Relaxation Audios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto px-6">
          {(showAllAudios ? filteredAudios : filteredAudios.slice(0, 3)).map((audio) => (
            <div
              key={audio.id}
              className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleAudioClick(audio)}
            >
              <div className="relative group">
                <img
                  src={audio.thumbnail}
                  alt={audio.title}
                  className="w-full h-[200px] object-cover"
                />
                <span className="absolute top-2 right-2 bg-white/70 text-black text-xs px-2 py-1 rounded">
                  {audio.duration}
                </span>
                <FaPlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
              <div className="px-4 py-3">
                <h3 className="text-black text-base font-bold">{audio.title}</h3>
              </div>
            </div>
          ))}
        </div>
        {filteredAudios.length > 3 && (
          <div className="w-fit mx-auto mt-6">
            <Button variant="outline" onClick={() => setShowAllAudios(!showAllAudios)}>
              {showAllAudios ? "Show Less" : "See All"}
            </Button>
          </div>
        )}
      </section>

      {/* Images Section */}
      <section className="py-6 bg-cyan-50">
        <h2 className="sm:text-3xl pb-10 text-xl text-black font-bold text-center">Motivational Quotes</h2>
        <div className="w-full flex justify-center mb-6 px-6">
          <input
            type="text"
            placeholder="Search images..."
            value={imageSearch}
            onChange={(e) => setImageSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto px-6">
          {(showAllImages ? filteredImages : filteredImages.slice(0, 3)).map((img, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer"
              onClick={() => window.open(img.url, "_blank")}
            >
              <img src={img.url} alt={img.description} className="w-full h-[200px] object-cover" />
              <div className="px-4 py-3">
                <p className="text-black text-sm font-semibold">{img.description}</p>
              </div>
            </div>
          ))}
        </div>
        {filteredImages.length > 3 && (
          <div className="w-fit mx-auto mt-6">
            <Button
              className="mx-auto"
              variant="outline"
              size="sm"
              onClick={() => setShowAllImages(!showAllImages)}
            >
              {showAllImages ? "Show Less" : "See All"}
            </Button>
          </div>
        )}
      </section>

      <section className="bg-white px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Community Resource Library</h2>
          {isLoadingResources ? (
            <p className="text-center text-gray-600">Loading resources...</p>
          ) : resources.length === 0 ? (
            <p className="text-center text-gray-600">No resources added yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <div key={resource._id} className="bg-gray-50 border rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-blue-600">{resource.title}</h3>
                  <p className="text-sm text-gray-700 mt-2">{resource.description}</p>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-4 text-sm text-teal-600 hover:text-teal-700 underline"
                    >
                      View Resource
                    </a>
                  )}
                  <p className="text-xs text-gray-400 mt-4">
                    Added on {new Date(resource.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {isAuthenticated && user?.isCounselor && (
        <section className="bg-gray-50 px-6 py-12">
          <div className="max-w-3xl mx-auto bg-white border rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Share a New Resource</h2>
            <form onSubmit={handleCreateResource} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  value={resourceForm.title}
                  onChange={handleResourceFormChange("title")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Resource title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={resourceForm.description}
                  onChange={handleResourceFormChange("description")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  rows="4"
                  placeholder="What will learners gain from this resource?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link (optional)</label>
                <input
                  value={resourceForm.url}
                  onChange={handleResourceFormChange("url")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="https://"
                  type="url"
                />
              </div>
              <Button type="submit" disabled={savingResource}>
                {savingResource ? "Saving..." : "Publish Resource"}
              </Button>
            </form>
          </div>
        </section>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md max-w-[800px] w-full relative p-4">
            <button
              className="absolute top-2 right-2 text-black font-bold text-lg"
              onClick={closePlayer}
            >
              ×
            </button>
            <h2 className="font-bold text-lg mb-4">{selectedVideo.title}</h2>
            <div className="relative pt-[56.25%]">
              <iframe
                src={selectedVideo.link}
                title={selectedVideo.title}
                className="absolute top-0 left-0 w-full h-full rounded-md shadow-md"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {selectedAudio && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md max-w-[500px] w-full relative p-4">
            <button
              className="absolute top-2 right-2 text-black font-bold text-lg"
              onClick={closePlayer}
            >
              ×
            </button>
            <h2 className="font-bold text-lg mb-4">{selectedAudio.title}</h2>
            <audio controls className="w-full">
              <source src={selectedAudio.link} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceHub;
