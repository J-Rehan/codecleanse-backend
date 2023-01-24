import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { project_type } from "src/common/customtypes/customtypes";

export class CreateApplicationDto  {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      type: String,
    })
    project_description: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      type: String,
    })
    project_type: project_type;

    @IsString()
    @ApiProperty({
      type: Boolean,
    })
    have_developer: boolean;

    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional({
      type: String,
    })
    developer_name: string;

    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional({
      type: String,
    })
    developer_phone_number: string;

    @IsString()
    @ApiPropertyOptional({
      type: Boolean,
    })
    developer_contact_allowed: boolean;

    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional({
      type: String,
    })
    developer_skype: string;
  
  }