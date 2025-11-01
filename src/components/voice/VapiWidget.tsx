"use client";

import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

function VapiWidget() {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);

  const { user, isLoaded } = useUser();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // auto-scroll for messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // setup event listeners for VAPI
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      console.log("AI started Speaking");
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log("AI stopped Speaking");
      setIsSpeaking(false);
    };

    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const handleError = (error: any) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    // cleanup event listeners on unmount
    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  const toggleCall = async () => {
    if (callActive) vapi.stop();
    else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID);
      } catch (error) {
        console.log("Failed to start call", error);
        setConnecting(false);
      }
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 flex flex-col overflow-hidden pb-20">
      {/* TITLE */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Talk to Your AI Dental Assistant
        </h1>
        <p className="text-gray-400 mt-2">
          Have a voice conversation with Niharika for dental advice and guidance
        </p>
      </div>

      {/* VIDEO CALL AREA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* AI ASSISTANT CARD - NIHARIKA */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/5 border border-purple-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm overflow-hidden relative">
          <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
            {/* AI VOICE ANIMATION */}
            <div
              className={`absolute inset-0 ${
                isSpeaking ? "opacity-30" : "opacity-0"
              } transition-opacity duration-300`}
            >
              {/* voice wave animation when speaking */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`mx-1 h-16 w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full ${
                      isSpeaking ? "animate-sound-wave" : ""
                    }`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      height: isSpeaking ? `${Math.random() * 50 + 20}%` : "5%",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* NIHARIKA AI PROFILE IMAGE */}
            <div className="relative size-32 mb-4">
              <div
                className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 rounded-full blur-lg ${
                  isSpeaking ? "animate-pulse" : ""
                }`}
              />

              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-purple-500/30 ring-4 ring-purple-500/10">
                {/* Niharika AI Profile Image */}
                <Image
                  src="/niharika-ai.png"
                  alt="Niharika - AI Dental Assistant"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a default avatar if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.src = "https://avatar.iran.liara.run/public/girl?username=Niharika";
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-500/10"></div>
              </div>

              {/* Speaking pulse ring */}
              {isSpeaking && (
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/50 animate-ping"></div>
              )}
            </div>

            <h2 className="text-xl font-bold text-white">Niharika</h2>
            <p className="text-sm text-purple-400 mt-1 font-medium">AI Dental Assistant</p>

            {/* SPEAKING INDICATOR */}
            <div
              className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 ${
                isSpeaking 
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30" 
                  : "bg-gray-900/30 border border-gray-500/20"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isSpeaking ? "bg-purple-400 animate-pulse" : "bg-gray-500"
                }`}
              />

              <span className="text-xs text-gray-400">
                {isSpeaking
                  ? "Speaking..."
                  : callActive
                  ? "Listening..."
                  : callEnded
                  ? "Call ended"
                  : "Ready to help"}
              </span>
            </div>
          </div>
        </Card>

        {/* USER CARD */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm overflow-hidden relative">
          <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
            {/* User Image */}
            <div className="relative size-32 mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 rounded-full blur-lg"></div>
              
              <Image
                src={user?.imageUrl!}
                alt="User"
                width={128}
                height={128}
                className="relative size-full object-cover rounded-full border-2 border-blue-500/30 ring-4 ring-blue-500/10"
              />
            </div>

            <h2 className="text-xl font-bold text-white">You</h2>
            <p className="text-sm text-blue-400 mt-1 font-medium">
              {user ? (user.firstName + " " + (user.lastName || "")).trim() : "Guest"}
            </p>

            {/* User Ready Text */}
            <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/30 border border-gray-500/20">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-gray-400">Ready</span>
            </div>
          </div>
        </Card>
      </div>

      {/* MESSAGE CONTAINER */}
      {messages.length > 0 && (
        <div
          ref={messageContainerRef}
          className="w-full bg-gradient-to-br from-gray-500/10 to-gray-600/5 border border-gray-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm p-4 mb-8 h-64 overflow-y-auto transition-all duration-300 scroll-smooth"
        >
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className="message-item animate-in fade-in duration-300">
                <div className={`font-semibold text-xs mb-1 ${
                  msg.role === "assistant" ? "text-purple-400" : "text-blue-400"
                }`}>
                  {msg.role === "assistant" ? "Niharika" : "You"}:
                </div>
                <p className="text-gray-300 bg-gray-900/30 rounded-lg p-3 border border-gray-500/10">
                  {msg.content}
                </p>
              </div>
            ))}

            {callEnded && (
              <div className="message-item animate-in fade-in duration-300">
                <div className="font-semibold text-xs text-green-400 mb-1">System:</div>
                <p className="text-gray-300 bg-gray-900/30 rounded-lg p-3 border border-gray-500/10">
                  Call ended. Thank you for using Flossy AI!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CALL CONTROLS */}
      <div className="w-full flex justify-center gap-4">
        <Button
          className={`w-44 text-xl rounded-3xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 ${
            callActive
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/20"
              : callEnded
              ? "bg-gray-700 hover:bg-gray-800 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-blue-500/20"
          } text-white relative`}
          onClick={toggleCall}
          disabled={connecting || callEnded}
        >
          {connecting && (
            <span className="absolute inset-0 rounded-3xl animate-ping bg-blue-500/50 opacity-75"></span>
          )}

          <span>
            {callActive
              ? "End Call"
              : connecting
              ? "Connecting..."
              : callEnded
              ? "Call Ended"
              : "Start Call"}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default VapiWidget;