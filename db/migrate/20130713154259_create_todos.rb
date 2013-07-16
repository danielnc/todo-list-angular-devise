class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.date :due_date, null: false
      t.boolean :completed, null: false, default: false
      t.integer :priority, null: false
      t.references :user, index: true

      t.timestamps
    end
  end
end
