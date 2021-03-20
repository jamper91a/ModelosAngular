export class NewMessageDto{
  room: string;
  event: string;
  data: {
    message: string,
    userId: number;
    name: string;
    country: {
      id: number,
      name: string;
      code: string;
    }
  }

}
