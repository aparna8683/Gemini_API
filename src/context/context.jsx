import { createContext, useState } from "react";
import runChat from "../Config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    try {
      setLoading(true);
      setShowResult(true);

      // Use the passed prompt, otherwise fallback to input state
      const finalPrompt = prompt || input;

      // Save prompt history
      setRecentPrompt(finalPrompt);
      setPreviousPrompt((prev) => [...prev, finalPrompt]);

      // Call Gemini API
      const response = await runChat(finalPrompt);

      // Update result
      setResultData(response);
      setInput(""); // clear input after sending
    } catch (error) {
      console.error("Error in onSent:", error);

      if (error.message?.includes("429")) {
        setResultData(
          " Daily free quota exceeded. Please try again tomorrow or upgrade your plan."
        );
      } else {
        setResultData(" Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const contextVal = {
    previousPrompt,
    setPreviousPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextVal}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
