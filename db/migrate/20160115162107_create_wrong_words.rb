class CreateWrongWords < ActiveRecord::Migration
  def change
    create_table :wrong_words do |t|
      t.string :word
    end
  end
end
