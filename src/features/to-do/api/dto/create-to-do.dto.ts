import { IsString, Length } from 'class-validator';

export class CreateToDoDto {
  @IsString()
  @Length(2, 65)
  text: string;

  @IsString()
  userId: string;
}
