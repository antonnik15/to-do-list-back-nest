import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type ToDoDocument = HydratedDocument<ToDo>;

@Schema()
export class ToDo {
  @Prop({ required: true, unique: true, type: String, default: randomUUID })
  id: string;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, type: String })
  text: string;

  @Prop({ type: Boolean, default: false })
  completedStatus: boolean;

  @Prop({ type: Boolean, default: false })
  importantStatus: boolean;

  @Prop({
    required: true,
    type: String,
    default: () =>
      new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' }),
  })
  createdAt: string;
}

export const ToDoSchema = SchemaFactory.createForClass(ToDo);
