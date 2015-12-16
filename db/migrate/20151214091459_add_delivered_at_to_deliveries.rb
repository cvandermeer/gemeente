class AddDeliveredAtToDeliveries < ActiveRecord::Migration
  def change
    add_column :deliveries, :delivered_at, :datetime
  end
end
