class CreateTickets < ActiveRecord::Migration[6.1]
  def change
    create_table :tickets do |t|
      t.references :receipt, null: false, foreign_key: true
      t.references :performance, null: false, foreign_key: true
      t.references :ticket_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
