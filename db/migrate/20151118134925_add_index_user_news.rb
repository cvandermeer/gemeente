class AddIndexUserNews < ActiveRecord::Migration
  def change
    add_index :newsletters, :user_id
  end
end
