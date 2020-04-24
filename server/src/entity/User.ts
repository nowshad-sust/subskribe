import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcrypt";
import { Program } from "./Program";
import { ProgramRequest } from "./ProgramRequest";

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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @ManyToMany((type) => Program, (program) => program.users)
  @JoinTable()
  programs: Program[];

  @OneToMany((type) => ProgramRequest, (request) => request.user)
  requests: ProgramRequest[];
}
