class CreateZipcodes < ActiveRecord::Migration
  def change
    create_table :zipcodes do |t|
      t.string :zipcode
      t.integer :zipcode_ascii
      t.integer :first_house_number
      t.integer :last_house_number
      t.string :street
      t.string :town
      t.string :community
      t.string :province
      t.string :latitude
      t.string :longitude
    end
  end
end
