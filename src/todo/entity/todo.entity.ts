import { Field, Int, ObjectType } from "@nestjs/graphql";

//Para definir como quiero que luzca el "todo" en la BBDD...sería la representación de un registro en una BBDD relacional
@ObjectType()  //Dice a Graphql que se trata de un objeto personalizado, además de una entidad
export class Todo { //Vamos a tener este objeto y vamos a poder hacer peticiones a estas propiedades

    @Field( () => Int ) //Un campo de tipo Int. Aquí también podríamos cambiar el nombre el campo
    id: number;

    @Field( () => String )
    description: string;

    @Field( () => Boolean )
    done: boolean = false;  //Por defecto va a ir inicializado en false

}