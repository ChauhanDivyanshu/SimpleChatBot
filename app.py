from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def chatbot_response(message):
    message = message.lower().strip()

    if "hello" in message or "hi" in message or "hey" in message:
        return "Hi 👋"
    elif "how are you" in message:
        return "I'm fine 😊"
    elif "bye" in message:
        return "Goodbye 👋"
    elif "name" in message:
        return "I am Chat-Bot 🤖"
    else:
        return "I didn't understand."

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    reply = chatbot_response(user_message)
    return jsonify({"reply": reply})

@app.route("/")
def home():
    return "Chatbot API is running"

if __name__ == "__main__":
    app.run(port=5000)