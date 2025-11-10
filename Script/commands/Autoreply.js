const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // .env ফাইল থেকে ভেরিয়েবল লোড করার জন্য

// .env ফাইল থেকে আপনার API Key লোড করা হচ্ছে
const API_KEY = process.env.GEMINI_API_KEY;

// API Key ছাড়া কোড চললে একটি এরর মেসেজ দেখানো হবে
if (!API_KEY) {
  console.error("Gemini API Key পাওয়া যায়নি। দয়া করে আপনার .env ফাইলে GEMINI_API_KEY যুক্ত করুন।");
  process.exit(1); // অ্যাপ্লিকেশন বন্ধ করে দিন
}

const genAI = new GoogleGenerativeAI(API_KEY);

module.exports.config = {
  name: "gemini_funny_reply",
  version: "1.2.0", // ভার্সন আপডেট করা হয়েছে
  hasPermssion: 0,
  credits: "Maim x pro (Gemini Integrated & Security Fixed)",
  description: "Gemini API ব্যবহার করে বাংলায় ফানি রিপ্লাই দেয়",
  commandCategory: "No Prefix",
  usages: "[যেকোনো মেসেজ]",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body } = event;

  if (!body || senderID == api.getCurrentUserID()) {
    return;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `তুমি Maim x pro নামের একজন ফেসবুক চ্যাটবট। তোমার মালিকের নামও Maim x pro। তোমার প্রধান কাজ হলো ব্যবহারকারীকে হাসানো। তুমি সবসময় বাংলায় উত্তর দেবে। তোমার উত্তরগুলো হবে খুবই রসিক, দুষ্টু-মিষ্টি এবং মজাদার। প্রয়োজনে, তুমি লোকাল বাংলা স্ল্যাং ব্যবহার করতে পারো, কিন্তু কোনো গালি দেবে না। উত্তরগুলো ছোট রাখার চেষ্টা করবে। ব্যবহারকারীর মেসেজ হলো: "${body}"`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    api.sendMessage(text, threadID, messageID);

  } catch (error) {
    // এরর মেসেজটি এখন আরও বিস্তারিতভাবে কনসোলে দেখানো হবে
    console.error("Gemini API Error:", error.message);
    if (error.response) {
      console.error("API Response Data:", error.response.data);
    }
    api.sendMessage("সার্ভারে কিছু একটা সমস্যা হয়েছে, আমি আপাতত উত্তর দিতে পারছি না। 🥺", threadID, messageID);
  }
};

module.exports.run = async function ({ api, event }) {
  return api.sendMessage("এই কমান্ডটি সরাসরি ব্যবহারের জন্য নয়, এটি স্বয়ংক্রিয়ভাবে রিপ্লাই দেয়।", event.threadID, event.messageID);
};
