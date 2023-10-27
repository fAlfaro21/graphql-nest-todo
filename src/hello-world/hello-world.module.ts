import { Module } from '@nestjs/common';
import { HelloWorldResolver } from './hello-world.resolver';

@Module({
  providers: [ HelloWorldResolver ]  //Es similar a un contolador
})
export class HelloWorldModule {}
