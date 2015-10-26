class RemoveReportImages < ActiveRecord::Migration
  def change
    drop_table :report_images
  end
end
