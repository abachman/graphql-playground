class CreatePerformances < ActiveRecord::Migration[6.1]
  def change
    create_table :performances do |t|
      t.string :name
      t.references :production, null: false, foreign_key: true
      t.datetime :showtime_at
      t.datetime :doors_open_at

      t.timestamps
    end
  end
end
