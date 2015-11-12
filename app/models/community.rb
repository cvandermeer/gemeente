class Community < ActiveRecord::Base
  geocoded_by :name

  ### VALIDATIONS ###
  after_validation :geocode

  ### ASSOCIATIONS ###
  has_many :users
  has_many :reports

  ### CALLBACKS ###
  after_create :send_new_community_notice

  def send_new_community_notice
    GeneralMailer.new_community_notice.deliver_later
  end
end
