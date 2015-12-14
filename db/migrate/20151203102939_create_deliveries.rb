class CreateDeliveries < ActiveRecord::Migration
  def change
    create_table :deliveries do |t|
      t.string :streets
      t.integer :newsletter_id
      t.integer :community_id
      t.datetime :created_at
    end
  end
end
