class CreateReportImages < ActiveRecord::Migration
  def change
    create_table :report_images do |t|
      t.integer :report_id
      t.string :image
    end
  end
end
