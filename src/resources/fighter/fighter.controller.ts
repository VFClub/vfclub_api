import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

// service
import { FighterService } from './fighter.service';

// dtos
import { AddNewFighterDto } from './dtos/add-new-fighter.dto';
import { DeleteFighterDto } from './dtos/delete-fighter.dto';
import { EditFighterDto } from './dtos/edit-fighter.dto';

@Controller('/fighter')
@ApiTags('fighter')
@UseGuards(AuthGuard('jwt'))
export class FighterController {
  constructor(private readonly fighterService: FighterService) {}

  @Get('/')
  async getFighters() {
    return await this.fighterService.getFighters();
  }

  @Get('/ranking')
  async getFightersRanking() {
    return await this.fighterService.getFightersRanking();
  }

  @Get('/:fighter_id')
  async getFighterById(@Param('fighter_id') fighter_id: number) {
    return await this.fighterService.getFighterById(fighter_id);
  }

  @Post('/')
  async addNewFighter(@Body() data: AddNewFighterDto) {
    return await this.fighterService.addNewFighter(data);
  }

  @Patch('/:fighter_id')
  async updateFighter(
    @Param('fighter_id') fighter_id: number,
    @Body() data: EditFighterDto,
  ) {
    return await this.fighterService.updateFighter(fighter_id, data);
  }

  @Delete('/:fighter_id')
  async deleteFighter(
    @Param('fighter_id') fighter_id: number,
    @Body() data: DeleteFighterDto,
  ) {
    return await this.fighterService.deleteFighter(fighter_id, data);
  }
}
