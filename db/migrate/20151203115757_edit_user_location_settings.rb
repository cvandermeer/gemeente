class EditUserLocationSettings < ActiveRecord::Migration
  def change
    rename_column :users, :address, :street
    add_column :users, :housenumber, :string
  end
end
