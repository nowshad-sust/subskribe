import { User } from "./User";
import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";

@Entity()
@Unique(["slug"])
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column({ type: "json" })
  description: JSON;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @ManyToMany((type) => User, (user) => user.programs)
  users: User[];
}
