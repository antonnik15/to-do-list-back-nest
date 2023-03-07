import { IsString, Length } from 'class-validator';

export class CreateToDoDto {
  @IsString()
  @Length(2, 70)
  text: string;

  @IsString()
  userId: string;
}
