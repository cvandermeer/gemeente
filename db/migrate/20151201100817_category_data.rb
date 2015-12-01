class CategoryData < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :title
    end

    create_table :report_categories do |t|
      t.integer :report_id
      t.integer :category_id
    end

    create_table :user_categories do |t|
      t.integer :user_id
      t.integer :category_id
    end
  end
end
