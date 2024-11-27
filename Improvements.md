# Group Todo App

## DB Schema

todos
id, title, order, completed
asignee(FK users.id)
status(enum (not_started, in_progress, in_review, 'done'))
project_id (FK: project.id)
parent_id (FK: todos.id)
CONTRAINt - project_id is not null || parent_id is not null

todo_comments
id, text, user_id (FK: users.id), todo_id (FK: todos.id), parent_id (FK: todo_comments.id, nullable)
CONTRAINt - todo_id is not null || parent_id is not null

users
id, name, email(unique), password, createdAt, updatedAt, active:boolean

organisations
id, name, domain, owner(FK - users.id), createdAt, updatedAt, active:boolean

projects
id, title, description, start_date, end_date, createdAt, updatedAt, organisation_id (FK: organisation.id), owner (FK: users.id)

project_status
project_id(FK: project.id), total, completed

organisation_users
organisation_id(FK - organisation.id), user_id(FK - users.id)


## API Flow

### User
- User signup - public
- User Login -> JWT Token - public
- Update / Delete user -> by self
- List / Get User -> within organisation

### Organisation
- User is added by owner of org / User create org
- Update / Delete Org - Owner
- List / Get Org - User belonging org
- User login to org -> Updated JWT token

### Projects
- CRUD - User within organisation 
- Project Progress -> Join project_status
- Delete Project -> Cascade delete to Todo

### Todos
- CRUD Todo and Sub-Todo
- Create todo -> has project_id -> Update project_status.project_id -> total += 1
- Update completed in todo -> has project_id -> Update project_status.project_id -> completed += 1, if false completed -= 1
- Delete todo -> has project_id -> Update project_status.project_id -> if todo.completed is true, decrement both completed and total in project_status, if false then decrement total
- Delete Todo -> Cascade to sub-todos, Cascade to todo_comments

### Comments
- CRUD Comments and sub-comments -> creator of comment, read - everyone within org context
- Delete comments - cascade delete to sub-comments


## Implementation

### Iteration 1
- User signup/login
- CRUD Todo
- CRUD Sub-Todo



