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

  def initialize_user
    self.role_id = 1 if role_id.nil?
  end

  ### METHODS  ###
  def user_initials
    initials || email[0, 2]
  end

  def initials
    name.split(' ', 4).map(&:first).join('') if name
  end
end
