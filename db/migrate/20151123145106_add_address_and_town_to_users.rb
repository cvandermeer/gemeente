class AddAddressAndTownToUsers < ActiveRecord::Migration
  def change
    add_column :users, :town, :string
    add_column :users, :address, :string
  end
end
