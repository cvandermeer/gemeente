class Message < ActiveRecord::Base
  ### VALIDATIONS ###
  validates :name, presence: true
  validates :email, presence: true
  validates :body, presence: true
end
