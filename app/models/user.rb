class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  ### UPLOADER ###
  mount_uploader :avatar, AvatarUploader

  ### ASSOCIATIONS ###
  belongs_to :community
  delegate :name, to: :community, prefix: true
  has_many :reports
  has_many :newsletters
  has_many :notifications
  has_many :community_subscriptions
  has_many :communities, through: :community_subscriptions

  ### CONSTANTS ###
  ROLE_USER = 0
  ROLE_COMMUNITY = 1
  ROLE_ADMIN = 2

  enum role_id: {
    user: ROLE_USER,
    community: ROLE_COMMUNITY,
    admin: ROLE_ADMIN
  }

  ### CALLBACKS ###
  before_create :initialize_user
  after_update :add_community_subscription_to_user_on_address

  def initialize_user
    self.role_id = 1 if role_id.nil?
  end

  def add_community_subscription_to_user_on_address
    clean_up_address
    zipcode = Zipcode.find_by(street: @street_name, town: town) if !address.blank? && !town.blank?
    @community_name = zipcode.community unless zipcode.nil?
    create_community_subscription unless Community.find_by(name: @community_name).nil?
  end

  def clean_up_address
    @street_name = address
    s = address.split
    @street_name = s.reverse.drop(1).reverse.join(' ') if s[s.length - 1].to_i >= 1
  end

  def create_community_subscription
    community_id = Community.find_by(name: @community_name).id
    CommunitySubscription.create(community_id: community_id,
                                 user_id: id) if CommunitySubscription.find_by(community_id: community_id,
                                                                               user_id: id).nil?
  end

  ### METHODS  ###
  def user_initials
    initials || email[0, 2]
  end

  def initials
    name.split(' ', 4).map(&:first).join('') if name
  end
end
