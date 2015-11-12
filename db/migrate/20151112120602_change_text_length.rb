class ChangeTextLength < ActiveRecord::Migration
  def change
    change_column :messages, :body, :text, limit: 4294967295
  end
end
