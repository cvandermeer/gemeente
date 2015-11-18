class Newsletter < ActiveRecord::Base
  ### ASSOCIATIONS ###
  belongs_to :community

  delegate :name, to: :community, prefix: true

  ### VALIDATIONS ###
  validates :title, presence: true
  validates :body, presence: true
  validates :valid_from, presence: true
  validates :valid_until, presence: true
  validates :community, presence: true
end
