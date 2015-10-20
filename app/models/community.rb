class Community < ActiveRecord::Base
  geocoded_by :name
  after_validation :geocode

  has_many :users
  has_many :reports, dependent: :destroy
end
