class RemoveTitleFromReports < ActiveRecord::Migration
  def change
    remove_column :reports, :title
  end
end
