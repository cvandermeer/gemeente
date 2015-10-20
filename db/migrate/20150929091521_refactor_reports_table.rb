class RefactorReportsTable < ActiveRecord::Migration
  def change
    rename_column :reports, :street, :address
    remove_column :reports, :housenumber, :integer
    remove_column :reports, :start_date, :date
    remove_column :reports, :end_date, :date
    remove_column :reports, :start_time, :time
    remove_column :reports, :end_time, :time
    add_column :reports, :created_at, :datetime
    add_column :reports, :resolved_at, :datetime
    add_column :reports, :email, :string
    add_column :reports, :community_id, :integer
  end
end
