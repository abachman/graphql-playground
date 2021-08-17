class CreateTicketTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :ticket_types do |t|
      t.string :name
      t.integer :price_in_cents
      t.references :production, null: false, foreign_key: true

      t.timestamps
    end
  end
end
