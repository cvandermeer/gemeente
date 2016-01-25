class AddIconNameToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :icon_name, :string
  end
end
