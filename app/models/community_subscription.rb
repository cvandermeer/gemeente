class CommunitySubscription < ActiveRecord::Base
  ### RELATIONS ###
  belongs_to :user
  belongs_to :community

  ### VALIDATIONS  ###
  validates :community_id, presence: true
  validates :user_id, presence: true
end
