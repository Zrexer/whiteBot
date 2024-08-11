const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = '7116521330:AAHLVw8Z86HN2NfrUPDREsQ2ezz02tl4Jvg';
const bot = new TelegramBot(token, { polling: true });

let mutes = [  ];
let dbs = { "only_owner": true };
let owner = 5483232752;
let group = -4277055389;

bot.getChatAdministrators(group).then((admins) => {
    const adminIds = admins.map(admin => admin.user.id);
    fs.writeFileSync("admins.json", JSON.stringify(JSON.parse(JSON.stringify({
        "admins_list": adminIds
    })), null, 2));
});

let admins = JSON.parse(fs.readFileSync("admins.json")).admins_list;

bot.on('message', (msg) => {
	const chatid = msg.chat.id;
	const text = msg.text;
	const msgid = msg.message_id;

    if (chatid === group){

        if (text === "/start"){
            bot.sendMessage(chatid, "ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴡʜɪᴛᴇ ʀᴏsᴇ ʙᴏᴛ, ᴛᴏ sᴇᴇ ᴏᴘᴛɪᴏɴs ᴛʏᴘᴇ /help", { reply_to_message_id: msgid } )
        } else if (text === "/help"){
            bot.sendMessage(chatid, "ᴘɪɴ ᴍᴇssᴀɢᴇ: /ᴘɪɴ \nᴜɴᴘɪɴ ᴍᴇssᴀɢᴇ: /ᴜɴᴘɪɴ\nʀᴇᴍᴏᴠᴇ ᴜsᴇʀ: /ʀᴇᴍᴏᴠᴇ\nᴍᴜᴛᴇ ᴜsᴇʀ: /ᴍᴜᴛᴇ\nᴜɴᴍᴜᴛᴇ ᴜsᴇʀ: /ᴜɴᴍᴜᴛᴇ\nᴅᴇʟᴇᴛᴇ ᴍᴜᴛᴇ ᴜsᴇʀs: /ᴄʟᴇᴀʀ-ᴍᴜᴛᴇs", { reply_to_message_id: msgid } )
        } else if (text === "/mute"){
            if (!admins.includes(msg.from.id)){
                bot.sendMessage(chatid, "ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴀᴅᴍɪɴ !, ʏᴏᴜ ᴄᴀɴ ʀᴇǫᴜᴇsᴛ ғᴏʀ ʙᴇ ᴀᴅᴍɪɴ ɪɴ ʙᴏᴛ ʙʏ ᴄᴏᴍᴍᴀɴᴅ /request-admin", { reply_to_message_id: msgid } )
            }else{
                if (!Object.keys(msg).includes("reply_to_message")){
                    bot.sendMessage(chatid, "ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ sᴏᴍᴇᴏɴᴇ", { reply_to_message_id: msgid } )
                }else{
                    mutes.push(msg.reply_to_message.from.id);
                    bot.sendMessage(chatid, `ᴘᴜsʜᴇᴅ ɪɴ ᴍᴜᴛᴇ ʟɪsᴛ: ${msg.reply_to_message.from.id}`, { reply_to_message_id: msgid } )
                }
            }
            
        }else if (text === "/request-admin"){
            if (admins.includes(msg.from.id)){
                bot.sendMessage(chatid, "ʏᴏᴜ ᴀʀᴇ ᴀʟʀᴇᴀᴅʏ ᴀᴅᴍɪɴ", { reply_to_message_id: msgid } )
            }else{
                bot.sendMessage(owner, `ʀᴇᴜǫᴇsᴛ 𝗋𝖾𝗊𝗎𝖾𝗌𝗍𝗌 ᴛᴏ ʙᴇ ᴀᴅᴍɪɴ: ${msg.from.first_name}:${msg.from.id}`, { reply_to_message_id: msgid } )
                bot.sendMessage(chatid, "ʏᴏᴜʀ ʀᴇǫᴜᴇsᴛ sᴇɴᴅ ᴛᴏ ᴏᴡɴᴇʀ", { reply_to_message_id: msgid } )
            }
        }else if (text === "/clear-mutes"){
            if (!admins.includes(msg.from.id)){
                bot.sendMessage(chatid, "ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴀᴅᴍɪɴ !, ʏᴏᴜ ᴄᴀɴ ʀᴇǫᴜᴇsᴛ ғᴏʀ ʙᴇ ᴀᴅᴍɪɴ ɪɴ ʙᴏᴛ ʙʏ ᴄᴏᴍᴍᴀɴᴅ /request-admin", { reply_to_message_id: msgid } )
            }else{
                mutes = [];
                bot.sendMessage(chatid, "ᴍᴜᴛᴇ ʟɪꜱᴛ ᴡᴀꜱ ᴄʟᴇᴀʀ", { reply_to_message_id: msgid } )
            }
        }else if (text.startsWith("/unmute")){
            if (!admins.includes(msg.from.id)){
                bot.sendMessage(chatid, "ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴀᴅᴍɪɴ !, ʏᴏᴜ ᴄᴀɴ ʀᴇǫᴜᴇsᴛ ғᴏʀ ʙᴇ ᴀᴅᴍɪɴ ɪɴ ʙᴏᴛ ʙʏ ᴄᴏᴍᴍᴀɴᴅ /request-admin", { reply_to_message_id: msgid } )
            }else{
                if (!Object.keys(msg).includes("reply_to_message")){
                    if (!isNaN(msg.text.slice(8, msg.text.length))){
                        bot.sendMessage(chatid, "ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ sᴏᴍᴇᴏɴᴇ ᴏʀ ᴡʀɪᴛᴇ ᴀɴ ɪᴅ ɪɴꜰʀᴏɴᴛ ᴏꜰ ᴄᴏᴍᴍᴀɴᴅ", { reply_to_message_id: msgid } )
                    }else{
                        if (mutes.includes(msg.reply_to_message.from.id)){
                            delete mutes[mutes.indexOf(msg.reply_to_message.from.id)];
                            bot.sendMessage(chatid, `ʀᴇᴍᴏᴠᴇᴅ ꜰʀᴏᴍ ᴍᴜᴛᴇ ʟɪsᴛ: ${msg.reply_to_message.from.id}`, { reply_to_message_id: msgid } )
                        }else{
                            bot.sendMessage(chatid, "ᴜꜱᴇʀ ᴅᴏᴇꜱ ɴᴏᴛ ᴇxɪꜱᴛ ɪɴ ᴍᴜᴛᴇ ʟɪꜱᴛ", { reply_to_message_id: msgid });
                        }
                    }
                }else{
                    if (mutes.includes(msg.reply_to_message.from.id)){
                        delete mutes[mutes.indexOf(msg.reply_to_message.from.id)];
                        bot.sendMessage(chatid, `ʀᴇᴍᴏᴠᴇᴅ ꜰʀᴏᴍ ᴍᴜᴛᴇ ʟɪsᴛ: ${msg.reply_to_message.from.id}`, { reply_to_message_id: msgid } )
                    }else{
                        bot.sendMessage(chatid, "ᴜꜱᴇʀ ᴅᴏᴇꜱ ɴᴏᴛ ᴇxɪꜱᴛ ɪɴ ᴍᴜᴛᴇ ʟɪꜱᴛ", { reply_to_message_id: msgid });
                    }
                }
            }
        }else if (text === "/remove"){
            if (!admins.includes(msg.from.id)){
                bot.sendMessage(chatid, "ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴀᴅᴍɪɴ !, ʏᴏᴜ ᴄᴀɴ ʀᴇǫᴜᴇsᴛ ғᴏʀ ʙᴇ ᴀᴅᴍɪɴ ɪɴ ʙᴏᴛ ʙʏ ᴄᴏᴍᴍᴀɴᴅ /request-admin", { reply_to_message_id: msgid } )
            }else{
                if (!Object.keys(msg).includes("reply_to_message")){
                bot.sendMessage(chatid, "ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ sᴏᴍᴇᴏɴᴇ", { reply_to_message_id: msgid } )
                }else{
                    bot.banChatMember(chatid, msg.reply_to_message.from.id);
                    bot.sendMessage(chatid, `ᴜꜱᴇʀ ʀᴇᴍᴏᴠᴇᴅ ${msg.reply_to_message.from.first_name}:${msg.reply_to_message.from.id}`, { reply_to_message_id: msgid } )
                }
            }
        }else if (text === "/set-commander"){
            if (dbs['only_owner'] === true){
                if (!msg.from.id === owner){
                    bot.sendMessage(chatid, "ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴀʟʟᴏᴡᴇᴅ ᴛᴏ ᴜꜱᴇ ᴛʜɪꜱ ᴏᴘᴛɪᴏɴ, ᴛʜᴇ ᴏɴʟʏ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜꜱᴇ ɪᴛ", { reply_to_message_id: msgid } );
                }else{
                    if (!Object.keys(msg).includes("reply_to_message")){
                        bot.sendMessage(chatid, "ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ sᴏᴍᴇᴏɴᴇ", { reply_to_message_id: msgid } )
                    }else{
                            fs.writeFileSync("admins.json", JSON.stringify(JSON.parse(JSON.stringify({
                                "admins_list": admins.push(msg.reply_to_message.from.id)
                            })), null, 2));
                            bot.sendMessage(chatid, "ᴜꜱᴇʀ ᴀᴅᴅᴇᴅ ᴛᴏ ᴄᴏᴍᴍᴀɴᴅᴇʀꜱ [ ʙᴏᴛ ᴀᴅᴍɪɴꜱ ]", { reply_to_message_id: msgid } );
                        }
                    }
                }else{
                if (!admins.includes(msg.from.id)){
                    bot.sendMessage(chatid, "ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴀᴅᴍɪɴ !, ʏᴏᴜ ᴄᴀɴ ʀᴇǫᴜᴇsᴛ ғᴏʀ ʙᴇ ᴀᴅᴍɪɴ ɪɴ ʙᴏᴛ ʙʏ ᴄᴏᴍᴍᴀɴᴅ /request-admin", { reply_to_message_id: msgid } )
                }else{
                    if (!Object.keys(msg).includes("reply_to_message")){
                        bot.sendMessage(chatid, "ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ sᴏᴍᴇᴏɴᴇ", { reply_to_message_id: msgid } )
                        }else{
                            fs.writeFileSync("admins.json", JSON.stringify(JSON.parse(JSON.stringify({
                                "admins_list": admins.push(msg.reply_to_message.from.id)
                            })), null, 2));
                            bot.sendMessage(chatid, "ᴜꜱᴇʀ ᴀᴅᴅᴇᴅ ᴛᴏ ᴄᴏᴍᴍᴀɴᴅᴇʀꜱ [ ʙᴏᴛ ᴀᴅᴍɪɴꜱ ]", { reply_to_message_id: msgid } );
                        }
                    }
                }
            }else if (text === "/pin"){
                if (!admins.includes(msg.from.id)){
                    bot.sendMessage(chatid, "ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴀᴅᴍɪɴ !, ʏᴏᴜ ᴄᴀɴ ʀᴇǫᴜᴇsᴛ ғᴏʀ ʙᴇ ᴀᴅᴍɪɴ ɪɴ ʙᴏᴛ ʙʏ ᴄᴏᴍᴍᴀɴᴅ /request-admin", { reply_to_message_id: msgid } )
                }else{
                    if (!Object.keys(msg).includes("reply_to_message")){
                        bot.sendMessage(chatid, "ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴍᴇꜱꜱᴀɢᴇ", { reply_to_message_id: msgid } )
                    }else{
                        bot.pinChatMessage(chatid, msg.reply_to_message.message_id, { disable_notification: false });
                        bot.sendMessage(chatid, "ᴍᴇꜱꜱᴀɢᴇ ᴘɪɴɴᴇᴅ", { reply_to_message_id: msgid } );
                    }
                }
            }else if (text === "/unpin"){
                if (!admins.includes(msg.from.id)){
                    bot.sendMessage(chatid, "ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴀᴅᴍɪɴ !, ʏᴏᴜ ᴄᴀɴ ʀᴇǫᴜᴇsᴛ ғᴏʀ ʙᴇ ᴀᴅᴍɪɴ ɪɴ ʙᴏᴛ ʙʏ ᴄᴏᴍᴍᴀɴᴅ /request-admin", { reply_to_message_id: msgid } )
                }else{
                    if (!Object.keys(msg).includes("reply_to_message")){
                        bot.sendMessage(chatid, "ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴍᴇꜱꜱᴀɢᴇ", { reply_to_message_id: msgid } )
                    }else{
                        bot.unpinChatMessage(chatid, { message_id: msg.reply_to_message.message_id });
                        bot.sendMessage(chatid, "ᴍᴇꜱꜱᴀɢᴇ ᴜɴᴘɪɴɴᴇᴅ", { reply_to_message_id: msgid } );
                    }
                }
            }
    
        if (mutes.includes(msg.from.id)){
            bot.deleteMessage(chat, msgid);
        }
    }
});

