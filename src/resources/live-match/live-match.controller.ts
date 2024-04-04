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
import { AddNewLiveMatchDto } from './dtos/add-new-live-match.dto';
import { DeleteLiveMatchDto } from './dtos/delete-live-match.dto';
import { EditLiveMatchDto } from './dtos/edit-live-match.dto';
import { LiveMatchService } from './live-match.service';

@Controller('live-match')
@ApiTags('Live Match')
@UseGuards(AuthGuard('jwt'))
export class LiveMatchController {
  constructor(private readonly liveMatchService: LiveMatchService) {}

  @Get('/')
  async getLiveMatches() {
    return this.liveMatchService.getLiveMatches();
  }

  @Get('/:live_match_id')
  async getLiveMatchById(@Param('live_match_id') live_match_id: number) {
    return this.liveMatchService.getLiveMatchById(live_match_id);
  }

  @Post('/')
  async addNewLiveMatch(@Body() data: AddNewLiveMatchDto) {
    return this.liveMatchService.addNewLiveMatch(data);
  }

  @Patch('/:live_match_id')
  async updateLiveMatchById(
    @Param('live_match_id') live_match_id: number,
    @Body() data: EditLiveMatchDto,
  ) {
    return this.liveMatchService.updateLiveMatchById(live_match_id, data);
  }

  @Delete('/:live_match_id')
  async deleteLiveMatchById(
    @Param('live_match_id') live_match_id: number,
    @Body() data: DeleteLiveMatchDto,
  ) {
    return this.liveMatchService.deleteLiveMatchById(live_match_id, data);
  }
}
