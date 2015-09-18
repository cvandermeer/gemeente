class Event < ActiveRecord::Base
  ### GEOCODER ###
  geocoded_by :address
  after_validation :geocode

  def address
    [street, housenumber, town].compact.join(', ')
  end

  ### VALIDATIONS ###
  validates :title, presence: true
  validates :description, presence: true
  validates :street, presence: true
  validates :housenumber, presence: true
  validates :town, presence: true
  validates :start_date, presence: true
end
