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
import { AddNewMatchDto } from './dtos/add-new-match.dto';
import { DeleteMatchDto } from './dtos/delete-match.dto';
import { EditMatchDto } from './dtos/edit-match.dto';
import { MatchService } from './match.service';

@Controller('/match')
@ApiTags('Match')
@UseGuards(AuthGuard('jwt'))
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get('/')
  async getMatches() {
    return this.matchService.getMatches();
  }

  @Get('/:match_id')
  async getMatchById(@Param('match_id') match_id: number) {
    return this.matchService.getMatchById(match_id);
  }

  @Post('/')
  async addNewMatch(@Body() data: AddNewMatchDto) {
    return this.matchService.addNewMatch(data);
  }

  @Patch('/:match_id')
  async updateMatchById(
    @Param('match_id') match_id: number,
    @Body() data: EditMatchDto,
  ) {
    return this.matchService.updateMatchById(match_id, data);
  }

  @Delete('/:match_id')
  async deleteMatchById(
    @Param('match_id') match_id: number,
    @Body() data: DeleteMatchDto,
  ) {
    return this.matchService.deleteMatchById(match_id, data);
  }
}
