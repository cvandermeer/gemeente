class AddIndexes < ActiveRecord::Migration
  def change
    add_index :report_images, :report_id
    add_index :reports, :community_id
    add_index :users, :community_id
  end
end
