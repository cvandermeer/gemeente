class Newsletter < ActiveRecord::Base
  ### ASSOCIATIONS ###
  belongs_to :community

  ### VALIDATIONS ###
  validates :title, presence: true
  validates :body, presence: true
  validates :valid_from, presence: true
  validates :valid_until, presence: true
end
