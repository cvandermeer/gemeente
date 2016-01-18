class AddHasWrongWordToReports < ActiveRecord::Migration
  def change
    add_column :reports, :has_wrong_word, :boolean, default: false
  end
end
