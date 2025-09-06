import React, { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // Toggle chat window

  // Simple rule-based responses
  const getBotReply = (message) => {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      return "Hello! 👋 How are you today?";
    }
    if (lowerMsg.includes("help")) {
      return "Sure! I can help you. Try asking about weather, time, or just say hi!";
    }
    if (lowerMsg.includes("time")) {
      return `⏰ Current time is ${new Date().toLocaleTimeString()}`;
    }
    if (lowerMsg.includes("date")) {
      return `📅 Today's date is ${new Date().toLocaleDateString()}`;
    }
    if (lowerMsg.includes("bye")) {
      return "Goodbye! 👋 Have a great day!";
    }

    return "🤖 Sorry, I didn’t understand that. Try saying 'help'.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);

    setTimeout(() => {
      const reply = getBotReply(input);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 500);

    setInput("");
  };

  return (
    <div style={styles.chatbotWrapper}>
      {/* Floating Chat Button */}
      {!open && (
        <button style={styles.fab} onClick={() => setOpen(true)}>
          💬
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div style={styles.container}>
          <div style={styles.header}>
            <span>AI Assistant</span>
            <button style={styles.closeBtn} onClick={() => setOpen(false)}>✖</button>
          </div>

          <div style={styles.chatWindow}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.message,
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  background: msg.role === "user" ? "#0078ff" : "#e5e5ea",
                  color: msg.role === "user" ? "#fff" : "#000"
                }}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div style={styles.loading}>...</div>}
          </div>

          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
            />
            <button style={styles.button} onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  chatbotWrapper: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
  fab: {
    background: "#0078ff",
    color: "#fff",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    border: "none",
    cursor: "pointer",
    fontSize: "24px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
  },
  container: {
    width: "350px",
    height: "450px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    boxShadow: "0px 6px 12px rgba(0,0,0,0.2)",
  },
  header: {
    padding: "10px",
    background: "#0078ff",
    color: "#fff",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
  },
  chatWindow: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "10px",
    overflowY: "auto",
    borderBottom: "1px solid #ddd",
  },
  message: {
    maxWidth: "70%",
    padding: "8px 12px",
    borderRadius: "10px",
  },
  inputContainer: {
    display: "flex",
    padding: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    marginLeft: "8px",
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#0078ff",
    color: "#fff",
    cursor: "pointer",
  },
  loading: {
    fontStyle: "italic",
    color: "#888",
  },
};

export default Chatbot;
