class AddAvatarToCommunity < ActiveRecord::Migration
  def change
    add_column :communities, :avatar, :string
  end
end
