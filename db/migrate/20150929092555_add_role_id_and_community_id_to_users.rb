class AddRoleIdAndCommunityIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :role_id, :integer
    add_column :users, :community_id, :integer
  end
end
