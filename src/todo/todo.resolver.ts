import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregations.type';

@Resolver( () => Todo ) //Le decimos al resolver el tipo de dato que va a gestionar: es decir, un Todo
export class TodoResolver {

    //Inyectamos nuestro servicio para poder servir a mis queries
    constructor(
        private readonly todoService: TodoService
    ){}

    //OJO: Importar Query de GQL
    @Query( () => [Todo], { name: 'todos' } ) //Este 'Todo' es de GQL. Va a devolver un array de tipo "Todo"(entidad que definimos). Con este decorador definimos que será una query. OJO: debemos importarlo de GQL
    findAll( 
        @Args() statusArgs: StatusArgs 
    ): Todo[] { //Este 'Todo' es de tipo typescript, el de arriba es de tipo grphql
        return this.todoService.findAll( statusArgs );
    }

    @Query( () => Todo, { name: 'todo' } ) //Va a devolver un objeto de tipo "Todo"
    findOne(
        @Args('id', { 
            type: () => Int }) //Con el type Int nos aseguramos de que el número sea un entero 
            id: number
    ) { //Este Todo es de tipo typescript, el de arriba es de tipo grphql
        return this.todoService.findOne( id );
    }

    @Mutation( () => Todo, { name: 'createTodo' } ) //Va a devolver un objeto de tipo "Todo"
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ){  
        return this.todoService.create( createTodoInput );
    }

    @Mutation( () => Todo, { name: 'updateTodo' } )
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ){  
        return this.todoService.update( updateTodoInput.id, updateTodoInput );
    }

    @Mutation( () => Boolean )
    removeTodo(
        @Args('id', { type: () => Int }) id: number
    ){  
        return this.todoService.delete( id );
    }

    //Aggregation - uso de getter
    @Query( () => Int, { name: 'totalTodos' } )
    totalTodos(): number {
        return this.todoService.totalTodos;
    }

    //Aggregation - uso de getter
    @Query( () => Int, { name: 'pendingTodos' } )
    pendingTodos(): number {
        return this.todoService.pendingTodos;
    }

    //Aggregation - uso de getter
    @Query( () => Int, { name: 'completedTodos' } )
    completedTodos(): number {
        return this.todoService.completedTodos;
    }

    @Query( () => AggregationsType ) //AggregationsType va a ser un nuevo tipo de dato personalizado
    aggregations(): AggregationsType{
        return{
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodosCompleted: this.todoService.totalTodos  
        }
    }
}
