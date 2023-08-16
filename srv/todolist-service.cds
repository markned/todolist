using { todolist as db } from '../db/schema';

@path: 'service/todolist'
service ToDoListService {
  entity Tasks @(restrict : [
            {grant : 'READ'},
            {
                grant : [ 'CREATE, UPDATE, DELETE' ],
                to : 'User',
                where: 'modifiedBy = $user.ID'
            }
      ]) as projection on db.Tasks;
  @readonly entity Statuses as projection on db.Statuses;
}

