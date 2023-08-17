using { todolist as db } from '../db/schema';

@path: 'service/todolist'
service ToDoListService @(requires: 'authenticated-user') {
  entity Tasks @(restrict : [
        {      
            grant: ['CREATE'],
            to: 'User'
        },    
        {
            grant : [ 'READ', 'UPDATE', 'DELETE' ],
            to : 'User',
            where: 'createdBy = $user'
        }
      ]) as projection on db.Tasks;
  @readonly entity Statuses as projection on db.Statuses;
}

