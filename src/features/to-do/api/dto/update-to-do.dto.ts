import { IsString, Length } from 'class-validator';

export class UpdateToDoDto {
  @IsString()
  @Length(2, 70)
  text: string;
}
