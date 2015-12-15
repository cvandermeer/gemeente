class AddMailToUsers < ActiveRecord::Migration
  def change
    add_column :users, :get_mail, :boolean
  end
end
