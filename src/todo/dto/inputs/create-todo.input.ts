import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@InputType() //Necesario para definirlo como input
export class CreateTodoInput{

    @Field( () => String, { description: 'What needs to be done'} ) //Cada atributo debe ir defindo como @Field
    @IsString()
    @IsNotEmpty()
    @MaxLength( 20 )
    descritpion: string;

}                