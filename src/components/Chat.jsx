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
import ReactMarkdown from "react-markdown";

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

        const userMessage = message;
        setChat((prev) => [...prev, { role: "user", text: userMessage }]);
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
                        message: userMessage,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            if (data && data.reply) {
                setChat((prev) => [...prev, { role: "ai", text: data.reply }]);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Chat error:", error);
            setChat((prev) => [
                ...prev,
                { role: "ai", text: "⚠️ Error: Could not reach AI. Please try again." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const renderMessage = (msg) => {
        try {
            if (msg.role === "ai") {
                return (
                    <ReactMarkdown
                        components={{
                            p: ({ children }) => (
                                <p className="mb-2 last:mb-0">{children}</p>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc ml-4 mb-2 space-y-1">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal ml-4 mb-2 space-y-1">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="ml-1">{children}</li>
                            ),
                            code: ({ inline, children }) =>
                                inline ? (
                                    <code className="bg-gray-300 px-1 py-0.5 rounded text-xs font-mono">
                                        {children}
                                    </code>
                                ) : (
                                    <code className="block bg-gray-300 p-2 rounded my-2 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                                        {children}
                                    </code>
                                ),
                            strong: ({ children }) => (
                                <strong className="font-bold">{children}</strong>
                            ),
                            em: ({ children }) => (
                                <em className="italic">{children}</em>
                            ),
                            h1: ({ children }) => (
                                <h1 className="text-lg font-bold mb-2 mt-1">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-base font-bold mb-2 mt-1">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-sm font-bold mb-1 mt-1">
                                    {children}
                                </h3>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-gray-400 pl-3 italic my-2">
                                    {children}
                                </blockquote>
                            ),
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-800"
                                >
                                    {children}
                                </a>
                            ),
                        }}
                    >
                        {msg.text || ""}
                    </ReactMarkdown>
                );
            }
            return msg.text;
        } catch (error) {
            console.error("Render error:", error);
            return msg.text;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm p-4">
                <h1 className="text-2xl font-bold text-center">AI Chatbot</h1>
                {article && (
                    <p className="text-sm text-gray-600 text-center mt-1">
                        📰 {article.title}
                    </p>
                )}
            </div>

            {/* Chat Container */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-4">
                    {chat.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`my-3 flex ${msg.role === "user"
                                    ? "justify-end"
                                    : msg.role === "system"
                                        ? "justify-center"
                                        : "justify-start"
                                }`}
                        >
                            <div
                                className={`px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed ${msg.role === "user"
                                        ? "bg-blue-600 text-white max-w-[70%]"
                                        : msg.role === "system"
                                            ? "bg-yellow-100 text-gray-800 text-center max-w-[90%]"
                                            : "bg-gray-200 text-gray-900 max-w-[75%]"
                                    }`}
                            >
                                {renderMessage(msg)}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start my-3">
                            <div className="px-4 py-3 rounded-2xl bg-gray-200 text-sm animate-pulse">
                                Responding...
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Input Bar */}
            <div className="bg-white border-t p-4">
                <div className="max-w-4xl mx-auto flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask something..."
                        disabled={isLoading}
                        className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:bg-gray-100"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !message.trim()}
                        className="px-6 bg-blue-600 text-white rounded-xl text-sm sm:text-base disabled:opacity-50 hover:bg-blue-700 transition-colors"
                    >
                        {isLoading ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
}