import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EmpleosService } from './empleos.service';
import { CreateEmpleoDto } from './dto/create-empleo.dto';

@Controller('empleos')
export class EmpleosController {
  constructor(private readonly empleosService: EmpleosService) { }

  @Post()
  create(@Body() createEmpleoDto: CreateEmpleoDto) {
    return this.empleosService.create(createEmpleoDto);
  }

  @Get()
  findAll() {
    return this.empleosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleosService.findOne(+id);
  }
}
