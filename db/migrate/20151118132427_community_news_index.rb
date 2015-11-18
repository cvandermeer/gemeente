class CommunityNewsIndex < ActiveRecord::Migration
  def change
    add_index :newsletters, :community_id
  end
end
