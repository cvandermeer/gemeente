class RenameEventsTable < ActiveRecord::Migration
  def change
    rename_table :events, :reports
  end
end
