import { Injectable, Logger } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import {Configuration, OpenAIApi} from 'openai'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(
    private configService: ConfigService){

    }

  onModuleInit() {
    this.botInit();
  }

  private readonly logger = new Logger(AppService.name);

  async botInit() {
    
    const telebotToken = this.configService.get<string>('TELE_KEY');
    
    const bot = new Telegraf<Context>(telebotToken);
  
    const aiSetting = new Configuration({
      apiKey: process.env.OPENAI_KEY,
    });

    const openai = new OpenAIApi(aiSetting);
    
    bot.use(async (ctx, next) => {

      this.logger.warn('Receive content:', ctx.update['message']?.['text']);

      await next();

    });

    bot.command('/gpt', async (ctx) => {
      const question = ctx.update.message?.text
      if (!question) {
        return
      }
      ctx.reply('Đợi em tí! ....', { reply_to_message_id: ctx.update.message.message_id })
      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: question,
          temperature: 1,
          max_tokens: 500,
        });
        ctx.reply(response.data.choices[0].text)
        this.logger.log('responsed')
      } catch (err) {
        this.logger.error(err)
      }
    });

    bot.launch();
  }
  getHello(): string {
    return 'Hello World!';
  }
}
