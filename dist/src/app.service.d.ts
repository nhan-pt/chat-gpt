import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private configService;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    private readonly logger;
    botInit(): Promise<void>;
    getHello(): string;
}
