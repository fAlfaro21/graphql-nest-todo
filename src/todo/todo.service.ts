import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { Todo } from './entity/todo.entity';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {

    private todos: Todo[] = [

        { id: 1, description: 'Piedra del Alma', done: false},
        { id: 2, description: 'Piedra del Espacio', done: true},
        { id: 3, description: 'Piedra del Poder', done: false},
        { id: 4, description: 'Piedra del Tiempo', done: false},
    ];

    //Este getter lo vamos a utilizar para nuestros aggregations
    get totalTodos(){
        return this.todos.length;
    }

    get pendingTodos(){
        const pendingTodos = this.todos.filter( todo =>  todo.done === false ).length;
        return pendingTodos;
    }

    get completedTodos(){
        const completedTodos = this.todos.filter( todo =>  todo.done === true ).length;
        return completedTodos;
    }

    findAll( statusArgs: StatusArgs ): Todo[] {
        const { status } = statusArgs;
        if ( status !== undefined ) 
            return this.todos.filter( todo =>  todo.done === status );
        return this.todos
    }

    findOne( id: number ): Todo {
        const todo = this.todos.find( todo => todo.id === id);  //Primero nos aseguramos de que exista el 'todo'
        if( !todo ) throw new NotFoundException( `Todo with id ${ id } not found `);
        return todo;
    }

    create( createTodoInput: CreateTodoInput ): Todo {
        const todo = new Todo();
        todo.description = createTodoInput.descritpion;
        //Calculamos el id siguiente para la creación del todo
        todo.id = Math.max( ...this.todos.map( todo => todo.id ), 0) + 1; //Esparzo sus ids, si no tuvieramos ninguno coje un 0
        // lo añadimos a la lista
        this.todos.push( todo );
        return todo;
    }

    update( id: number, updateTodoInput: UpdateTodoInput ) { //El id no va a venir en la url sino en el body de la petición
        const { descritpion, done } = updateTodoInput; //Desestructuro los campos description y done
        const todoToUpdate = this.findOne( id ); //Si da un error, lanza la excepción y ya no sigue
        if (descritpion) todoToUpdate.description = descritpion;
        if (done !== undefined) todoToUpdate.done = done;  //Evaluamos el done contra undefined porque no lo podemos evaluar contra false (ya que es uno de los valores posibles)

        this.todos = this.todos.map( todo => {
            return ( todo.id === id ) ? todoToUpdate : todo;
        })

        return todoToUpdate;
    }

    delete( id: number ): Boolean {
        const todoToDelete = this.findOne( id );
        this.todos = this.todos.filter( todo =>  todo.id !== id );
        return true;
    }

}
