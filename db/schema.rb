# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160118130949) do

  create_table "categories", force: :cascade do |t|
    t.string "title",     limit: 255
    t.string "icon_name", limit: 255
  end

  create_table "communities", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "email",       limit: 255
    t.string   "phonenumber", limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.float    "latitude",    limit: 24
    t.float    "longitude",   limit: 24
    t.string   "avatar",      limit: 255
  end

  create_table "community_subscriptions", force: :cascade do |t|
    t.integer  "community_id", limit: 4
    t.integer  "user_id",      limit: 4
    t.datetime "created_at"
  end

  create_table "deliveries", force: :cascade do |t|
    t.string   "streets",       limit: 255
    t.integer  "newsletter_id", limit: 4
    t.integer  "community_id",  limit: 4
    t.datetime "created_at"
    t.boolean  "delivered"
    t.datetime "delivered_at"
  end

  create_table "messages", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "email",      limit: 255
    t.text     "body",       limit: 4294967295
    t.text     "text",       limit: 4294967295
    t.datetime "created_at"
  end

  create_table "newsletters", force: :cascade do |t|
    t.datetime "valid_from"
    t.datetime "valid_until"
    t.string   "title",        limit: 255
    t.text     "body",         limit: 4294967295
    t.integer  "community_id", limit: 4
    t.integer  "user_id",      limit: 4
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "pdf",          limit: 255
  end

  add_index "newsletters", ["community_id"], name: "index_newsletters_on_community_id", using: :btree
  add_index "newsletters", ["user_id"], name: "index_newsletters_on_user_id", using: :btree

  create_table "notifications", force: :cascade do |t|
    t.string   "title",       limit: 255
    t.integer  "user_id",     limit: 4
    t.integer  "category_id", limit: 4
    t.datetime "created_at"
    t.integer  "record_id",   limit: 4
  end

  add_index "notifications", ["user_id"], name: "index_notifications_on_user_id", using: :btree

  create_table "report_categories", force: :cascade do |t|
    t.integer "report_id",   limit: 4
    t.integer "category_id", limit: 4
  end

  create_table "reports", force: :cascade do |t|
    t.string   "title",          limit: 255
    t.text     "description",    limit: 65535
    t.string   "address",        limit: 255
    t.string   "town",           limit: 255
    t.float    "latitude",       limit: 24
    t.float    "longitude",      limit: 24
    t.datetime "created_at"
    t.datetime "resolved_at"
    t.string   "email",          limit: 255
    t.integer  "community_id",   limit: 4
    t.integer  "user_id",        limit: 4
    t.string   "image_one",      limit: 255
    t.string   "image_two",      limit: 255
    t.string   "image_three",    limit: 255
    t.integer  "status",         limit: 4
    t.boolean  "has_wrong_word",               default: false
  end

  add_index "reports", ["community_id"], name: "index_reports_on_community_id", using: :btree
  add_index "reports", ["user_id"], name: "index_reports_on_user_id", using: :btree

  create_table "user_categories", force: :cascade do |t|
    t.integer "user_id",     limit: 4
    t.integer "category_id", limit: 4
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.integer  "role_id",                limit: 4
    t.integer  "community_id",           limit: 4
    t.string   "avatar",                 limit: 255
    t.string   "name",                   limit: 255
    t.string   "town",                   limit: 255
    t.string   "street",                 limit: 255
    t.string   "housenumber",            limit: 255
    t.boolean  "get_mail"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "confirmation_token",     limit: 255
  end

  add_index "users", ["community_id"], name: "index_users_on_community_id", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "wrong_words", force: :cascade do |t|
    t.string "word", limit: 255
  end

  create_table "zipcodes", force: :cascade do |t|
    t.string  "zipcode",            limit: 255
    t.integer "zipcode_ascii",      limit: 4
    t.integer "first_house_number", limit: 4
    t.integer "last_house_number",  limit: 4
    t.string  "street",             limit: 255
    t.string  "town",               limit: 255
    t.string  "community",          limit: 255
    t.string  "province",           limit: 255
    t.string  "latitude",           limit: 255
    t.string  "longitude",          limit: 255
  end

end
