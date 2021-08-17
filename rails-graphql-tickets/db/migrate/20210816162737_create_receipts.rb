class CreateReceipts < ActiveRecord::Migration[6.1]
  def change
    create_table :receipts do |t|
      t.string :aasm_state
      t.references :customer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
