class AddIndexToReportsUsers < ActiveRecord::Migration
  def change
    add_index :reports, :user_id
  end
end
