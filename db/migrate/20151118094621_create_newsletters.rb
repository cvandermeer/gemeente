class CreateNewsletters < ActiveRecord::Migration
  def change
    create_table :newsletters do |t|
      t.datetime :valid_from
      t.datetime :valid_until
      t.string :title
      t.text :body, limit: 4294967295
      t.integer :community_id
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
