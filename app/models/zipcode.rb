class Zipcode < ActiveRecord::Base
  ### METHODS ###
  def self.search_streets(search)
    streets = where('street like ?', "#{search}")
    streets += where('street like ?', "%#{search}%")
    streets.map(&:street).uniq
  end

  def self.search_towns(search)
    towns = where('town like ?', "#{search}")
    towns += where('town like ?', "%#{search}%")
    towns.map(&:town).uniq
  end
end
