import React, { useState, useRef, useEffect } from "react";
import { RiRobot3Fill } from "react-icons/ri";
const MindEaseChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hey there 👋 \nHow can I help you today?",
      timestamp: Date.now(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const chatBodyRef = useRef(null);
  const fileInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const API_KEY = "AIzaSyABuSoxV6fcVxug-yqMt5ZrBk-5lbwOz7M"; // Add your API key here
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const allowedKeywords = [
    "health",
    "wellness",
    "fitness",
    "exercise",
    "diet",
    "nutrition",
    "hydration",
    "sleep",
    "rest",
    "hygiene",
    "immunity",
    "recovery",
    "medicine",
    "healthcare",
    "preventive care",
    "chronic illness",
    "acute illness",
    "lifestyle",
    "rehabilitation",
    "public health",
    "physical activity",
    "healthy habits",
    "screening",
    "vaccination",
    "disease prevention",
    "first aid",
    "primary care",
    "emergency care",
    "surgery",
    "nursing",
    "pharmacy",
    "telemedicine",
    "digital health",
    "mental health",
    "emotional health",
    "psychological wellbeing",
    "stress management",
    "anxiety",
    "panic attacks",
    "generalized anxiety disorder",
    "social anxiety",
    "phobias",
    "depression",
    "major depressive disorder",
    "persistent depressive disorder",
    "seasonal affective disorder",
    "postpartum depression",
    "trauma",
    "post-traumatic stress disorder",
    "complex ptsd",
    "ocd",
    "bipolar disorder",
    "schizophrenia",
    "schizoaffective disorder",
    "adhd",
    "add",
    "autism",
    "asperger syndrome",
    "eating disorders",
    "anorexia",
    "bulimia",
    "binge eating disorder",
    "body dysmorphia",
    "self-esteem",
    "self-worth",
    "resilience",
    "burnout",
    "work stress",
    "academic stress",
    "coping strategies",
    "mindfulness",
    "meditation",
    "yoga",
    "deep breathing",
    "progressive muscle relaxation",
    "therapy",
    "counseling",
    "support groups",
    "peer support",
    "suicide prevention",
    "suicide hotline",
    "crisis intervention",
    "mental crisis",
    "emotional crisis",
    "grief",
    "loss",
    "bereavement",
    "mourning",
    "psychology",
    "cognitive psychology",
    "behavioral psychology",
    "clinical psychology",
    "developmental psychology",
    "social psychology",
    "positive psychology",
    "experimental psychology",
    "neuropsychology",
    "forensic psychology",
    "industrial-organizational psychology",
    "sports psychology",
    "educational psychology",
    "health psychology",
    "child psychology",
    "adolescent psychology",
    "geriatric psychology",
    "personality psychology",
    "humanistic psychology",
    "counseling psychology",
    "personality",
    "traits",
    "temperament",
    "emotions",
    "feelings",
    "motivation",
    "perception",
    "sensation",
    "memory",
    "short-term memory",
    "long-term memory",
    "working memory",
    "learning",
    "conditioning",
    "classical conditioning",
    "operant conditioning",
    "reinforcement",
    "punishment",
    "intelligence",
    "iq",
    "eq",
    "human behavior",
    "habits",
    "decision making",
    "problem solving",
    "critical thinking",
    "unconscious mind",
    "conscious mind",
    "subconscious",
    "psychoanalysis",
    "freud",
    "jung",
    "neuroscience",
    "brain",
    "neurons",
    "neuroplasticity",
    "dopamine",
    "serotonin",
    "cortisol",
    "endorphins",
    "hi",
    "hello",
    "hey",
    "yo",
    "what's up",
    "hola",
    "namaste",
    "good morning",
    "good afternoon",
    "good evening",
    "good night",
    "greetings",
    "hi there",
    "hello there",
    "hey there",
    "bye",
    "goodbye",
    "see you",
    "later",
    "take care",
    "catch you later",
    "farewell",
    "ciao",
    "peace out",
    "thanks",
    "thank you",
    "thx",
    "ty",
    "much appreciated",
    "thanks a lot",
    "thanks so much",
    "cheers",
    "yes",
    "yeah",
    "yep",
    "sure",
    "absolutely",
    "of course",
    "definitely",
    "ok",
    "okay",
    "no",
    "nope",
    "nah",
    "not really",
    "don’t think so",
    "can you help",
    "i need help",
    "assist me",
    "support",
    "guidance",
    "please help",
    "help",
    "disease",
    "stress",
    "anxiety",
    "report",
    "examine",
    "result",
    "read"
  ];

  const chatHistory = useRef([]);

  const isMentalHealthQuery = (message) => {
    const lowerMsg = message.toLowerCase();
    return allowedKeywords.some((keyword) => lowerMsg.includes(keyword));
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTo({
          top: chatBodyRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const generateBotResponse = async (userMessage, fileData) => {
    setIsThinking(true);

    chatHistory.current.push({
      role: "user",
      parts: [
        { text: userMessage },
        ...(fileData ? [{ inline_data: fileData }] : []),
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: chatHistory.current,
      }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error.message);

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: apiResponseText,
          timestamp: Date.now(),
        },
      ]);

      chatHistory.current.push({
        role: "model",
        parts: [{ text: apiResponseText }],
      });
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: error.message,
          timestamp: Date.now(),
          isError: true,
        },
      ]);
    } finally {
      setIsThinking(false);
      setUploadedFile(null);
      scrollToBottom();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    const fileData = uploadedFile
      ? {
          data: uploadedFile.data,
          mime_type: uploadedFile.type,
        }
      : null;

    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: userMessage,
        file: uploadedFile,
        timestamp: Date.now(),
      },
    ]);

    setInputMessage("");
    setUploadedFile(null);
    scrollToBottom();

    // Check if query is mental health related
    setTimeout(() => {
      if (isMentalHealthQuery(userMessage)) {
        generateBotResponse(userMessage, fileData);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "❌ I can only answer questions related to mental health and psychology.",
            timestamp: Date.now(),
          },
        ]);
        scrollToBottom();
      }
    }, 600);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result.split(",")[1];
      setUploadedFile({
        data: base64String,
        type: file.type,
        preview: event.target.result,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && inputMessage.trim()) {
      handleSubmit(e);
    }
  };

  const insertEmoji = (emoji) => {
    const input = messageInputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const newValue =
      inputMessage.slice(0, start) + emoji + inputMessage.slice(end);
    setInputMessage(newValue);
    setShowEmojiPicker(false);
    input.focus();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const BotIcon = () => (
    <svg
      className="w-9 h-9 p-1.5 fill-white flex-shrink-0 bg-gray-600 rounded-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
    >
      <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z" />
    </svg>
  );

  const ThinkingDots = () => (
    <div className="flex gap-1 py-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 bg-gray-600 rounded-full opacity-70 animate-pulse"
          style={{
            animationDelay: `${0.2 + i * 0.1}s`,
            animationDuration: "1.8s",
          }}
        />
      ))}
    </div>
  );

  const emojis = [
    "😊",
    "😢",
    "😟",
    "😔",
    "😌",
    "😴",
    "🤔",
    "😰",
    "😭",
    "❤️",
    "🌟",
    "💪",
    "🧘",
    "🏃",
    "💊",
    "🩺",
  ];

  return (
    <div className="font-inter">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-7 right-9 w-12 h-12 bg-white text-white rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 z-50 ${
          isOpen ? "rotate-90" : ""
        }`}
      >
        <span
          className={`text-xl transition-opacity duration-200 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <p><RiRobot3Fill  className="tesxt-6xl font-bold text-blue-500"/></p>
        </span>
        <span
          className={`text-xl absolute text-cyan-500 font-bold transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          ✕
        </span>
      </button>

      {/* Chatbot Popup */}
      <div
        className={`fixed right-9 bottom-24 w-96 bg-white rounded-2xl shadow-lg transition-all z-999 duration-200 overflow-hidden ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-20 pointer-events-none"
        } origin-bottom-right`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-600 px-6 py-4">
          <div className="flex items-center gap-2">
            <BotIcon />
            <h2 className="text-white text-xl font-semibold">Chatbot</h2>
          </div>
          <button className="text-white hover:bg-gray-700 rounded-full p-2 transition-colors">
            Mindfulness
          </button>
        </div>

        {/* Chat Body */}
        <div
          ref={chatBodyRef}
          className="h-96 px-6 py-6 flex flex-col gap-5 overflow-y-auto mb-20 scrollbar-thin scrollbar-thumb-gray-300"
        >
          {messages.map((message, index) => (
            <div
              key={message.timestamp}
              className={`flex gap-3 ${
                message.type === "user" ? "flex-col items-end" : "items-start"
              }`}
            >
              {message.type === "bot" && <BotIcon />}

              <div
                className={`flex flex-col ${
                  message.type === "user" ? "items-end" : "items-start"
                }`}
              >
                {message.file && (
                  <img
                    src={message.file.preview}
                    alt="Uploaded"
                    className="w-1/2 rounded-lg mb-2"
                  />
                )}

                <div
                  className={`px-4 py-3 max-w-xs text-sm rounded-lg whitespace-pre-line ${
                    message.type === "bot"
                      ? `bg-gray-100 rounded-tl-sm ${
                          message.isError ? "text-red-500" : ""
                        }`
                      : "bg-gray-600 text-white rounded-tr-sm"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3 items-start">
              <BotIcon />
              <div className="bg-gray-100 rounded-lg rounded-tl-sm px-4">
                <ThinkingDots />
              </div>
            </div>
          )}
        </div>

        {/* Chat Footer */}
        <div className="absolute bottom-0 w-full bg-white p-4">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white border rounded-lg shadow-lg p-3 flex flex-wrap gap-2 w-72 max-h-40 overflow-y-auto">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => insertEmoji(emoji)}
                  className="text-xl hover:bg-gray-100 p-1 rounded"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <div
            className={`flex items-center bg-white rounded-full border transition-all ${
              inputMessage.trim()
                ? "border-gray-600 border-2"
                : "border-gray-300"
            }`}
          >
            <textarea
              ref={messageInputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message....."
              className="flex-1 border-none outline-none h-12 resize-none text-sm px-5 py-3 rounded-l-full"
              rows="1"
            />

            <div className="flex items-center gap-1 pr-2">
              {/* Emoji Button */}
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="w-9 h-9 text-gray-500 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              >
                😊
              </button>

              {/* File Upload */}
              <div className="relative w-9 h-9">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {uploadedFile ? (
                  <div className="relative">
                    <img
                      src={uploadedFile.preview}
                      alt="Preview"
                      className="w-9 h-9 object-cover rounded-full"
                    />
                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={triggerFileUpload}
                    className="w-full h-full text-gray-500 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors text-lg"
                    title="Upload Image"
                  >
                    📎
                  </button>
                )}
              </div>

              {/* Send Button */}
              {inputMessage.trim() && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-9 h-9 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  ➤
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindEaseChatbot;
