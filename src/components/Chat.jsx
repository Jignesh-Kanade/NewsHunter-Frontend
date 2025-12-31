// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";

// export default function Chat() {
//     const location = useLocation();
//     const article = location.state?.article || null;

//     const [message, setMessage] = useState("");
//     const [chat, setChat] = useState([]);

//     useEffect(() => {
//         if (article) {
//             setChat([
//                 { role: "system", text: `You are chatting about the article: "${article.title}"` }
//             ]);
//         }
//     }, [article]);

//     const sendMessage = async () => {
//         if (!message.trim()) return;

//         setChat((prev) => [...prev, { role: "user", text: message }]);

//         try {
//             const res = await fetch("https://news-hunter-backend.vercel.app/api/gemini/chat", {
//                 // const res = await fetch("http://192.168.1.4:5000/api/gemini/chat", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     headline: article?.title,
//                     message,
//                 }),
//             });

//             const data = await res.json();
//             setChat((prev) => [...prev, { role: "ai", text: data.reply }]);
//         } catch (err) {
//             setChat((prev) => [...prev, { role: "ai", text: "Error: Could not reach AI." }]);
//         }

//         setMessage("");
//     };

//     return (
//         <div className="p-6 w-full h-screen bg-gray-50 flex flex-col">
//             <h1 className="text-3xl font-bold mb-4">AI Chatbot</h1>

//             {article && (
//                 <p className="mb-4 text-gray-600">
//                     📰 Chatting about: <strong>{article.title}</strong>
//                 </p>
//             )}

//             <div className="flex-1 overflow-y-auto p-4 bg-white shadow-md rounded-xl flex flex-col">
//                 {chat.map((msg, idx) => (
//                     <div
//                         key={idx}
//                         className={`p-3 my-2 rounded-xl max-w-lg ${msg.role === "user"
//                             ? "bg-blue-500 text-white self-end ml-auto"
//                             : msg.role === "system"
//                                 ? "bg-yellow-100 text-black self-center"
//                                 : "bg-gray-200 text-black self-start mr-auto"
//                             }`}
//                     >
//                         {msg.text}
//                     </div>
//                 ))}
//             </div>

//             <div className="flex mt-4">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Ask something..."
//                     className="flex-1 border p-3 rounded-xl shadow-sm focus:outline-none"
//                 />
//                 <button
//                     onClick={sendMessage}
//                     className="ml-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// }













/*

import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Chat() {
    const location = useLocation();
    const article = location.state?.article || null;

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (article) {
            setChat([
                { role: "system", text: `Chatting about: "${article.title}"` }
            ]);
        }
    }, [article]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        setChat((prev) => [...prev, { role: "user", text: message }]);
        setMessage("");

        try {
            const res = await fetch(
                "https://news-hunter-backend.vercel.app/api/gemini/chat",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        headline: article?.title,
                        message,
                    }),
                }
            );

            const data = await res.json();
            setChat((prev) => [...prev, { role: "ai", text: data.reply }]);
        } catch {
            setChat((prev) => [
                ...prev,
                { role: "ai", text: "⚠️ Error: Could not reach AI." },
            ]);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-3 sm:p-6">
            <h1 className="text-xl sm:text-3xl font-bold mb-3 text-center">
                AI Chatbot
            </h1>

            {article && (
                <p className="text-xs sm:text-sm text-gray-600 mb-2 text-center">
                    📰 {article.title}
                </p>
            )}

            <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow p-3 sm:p-4">
                {chat.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`my-2 p-3 rounded-xl max-w-[85%] text-sm sm:text-base ${msg.role === "user"
                                ? "bg-blue-500 text-white ml-auto"
                                : msg.role === "system"
                                    ? "bg-yellow-100 text-black mx-auto text-center"
                                    : "bg-gray-200 text-black mr-auto"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="flex gap-2 mt-3">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask something..."
                    className="flex-1 p-3 border rounded-xl focus:outline-none text-sm sm:text-base"
                />
                <button
                    onClick={sendMessage}
                    className="px-4 sm:px-6 bg-blue-600 text-white rounded-xl text-sm sm:text-base"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
*/







import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Chat() {
    const location = useLocation();
    const article = location.state?.article || null;

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (article) {
            setChat([
                { role: "system", text: `Chatting about: "${article.title}"` }
            ]);
        }
    }, [article]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat, isLoading]);

    const sendMessage = async () => {
        if (!message.trim() || isLoading) return;

        setChat((prev) => [...prev, { role: "user", text: message }]);
        setMessage("");
        setIsLoading(true);

        try {
            const res = await fetch(
                "https://news-hunter-backend.vercel.app/api/gemini/chat",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        headline: article?.title,
                        message,
                    }),
                }
            );

            const data = await res.json();

            setChat((prev) => [...prev, { role: "ai", text: data.reply }]);
        } catch {
            setChat((prev) => [
                ...prev,
                { role: "ai", text: "⚠️ Error: Could not reach AI." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-3 sm:p-6">
            <h1 className="text-xl sm:text-3xl font-bold mb-3 text-center">
                AI Chatbot
            </h1>

            {article && (
                <p className="text-xs sm:text-sm text-gray-600 mb-2 text-center">
                    📰 {article.title}
                </p>
            )}

            <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow p-3 sm:p-4">
                {chat.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`my-2 p-3 rounded-xl max-w-[85%] text-sm sm:text-base ${msg.role === "user"
                                ? "bg-blue-500 text-white ml-auto"
                                : msg.role === "system"
                                    ? "bg-yellow-100 text-black mx-auto text-center"
                                    : "bg-gray-200 text-black mr-auto"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}

                {/* 🔄 Loader bubble */}
                {isLoading && (
                    <div className="my-2 p-3 rounded-xl bg-gray-200 text-black mr-auto text-sm animate-pulse">
                        AI is typing...
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            <div className="flex gap-2 mt-3">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask something..."
                    disabled={isLoading}
                    className="flex-1 p-3 border rounded-xl focus:outline-none text-sm sm:text-base disabled:bg-gray-100"
                />
                <button
                    onClick={sendMessage}
                    disabled={isLoading}
                    className="px-4 sm:px-6 bg-blue-600 text-white rounded-xl text-sm sm:text-base disabled:opacity-50"
                >
                    {isLoading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
}
