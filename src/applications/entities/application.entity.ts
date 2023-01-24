
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { project_type } from 'src/common/customtypes/customtypes';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Application {
  @ApiProperty()
  @PrimaryColumn({ type: "uuid", generated: "uuid" })
  id: string;

  @ApiProperty()
  @Column()
  project_type: project_type;

  @ApiProperty()
  @Column({type:"text", default:""})
  project_description: string;

  @ApiPropertyOptional()
  @Column({default:false})
  have_developer: boolean;

  @ApiProperty()
  @Column({nullable:true})
  developer_phone_number: string;

  @ApiProperty()
  @Column({nullable:true})
  developer_skype: string;

  @ApiProperty({nullable:true})
  @Column({nullable:true})
  developer_name: string;

  @ApiProperty()
  @Column({default:false})
  developer_contact_allowed: boolean;

  @Column({ type: "int", nullable: true })
  user_id: string;

  @ManyToOne(() => User, (user) => user.applications, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}