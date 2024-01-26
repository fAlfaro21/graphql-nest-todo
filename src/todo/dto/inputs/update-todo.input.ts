import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

@InputType() //Necesario para definirlo como input
export class UpdateTodoInput{

    @Field( () => Int ) 
    @IsInt()
    @Min(1)
    id: number;

    @Field( () => String, { description: 'What needs to be done', nullable: true } ) //Cada atributo debe ir defindo como @Field. GPQ sabe que puede ser nullable, pero
    //aún así hay que especificarlo con el @IsOptional y el ?
    @IsString()
    @IsNotEmpty()
    @MaxLength( 20 )
    @IsOptional()//Le dice al class validator que va a ser opcional
    descritpion?: string; //Le dice a Typescript que va a ser opcional

    @Field( () => Boolean, {nullable: true} ) 
    @IsOptional()
    @IsBoolean()
    done?: boolean;

}                