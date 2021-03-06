class Community < ActiveRecord::Base
  geocoded_by :name

  ### UPLOADER ###
  mount_uploader :avatar, AvatarUploader

  ### VALIDATIONS ###
  after_validation :geocode

  ### ASSOCIATIONS ###
  has_many :users
  has_many :reports
  has_many :newsletters
  has_many :community_subscriptions
  has_many :subscribers, through: :community_subscriptions, source: 'user'
  has_many :deliveries

  ### CALLBACKS ###
  after_create :send_new_community_notice

  def send_new_community_notice
    GeneralMailer.new_community(self).deliver_later
  end
end
