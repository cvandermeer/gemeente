# This migration comes from contact_form (originally 20151224100539)
class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :name
      t.string :email
      t.text :body, :text, limit: 4294967295
      t.datetime :created_at
    end
  end
end
