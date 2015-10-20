class Report < ActiveRecord::Base
  ### GEOCODER ###
  geocoded_by :location
  after_validation :geocode

  def location
    [address, town].compact.join(', ')
  end

  ### RELATIONS ###
  belongs_to :community

  ### VALIDATIONS ###
  validates :title, presence: true
  validates :description, presence: true
  validates :address, presence: true
  validates :town, presence: true

  ### METHODS ###
  def set_community
    a = address
    b = address.split
    if b[b.length - 1].to_i >= 1
      b.pop
      a = b.join(' ')
    end
    community_name = Zipcode.find_by(street: a, town: town).community unless a.nil?
    if !Community.where(name: community_name).any?
      Community.create(name: community_name)
    end
    self.community = Community.find_by(name: community_name)
  end
end
