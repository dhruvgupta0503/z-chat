

const corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };

//  const Z-CHAT_TOKEN=Z-Chat-token;

const Z_CHAT_TOKEN = "Z-Chat-token";

export {corsOptions,Z_CHAT_TOKEN}