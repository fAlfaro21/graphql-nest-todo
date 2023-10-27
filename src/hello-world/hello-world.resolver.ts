import { Float, Int, Query, Resolver, Args } from '@nestjs/graphql';

@Resolver() //Un resolver es como un traductor de las instrucciones que dicta el cliente para GraphQL. Va a estar escuchando las entradas que puedan exisitir relacionadas con HelloWorld. Es como un controlador
export class HelloWorldResolver {

    //OJO: Hay que utilizar la importación de graphql porque hay otro que no nos sirve
    @Query( () => String, { description: 'Hola Mundo es lo que retorna', name: 'hello' } )   //Le estamos diciendo a GQL que regresa un string (el texto Hola Mundo. Tiene que ir con mayúscula)
    helloWorld(): string{
        return 'Hola Mundo'
    }

    @Query( () => Float, { name: 'randomNumber' } ) //El float viene de grapql
    getRandomNumber(): number{  //El number viene de Tyscript
        return Math.random() * 100;
    }

    @Query( () => Int, { name: 'randomFromZeroTo', description: 'From 0 to argument TO (default 6)' } ) //Devuleve un entero
    getRandomFromZeroTo( 
        @Args('to', { //'to' es el nombre del argumento
            nullable: true, //Le decimos que puede ir vacío...por defecto pondermos un 6
            type: () => Int //Con el type Int nos aseguramos de que el número sea un entero 
            }
        ) 
        upTo: number = 6 
    ): number {  
        'to' //es como se llama el argumento para Graphql
        return Math.floor( Math.random() * upTo );
    }

}
