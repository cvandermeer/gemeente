class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable

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
  has_many :user_categories
  has_many :categories, through: :user_categories

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
    self.role_id = 0 if role_id.nil?
    self.get_mail = true
  end

  def add_community_subscription_to_user_on_address
    zipcode = Zipcode.find_by(street: street, town: town) if !street.blank? && !town.blank?
    @community_name = zipcode.community unless zipcode.nil?
    create_community_subscription unless Community.find_by(name: @community_name).nil?
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
    name.split(' ', 4).map(&:first).join('') unless name.blank?
  end
end
