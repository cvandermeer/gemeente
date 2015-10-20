class AddZipcodeToReports < ActiveRecord::Migration
  def change
    add_column :reports, :zipcode, :string
  end
end
