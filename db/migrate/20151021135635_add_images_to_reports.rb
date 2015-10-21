class AddImagesToReports < ActiveRecord::Migration
  def change
    add_column :reports, :image_one, :string
    add_column :reports, :image_two, :string
    add_column :reports, :image_three, :string
  end
end
