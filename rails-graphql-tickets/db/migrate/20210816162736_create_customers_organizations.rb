class CreateCustomersOrganizations < ActiveRecord::Migration[6.1]
  def change
    create_table :customers_organizations do |t|
      t.references :customer, null: false, foreign_key: true
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
