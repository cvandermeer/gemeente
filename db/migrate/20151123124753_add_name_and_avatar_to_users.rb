class AddNameAndAvatarToUsers < ActiveRecord::Migration
  def change
    add_column :users, :avatar, :string
    add_column :users, :name, :string
  end
end
