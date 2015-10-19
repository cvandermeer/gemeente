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
  def set_zipcode
    @a = address
    @b = address.split
    @c = @b[@b.length - 1]
    if @c.to_i.to_s == @c || @c.to_i >= 1 && @b.length > 1
      @b.pop
      @a = @b.join(' ')
    end
    self.zipcode = Zipcode.find_by(street: @a, town: town).zipcode unless @a.nil?
  end

  def set_community
    # Getting back the ascii
    zipcode_ascii
    # Find the community our create
    @community_name = Zipcode.find_by(zipcode_ascii: @ascii.join).community
    if !Community.find_by(name: @community_name).nil?
      @community = Community.find_by(name: @community_name)
    else
      @community = Community.create(name: @community_name)
    end
    self.community_id = @community.id
  end

  def zipcode_ascii
    @ascii = []
    @zipcode_array = zipcode.split(//)
    @zipcode_array.each do |z|
      if z.to_i.to_s == z
        @ascii.push(z)
      else
        @ascii.push(z.ord)
      end
    end
  end
end
