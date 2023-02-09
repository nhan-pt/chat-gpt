"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const telegraf_1 = require("telegraf");
const openai_1 = require("openai");
const config_1 = require("@nestjs/config");
let AppService = AppService_1 = class AppService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AppService_1.name);
    }
    onModuleInit() {
        this.botInit();
    }
    async botInit() {
        const telebotToken = '5960122402:AAGAOqH61j8l5hYnb5Gz-u1zJanyhiHUJIg';
        const bot = new telegraf_1.Telegraf(telebotToken);
        const aiSetting = new openai_1.Configuration({
            apiKey: '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',
        });
        const openai = new openai_1.OpenAIApi(aiSetting);
        bot.use(async (ctx, next) => {
            var _a;
            const reciveTime = new Date().getTime();
            this.logger.warn('Receive content:', (_a = ctx.update['message']) === null || _a === void 0 ? void 0 : _a['text']);
            await next();
            const ms = new Date().getTime() - reciveTime;
            this.logger.log('Response time: %sms', ms);
        });
        bot.command('/gpt', async (ctx) => {
            var _a;
            const question = (_a = ctx.update.message) === null || _a === void 0 ? void 0 : _a.text;
            if (!question) {
                return;
            }
            ctx.reply('Đợi em tí! ....', { reply_to_message_id: ctx.update.message.message_id });
            try {
                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: question,
                    temperature: 1,
                    max_tokens: 500,
                });
                ctx.reply(response.data.choices[0].text);
                this.logger.log('responsed');
            }
            catch (err) {
                this.logger.error(err);
            }
        });
        bot.launch();
    }
    getHello() {
        return 'Hello World!';
    }
};
AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map