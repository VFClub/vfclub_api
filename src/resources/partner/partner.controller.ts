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
import { AddNewPartnerDto } from './dtos/add-new-partner.dto';
import { DeletePartnerDto } from './dtos/delete-partner.dto';
import { EditPartnerDto } from './dtos/edit-partner.dto';
import { PartnerService } from './partner.service';

@Controller('/partner')
@ApiTags('partner')
@UseGuards(AuthGuard('jwt'))
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get('/')
  async getPartners() {
    return this.partnerService.getPartners();
  }

  @Post('/')
  async addNewPartner(@Body() data: AddNewPartnerDto) {
    return this.partnerService.addNewPartner(data);
  }

  @Patch('/:partner_id')
  async updatePartner(
    @Param('partner_id') partner_id: number,
    @Body() data: EditPartnerDto,
  ) {
    return this.partnerService.updatePartner(partner_id, data);
  }

  @Delete('/:partner_id')
  async deletePartner(
    @Param('partner_id') partner_id: number,
    @Body() data: DeletePartnerDto,
  ) {
    return this.partnerService.deletePartner(partner_id, data);
  }
}
