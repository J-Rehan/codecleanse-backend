
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Application } from 'src/applications/entities/application.entity';
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryColumn({ type: "uuid", generated: "uuid" })
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiPropertyOptional()
  @Column({ unique: true })
  stripe_id: string;

  @ApiProperty()
  @Column({ unique: true })
  phone_number: string;

  @OneToMany(() => Application, (app) => app.user)
  applications: Application[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}