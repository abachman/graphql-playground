# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_27_150210) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customers", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "customers_organizations", force: :cascade do |t|
    t.bigint "customer_id", null: false
    t.bigint "organization_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["customer_id"], name: "index_customers_organizations_on_customer_id"
    t.index ["organization_id"], name: "index_customers_organizations_on_organization_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "performances", force: :cascade do |t|
    t.string "name"
    t.bigint "production_id", null: false
    t.datetime "showtime_at"
    t.datetime "doors_open_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["production_id"], name: "index_performances_on_production_id"
  end

  create_table "productions", force: :cascade do |t|
    t.string "title"
    t.bigint "organization_id", null: false
    t.integer "runtime_minutes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["organization_id"], name: "index_productions_on_organization_id"
  end

  create_table "receipts", force: :cascade do |t|
    t.string "aasm_state"
    t.bigint "customer_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["customer_id"], name: "index_receipts_on_customer_id"
  end

  create_table "ticket_types", force: :cascade do |t|
    t.string "name"
    t.integer "price_in_cents"
    t.bigint "production_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["production_id"], name: "index_ticket_types_on_production_id"
  end

  create_table "tickets", force: :cascade do |t|
    t.bigint "receipt_id", null: false
    t.bigint "performance_id", null: false
    t.bigint "ticket_type_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["performance_id"], name: "index_tickets_on_performance_id"
    t.index ["receipt_id"], name: "index_tickets_on_receipt_id"
    t.index ["ticket_type_id"], name: "index_tickets_on_ticket_type_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.bigint "organization_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
    t.index ["organization_id"], name: "index_users_on_organization_id"
  end

  add_foreign_key "customers_organizations", "customers"
  add_foreign_key "customers_organizations", "organizations"
  add_foreign_key "performances", "productions"
  add_foreign_key "productions", "organizations"
  add_foreign_key "receipts", "customers"
  add_foreign_key "ticket_types", "productions"
  add_foreign_key "tickets", "performances"
  add_foreign_key "tickets", "receipts"
  add_foreign_key "tickets", "ticket_types"
  add_foreign_key "users", "organizations"
end
