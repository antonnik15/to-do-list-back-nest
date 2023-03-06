import { IsString, Length } from 'class-validator';

export class UpdateToDoDto {
  @IsString()
  @Length(2, 65)
  text: string;
}
