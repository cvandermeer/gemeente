class CreateCommunitySubscritions < ActiveRecord::Migration
  def change
    create_table :community_subscritions do |t|
      t.integer :community_id
      t.integer :user_id
      t.datetime :created_at
    end
  end
end
