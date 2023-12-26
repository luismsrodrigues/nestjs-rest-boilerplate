import { DatabaseClient } from '@/database/database-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private database: DatabaseClient) {}

  public async getUserByIdAsync(id: number) {
    return this.database.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }
}
