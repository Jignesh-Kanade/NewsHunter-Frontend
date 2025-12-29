// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Newspaper } from "lucide-react"; // icon

// export default function NewsHunter() {
//     const [newsData, setNewsData] = useState({
//         "The Economic Times": [],
//         "The Hindu": [],
//         "NDTV": [],
//         "Times Of India": [],
//     });
//     const [selectedArticle, setSelectedArticle] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         async function fetchNews() {
//             try {
//                 const response = await fetch("https://news-hunter-backend.vercel.app/news");
//                 const data = await response.json();
//                 setNewsData({
//                     "The Economic Times": data["The Economic Times"] || [],
//                     "The Hindu": data["The Hindu"] || [],
//                     "NDTV": data["NDTV"] || [],
//                     "Times Of India": data["Times Of India"] || [],
//                 });
//             } catch (err) {
//                 console.error("Frontend error:", err);
//             }
//         }
//         fetchNews();
//     }, []);

//     const goToChat = () => {
//         navigate("/chat", { state: { article: selectedArticle } });
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-6">
//             <h1 className="text-5xl font-extrabold text-center mb-10 tracking-wider text-yellow-400 drop-shadow-lg">
//                 NEWS HUNTER
//             </h1>

//             <div className="flex justify-center mb-8">
//                 <Link to="/notes">
//                     <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all">
//                         Go to Notes
//                     </button>
//                 </Link>
//             </div>

//             {/* Newspaper Cards */}
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {Object.keys(newsData).map((paper, idx) => (
//                     <div
//                         key={idx}
//                         className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:shadow-2xl hover:scale-[1.02] transition-all"
//                     >
//                         {/* Header */}
//                         <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-t-2xl p-4 flex items-center justify-center gap-2">
//                             <Newspaper className="w-5 h-5" />
//                             <h2 className="text-lg font-semibold">{paper}</h2>
//                         </div>

//                         {/* Articles */}
//                         <div className="h-72 overflow-y-auto p-4 space-y-4">
//                             {Array.isArray(newsData[paper]) && newsData[paper].length > 0 ? (
//                                 newsData[paper].map((article, i) => (
//                                     <div
//                                         key={i}
//                                         onClick={() => setSelectedArticle(article)}
//                                         className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 hover:shadow-md transition cursor-pointer"
//                                     >
//                                         <p className="font-medium text-sm mb-1">{article.title}</p>
//                                         <p className="text-xs text-gray-400 truncate">
//                                             {article.description || "No summary available"}
//                                         </p>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-400 text-sm italic">
//                                     No headlines found
//                                 </p>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Article Modal */}
//             {selectedArticle && (
//                 <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
//                     <div className="bg-gray-900 max-w-lg w-full rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
//                         {/* Close */}
//                         <button
//                             onClick={() => setSelectedArticle(null)}
//                             className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer"
//                         >
//                             ✕
//                         </button>

//                         <h2 className="text-2xl font-bold mb-3 text-yellow-400">
//                             {selectedArticle.title}
//                         </h2>
//                         <p className="text-gray-300 mb-4 max-h-60 overflow-y-auto pr-2">
//                             {selectedArticle.description || "No summary available."}
//                         </p>
//                         <a
//                             href={selectedArticle.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition font-semibold"
//                         >
//                             Read Full Article →
//                         </a>
//                         <button
//                             onClick={goToChat}
//                             className="ml-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//                         >
//                             Chat with AI
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Newspaper } from "lucide-react";

export default function NewsHunter() {
    const [newsData, setNewsData] = useState({
        "The Economic Times": [],
        "The Hindu": [],
        "NDTV": [],
        "Times Of India": [],
    });
    const [selectedArticle, setSelectedArticle] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cachedNews = sessionStorage.getItem("newsData");

        if (cachedNews) {
            // ✅ Load cached news (NO API CALL)
            setNewsData(JSON.parse(cachedNews));
        } else {
            // ✅ First visit → fetch from API
            async function fetchNews() {
                try {
                    const response = await fetch(
                        "https://news-hunter-backend.vercel.app/news"
                    );
                    const data = await response.json();

                    const formattedData = {
                        "The Economic Times": data["The Economic Times"] || [],
                        "The Hindu": data["The Hindu"] || [],
                        "NDTV": data["NDTV"] || [],
                        "Times Of India": data["Times Of India"] || [],
                    };

                    setNewsData(formattedData);

                    // ✅ Save to sessionStorage
                    sessionStorage.setItem(
                        "newsData",
                        JSON.stringify(formattedData)
                    );
                } catch (err) {
                    console.error("Frontend error:", err);
                }
            }

            fetchNews();
        }
    }, []);


    const goToChat = () => {
        navigate("/chat", { state: { article: selectedArticle } });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
            <h1 className="text-3xl sm:text-5xl font-bold text-center text-yellow-400 mb-6">
                NEWS HUNTER
            </h1>

            <div className="text-center mb-6">
                <Link
                    to="/notes"
                    className="bg-green-500 px-4 py-2 rounded"
                >
                    Go to Notes
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.keys(newsData).map((paper) => (
                    <div
                        key={paper}
                        className="bg-gray-800 rounded-xl overflow-hidden"
                    >
                        <div className="bg-yellow-500 text-black p-3 flex justify-center gap-2">
                            <Newspaper size={18} />
                            <h2 className="font-semibold">{paper}</h2>
                        </div>

                        <div className="max-h-72 overflow-y-auto p-3 space-y-3">
                            {newsData[paper]?.map((article, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedArticle(article)}
                                    className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600"
                                >
                                    <p className="text-sm font-medium">
                                        {article.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedArticle && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 w-full max-w-md rounded-xl p-5">
                        <button
                            onClick={() => setSelectedArticle(null)}
                            className="float-right text-gray-400"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-bold text-yellow-400 mb-3">
                            {selectedArticle.title}
                        </h2>

                        <p className="text-sm text-gray-300 mb-4">
                            {selectedArticle.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href={selectedArticle.link}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-yellow-500 text-black px-4 py-2 rounded text-center"
                            >
                                Read Article
                            </a>
                            <button
                                onClick={() =>
                                    navigate("/chat", {
                                        state: { article: selectedArticle },
                                    })
                                }
                                className="bg-blue-500 px-4 py-2 rounded"
                            >
                                Chat with AI
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
