class Zipcode < ActiveRecord::Base

  def self.search_streets(search)
    streets = where('street like ?', "#{search}").map(&:street).uniq[0 .. 4]
    if streets.length < 5
      streets = streets + where('street like ?', "%#{search}%").map(&:street).uniq
      streets.uniq[0 .. 4]
    end
  end
end
