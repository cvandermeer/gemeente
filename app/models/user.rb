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
    if self.role_id.nil?
      self.role_id == 1
    end
  end

  ### METHODS  ###
  def user_initials
    initials || email[0, 2]
  end

  def initials
    name.split(' ', 4).map(&:first).join('') if name
  end
end
