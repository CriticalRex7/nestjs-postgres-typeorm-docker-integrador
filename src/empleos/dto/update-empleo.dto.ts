import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpleoDto } from './create-empleo.dto';

export class UpdateEmpleoDto extends PartialType(CreateEmpleoDto) {}
