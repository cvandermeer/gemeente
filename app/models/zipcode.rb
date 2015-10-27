class Zipcode < ActiveRecord::Base
  ### METHODS ###
  def self.search_streets(search)
    streets = where('street like ?', "#{search}").map(&:street).uniq
    if streets.length < 5
      streets += where('street like ?', "%#{search}%").map(&:street).uniq
    end
    streets.uniq[0..4]
  end

  def self.search_towns(search)
    where('street like ?', "#{search}").map(&:town).uniq[0..4]
  end
end
