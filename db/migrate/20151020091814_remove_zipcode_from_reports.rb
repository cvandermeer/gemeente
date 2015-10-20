class RemoveZipcodeFromReports < ActiveRecord::Migration
  def change
    remove_column :reports, :zipcode
  end
end
