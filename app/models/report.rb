class Report < ActiveRecord::Base
  ### GEOCODER ###
  geocoded_by :location
  after_validation :geocode

  def location
    [address, town].compact.join(', ')
  end

  ### VALIDATIONS ###
  validates :title, presence: true
  validates :description, presence: true
  validates :address, presence: true
  validates :town, presence: true
end
