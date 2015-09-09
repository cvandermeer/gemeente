class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.text :description
      t.string :street
      t.integer :housenumber
      t.string :town
      t.float :latitude
      t.float :longitude
      t.date :start_date
      t.date :end_date
      t.time :start_time
      t.time :end_time
    end
  end
end
