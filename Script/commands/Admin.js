const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "admin",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Maim x pro", // আপনার নাম অনুযায়ী ক্রেডিট আপডেট করা হয়েছে
    description: "বটের এডমিনের তথ্য দেখায়",
    commandCategory: "info",
    usages: "admin",
    cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
    // ======= আপনার নিজের তথ্য এখানে পরিবর্তন করুন ======= //
    const adminName = "Maim x pro";
    const adminAge = "18+";
    const adminRelationship = "Single";
    const adminAddress = "Khagrachhari, Bangladesh";
    const adminReligion = "Islam";
    const facebookId = "100001039692046"; // শুধুমাত্র আইডি বা ইউজারনেম দিন
    const whatsappNumber = "8801882333052"; // দেশের কোডসহ নাম্বার দিন

    // ======= আপনার ছবি পরিবর্তন করতে চাইলে নিচের লিংকটি পরিবর্তন করুন ======= //
    const imageUrl = "https://i.ibb.co.com/W44YJ5Kd/IMG-20251011-175116.jpg";
    // =================================================================== //

    const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");
    const botName = global.config.BOTNAME || "Unknown Bot";

    const callback = () => {
        api.sendMessage({
            body: `
»»———『 𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡 𝗜𝗡𝗙𝗢 』———««

┌─❖ 𝗢𝗪𝗡𝗘𝗥 𝗗𝗘𝗧𝗔𝗜𝗟𝗦 ❖─┐
│ 👤 𝗡𝗮𝗺𝗲: ${Maim X Pro 🥵}
│ 🎂 𝗔𝗴𝗲: ${Officially Biar Boyos}
│ ❤️ 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻: ${Kono Hedar Mayya o nai}
│ 🏠 𝗔𝗱𝗱𝗿𝗲𝘀𝘀: ${Mayeder Oikhane}
│ 🕌 𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻: ${Muslim}
└──────────────┘

┌─❖ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗜𝗡𝗙𝗢 ❖─┐
│ 💻 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:
│ https://www.facebook.com/${facebookId}
│ 📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽:
│ https://wa.me/${whatsappNumber}
└──────────────┘

┌─❖ 𝗕𝗢𝗧 𝗗𝗘𝗧𝗔𝗜𝗟𝗦 ❖─┐
│ 🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${Xona Mia}
│ 🕒 𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗧𝗶𝗺𝗲: ${time}
└──────────────┘

»»——— THANKS FOR USING ————««
`,
            attachment: fs.createReadStream(__dirname + "/cache/admin.jpg")
        }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/admin.jpg"));
    };

    // ছবিটি ডাউনলোড করে তারপর মেসেজ পাঠানো হচ্ছে
    request(encodeURI(imageUrl))
        .pipe(fs.createWriteStream(__dirname + '/cache/admin.jpg'))
        .on('close', callback)
        .on('error', (err) => {
            console.error("Failed to download admin image:", err);
            api.sendMessage("দুঃখিত, এডমিনের ছবিটি লোড করা সম্ভব হচ্ছে না।", event.threadID);
        });
};
