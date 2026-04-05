import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageResolver } from './page.resolver';

@Module({
  providers: [PageResolver, PageService],
})
export class PageModule {}
