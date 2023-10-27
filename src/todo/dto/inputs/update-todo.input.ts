import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

@InputType() //Necesario para definirlo como input
export class UpdateTodoInput{

    @Field( () => Int ) 
    @IsInt()
    @Min(1)
    id: number;

    @Field( () => String, { description: 'What needs to be done', nullable: true } ) //Cada atributo debe ir defindo como @Field
    @IsString()
    @IsNotEmpty()
    @MaxLength( 20 )
    @IsOptional()
    descritpion?: string;

    @Field( () => Boolean, {nullable: true} ) 
    @IsOptional()
    @IsBoolean()
    done?: boolean;

}                