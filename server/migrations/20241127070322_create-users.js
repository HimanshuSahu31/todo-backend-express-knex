/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    //id, name, email(unique), password, createdAt, updatedAt, active:boolean
    return knex.schema.createTable('users', function(table) {
        table.increments('id');
        table.string('name');
        table.string('email').unique();
        table.string('password');
        table.boolean('active').defaultTo(false);
        table.timestamps();
    }).alterTable("todos", (table) => {
        table.integer('assignee').references('id')
        .inTable('users').nullable();
        table.integer("parent_id").references('id').inTable('todos').nullable();

        // status(enum (not_started, in_progress, in_review, 'done'))
        table.enu('status', ['not_started', 'in_progress', 'in_review', 'done'], {
            useNative: true,
            enumName: 'todo_status',
          });
          table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("todos", (table) => {
        table.dropColumns(["assignee", "parent_id", "status"])
    })
    .dropTable('users');
};
