import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto  {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      type: String,
    })
    name: string;
  

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
      type: String,
    })
    email: string;
  

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      type: String,
    })
    phone_number: string;
  
  
  }