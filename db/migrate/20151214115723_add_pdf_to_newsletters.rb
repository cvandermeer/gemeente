class AddPdfToNewsletters < ActiveRecord::Migration
  def change
    add_column :newsletters, :pdf, :string
  end
end
