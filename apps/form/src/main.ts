import { Logger } from '@nestjs/common';
import * as pkg from '../package.json';
import { env } from '@app/utils';
import { makeApp } from '@app/starter';
import { AppModule } from './app.module';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await makeApp(AppModule, 'form', pkg);
  await app.listen(env<number>('SERVICE_PORT', 3000));
}

bootstrap()
  .then(() => logger.log(`App ${pkg.name} Version ${pkg.version} Started!`))
  .catch((err) =>
    logger.error(
      `App ${pkg.name} Version ${pkg.version}  Crash: ${err.message || ''}`,
    ),
  );
