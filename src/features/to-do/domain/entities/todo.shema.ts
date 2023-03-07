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
    default: () => {
      const offset = -9;
      const date = new Date(new Date().getTime() + offset * 3600 * 1000)
        .toUTCString()
        .replace(/ GMT$/, '');
      return date.slice(0, date.length - 3) + ' PM';
    },
  })
  createdAt: string;
}

export const ToDoSchema = SchemaFactory.createForClass(ToDo);
