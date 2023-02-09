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
    
    const telebotToken = '5960122402:AAGAOqH61j8l5hYnb5Gz-u1zJanyhiHUJIg';
    
    const bot = new Telegraf<Context>(telebotToken);
  
    const aiSetting = new Configuration({
      apiKey: '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',
    });

    const openai = new OpenAIApi(aiSetting);
    
    bot.use(async (ctx, next) => {

      const reciveTime = new Date().getTime()
      this.logger.warn('Receive content:', ctx.update['message']?.['text']);

      await next();
      const ms = new Date().getTime() - reciveTime;
      this.logger.log('Response time: %sms', ms);
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
