import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUserRepository } from 'src/contracts';
import { MODELS } from 'src/enums';
import { User } from 'src/schemas';

@Injectable()
export class UserRepository implements IUserRepository {
  public readonly model: Model<User>;

  constructor(
    @Inject(MODELS.USER_MODEL.NAME)
    private readonly _model: Model<User>,
  ) {
    this.model = this._model;
  }

  save(data: User): Promise<User> {
    const instance = new this.model(data);
    return instance.save();
  }
}
