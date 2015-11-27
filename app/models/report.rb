class Report < ActiveRecord::Base
  ### UPLOADER ###
  mount_uploader :image_one, ImageUploader
  mount_uploader :image_two, ImageUploader
  mount_uploader :image_three, ImageUploader

  ### GEOCODER ###
  geocoded_by :location
  after_validation :geocode

  ### ASSOCIATIONS ###
  belongs_to :community
  delegate :name, to: :community, prefix: true
  delegate :email, to: :community, prefix: true
  delegate :phonenumber, to: :community, prefix: true
  belongs_to :user

  ### VALIDATIONS ###
  validates :title, presence: true
  validates :description, presence: true
  validates :address, presence: true
  validates :town, presence: true

  ### SCOPES ###
  # scope :unresolved, -> { where(resolved_at: nil) }

  ### CALLBACKS ###
  before_create :set_community
  after_create :create_notification

  def set_community
    set_street
    community_name = Zipcode.find_by(street: @street, town: town).community unless @street.nil?
    Community.create(name: community_name) unless Community.find_by(name: community_name)
    self.community = Community.find_by(name: community_name)
  end

  def set_street
    @street = address
    s = address.split
    @street = s.reverse.drop(1).reverse.join(' ') if s[s.length - 1].to_i >= 1
  end

  def create_notification
    CreateNotificationJob.perform_later(user) if user
  end

  ### INSTANCE METHODS ###
  def location
    [address, town].compact.join(', ')
  end

  def editable_by?(user)
    user == self.user || user.community? && community == user.community || user.admin?
  end

  def image(size)
    if image_one?
      image_one_url(size)
    elsif image_two?
      image_two_url(size)
    elsif image_three?
      image_three_url(size)
    end
  end
end
