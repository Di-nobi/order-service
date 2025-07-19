import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";


// Shows the information required for adding of orders
export class CreateDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    quantity: string;
}

