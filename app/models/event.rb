class Event < ActiveRecord::Base
  validates :title, presence: true
  validates :description, presence: true
  validates :street, presence: true
  validates :housenumber, presence: true
  validates :town, presence: true
  validates :start_date, presence: true
end
