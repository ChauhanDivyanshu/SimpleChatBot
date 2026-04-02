import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const userMsg = { sender: "user", text: message };
    setChat([...chat, userMsg]);

    const res = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    const botMsg = { sender: "bot", text: data.reply };
    setChat((prev) => [...prev, botMsg]);

    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chatbot (Vite + React) 🤖</h2>

      <div style={{ border: "1px solid gray", height: "300px", overflowY: "scroll" }}>
        {chat.map((msg, index) => (
          <p key={index}>
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;