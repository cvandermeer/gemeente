class Delivery < ActiveRecord::Base
  serialize :streets

  ### ASSOCIATIONS ###
  belongs_to :community
  belongs_to :newsletter

  ### VALIDATIONS ###
  validates :streets, presence: true
  validates :newsletter_id, presence: true
  validates :community_id, presence: true
end
