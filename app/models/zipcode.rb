class Zipcode < ActiveRecord::Base
  ### METHODS ###
  def self.search_streets(search)
    where('street like ?', "%#{search}%").map(&:street).uniq
    # if streets.length < 5
    #   streets += where('street like ?', "%#{search}%").map(&:street).uniq
    # end
    # streets.uniq[0..4]
  end

  def self.search_towns(search)
    towns = where('town like ?', "#{search}").map(&:town).uniq
    if towns.length < 5
      towns += where('town like ?', "%#{search}%").map(&:town).uniq
    end
    towns.uniq[0..4]
  end
end
