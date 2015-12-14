class AddDeliveredToDeliveries < ActiveRecord::Migration
  def change
    add_column :deliveries, :delivered, :boolean
  end
end
