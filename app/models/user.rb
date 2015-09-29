class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

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
