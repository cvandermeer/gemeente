class UserCategory < ActiveRecord::Base
  ### ASSOCIATIONS ###
  belongs_to :user
  belongs_to :category

  ### VALIDATIONS ###
  validates :category, presence: true
  validates :user, presence: true
end
