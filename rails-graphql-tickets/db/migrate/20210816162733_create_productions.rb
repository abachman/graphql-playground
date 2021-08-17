class CreateProductions < ActiveRecord::Migration[6.1]
  def change
    create_table :productions do |t|
      t.string :title
      t.references :organization, null: false, foreign_key: true
      t.integer :runtime_minutes

      t.timestamps
    end
  end
end
