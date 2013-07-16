class AddTodosIndexes < ActiveRecord::Migration
  def change
    add_index :todos, :completed
    add_index :todos, :due_date
    add_index :todos, :priority
  end
end
