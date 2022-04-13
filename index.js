const TelegramApi = require('node-telegram-bot-api');
const {gameOptions,againOptions} = require('./options');
const UserModel = require('./models');

const token = '5263539321:AAHEgk-DAjMBfv5VfcHl4tV4l_YquiqoTRU'

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
    }
    catch(e){
        console.log('Database broke')
    }
    bot.setMyCommands([
    {command: '/start', description: 'To start the bot'},
    {command: '/info', description: 'To see information'},
    {command: '/game', description: 'Game, guess the number'},

])
}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "You have to guess one number from 0 to 9");
    const randomNumber = Math.floor(Math.random()*10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, "Give back", gameOptions)
}

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
    if(text === '/game'){
        return startGame(chatId)
    }
    bot.sendMessage(chatId, "I didn't understand, try again");
})
bot.on('callback_query', msg=>{
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === '/again'){
        return startGame(chatId)
    } 
    if(data == chats[chatId]){
        return bot.sendMessage(chatId, "Your answer is correct "+ chats[chatId], againOptions)
    }   
    else{
        return bot.sendMessage(chatId, "Your answer is not correct, correct answer is "+ chats[chatId], againOptions)
    }
})
start()