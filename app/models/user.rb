class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  ### UPLOADER ###
  mount_uploader :avatar, AvatarUploader

  ### ASSOCIATIONS ###
  belongs_to :community
  delegate :name, to: :community, prefix: true
  has_many :reports
  has_many :newsletters

  ### CONSTANTS ###
  ROLE_USER = 0
  ROLE_COMMUNITY = 1
  ROLE_ADMIN = 2

  enum role_id: {
    user: ROLE_USER,
    community: ROLE_COMMUNITY,
    admin: ROLE_ADMIN
  }

  ### METHODS  ###
  def user_initials
    initials || email[0, 2]
  end

  def initials
    name.split(' ', 4).map(&:first).join('') if name
  end
end
