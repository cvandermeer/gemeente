class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

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
end
