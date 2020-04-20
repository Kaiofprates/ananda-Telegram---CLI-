#!/usr/bin/env node 
// spinner
const ora = require('ora'); 
require('dotenv/config');

// get arguments
const [,, ...args] = process.argv;

// send message function 

async function sender(message, flag){
    const token = process.env.API_KEY;
    const TelegramBot   = require('node-telegram-bot-api');
    if(flag){
    const spinner  = ora(`Envie qualquer mensagem para seu bot`);
    spinner.spinner = 'clock';   
    spinner.start();   
    const bot = new TelegramBot(token, { polling: true });
    bot.on('message',async (msg) => {
    const chatId = msg.chat.id;

    await bot.sendMessage(chatId, `Seu Chat id é ${chatId}`);

    console.log(`
    ---------
    Seu chat id é : ${chatId}

    digite  ctrl + c  para sair do terminal
    -------- 
    `); 
    spinner.stop();     

    });
    }else{
    const spinner = ora('Enviando mensagem');
    const bot = new TelegramBot(token, { polling: false }); 
    spinner.spinner = 'hearts';
    spinner.start();
    await bot.sendMessage(process.env.CHAT_ID_PROD, message); 
    spinner.stop();
    }
}

if(args[0] == '-m' && args.length == 2 ){
    sender(args[1],false);  
}else if (args.length > 2){
    console.log(`número excessivo de argumentos`);
}
else if( args[0] == 'config'){
    sender('config',true); 
}    
else if( args[0] == '-h' ){
    console.log(
    `-------- Ananda Bot (CLI) v0.0.1 --------
    uso:
    ananda -m [mensagem]  | enviar mensagem
    ananda -h             | esse painel
    ananda config         | obter chat id
    -------------------------
                             by @kaio_dev 2020
`); 
}else{
   console.log('Argumentos inválidos'); 
}
