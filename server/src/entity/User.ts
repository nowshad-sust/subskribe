import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcrypt";

const saltRounds = 8;

enum RolesEnum {
  Admin = "admin",
  User = "user",
}

@Entity({
  name: "user",
})
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  @Length(4, 20)
  email: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column({ type: "enum", enum: RolesEnum, default: RolesEnum.User })
  role: string;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
