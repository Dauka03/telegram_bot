const TelegramApi = require('node-telegram-bot-api')
const token = '5263539321:AAHEgk-DAjMBfv5VfcHl4tV4l_YquiqoTRU'

const bot = new TelegramApi(token, {polling: true})

bot.setMyCommands([
    {command: '/start', description: 'To start the bot'},
    {command: '/info', description: 'To see information'},
])

bot.on('message',async msg=>{
    const text = msg.text;
    const chatId = msg.chat.id; 
    console.log(msg)
    if(text === '/start'){
    //    await bot.sendSticker(chatId, "https://tgram.ru/wiki/stickers/img/seryogaandclones/png/12.png")
       return bot.sendMessage(chatId, "Welcome to 404" );
    }
    if(text === '/info'){
        return bot.sendMessage(chatId, "Your first name " + msg.chat.first_name);
    }
    bot.sendMessage(chatId, "I didn't understand, try again");
})