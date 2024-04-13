"use client";
import React, { useEffect, useRef, useState } from 'react';
import AiResponse from "@/app/components/AIcomponents/aiResponse";
import { useRouter } from "next/navigation";

function MessageArea(props) {
    const [message, setMessage] = useState("");
    const [aiResponses, setAiResponses] = useState([]); // State to hold AI responses
    const topScroller = useRef(null);
    const pref = useRef(null);
    const router = useRouter();

    const handleMessageSend = async () => {
        const prompt = message.trim();
        const modifiedPrompt = "[user : ] "+prompt

        if (prompt === "") {
            return;
        }

        console.log(`Making Request to API with prompt: ${prompt}`);
        setMessage("");

        // Set loading state for the response
        setAiResponses(prevResponses => [...prevResponses, { prompt, loading: true }]);

        try {
            const data = await fetch("/api/pakAi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt })
            });

            const response = await data.json();

            if (response.status === "success") {
                // Update response state with actual response
                setAiResponses(prevResponses => prevResponses.map(item => {
                    if (item.prompt === prompt && item.loading) {
                        return { ...item, response: response.response, loading: false };
                    }

                    return item;
                }));
            } else {
                console.log("There was an Error While Generating Response");
                // Update response state with error message
                setAiResponses(prevResponses => prevResponses.map(item => {
                    if (item.prompt === prompt && item.loading) {
                        return { ...item, error: "Error generating response. Please try again.", loading: false };
                    }
                    return item;
                }));
            }
        } catch (error) {
            console.error(error);
            // Update response state with generic error message
            setAiResponses(prevResponses => prevResponses.map(item => {
                if (item.prompt === prompt && item.loading) {
                    return { ...item, error: "An error occurred. Please try again later.", loading: false };
                }
                return item;
            }));
        }
    };

    const handleScrollClick = () => {
        pref.current.scrollTop = pref.current.scrollHeight;
    };

    useEffect(() => {
        const handleScroll = () => {
            const isnotScrolledToBottom = pref.current.scrollHeight - pref.current.scrollTop > pref.current.clientHeight;

            if (isnotScrolledToBottom) {
                topScroller.current.classList.add("show");
            } else {
                topScroller.current.classList.remove("show");
            }
        };

        pref.current.addEventListener("scroll", handleScroll);

        // Cleanup
        return () => {
            pref.current.removeEventListener("scroll", handleScroll);
        };

    }, []);

    return (
        <>
            <div ref={pref} className="chatArea">
                {aiResponses.map((response, index) => {

                        return(
                            <AiResponse userPrompt={response.prompt} key={index} response={response.response} loading={response.loading}/>
                            )
                })}
            </div>

            <div className={"sendArea"}>
                <div ref={topScroller} onClick={handleScrollClick} className="topScroller">
                    <box-icon color={"#f2f2f2"} name='down-arrow-alt'></box-icon>
                </div>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={"What's on your mind? Type your question here."} />
                <div className="sendDiv" onClick={handleMessageSend}>
                    <box-icon name='send' color={"#7474bf"} ></box-icon>
                </div>
            </div>
        </>
    );
}

export default MessageArea;