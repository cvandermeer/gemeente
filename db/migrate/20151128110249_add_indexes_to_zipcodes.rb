class AddIndexesToZipcodes < ActiveRecord::Migration
  def change
    add_index :zipcodes, :street
    add_index :zipcodes, :town
  end
end
