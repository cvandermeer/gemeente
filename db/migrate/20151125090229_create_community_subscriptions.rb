class CreateCommunitySubscriptions < ActiveRecord::Migration
  def change
    create_table :community_subscriptions do |t|
      t.integer :community_id
      t.integer :user_id
      t.datetime :created_at
    end
  end
end
