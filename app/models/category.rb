class Category < ActiveRecord::Base
  has_many :user_categories
  has_many :users, through: :user_categories
  has_many :report_categories
  has_many :reports, through: :report_categories
end
