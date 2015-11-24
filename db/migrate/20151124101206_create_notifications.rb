class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :title
      t.integer :user_id
      t.integer :category_id
      t.datetime :created_at
    end
  end
end
