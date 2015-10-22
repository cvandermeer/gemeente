class Community < ActiveRecord::Base
  geocoded_by :name

  ### VALIDATIONS ###
  after_validation :geocode

  ### ASSOCIATIONS ###
  has_many :users
  has_many :reports
end
